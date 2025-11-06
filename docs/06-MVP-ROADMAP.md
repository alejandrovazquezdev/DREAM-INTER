# DREAM-INTER - MVP y Estrategia de Escalado

> Minimum Viable Product: Demostración funcional de pagos con Interledger

← Volver a [01-OVERVIEW.md](01-OVERVIEW.md)

---

## 🎯 ¿Qué es el MVP?

**MVP = Minimum Viable Product (Mínimo Producto Viable)**

**Definición:** La versión más simple del producto que demuestra el **valor principal** de la propuesta.

### Valor principal de DREAM-INTER:
> "Facilitar pagos entre amigos para eventos usando Interledger"

---

## ✅ Estado del MVP Actual

### Fecha: 5 de noviembre de 2025
### Versión: 0.1.0 (MVP)
### Completitud: 20%

---

## 📦 Componentes del MVP

### 1. Microservicio Node.js ✅

**Ubicación:** `infrastructure/external_services/node_microservice/`

**Funcionalidad:**
- Integración con Open Payments SDK (@interledger/open-payments v7.1.3)
- API REST con Express.js
- Autenticación con Interledger usando clave privada

**Endpoints funcionales:**
```
GET  /health                    # Estado del servicio
GET  /api/wallet/:address       # Consultar información de wallet
POST /api/payment/execute       # Ejecutar pago completo
POST /api/payment/continue      # Continuar pago después de interacción
```

**Tecnologías:**
- Node.js 22.x (gestionado por mise)
- Express.js 4.18.2
- @interledger/open-payments 7.1.3
- CORS habilitado para integración con frontend

**Comandos:**
```bash
# Instalar dependencias
mise run setup-node

# Iniciar microservicio
mise run node-service

# Servidor corre en http://localhost:3000
```

**Estado:** ✅ Funcionando y probado

---

### 2. Frontend de Prueba ✅

**Ubicación:** `static/test-frontend/`

**Archivos:**
- `index.html` - Interfaz de usuario
- `script.js` - Lógica de aplicación
- `styles.css` - Estilos modernos

**Funcionalidades:**
- ✅ Consultar información de wallets
- ✅ Ejecutar pagos entre wallets
- ✅ Ver logs en tiempo real
- ✅ Indicador de estado del servidor
- ✅ Validación de formularios

**Características técnicas:**
- HTML5 + CSS3 (Variables CSS, Flexbox, Grid)
- Vanilla JavaScript (sin frameworks)
- Fetch API para llamadas HTTP
- Responsive design

**Cómo usar:**
```bash
# Opción 1: Abrir directamente
Abrir file:///C:/Users/.../DREAM-INTER/static/test-frontend/index.html

# Opción 2: Servidor simple
cd static/test-frontend
python -m http.server 8080
# Abrir http://localhost:8080
```

**Estado:** ✅ Funcionando y probado

---

### 3. Arquitectura de Carpetas ✅

**Ubicación:** Raíz de DREAM-INTER

**Estructura completa:**
```
DREAM-INTER/
├── apps/                       # Apps Django (vacías por ahora)
│   ├── accounts/
│   ├── core/
│   ├── events/
│   ├── notifications/
│   ├── payments/
│   └── public/
├── infrastructure/             # Capa de infraestructura
│   ├── cache/
│   ├── database/
│   └── external_services/
│       └── node_microservice/  # ✅ Microservicio funcionando
├── static/                     # Archivos estáticos
│   ├── css/
│   ├── js/
│   ├── images/
│   └── test-frontend/          # ✅ Frontend de prueba
├── templates/                  # Templates Django (vacíos)
├── tests/                      # Tests (vacíos)
├── docs/                       # Documentación
│   ├── MIGRATION.md            # ✅ Doc de migración
│   └── WHERE_THINGS_GO.md
├── config/                     # Configuración (Django pendiente)
├── requirements/               # ✅ Dependencias Python
│   ├── base.txt
│   ├── development.txt
│   └── production.txt
├── .mise.toml                  # ✅ Configuración mise
├── .env.example                # Template de variables
├── .gitignore                  # ✅ Configurado
└── README.md
```

**Patrón arquitectónico:** Layered Architecture + DDD Simplificado

**Estado:** ✅ Estructura completa definida

---

### 4. Entorno de Desarrollo ✅

**Herramientas configuradas:**

#### mise (Gestor de versiones)
```toml
[tools]
python = "3.12"
node = "22"

[tasks.setup]        # Configurar Python
[tasks.setup-node]   # Instalar deps Node
[tasks.node-service] # Iniciar microservicio
[tasks.dev]          # Iniciar Django (futuro)
```

#### Python Virtual Environment
```
venv/
├── Python 3.12.12
├── Django 5.0.14
├── djangorestframework 3.16.1
├── pytest 8.4.2
├── black 25.9.0
└── 40+ paquetes más
```

**Comandos:**
```bash
# Setup completo
mise install
mise run setup
mise run setup-node

# Activar venv (para Django)
.\venv\Scripts\Activate.ps1  # Windows
source venv/bin/activate      # Linux/Mac
```

**Estado:** ✅ Configurado y funcionando

---

## 🎯 Lo que el MVP Demuestra

### ✅ Prueba de Concepto Exitosa

1. **Interledger funciona** → Integración con Open Payments SDK exitosa
2. **Arquitectura viable** → Separación de responsabilidades clara
3. **Tecnología validada** → Node.js + Django pueden coexistir
4. **Flujo de pago completo** → Desde UI hasta red Interledger

### ✅ Valor Demostrado

**Para inversionistas:**
- "La tecnología funciona, podemos hacer pagos reales"
- "Tenemos arquitectura escalable desde el inicio"

**Para el equipo:**
- "Sabemos cómo integrar Interledger"
- "La estructura permite trabajar en paralelo"

**Para usuarios piloto:**
- "Pueden probar pagos entre wallets reales"

---

## ❌ Lo que el MVP NO tiene (aún)

### Funcionalidades pendientes:

- ❌ **Base de datos** - No hay persistencia
- ❌ **Usuarios** - No hay login/registro
- ❌ **Eventos** - No se pueden crear eventos
- ❌ **División de gastos** - Solo pagos directos
- ❌ **Historial** - Los pagos no se guardan
- ❌ **Notificaciones** - No hay sistema de alertas
- ❌ **Django inicializado** - No hay manage.py
- ❌ **Templates dinámicos** - Solo HTML estático
- ❌ **API REST completa** - Solo el microservicio Node
- ❌ **Tests** - No hay suite de testing

### Limitaciones actuales:

**Persistencia:**
```
Ahora:  Ejecutas pago → Se procesa → Se pierde al cerrar
Futuro: Ejecutas pago → Se guarda en BD → Historial permanente
```

**Usuarios:**
```
Ahora:  Cualquiera puede usar la interfaz de prueba
Futuro: Login → Permisos → Solo tus eventos y pagos
```

**Lógica de negocio:**
```
Ahora:  Pago directo wallet A → wallet B
Futuro: Evento → N participantes → División automática → Múltiples pagos
```

---

## 📈 Estrategia de Escalado

### Principio fundamental:
> **NO se tira nada, se construye ENCIMA del MVP**

---

## 🗓️ Roadmap de Crecimiento

### Fase 1: MVP Base ✅ (COMPLETADO)
**Timeline:** Semana 1  
**Objetivo:** Probar concepto core

**Entregables:**
- ✅ Microservicio Node con Interledger
- ✅ Frontend de prueba funcional
- ✅ Arquitectura definida
- ✅ Entorno de desarrollo configurado

**Resultado:** "¡Funciona! Podemos hacer pagos con Interledger"

---

### Fase 2: Persistencia Básica ⏳ (PRÓXIMO)
**Timeline:** Semana 2  
**Objetivo:** Agregar base de datos

**Tareas:**
```bash
# 1. Inicializar Django
django-admin startproject config .

# 2. Crear app de payments
python manage.py startapp payments

# 3. Crear modelo Transaction
# apps/payments/models.py
class Transaction:
    wallet_from
    wallet_to
    amount
    status
    timestamp

# 4. Migrar
python manage.py migrate

# 5. Guardar pagos
# Cuando se ejecuta pago, guardar en BD
```

**Resultado:**
- ✅ MVP anterior intacto
- ➕ manage.py creado
- ➕ SQLite con historial de transacciones
- ➕ Django Admin básico

**Métrica de éxito:** Poder ver historial de pagos en Django Admin

---

### Fase 3: MVP+ con Usuarios ⏳
**Timeline:** Semana 3-4  
**Objetivo:** Sistema de autenticación

**Tareas:**
```bash
# 1. Crear app accounts
python manage.py startapp accounts

# 2. Modelo User personalizado
class CustomUser(AbstractUser):
    interledger_wallet
    phone_number

# 3. Views de autenticación
- login/
- register/
- logout/

# 4. Templates
- templates/accounts/login.html
- templates/accounts/register.html
```

**Resultado:**
- ✅ Todo lo anterior intacto
- ➕ Usuarios pueden registrarse
- ➕ Login/logout funcional
- ➕ Cada usuario ve sus propios pagos

**Métrica de éxito:** 5 usuarios reales pueden registrarse y usar

---

### Fase 4: Eventos Básicos ⏳
**Timeline:** Semana 5-6  
**Objetivo:** Crear y gestionar eventos

**Tareas:**
```bash
# 1. Crear app events
python manage.py startapp events

# 2. Modelos
class Event:
    title
    description
    organizer (FK User)
    total_amount
    created_at

class Participant:
    event (FK Event)
    user (FK User)
    amount_to_pay
    has_paid

# 3. Views
- events/create/
- events/list/
- events/<id>/detail/
- events/<id>/participants/

# 4. Templates
- templates/events/list.html
- templates/events/create.html
- templates/events/detail.html
```

**Resultado:**
- ✅ Todo lo anterior intacto
- ➕ Usuarios pueden crear eventos
- ➕ Invitar amigos a eventos
- ➕ Ver lista de eventos

**Métrica de éxito:** Crear evento "Cena en restaurante" con 5 amigos

---

### Fase 5: División de Gastos ⏳
**Timeline:** Semana 7-8  
**Objetivo:** Lógica de división automática

**Tareas:**
```python
# apps/payments/services/expense_splitter.py
class ExpenseSplitter:
    def split_evenly(self, event):
        """Divide gasto equitativamente"""
        participants = event.participants.all()
        amount_per_person = event.total_amount / len(participants)
        return amount_per_person
    
    def split_by_percentage(self, event, percentages):
        """Divide según porcentajes"""
        pass
    
    def split_by_items(self, event, items):
        """Divide por items consumidos"""
        pass
```

**Resultado:**
- ✅ Todo lo anterior intacto
- ➕ División automática de gastos
- ➕ Diferentes métodos de división
- ➕ Cálculo de cuánto debe cada uno

**Métrica de éxito:** Evento de $1000 con 10 personas = $100 c/u automático

---

### Fase 6: Integración Django ↔ Node ⏳
**Timeline:** Semana 9  
**Objetivo:** Django llama al microservicio

**Tareas:**
```python
# apps/payments/services/interledger.py
import requests

class InterledgerService:
    BASE_URL = "http://localhost:3000"
    
    def execute_payment(self, sender_wallet, receiver_wallet, amount):
        response = requests.post(
            f"{self.BASE_URL}/api/payment/execute",
            json={
                "senderWallet": sender_wallet,
                "receiverWallet": receiver_wallet,
                "amount": amount
            }
        )
        return response.json()

# apps/payments/views.py
class PaymentView:
    def post(self, request):
        # 1. Validar usuario autenticado
        # 2. Obtener evento
        # 3. Llamar a InterledgerService
        # 4. Guardar resultado en BD
        # 5. Notificar al usuario
```

**Resultado:**
- ✅ Todo lo anterior intacto
- ➕ Django orquesta los pagos
- ➕ Microservicio Node ejecuta el pago real
- ➕ Django guarda todo en BD

**Métrica de éxito:** Pagar desde Django, ver en historial

---

### Fase 7: API REST Completa ⏳
**Timeline:** Semana 10-11  
**Objetivo:** Endpoints REST para frontend moderno

**Tareas:**
```python
# apps/events/api/serializers.py
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

# apps/events/api/views.py
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

# config/urls.py
router = DefaultRouter()
router.register('events', EventViewSet)
router.register('payments', PaymentViewSet)
router.register('users', UserViewSet)
```

**Resultado:**
- ✅ Todo lo anterior intacto
- ➕ API REST completa con DRF
- ➕ Endpoints documentados
- ➕ Listo para frontend React/Vue

**Métrica de éxito:** Swagger docs funcionando

---

### Fase 8: Notificaciones ⏳
**Timeline:** Semana 12  
**Objetivo:** Alertar a usuarios de eventos

**Tareas:**
```python
# apps/notifications/models.py
class Notification:
    user (FK User)
    event (FK Event)
    message
    type (invitation, payment_received, payment_reminder)
    read
    created_at

# apps/notifications/services/notifier.py
class Notifier:
    def send_payment_confirmation(self, user, payment):
        pass
    
    def send_event_invitation(self, user, event):
        pass
    
    def send_payment_reminder(self, user, event):
        pass
```

**Resultado:**
- ✅ Todo lo anterior intacto
- ➕ Notificaciones in-app
- ➕ Emails (opcional)
- ➕ Push notifications (opcional)

**Métrica de éxito:** Recibir notificación cuando amigo paga

---

### Fase 9: Testing Completo ⏳
**Timeline:** Semana 13-14  
**Objetivo:** Suite de tests automatizados

**Tareas:**
```python
# tests/unit/test_expense_splitter.py
def test_split_evenly():
    event = Event(total_amount=1000)
    participants = [User(), User(), User(), User()]
    splitter = ExpenseSplitter()
    result = splitter.split_evenly(event)
    assert result == 250

# tests/integration/test_payment_flow.py
def test_complete_payment_flow():
    # 1. Usuario crea evento
    # 2. Invita amigos
    # 3. Calcula división
    # 4. Ejecuta pago
    # 5. Verifica en BD
    # 6. Verifica notificación
```

**Resultado:**
- ✅ Todo lo anterior intacto
- ➕ Tests unitarios (>80% coverage)
- ➕ Tests de integración
- ➕ CI/CD configurado

**Métrica de éxito:** Pipeline verde en GitHub Actions

---

### Fase 10: Optimización y Scale ⏳
**Timeline:** Semana 15+  
**Objetivo:** Preparar para producción

**Tareas:**
- PostgreSQL en vez de SQLite
- Redis para cache
- Celery para tareas asíncronas
- Docker para deployment
- Monitoring con Sentry
- CDN para assets
- Load balancer

**Resultado:**
- ✅ Todo lo anterior intacto
- ➕ Optimizado para escala
- ➕ Listo para producción

**Métrica de éxito:** Soportar 1000+ usuarios concurrentes

---

## 📊 Métricas de Éxito por Fase

| Fase | KPI | Target |
|------|-----|--------|
| **MVP** | Pago ejecutado exitosamente | 1 pago de prueba ✅ |
| **Persistencia** | Transacciones guardadas | 10+ pagos en historial |
| **Usuarios** | Registros completados | 5 usuarios reales |
| **Eventos** | Eventos creados | 3 eventos con participantes |
| **División** | Cálculos correctos | 100% precisión |
| **Integración** | Pagos desde Django | 10 pagos via Django |
| **API REST** | Endpoints funcionando | 15+ endpoints documentados |
| **Notificaciones** | Notificaciones enviadas | 100% de notificaciones |
| **Testing** | Code coverage | >80% |
| **Scale** | Usuarios concurrentes | 1000+ |

---

## 🎯 Por qué esta Estrategia Funciona

### 1. Incremental
```
No tiramos nada → Construimos encima → Cada fase agrega valor
```

### 2. De-riesgada
```
MVP probado ✅ → Sabemos que funciona → Construir con confianza
```

### 3. Demostrable
```
Cada fase tiene entregable → Podemos mostrar progreso → Feedback continuo
```

### 4. Flexible
```
Prioridades cambian → Podemos reordenar fases → No afecta lo construido
```

### 5. Escalable
```
Arquitectura sólida → Cada fase es independiente → Team puede crecer
```

---

## 🏗️ Arquitectura Escalable

### Capas bien definidas:

```
┌─────────────────────────────────────────┐
│         Presentación (UI)               │
│  Templates Django / React / Vue         │
├─────────────────────────────────────────┤
│         Aplicación (API)                │
│  Django REST Framework                  │
├─────────────────────────────────────────┤
│         Lógica de Negocio               │
│  apps/events, apps/payments, etc.       │
├─────────────────────────────────────────┤
│         Infraestructura                 │
│  Base de datos, Cache, Microservicios   │
└─────────────────────────────────────────┘
```

**Ventajas:**
- ✅ Modular (agregar features sin afectar otras)
- ✅ Testeable (cada capa se prueba independiente)
- ✅ Escalable (cada capa puede escalar por separado)
- ✅ Mantenible (cambios localizados)

---

## 💡 Lecciones del MVP

### ✅ Lo que funcionó bien:

1. **Arquitectura primero** → Estructura clara desde el inicio
2. **Prototipar en "Lo-que-se-tiene"** → Validar antes de integrar
3. **Microservicio separado** → Node y Django desacoplados
4. **mise para gestión** → Setup automatizado
5. **Documentación continua** → Obsidian como single source of truth

### 🎯 Lo que haríamos diferente:

1. **SQLite desde el inicio** → Guardar aunque sea localmente
2. **Django Admin configurado** → Ver datos fácilmente
3. **Logger estructurado** → Debug más fácil

---

## 🔗 Recursos Relacionados

### Documentación Obsidian:
- [01-OVERVIEW.md](01-OVERVIEW.md) - Vista general del proyecto
- [02-STRUCTURE.md](02-STRUCTURE.md) - Desglose de carpetas
- [03-SETUP.md](03-SETUP.md) - Guía de instalación
- [04-INTERLEDGER.md](04-INTERLEDGER.md) - Integración con Interledger
- [[mise]] - Gestor de versiones

### Archivos del proyecto:
- `docs/MIGRATION.md` - Migración desde Lo-que-se-tiene
- `ARCHITECTURE.md` - Decisiones arquitectónicas
- `.mise.toml` - Configuración de herramientas

---

## 📝 Próximos Pasos Inmediatos

### 1. Hacer commit del MVP ⏳
```bash
git add .
git commit -m "feat: MVP - Integración Interledger funcional"
git push origin arquitectura
```

### 2. Inicializar Django ⏳
```bash
.\venv\Scripts\Activate.ps1
django-admin startproject config .
python manage.py migrate
python manage.py createsuperuser
```

### 3. Primera app: Payments ⏳
```bash
python manage.py startapp payments
# Crear modelo Transaction
# Guardar pagos en BD
```

---

**Última actualización:** 5 de noviembre de 2025  
**Versión del documento:** 1.0  
**Estado del MVP:** Funcional y probado ✅  
**Siguiente milestone:** Django inicializado
