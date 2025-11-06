import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createAuthenticatedClient, isFinalizedGrant } from '@interledger/open-payments';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Cargar clave privada
let privateKey;
try {
  privateKey = fs.readFileSync('private.key', 'utf-8');
  console.log('✅ Private key loaded');
} catch (error) {
  console.error('❌ Error loading private.key:', error.message);
  console.log('⚠️  Asegúrate de tener el archivo private.key en esta carpeta');
}

// Cliente autenticado Open Payments
let client;
if (privateKey) {
  client = await createAuthenticatedClient({
    walletAddressUrl: process.env.WALLET_ADDRESS_URL,
    privateKey: privateKey,
    keyId: process.env.KEY_ID
  });
  console.log('✅ Open Payments client initialized');
}

// ============================================
// RUTAS
// ============================================

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Open Payments API',
    hasPrivateKey: !!privateKey,
    hasClient: !!client
  });
});

// Obtener información de wallet
app.get('/api/wallet/:address(*)', async (req, res) => {
  try {
    const walletUrl = req.params.address;
    
    if (!walletUrl.startsWith('https://')) {
      return res.status(400).json({ 
        error: 'Wallet address must start with https://' 
      });
    }

    const walletAddress = await client.walletAddress.get({ url: walletUrl });
    
    res.json({
      success: true,
      wallet: {
        id: walletAddress.id,
        assetCode: walletAddress.assetCode,
        assetScale: walletAddress.assetScale,
        authServer: walletAddress.authServer,
        resourceServer: walletAddress.resourceServer
      }
    });
  } catch (error) {
    console.error('Error getting wallet:', error);
    res.status(500).json({ 
      error: 'Failed to get wallet information',
      message: error.message 
    });
  }
});

// Ejecutar pago completo (flujo completo de OPtutorial)
app.post('/api/payment/execute', async (req, res) => {
  try {
    const { senderWallet, receiverWallet, amount } = req.body;

    if (!senderWallet || !receiverWallet || !amount) {
      return res.status(400).json({ 
        error: 'Missing required fields: senderWallet, receiverWallet, amount' 
      });
    }

    console.log('🚀 Starting payment flow...');
    console.log(`From: ${senderWallet}`);
    console.log(`To: ${receiverWallet}`);
    console.log(`Amount: ${amount}`);

    // 1. Obtener wallet addresses
    console.log('1️⃣ Getting wallet addresses...');
    const sendingWalletAddress = await client.walletAddress.get({
      url: senderWallet,
    });
    const receivingWalletAddress = await client.walletAddress.get({
      url: receiverWallet,
    });

    // 2. Grant para incoming payment
    console.log('2️⃣ Requesting incoming payment grant...');
    const incomingPaymentGrant = await client.grant.request(
      { url: receivingWalletAddress.authServer },
      {
        access_token: {
          access: [
            {
              type: 'incoming-payment',
              actions: ['read', 'complete', 'create'],
            },
          ],
        },
      }
    );

    if (!isFinalizedGrant(incomingPaymentGrant)) {
      throw new Error('Expected finalized incoming payment grant');
    }

    // 3. Crear incoming payment
    console.log('3️⃣ Creating incoming payment...');
    const incomingPayment = await client.incomingPayment.create(
      {
        url: receivingWalletAddress.resourceServer,
        accessToken: incomingPaymentGrant.access_token.value,
      },
      {
        walletAddress: receivingWalletAddress.id,
        incomingAmount: {
          assetCode: receivingWalletAddress.assetCode,
          assetScale: receivingWalletAddress.assetScale,
          value: amount.toString(),
        },
      }
    );

    // 4. Grant para quote
    console.log('4️⃣ Requesting quote grant...');
    const quoteGrant = await client.grant.request(
      { url: sendingWalletAddress.authServer },
      {
        access_token: {
          access: [
            {
              type: 'quote',
              actions: ['create', 'read'],
            },
          ],
        },
      }
    );

    if (!isFinalizedGrant(quoteGrant)) {
      throw new Error('Expected finalized quote grant');
    }

    // 5. Crear quote
    console.log('5️⃣ Creating quote...');
    const quote = await client.quote.create(
      {
        url: sendingWalletAddress.resourceServer,
        accessToken: quoteGrant.access_token.value,
      },
      {
        walletAddress: sendingWalletAddress.id,
        receiver: incomingPayment.id,
        method: 'ilp',
      }
    );

    // 6. Grant para outgoing payment (requiere interacción)
    console.log('6️⃣ Requesting outgoing payment grant...');
    const outgoingPaymentGrant = await client.grant.request(
      { url: sendingWalletAddress.authServer },
      {
        access_token: {
          access: [
            {
              type: 'outgoing-payment',
              actions: ['read', 'create'],
              limits: {
                debitAmount: {
                  assetCode: quote.debitAmount.assetCode,
                  assetScale: quote.debitAmount.assetScale,
                  value: quote.debitAmount.value,
                },
              },
              identifier: sendingWalletAddress.id,
            },
          ],
        },
        interact: {
          start: ['redirect'],
        },
      }
    );

    // Si requiere interacción, devolver URL
    if (outgoingPaymentGrant.interact) {
      console.log('⚠️  Payment requires user interaction');
      return res.json({
        success: false,
        requiresInteraction: true,
        interactUrl: outgoingPaymentGrant.interact.redirect,
        continueUrl: outgoingPaymentGrant.continue.uri,
        continueToken: outgoingPaymentGrant.continue.access_token.value,
        message: 'User must approve the payment at the interact URL',
        quote: {
          debitAmount: quote.debitAmount,
          receiveAmount: quote.receiveAmount,
        }
      });
    }

    // Si no requiere interacción (auto-aprobado), continuar
    console.log('7️⃣ Finalizing outgoing payment grant...');
    const finalizedOutgoingPaymentGrant = await client.grant.continue({
      url: outgoingPaymentGrant.continue.uri,
      accessToken: outgoingPaymentGrant.continue.access_token.value,
    });

    if (!isFinalizedGrant(finalizedOutgoingPaymentGrant)) {
      throw new Error('Expected finalized outgoing payment grant');
    }

    // 8. Crear outgoing payment
    console.log('8️⃣ Creating outgoing payment...');
    const outgoingPayment = await client.outgoingPayment.create(
      {
        url: sendingWalletAddress.resourceServer,
        accessToken: finalizedOutgoingPaymentGrant.access_token.value,
      },
      {
        walletAddress: sendingWalletAddress.id,
        quoteId: quote.id,
      }
    );

    console.log('✅ Payment completed successfully!');

    res.json({
      success: true,
      payment: {
        id: outgoingPayment.id,
        status: 'completed',
        debitAmount: quote.debitAmount,
        receiveAmount: quote.receiveAmount,
        createdAt: outgoingPayment.createdAt,
      },
      incomingPayment: {
        id: incomingPayment.id,
      }
    });

  } catch (error) {
    console.error('❌ Payment error:', error);
    res.status(500).json({ 
      error: 'Payment failed',
      message: error.message,
      details: error.description || error.validationErrors || null
    });
  }
});

// Continuar grant después de interacción del usuario
app.post('/api/payment/continue', async (req, res) => {
  try {
    const { continueUrl, continueToken, walletUrl, quoteId } = req.body;

    console.log('🔄 Continuing payment after user interaction...');

    // Continuar el grant
    const finalizedGrant = await client.grant.continue({
      url: continueUrl,
      accessToken: continueToken,
    });

    if (!isFinalizedGrant(finalizedGrant)) {
      throw new Error('Grant not finalized after interaction');
    }

    // Obtener wallet
    const walletAddress = await client.walletAddress.get({ url: walletUrl });

    // Crear outgoing payment
    const outgoingPayment = await client.outgoingPayment.create(
      {
        url: walletAddress.resourceServer,
        accessToken: finalizedGrant.access_token.value,
      },
      {
        walletAddress: walletAddress.id,
        quoteId: quoteId,
      }
    );

    console.log('✅ Payment completed after interaction!');

    res.json({
      success: true,
      payment: {
        id: outgoingPayment.id,
        status: 'completed',
        createdAt: outgoingPayment.createdAt,
      }
    });

  } catch (error) {
    console.error('❌ Continue payment error:', error);
    res.status(500).json({ 
      error: 'Failed to continue payment',
      message: error.message 
    });
  }
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`\n💡 Ready to process payments!\n`);
});
