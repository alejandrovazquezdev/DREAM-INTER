# Microservicio Node.js - Open Payments

## 🚀 Servicio de Integración con Interledger

Este microservicio maneja toda la comunicación con Open Payments/Interledger.

### ¿Por qué un microservicio separado?

- Open Payments tiene SDK oficial en Node.js
- Django puede comunicarse vía HTTP/REST
- Separación de responsabilidades
- Similar al patrón de OPtutorial

### Estructura:

```
node_microservice/
├── package.json          # Dependencias (@interledger/open-payments)
├── index.js              # Servidor Express/Fastify
├── .env                  # Credenciales (NUNCA subir a git)
├── services/
│   └── open-payments.js  # Lógica de OP (grants, payments, quotes)
└── routes/
    └── payments.js       # API REST endpoints
```

### Endpoints que expondrá:

```
POST /api/payments/create-grant          # Crear grant
POST /api/payments/create-incoming       # Crear incoming payment
POST /api/payments/create-quote          # Crear quote
POST /api/payments/create-outgoing       # Crear outgoing payment
GET  /api/payments/status/:id            # Estado de pago
```

### Cómo Django lo usa:

```python
# En apps/payments/adapters/open_payments_adapter.py
import requests

class OpenPaymentsAdapter:
    def create_payment(self, amount, recipient):
        response = requests.post(
            'http://localhost:3000/api/payments/create-outgoing',
            json={'amount': amount, 'recipient': recipient}
        )
        return response.json()
```

### Basado en OPtutorial:

Este microservicio usa el mismo código de `OPtutorial/index.js` pero expuesto como API REST.
