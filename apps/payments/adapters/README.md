# Payment Adapters

## 🔌 Adaptadores para Servicios Externos

Los adapters son la capa que conecta Django con servicios externos.

### ¿Qué es un Adapter?

Un adapter **traduce** entre Django y un servicio externo (como el microservicio Node de Interledger).

### Ejemplo: OpenPaymentsAdapter

**Responsabilidad:** Comunicarse con el microservicio Node.js de Open Payments

**Ubicación:** `open_payments_adapter.py`

**Qué hace:**
- Envía requests HTTP al microservicio Node
- Convierte respuestas JSON a objetos Python
- Maneja errores de comunicación
- Abstrae los detalles técnicos

**Ejemplo de uso:**

```python
# apps/payments/services/payment_processor.py
from apps.payments.adapters.open_payments_adapter import OpenPaymentsAdapter

class PaymentProcessor:
    def process_event_contribution(self, user, event, amount):
        # 1. Validar datos
        # 2. Llamar al adapter
        adapter = OpenPaymentsAdapter()
        result = adapter.create_payment(
            sender=user.wallet_address,
            recipient=event.organizer.wallet_address,
            amount=amount
        )
        # 3. Guardar transacción en BD
        # 4. Retornar resultado
```

### Ventajas:

✅ Django no necesita saber de Node.js
✅ Fácil cambiar la implementación
✅ Testeable (mock del adapter)
✅ Reutilizable en diferentes services
