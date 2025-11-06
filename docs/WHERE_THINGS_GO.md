# 🗺️ Guía de Ubicación - ¿Dónde va cada cosa?

## Para encontrar rápido lo que necesitas

### 🎨 Estoy trabajando en el diseño visual

#### ¿Tengo HTML?
```
templates/                           # HTML compartido (navbar, footer)
apps/<nombre-app>/templates/         # HTML específico de una funcionalidad
```

**Ejemplos:**
- Landing page → `apps/public/templates/public/home.html`
- Login → `apps/accounts/templates/accounts/login.html`
- Crear evento → `apps/events/templates/events/create.html`

#### ¿Tengo CSS?
```
static/css/                          # Todos los archivos .css
```

**Ejemplos:**
- `static/css/base.css` - Estilos globales
- `static/css/events.css` - Estilos de eventos
- `static/css/components.css` - Botones, forms, cards

#### ¿Tengo JavaScript?
```
static/js/                           # Todos los archivos .js
```

**Ejemplos:**
- `static/js/main.js` - JS global
- `static/js/events.js` - Lógica de eventos
- `static/js/interledger-client.js` - Cliente para pagos

#### ¿Tengo imágenes/logos?
```
static/images/                       # Imágenes fijas (logos, iconos)
media/uploads/                       # Imágenes subidas por usuarios
```

---

### 💻 Estoy programando funcionalidad

#### ¿Es una página/vista nueva?
```
apps/<nombre-app>/views/             # Controladores (reciben requests)
```

**Ejemplo:**
- Vista para crear evento → `apps/events/views/event_views.py`

#### ¿Es lógica de negocio?
```
apps/<nombre-app>/services/          # Lógica compleja aquí
```

**Ejemplo:**
- Procesar pago → `apps/payments/services/payment_processor.py`

#### ¿Es un formulario?
```
apps/<nombre-app>/forms/             # Forms de Django
```

**Ejemplo:**
- Form de crear evento → `apps/events/forms/event_forms.py`

#### ¿Es una base de datos/tabla?
```
apps/<nombre-app>/models/            # Modelos (tablas)
```

**Ejemplo:**
- Tabla de eventos → `apps/events/models/event.py`
- Tabla de usuarios → `apps/accounts/models/user.py`

---

### 🔗 Estoy integrando Interledger/Open Payments

#### Código Node.js (microservicio)
```
infrastructure/external_services/node_microservice/
```

**Archivos principales:**
- `package.json` - Dependencias Node
- `index.js` - Servidor API
- `services/open-payments.js` - Lógica de OP
- `.env` - Credenciales (NO subir a git)
- `private.key` - Tu clave privada (NO subir a git)

#### Código Python (adapter para llamar al microservicio)
```
apps/payments/adapters/open_payments_adapter.py
```

---

### ⚙️ Configuración del proyecto

#### Variables de entorno
```
.env                                 # Tu archivo local (git lo ignora)
.env.example                         # Template para otros devs
```

#### Configuración Django
```
config/settings/
├── base.py                          # Config compartida
├── development.py                   # Dev local
├── staging.py                       # Pre-prod
└── production.py                    # Producción
```

#### Dependencias Python
```
requirements/
├── base.txt                         # Comunes a todos
├── development.txt                  # Solo dev
└── production.txt                   # Solo prod
```

---

### 🧪 Estoy escribiendo tests

```
tests/
├── unit/                            # Tests unitarios
├── integration/                     # Tests de integración
└── e2e/                            # Tests end-to-end
```

---

### 📝 Estoy documentando

```
docs/                                # Documentación del proyecto
```

---

## Flujos Comunes

### "Quiero agregar una nueva pantalla"

1. **HTML** → `apps/<app>/templates/<app>/mi-pagina.html`
2. **CSS** → `static/css/mi-pagina.css`
3. **JS** → `static/js/mi-pagina.js`
4. **View** → `apps/<app>/views/mi_vista.py`
5. **URL** → `apps/<app>/urls.py`

### "Quiero agregar funcionalidad de pagos"

1. **Lógica** → `apps/payments/services/`
2. **Adapter** → `apps/payments/adapters/open_payments_adapter.py`
3. **Microservicio** → `infrastructure/external_services/node_microservice/`

### "Quiero crear una nueva tabla en la BD"

1. **Model** → `apps/<app>/models/mi_modelo.py`
2. **Migration** → `python manage.py makemigrations`
3. **Aplicar** → `python manage.py migrate`

---

## Regla de Oro

**Si no sabes dónde va algo, busca por RESPONSABILIDAD:**

- ¿Es visual? → `templates/` o `static/`
- ¿Es lógica de negocio? → `services/`
- ¿Es datos? → `models/`
- ¿Es comunicación externa? → `adapters/` o `infrastructure/`
- ¿Es una pantalla? → `views/` + `templates/`
