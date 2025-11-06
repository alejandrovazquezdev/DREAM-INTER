# Microservicio Node.js - Open Payments

Servicio REST para manejar pagos con Interledger/Open Payments.

## 🎯 Propósito

Este microservicio actúa como **adaptador** entre Django y la red Interledger. Maneja:

1. **Autenticación con Open Payments**: Usa clave privada para autenticar
2. **Flujo completo de pagos**: Grants, quotes, incoming/outgoing payments
3. **API REST**: Endpoints para que Django pueda consumir

## 📂 Arquitectura

```
DREAM-INTER/
├── apps/payments/              ← Django app (domain logic)
│   └── services/
│       └── interledger.py      ← Llama a este microservicio
├── infrastructure/
│   └── external_services/
│       └── node_microservice/  ← ✅ ESTÁS AQUÍ
│           ├── server.js       ← Express API
│           ├── package.json    ← Dependencias
│           ├── .env            ← Credenciales (NO en git)
│           └── private.key     ← Clave privada (NO en git)
```

**Por qué Node y no Python:**
- SDK oficial de Interledger es para Node.js
- Mejor soporte y documentación
- Microservicio independiente

## 🚀 Setup

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar credenciales

Copia `.env.example` a `.env` y agrega tus credenciales de https://ilp.interledger-test.dev:

```bash
cp .env.example .env
```

Edita `.env`:
```bash
WALLET_ADDRESS_URL=https://ilp.interledger-test.dev/TU_WALLET
KEY_ID=tu-key-id-aqui
```

### 3. Agregar clave privada

Descarga tu `private.key` desde el sitio de Interledger y ponla en esta carpeta.

### 4. Iniciar servicio

```bash
# Producción
npm start

# Desarrollo (auto-reload)
npm run dev
```

## 📡 API Endpoints

### Health Check
```bash
GET /health
```

Respuesta:
```json
{
  "status": "ok",
  "service": "Open Payments API",
  "hasPrivateKey": true,
  "hasClient": true
}
```

### Consultar Wallet
```bash
GET /api/wallet/:walletUrl
```

Ejemplo:
```bash
GET /api/wallet/https://ilp.interledger-test.dev/aledev
```

### Ejecutar Pago
```bash
POST /api/payment/execute
```

Body:
```json
{
  "senderWallet": "https://ilp.interledger-test.dev/alice",
  "receiverWallet": "https://ilp.interledger-test.dev/bob",
  "amount": 1000
}
```

### Continuar Pago (después de interacción)
```bash
POST /api/payment/continue
```

Body:
```json
{
  "continueUrl": "...",
  "continueToken": "...",
  "walletUrl": "...",
  "quoteId": "..."
}
```

## 🧪 Testing

Usa el frontend de prueba en `static/test-frontend/index.html`:

1. Inicia este microservicio: `npm start`
2. Abre `static/test-frontend/index.html` en el navegador
3. Prueba los endpoints visualmente

## 🔗 Integración con Django

Django llamará a este servicio así:

```python
# apps/payments/services/interledger.py
import requests

class InterledgerService:
    BASE_URL = "http://localhost:3000"
    
    def execute_payment(self, sender, receiver, amount):
        response = requests.post(
            f"{self.BASE_URL}/api/payment/execute",
            json={
                "senderWallet": sender,
                "receiverWallet": receiver,
                "amount": amount
            }
        )
        return response.json()
```

## 📦 Dependencias

- **@interledger/open-payments**: SDK oficial de Interledger
- **express**: Framework web
- **cors**: CORS para llamadas desde Django
- **dotenv**: Variables de entorno

## 🔒 Seguridad

⚠️ **NUNCA subir a git:**
- `.env` (credenciales)
- `private.key` (clave privada)

Estos archivos están en `.gitignore`.

## 🔄 Flujo de Pago

```
1. Django recibe request de pago
     ↓
2. Django llama a POST /api/payment/execute
     ↓
3. Node microservice:
   - Obtiene wallets
   - Crea incoming payment grant
   - Crea incoming payment
   - Crea quote grant
   - Crea quote
   - Crea outgoing payment grant
   - (Puede requerir interacción del usuario)
   - Crea outgoing payment
     ↓
4. Node devuelve resultado a Django
     ↓
5. Django guarda transacción en BD
     ↓
6. Django notifica al usuario
```

## 📝 TODO

- [ ] Agregar logging estructurado
- [ ] Implementar retry logic
- [ ] Agregar rate limiting
- [ ] Métricas con Prometheus
- [ ] Tests unitarios
- [ ] Dockerizar servicio
