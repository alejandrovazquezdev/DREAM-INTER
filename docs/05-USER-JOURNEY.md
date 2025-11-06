# DREAM-INTER - User Journey

> Flujo de navegación y experiencia de usuario

← Volver a [[DREAM-INTER]]

---

## 🎭 Tipos de Usuario

1. **Visitante** - No registrado
2. **Usuario Registrado** - Con cuenta
3. **Organizador** - Crea eventos
4. **Participante** - Invitado a eventos

---

## 🗺️ Mapa de Navegación

```
┌─────────────────────────────────────────────────┐
│  HOME (/)                                       │
│  Landing page                                   │
└──────────┬──────────────────────┬───────────────┘
           │                      │
    Usuario NO logueado    Usuario LOGUEADO
           │                      │
           ↓                      ↓
    ┌──────────────┐      ┌──────────────────┐
    │ /auth/login/ │      │ /events/         │
    │ /auth/signup/│      │ dashboard/       │
    └──────────────┘      └──────────────────┘
```

---

## 📍 Rutas Principales

### Públicas (sin login)

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/` | home.html | Landing page |
| `/about/` | about.html | Acerca de |
| `/how-it-works/` | how_it_works.html | Cómo funciona |
| `/auth/login/` | login.html | Iniciar sesión |
| `/auth/signup/` | signup.html | Registrarse |

### Protegidas (requieren login)

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/events/dashboard/` | dashboard.html | Panel principal |
| `/events/create/` | create.html | Crear evento |
| `/events/<id>/` | detail.html | Ver evento |
| `/events/<id>/pay/` | payment.html | Pagar contribución |
| `/events/my-events/` | list.html | Mis eventos |
| `/payments/wallet/` | wallet.html | Mi billetera |
| `/payments/history/` | history.html | Historial de pagos |
| `/accounts/profile/` | profile.html | Mi perfil |

---

## 🚶 Flujo: Visitante → Usuario

### 1. Llega al sitio

```
GET /
→ apps/public/views/home_views.py
→ templates/public/home.html
```

**Ve:**
- Descripción del servicio
- Beneficios
- Botones: [Iniciar Sesión] [Registrarse]

### 2. Se registra

```
GET /auth/signup/
→ apps/accounts/views/auth_views.py → SignupView
→ templates/accounts/signup.html
```

**Formulario:**
- Nombre
- Email
- Password
- Wallet Address (Interledger)

```
POST /auth/signup/
→ AuthService.create_user()
→ Crear User + Wallet
→ Email de bienvenida
→ Redirect a /events/dashboard/
```

### 3. Ve dashboard

```
GET /events/dashboard/
→ apps/events/views/event_views.py → DashboardView
→ templates/events/dashboard.html
```

**Ve:**
- "Aún no tienes eventos"
- [Crear mi primer evento]

---

## 👨‍💼 Flujo: Crear Evento (Organizador)

### 1. Clic en "Crear Evento"

```
GET /events/create/
→ apps/events/views/event_views.py → CreateEventView
→ templates/events/create.html
```

**Formulario:**
- Nombre del evento
- Descripción
- Monto total
- Cantidad de participantes
- Fecha del evento
- Lista de emails a invitar

### 2. Envía formulario

```
POST /events/create/
→ EventService.create_event()
  → Crear Event en BD
  → InvitationService.send_invitations()
  → Email a cada participante
→ Redirect a /events/<id>/
```

### 3. Ve evento creado

```
GET /events/123/
→ templates/events/detail.html
```

**Ve:**
- Detalles del evento
- Lista de participantes
- Estado de cada pago (pendiente/pagado)
- Link para compartir

---

## 👥 Flujo: Participar en Evento (Invitado)

### 1. Recibe email de invitación

**Email contiene:**
- Detalles del evento
- Monto a pagar
- Link: `/events/123/join/?token=abc123`

### 2. Hace clic en el link

```
GET /events/123/join/?token=abc123
→ EventService.validate_invitation_token()
→ Si no tiene cuenta → /auth/signup/?next=/events/123/
→ Si ya tiene cuenta → /events/123/
```

### 3. Ve detalle del evento

```
GET /events/123/
→ templates/events/detail.html
```

**Ve:**
- Info del evento
- Monto a pagar: $100
- [Pagar mi parte] (botón destacado)

### 4. Hace clic en "Pagar mi parte"

```
GET /events/123/pay/
→ templates/events/payment.html
```

**Ve:**
- Resumen del pago
- Wallet destino (organizador)
- Monto: $100
- [Confirmar Pago]

### 5. Confirma pago

```
POST /events/123/pay/
→ PaymentProcessor.process_contribution()
  → OpenPaymentsAdapter.create_payment()
    → Node microservice
    → Interledger payment
  → Transaction guardada en BD
  → Event.mark_user_paid(user)
  → NotificationService.notify_organizer()
→ Redirect a /events/123/?success=true
```

### 6. Ve confirmación

**Mensaje:**
"✅ ¡Pago exitoso! Has contribuido $100 al evento"

---

## 💰 Flujo: Ver Pagos

### Mi Billetera

```
GET /payments/wallet/
→ apps/payments/views/payment_views.py → WalletView
→ templates/payments/wallet.html
```

**Ve:**
- Wallet address
- Balance actual (si disponible)
- Link a Interledger testnet
- [Configurar wallet]

### Historial

```
GET /payments/history/
→ templates/payments/transaction_history.html
```

**Ve tabla:**
- Fecha
- Tipo (enviado/recibido)
- Monto
- Destinatario/Remitente
- Evento relacionado
- Estado

---

## 🔄 Configuración de Redirects

### settings/base.py

```python
# Después de login exitoso
LOGIN_REDIRECT_URL = '/events/dashboard/'

# Si intenta acceder a protegido sin login
LOGIN_URL = '/auth/login/'

# Después de logout
LOGOUT_REDIRECT_URL = '/'
```

---

## 🎨 Componentes UI Reutilizables

### Navbar (templates/components/navbar.html)

**Usuario NO logueado:**
- Logo
- [Cómo funciona]
- [Iniciar Sesión]
- [Registrarse]

**Usuario logueado:**
- Logo
- [Mis Eventos]
- [Crear Evento]
- [Mi Billetera]
- Dropdown: [Mi Perfil] [Cerrar Sesión]

### Event Card (templates/components/event-card.html)

- Título del evento
- Fecha
- Participantes: 3/5 pagados
- Monto: $500 total
- Estado: Pendiente/Completo
- [Ver detalles]

---

## 📱 Estados de Evento

### Para Organizador

- **Creado**: Invitaciones enviadas
- **Parcial**: Algunos han pagado
- **Completo**: Todos pagaron
- **Cerrado**: Evento finalizado

### Para Participante

- **Invitado**: Pendiente de pagar
- **Pagado**: Contribución realizada
- **Declinado**: Rechazó invitación

---

## 🔗 Ver también

- [[DREAM-INTER]]
- [[DREAM-INTER-Estructura]]
- [[DREAM-INTER-Interledger]]

---

**Última actualización**: 5 de noviembre de 2025
