# DREAM-INTER - Integración con Interledger

> Cómo funciona la integración de pagos descentralizados

← Volver a [[DREAM-INTER]]

---

## 🌐 ¿Qué es Interledger/Open Payments?

**Interledger** es un protocolo para pagos cross-network (entre diferentes bancos/proveedores)

**Open Payments** es un estándar de API para implementar Interledger

### Ventajas
- ✅ **Sin intermediarios** costosos
- ✅ **Interoperabilidad** entre bancos
- ✅ **Microtransacciones** eficientes
- ✅ **Descentralizado**
- ✅ **Peer-to-peer**

---

## 🏗️ Arquitectura de Integración

```
┌─────────────────────────────────────────────────┐
│  Django App (Python)                            │
│  apps/payments/                                 │
│    ├── services/payment_processor.py            │
│    └── adapters/open_payments_adapter.py        │
└──────────────────┬──────────────────────────────┘
                   │ HTTP REST API
                   ↓
┌─────────────────────────────────────────────────┐
│  Node.js Microservice                           │
│  infrastructure/external_services/              │
│    └── node_microservice/                       │
│         ├── index.js (Express server)           │
│         └── services/open-payments.js           │
└──────────────────┬──────────────────────────────┘
                   │ @interledger/open-payments SDK
                   ↓
┌─────────────────────────────────────────────────┐
│  Interledger Network                            │
│  https://ilp.interledger-test.dev               │
└─────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de Pago

### Ejemplo: Usuario paga su parte de un evento

```
1. Usuario hace clic en "Pagar mi parte"
   ↓
2. EventView (Django)
   → Llama a PaymentProcessor.process_contribution()
   ↓
3. PaymentProcessor (Service)
   → Valida monto, evento, usuario
   → Llama a OpenPaymentsAdapter
   ↓
4. OpenPaymentsAdapter (Adapter)
   → HTTP POST a microservicio Node
   → Endpoint: http://localhost:3000/api/payments/create-outgoing
   ↓
5. Node Microservice
   → Usa @interledger/open-payments
   → Flujo OP: Grant → Quote → Outgoing Payment
   ↓
6. Interledger Network
   → Transfiere fondos
   → Retorna confirmación
   ↓
7. Response hacia Django
   → Guarda Transaction en BD
   → Actualiza estado del evento
   → Envía notificación al organizador
   ↓
8. Usuario ve "¡Pago exitoso!"
```

---

## 📝 Código Conceptual

### Django: PaymentProcessor

```python
# apps/payments/services/payment_processor.py
class PaymentProcessor:
    def process_event_contribution(self, user, event, amount):
        # 1. Validar
        if amount != event.contribution_amount:
            raise InvalidAmount()
        
        # 2. Llamar adapter
        adapter = OpenPaymentsAdapter()
        result = adapter.create_payment(
            sender_wallet=user.wallet_address,
            recipient_wallet=event.organizer.wallet_address,
            amount=amount
        )
        
        # 3. Guardar transacción
        transaction = Transaction.objects.create(
            sender=user,
            recipient=event.organizer,
            amount=amount,
            interledger_id=result['payment_id'],
            status='completed'
        )
        
        # 4. Actualizar evento
        event.mark_user_paid(user)
        
        # 5. Notificar
        NotificationService.notify_payment_received(
            event.organizer, user, amount
        )
        
        return transaction
```

### Django: OpenPaymentsAdapter

```python
# apps/payments/adapters/open_payments_adapter.py
import requests
from django.conf import settings

class OpenPaymentsAdapter:
    BASE_URL = settings.NODE_SERVICE_URL  # http://localhost:3000
    
    def create_payment(self, sender_wallet, recipient_wallet, amount):
        response = requests.post(
            f'{self.BASE_URL}/api/payments/create-outgoing',
            json={
                'senderWallet': sender_wallet,
                'recipientWallet': recipient_wallet,
                'amount': amount
            }
        )
        
        if response.status_code != 200:
            raise PaymentError(response.json())
        
        return response.json()
```

### Node.js: API Endpoint

```javascript
// infrastructure/external_services/node_microservice/routes/payments.js
app.post('/api/payments/create-outgoing', async (req, res) => {
  try {
    const { senderWallet, recipientWallet, amount } = req.body;
    
    // Usar SDK de Open Payments (similar a OPtutorial)
    const client = await createAuthenticatedClient({...});
    
    // 1. Grant
    const grant = await client.grant.request(...);
    
    // 2. Incoming payment
    const incomingPayment = await client.incomingPayment.create(...);
    
    // 3. Quote
    const quote = await client.quote.create(...);
    
    // 4. Outgoing payment
    const outgoingPayment = await client.outgoingPayment.create(...);
    
    res.json({
      success: true,
      payment_id: outgoingPayment.id,
      status: 'completed'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## 🔑 Configuración

### Variables de Entorno Django (.env)

```bash
# Interledger
INTERLEDGER_WALLET_URL=https://ilp.interledger-test.dev/tu-wallet
INTERLEDGER_KEY_ID=tu-key-id

# Node Microservice
NODE_SERVICE_URL=http://localhost:3000
```

### Variables de Entorno Node (.env en microservicio)

```bash
WALLET_ADDRESS_URL=https://ilp.interledger-test.dev/tu-wallet
KEY_ID=tu-key-id
PRIVATE_KEY_PATH=./private.key
PORT=3000
```

### Archivo private.key

```
⚠️ NUNCA subir a git
Colocar en: infrastructure/external_services/node_microservice/private.key
Generar en: https://ilp.interledger-test.dev
```

---

## 🎯 Modelos de Datos

### Wallet

```python
class Wallet(models.Model):
    user = models.OneToOneField(User)
    wallet_address = models.URLField()  # URL de Interledger
    key_id = models.CharField()
    created_at = models.DateTimeField(auto_now_add=True)
```

### Transaction

```python
class Transaction(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('completed', 'Completado'),
        ('failed', 'Fallido'),
    ]
    
    sender = models.ForeignKey(User, related_name='sent_payments')
    recipient = models.ForeignKey(User, related_name='received_payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Interledger data
    interledger_payment_id = models.CharField()
    quote_id = models.CharField(null=True)
    
    status = models.CharField(choices=STATUS_CHOICES)
    
    # Relación con evento (opcional)
    event = models.ForeignKey('events.Event', null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

---

## 🚀 Endpoints del Microservicio

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/payments/create-grant` | Crear grant de autorización |
| POST | `/api/payments/create-incoming` | Crear incoming payment |
| POST | `/api/payments/create-quote` | Obtener cotización |
| POST | `/api/payments/create-outgoing` | Ejecutar pago |
| GET | `/api/payments/status/:id` | Estado de un pago |
| GET | `/api/wallet/:address` | Info de wallet |

---

## 📚 Referencias

### Código Base
- [[OPtutorial]] - Implementación Node.js de referencia
- Tutorial completo en: `OPtutorial/index.js`

### Documentación Oficial
- [Open Payments Guide](https://openpayments.guide/)
- [Interledger Protocol](https://interledger.org/)
- [Interledger Testnet](https://ilp.interledger-test.dev)

---

## 🔗 Ver también

- [[DREAM-INTER]]
- [[DREAM-INTER-Estructura]]
- [[Open Payments]]
- [[Interledger]]

---

**Última actualización**: 5 de noviembre de 2025
