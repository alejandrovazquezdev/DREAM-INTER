# Arquitectura DREAM-INTER

## Guía Rápida de Ubicación de Archivos

### 📁 HTML - ¿Dónde van?

#### Templates Globales
```
templates/
├── base.html                    # ← Template base (navbar, footer, estructura común)
├── components/
│   ├── navbar.html              # ← Barra de navegación reutilizable
│   ├── footer.html              # ← Footer reutilizable
│   └── card.html                # ← Componentes UI reutilizables
└── errors/
    ├── 404.html                 # ← Página no encontrada
    └── 500.html                 # ← Error del servidor
```

#### Templates por App
```
apps/public/templates/public/
├── home.html                    # ← Página principal (landing)
├── about.html                   # ← Acerca de
└── how_it_works.html            # ← Cómo funciona

apps/accounts/templates/accounts/
├── login.html                   # ← Formulario de login
├── signup.html                  # ← Formulario de registro
└── profile.html                 # ← Perfil de usuario

apps/events/templates/events/
├── dashboard.html               # ← Dashboard de eventos del usuario
├── create.html                  # ← Crear nuevo evento
├── detail.html                  # ← Ver detalle de evento
└── list.html                    # ← Lista de eventos

apps/payments/templates/payments/
├── wallet.html                  # ← Mi billetera
└── transaction_history.html     # ← Historial de pagos
```

---

### 🎨 CSS - ¿Dónde van?

```
static/css/
├── base.css                     # ← Estilos globales (reset, variables, tipografía)
├── components.css               # ← Estilos de componentes reutilizables
├── home.css                     # ← Estilos específicos del home
├── events.css                   # ← Estilos para módulo de eventos
└── payments.css                 # ← Estilos para módulo de pagos
```

**Cómo usar en templates:**
```html
<!-- En base.html -->
<link rel="stylesheet" href="{% static 'css/base.css' %}">

<!-- En eventos específicos -->
{% block extra_css %}
<link rel="stylesheet" href="{% static 'css/events.css' %}">
{% endblock %}
```

---

### 📜 JavaScript - ¿Dónde van?

```
static/js/
├── main.js                      # ← JS global (menú móvil, etc)
├── events.js                    # ← Lógica de eventos
├── payments.js                  # ← Lógica de pagos
└── interledger-client.js        # ← Cliente para comunicarse con microservicio Node
```

---

### 💰 Interledger/Open Payments - ¿Dónde va?

```
infrastructure/external_services/node_microservice/
├── package.json                 # ← Dependencias Node (@interledger/open-payments)
├── index.js                     # ← Microservicio Express/Fastify
├── services/
│   └── open-payments.js         # ← Lógica de OP (similar a OPtutorial)
├── routes/
│   └── payments.js              # ← Endpoints API REST
└── .env                         # ← Credenciales Interledger (private.key, etc)
```

**Flujo:**
```
Django (payments app) 
   → llama vía HTTP → 
Node Microservice 
   → usa @interledger/open-payments → 
Interledger Network
```

---

### 🐍 Python/Django - Lógica de Negocio

```
apps/payments/
├── models/
│   ├── wallet.py                # ← Model: Billetera del usuario
│   └── transaction.py           # ← Model: Transacciones
├── services/
│   └── payment_processor.py     # ← Service: Procesar pagos
├── adapters/
│   └── open_payments_adapter.py # ← Adapter: Llamadas al microservicio Node
└── views/
    └── payment_views.py         # ← Views: Controladores de pagos
```

---

### 📦 Archivos Subidos por Usuarios

```
media/uploads/
├── profiles/                    # ← Fotos de perfil
├── events/                      # ← Imágenes de eventos
└── documents/                   # ← Documentos varios
```

---

## Flujo Completo de una Pantalla

### Ejemplo: Crear Evento

1. **Usuario accede:** `http://localhost:8000/events/create/`

2. **URL routing:**
   ```
   config/urls.py 
     → apps/events/urls.py 
     → CreateEventView
   ```

3. **View procesa:**
   ```python
   # apps/events/views/event_views.py
   class CreateEventView:
       - Renderiza formulario (GET)
       - Procesa datos (POST)
       - Llama a EventService
   ```

4. **Service ejecuta lógica:**
   ```python
   # apps/events/services/event_service.py
   EventService.create_event()
       - Valida datos
       - Crea evento en BD
       - Envía notificaciones
   ```

5. **Template muestra:**
   ```html
   <!-- apps/events/templates/events/create.html -->
   {% extends 'base.html' %}
   <link rel="stylesheet" href="{% static 'css/events.css' %}">
   <script src="{% static 'js/events.js' %}"></script>
   ```

---

## Capas de la Arquitectura

```
┌─────────────────────────────────────────┐
│  TEMPLATES (HTML)                       │  ← Lo que ve el usuario
│  static/ (CSS, JS, imágenes)            │
├─────────────────────────────────────────┤
│  VIEWS (Controladores)                  │  ← Reciben requests
│  apps/*/views/                          │
├─────────────────────────────────────────┤
│  SERVICES (Lógica de negocio)           │  ← Qué hace la app
│  apps/*/services/                       │
├─────────────────────────────────────────┤
│  MODELS (Entidades)                     │  ← Qué datos existen
│  apps/*/models/                         │
├─────────────────────────────────────────┤
│  REPOSITORIES (Acceso a datos)          │  ← Cómo se guardan
│  apps/*/repositories/                   │
├─────────────────────────────────────────┤
│  ADAPTERS (Servicios externos)          │  ← Interledger, APIs
│  apps/*/adapters/                       │
│  infrastructure/external_services/      │
└─────────────────────────────────────────┘
```

---

## Tecnologías por Capa

| Capa | Tecnología | Ubicación |
|------|-----------|-----------|
| Frontend | HTML, CSS, JS | `templates/`, `static/` |
| Backend | Python, Django | `apps/*/` |
| Base de datos | PostgreSQL/SQLite | Configurado en `config/settings/` |
| Pagos | Node.js + Open Payments | `infrastructure/external_services/node_microservice/` |
| Cache | Redis (opcional) | `infrastructure/cache/` |

---

## Próximos Pasos

1. ✅ Estructura creada
2. ⏳ Configurar Django (`manage.py`, settings)
3. ⏳ Crear modelos básicos
4. ⏳ Implementar templates base
5. ⏳ Configurar microservicio Node
6. ⏳ Integrar Open Payments
