const API_URL = 'http://localhost:3000';

// ============================================
// LOGS
// ============================================

function addLog(message, type = 'info') {
    const logsContainer = document.getElementById('logs');
    const timestamp = new Date().toLocaleTimeString();
    
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.innerHTML = `
        <div class="timestamp">[${timestamp}]</div>
        <div class="message">${message}</div>
    `;
    
    logsContainer.appendChild(logEntry);
    logsContainer.scrollTop = logsContainer.scrollHeight;
}

function clearLogs() {
    document.getElementById('logs').innerHTML = '';
    addLog('Logs cleared', 'info');
}

// ============================================
// STATUS CHECK
// ============================================

async function checkServerStatus() {
    const indicator = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');
    
    try {
        const response = await fetch(`${API_URL}/health`);
        const data = await response.json();
        
        if (data.status === 'ok' && data.hasPrivateKey && data.hasClient) {
            indicator.className = 'status-indicator online';
            statusText.textContent = '✅ Servidor conectado y listo';
            addLog('Server is online and ready', 'success');
        } else if (data.status === 'ok') {
            indicator.className = 'status-indicator';
            statusText.textContent = '⚠️ Servidor conectado pero falta configuración';
            addLog('Server is online but missing private key or client config', 'error');
        }
    } catch (error) {
        indicator.className = 'status-indicator offline';
        statusText.textContent = '❌ Servidor no disponible';
        addLog(`Server is offline: ${error.message}`, 'error');
    }
}

// ============================================
// WALLET INFO
// ============================================

document.getElementById('walletForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const walletUrl = document.getElementById('walletUrl').value;
    const resultDiv = document.getElementById('walletResult');
    
    if (!walletUrl.startsWith('https://')) {
        showResult(resultDiv, 'error', 'La URL de la wallet debe comenzar con https://');
        return;
    }
    
    addLog(`Consultando wallet: ${walletUrl}`, 'info');
    showResult(resultDiv, 'warning', 'Consultando...');
    
    try {
        // Codificar la URL para pasarla como parámetro
        const encodedUrl = encodeURIComponent(walletUrl);
        const response = await fetch(`${API_URL}/api/wallet/${walletUrl}`);
        const data = await response.json();
        
        if (data.success) {
            const walletInfo = `
                <strong>✅ Wallet encontrada</strong><br>
                <strong>ID:</strong> ${data.wallet.id}<br>
                <strong>Asset:</strong> ${data.wallet.assetCode} (Scale: ${data.wallet.assetScale})<br>
                <strong>Auth Server:</strong> ${data.wallet.authServer}<br>
                <strong>Resource Server:</strong> ${data.wallet.resourceServer}
            `;
            showResult(resultDiv, 'success', walletInfo);
            addLog('Wallet retrieved successfully', 'success');
        } else {
            showResult(resultDiv, 'error', `Error: ${data.message || 'Unknown error'}`);
            addLog(`Error getting wallet: ${data.message}`, 'error');
        }
    } catch (error) {
        showResult(resultDiv, 'error', `Error de red: ${error.message}`);
        addLog(`Network error: ${error.message}`, 'error');
    }
});

// ============================================
// PAYMENT
// ============================================

document.getElementById('paymentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const senderWallet = document.getElementById('senderWallet').value;
    const receiverWallet = document.getElementById('receiverWallet').value;
    const amount = document.getElementById('amount').value;
    const resultDiv = document.getElementById('paymentResult');
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Validaciones
    if (!senderWallet.startsWith('https://') || !receiverWallet.startsWith('https://')) {
        showResult(resultDiv, 'error', 'Las URLs de las wallets deben comenzar con https://');
        return;
    }
    
    if (amount < 1) {
        showResult(resultDiv, 'error', 'El monto debe ser mayor a 0');
        return;
    }
    
    // Deshabilitar botón y mostrar loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span> Procesando...';
    
    addLog(`Iniciando pago de ${amount} desde ${senderWallet} hacia ${receiverWallet}`, 'info');
    showResult(resultDiv, 'warning', 'Procesando pago... Esto puede tomar unos segundos.');
    
    try {
        const response = await fetch(`${API_URL}/api/payment/execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                senderWallet,
                receiverWallet,
                amount: parseInt(amount)
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            const paymentInfo = `
                <strong>✅ ¡Pago completado exitosamente!</strong><br><br>
                <strong>Payment ID:</strong> ${data.payment.id}<br>
                <strong>Status:</strong> ${data.payment.status}<br>
                <strong>Monto Debitado:</strong> ${data.payment.debitAmount.value} ${data.payment.debitAmount.assetCode}<br>
                <strong>Monto Recibido:</strong> ${data.payment.receiveAmount.value} ${data.payment.receiveAmount.assetCode}<br>
                <strong>Fecha:</strong> ${new Date(data.payment.createdAt).toLocaleString()}
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
            showResult(resultDiv, 'success', paymentInfo);
            addLog('Payment completed successfully!', 'success');
        } else if (data.requiresInteraction) {
            const interactionInfo = `
                <strong>⚠️ Se requiere interacción del usuario</strong><br><br>
                El pago requiere que el usuario apruebe la transacción.<br><br>
                <strong>1. Visita esta URL para aprobar:</strong><br>
                <a href="${data.interactUrl}" target="_blank">${data.interactUrl}</a><br><br>
                <strong>2. Después de aprobar, el pago se procesará automáticamente.</strong><br><br>
                <strong>Quote:</strong><br>
                Debit: ${data.quote.debitAmount.value} ${data.quote.debitAmount.assetCode}<br>
                Receive: ${data.quote.receiveAmount.value} ${data.quote.receiveAmount.assetCode}
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
            showResult(resultDiv, 'warning', interactionInfo);
            addLog('Payment requires user interaction', 'info');
        } else {
            showResult(resultDiv, 'error', `Error: ${data.message || data.error}`);
            addLog(`Payment failed: ${data.message || data.error}`, 'error');
        }
    } catch (error) {
        showResult(resultDiv, 'error', `Error de red: ${error.message}`);
        addLog(`Network error: ${error.message}`, 'error');
    } finally {
        // Rehabilitar botón
        submitBtn.disabled = false;
        submitBtn.textContent = 'Ejecutar Pago';
    }
});

// ============================================
// UTILITIES
// ============================================

function showResult(element, type, message) {
    element.className = `result show ${type}`;
    element.innerHTML = message;
}

// ============================================
// INIT
// ============================================

// Check server status on load
checkServerStatus();

// Check every 10 seconds
setInterval(checkServerStatus, 10000);

// Initial log
addLog('Frontend loaded and ready', 'success');
