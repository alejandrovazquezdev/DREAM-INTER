# DREAM-INTER - Estructura Detallada

> Desglose completo de la organización de archivos y directorios

← Volver a [[DREAM-INTER]]

---

## 📂 Estructura Completa

```
DREAM-INTER/
│
├── config/                          # Proyecto Django principal
│   ├── __init__.py
│   ├── settings/                    # Configuraciones por ambiente
│   │   ├── __init__.py
│   │   ├── base.py                  # Config compartida
│   │   ├── development.py           # Dev local
│   │   ├── staging.py               # Pre-producción
│   │   └── production.py            # Producción
│   ├── urls.py                      # URLs principales
│   ├── wsgi.py                      # WSGI entry point
│   └── asgi.py                      # ASGI entry point
│
├── apps/                            # Aplicaciones Django
│   ├── core/
│   ├── accounts/
│   ├── public/
│   ├── payments/
│   ├── events/
│   └── notifications/
│
├── infrastructure/                  # Infraestructura
│   ├── database/
│   ├── cache/
│   └── external_services/
│       └── node_microservice/
│
├── static/                          # Archivos estáticos
│   ├── css/
│   ├── js/
│   └── images/
│
├── media/                           # Archivos subidos
│   └── uploads/
│
├── templates/                       # Templates globales
│   ├── base.html
│   ├── components/
│   └── errors/
│
├── tests/                           # Tests
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docs/                            # Documentación
├── scripts/                         # Scripts utilidad
└── requirements/                    # Dependencias Python
```

---

## 🎯 Apps Django

### core/ - Base del Sistema

```
apps/core/
├── models/
│   ├── __init__.py
│   ├── base.py              # Abstract models (timestamps, soft delete)
│   └── mixins.py            # Model mixins reutilizables
├── services/                # Servicios compartidos
├── utils/                   # Utilidades generales
├── middleware/              # Middlewares custom
└── management/
    └── commands/            # Comandos Django custom
```

**Propósito**: Código compartido por todas las apps

---

### accounts/ - Gestión de Usuarios

```
apps/accounts/
├── models/
│   └── user.py              # CustomUser model
├── services/
│   ├── auth_service.py      # Lógica autenticación
│   └── user_service.py      # Lógica usuarios
├── repositories/
│   └── user_repository.py   # Acceso a datos
├── views/
│   ├── auth_views.py        # Login, signup, logout
│   └── profile_views.py     # Perfil de usuario
├── forms/                   # Forms Django
├── templates/accounts/
│   ├── login.html
│   ├── signup.html
│   └── profile.html
└── urls.py
```

**Propósito**: Autenticación y gestión de usuarios

---

### public/ - Páginas Públicas

```
apps/public/
├── views/
│   └── home_views.py        # Landing, about, etc
├── templates/public/
│   ├── home.html            # Página principal
│   ├── about.html
│   └── how_it_works.html
└── urls.py
```

**Propósito**: Landing page y páginas informativas

---

### payments/ - Integración Interledger

```
apps/payments/
├── models/
│   ├── wallet.py            # Wallet del usuario
│   ├── transaction.py       # Transacciones
│   └── payment_method.py    # Métodos de pago
├── services/
│   ├── interledger_service.py   # Cliente OP/Interledger
│   ├── payment_processor.py     # Procesar pagos
│   └── wallet_service.py        # Gestión de wallets
├── adapters/
│   └── open_payments_adapter.py # Conexión con Node.js
├── repositories/
├── views/
├── templates/payments/
│   ├── wallet.html
│   └── transaction_history.html
└── urls.py
```

**Propósito**: Todo lo relacionado con pagos descentralizados

---

### events/ - Gestión de Eventos

```
apps/events/
├── models/
│   ├── event.py             # Evento principal
│   ├── participant.py       # Participantes
│   └── contribution.py      # Aportaciones
├── services/
│   ├── event_service.py         # Crear/gestionar eventos
│   ├── invitation_service.py    # Invitaciones
│   └── contribution_service.py  # Gestionar pagos
├── repositories/
├── views/
│   ├── event_views.py
│   └── participant_views.py
├── templates/events/
│   ├── dashboard.html
│   ├── create.html
│   ├── detail.html
│   └── list.html
└── urls.py
```

**Propósito**: Lógica de eventos y participación

---

### notifications/ - Notificaciones

```
apps/notifications/
├── models/
├── services/
│   ├── email_service.py
│   └── notification_service.py
└── templates/emails/
    ├── invitation.html
    └── payment_received.html
```

**Propósito**: Emails y sistema de notificaciones

---

## 🏗️ Infrastructure

### Microservicio Node.js

```
infrastructure/external_services/node_microservice/
├── package.json             # Dependencias (@interledger/open-payments)
├── index.js                 # Servidor Express/Fastify
├── services/
│   └── open-payments.js     # Lógica de OP
├── routes/
│   └── payments.js          # API REST endpoints
├── .env                     # Credenciales (NO en git)
└── private.key              # Clave privada (NO en git)
```

**Endpoints**:
- `POST /api/payments/create-grant`
- `POST /api/payments/create-incoming`
- `POST /api/payments/create-quote`
- `POST /api/payments/create-outgoing`
- `GET /api/payments/status/:id`

---

## 🎨 Frontend

### Static Files

```
static/
├── css/
│   ├── base.css             # Estilos globales
│   ├── components.css       # Componentes UI
│   ├── home.css
│   ├── events.css
│   └── payments.css
├── js/
│   ├── main.js              # JS global
│   ├── events.js
│   ├── payments.js
│   └── interledger-client.js
└── images/
    ├── logo.png
    └── icons/
```

### Templates

```
templates/
├── base.html                # Template padre
├── components/
│   ├── navbar.html
│   ├── footer.html
│   └── card.html
└── errors/
    ├── 404.html
    └── 500.html
```

---

## 🗂️ ¿Dónde va cada cosa?

| Tipo de archivo | Ubicación |
|-----------------|-----------|
| HTML global | `templates/` |
| HTML por app | `apps/<app>/templates/<app>/` |
| CSS | `static/css/` |
| JavaScript | `static/js/` |
| Imágenes fijas | `static/images/` |
| Uploads usuario | `media/uploads/` |
| Models | `apps/<app>/models/` |
| Lógica negocio | `apps/<app>/services/` |
| Views | `apps/<app>/views/` |
| Forms | `apps/<app>/forms/` |
| Config Django | `config/settings/` |
| Node.js OP | `infrastructure/external_services/node_microservice/` |

---

## 🔗 Ver también

- [[DREAM-INTER]]
- [[DREAM-INTER-Interledger]]
- [[DREAM-INTER-User-Journey]]

---

**Documentación completa**: `DREAM-INTER/ARCHITECTURE.md`
