# DREAM-INTER

> Plataforma de pagos descentralizados para eventos entre amigos usando Django + Interledger

## 📋 Información del Proyecto

- **Repositorio**: [alejandrovazquezdev/DREAM-INTER](https://github.com/alejandrovazquezdev/DREAM-INTER)
- **Rama actual**: `arquitectura`
- **Estado**: ✅ **MVP funcional** (20% completo)
- **Stack**: Python 3.12 + Django + Node.js 22 (Open Payments)
- **MVP**: [06-MVP-ROADMAP.md](06-MVP-ROADMAP.md) - Estrategia de escalado completa

---

## 🎯 Objetivo

Crear una aplicación web que permita **financiar eventos entre amigos** de forma descentralizada usando **Open Payments/Interledger**.

### Caso de Uso Principal (Idea 1)
- Usuario crea evento (ej: "Cena en restaurante - $500")
- Invita amigos por email/link
- Cada amigo paga su parte vía Interledger
- El organizador recibe los fondos

### Futuras Expansiones
- **Idea 2**: Pagos microtransfronterizos para freelancers
- **Idea 3**: Marketplace intermediario con seguridad (tipo Uber)

---

## 🏗️ Arquitectura

### Tipo
**Layered Architecture + Domain-Driven Design (DDD) Simplificado**
- También conocido como: Modular Monolith with Separation of Concerns

### Comparación con MVC
Es una **evolución de MVC** con más capas de separación:
- **Model** → Entidades (qué es)
- **Template** → Presentación (cómo se ve)
- **View** → Controller (recibe request)
- **Service** → Lógica de negocio (qué hace) ← EXTRA
- **Repository** → Acceso a datos (cómo se guarda) ← EXTRA
- **Adapter** → Servicios externos (Interledger) ← EXTRA

### Capas

```
┌─────────────────────────────────────────┐
│  PRESENTATION LAYER                     │  ← Views, Templates, Forms
│  (Interface de Usuario)                 │
├─────────────────────────────────────────┤
│  APPLICATION LAYER                      │  ← Services (Lógica de negocio)
│  (Casos de Uso)                         │
├─────────────────────────────────────────┤
│  DOMAIN LAYER                           │  ← Models, Business Logic
│  (Modelos de Dominio)                   │
├─────────────────────────────────────────┤
│  INFRASTRUCTURE LAYER                   │  ← Repositories, Adapters, DB
│  (Persistencia y Servicios)             │
└─────────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

Ver detalles completos en: [02-STRUCTURE.md](02-STRUCTURE.md)

```
DREAM-INTER/
├── config/                 # Configuración Django
├── apps/                   # Aplicaciones modulares
│   ├── core/              # Base del sistema
│   ├── accounts/          # Usuarios y autenticación
│   ├── public/            # Landing y páginas públicas
│   ├── payments/          # Integración Interledger
│   ├── events/            # Gestión de eventos
│   └── notifications/     # Emails y notificaciones
├── infrastructure/        # Servicios externos
│   └── external_services/
│       └── node_microservice/  # Open Payments API
├── static/                # CSS, JS, imágenes
├── templates/             # HTML globales
├── tests/                 # Tests (vacío por ahora)
└── docs/                  # Documentación
```

---

## 🛠️ Stack Tecnológico

### Backend
- **Python 3.12**
- **Django** (web framework)
- **PostgreSQL / SQLite** (base de datos)

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript** (vanilla, sin frameworks por ahora)

### Pagos
- **Node.js 22**
- **@interledger/open-payments** (SDK oficial)
- Microservicio REST para comunicación con Django

### Herramientas
- **mise** - Gestión de versiones (Python, Node)
- **Git** - Control de versiones
- **Docker** - Para después (no ahora)

---

## 🔄 Flujo de una Request

```
1. Usuario → http://localhost:8000/events/create/
   ↓
2. config/urls.py → apps/events/urls.py
   ↓
3. EventView (Presentation Layer)
   - Valida formulario
   - Llama a EventService
   ↓
4. EventService (Application Layer)
   - Valida reglas de negocio
   - Llama a EventRepository
   ↓
5. EventRepository (Infrastructure Layer)
   - Guarda en BD usando Model
   ↓
6. Event Model (Domain Layer)
   - Representa el evento
   ↓
7. NotificationService
   - Envía invitaciones
   ↓
8. Response → Usuario ve evento creado
```

---

## 🚀 Navegación de Usuario

Ver detalles en: [05-USER-JOURNEY.md](05-USER-JOURNEY.md)

```
HOME (/) 
├── No logueado
│   ├── Ver info
│   ├── [Login] → /accounts/login/
│   └── [Registro] → /accounts/signup/
└── Logueado
    ├── Dashboard → /events/dashboard/
    ├── [Crear Evento] → /events/create/
    └── [Mis Eventos] → /events/my-events/
```

---

## 💰 Integración con Interledger

Ver detalles en: [04-INTERLEDGER.md](04-INTERLEDGER.md)

### Arquitectura de Pagos

```
Django (apps/payments/)
   ↓ HTTP Request
Node.js Microservice (infrastructure/external_services/node_microservice/)
   ↓ @interledger/open-payments
Interledger Network
```

### ¿Por qué microservicio Node?
- SDK oficial de Open Payments solo en Node.js
- Django se comunica vía REST API
- Separación de responsabilidades
- Reutiliza código de [[OPtutorial]]

---

## 📚 Referencias

- Proyecto base Node.js: [[OPtutorial]]
- Arquitectura Flask: [[Flask-Layered-Template]]
- Documentación completa: `DREAM-INTER/ARCHITECTURE.md`
- Guía de ubicación: `DREAM-INTER/docs/WHERE_THINGS_GO.md`

---

## ✅ Estado Actual

### MVP Funcional ✅
- [x] Arquitectura definida
- [x] Estructura de directorios creada
- [x] Documentación base
- [x] Configuración (.gitignore, .mise.toml, .env.example)
- [x] **Microservicio Node implementado y probado** ✅
- [x] **Frontend de prueba funcional** ✅
- [x] **Integración Open Payments funcionando** ✅
- [x] **Pagos Interledger ejecutándose** ✅

### Próxima Fase (Persistencia)
- [ ] Django configurado (django-admin startproject)
- [ ] Base de datos SQLite
- [ ] Modelo Transaction
- [ ] Django Admin básico
- [ ] Templates HTML base

**Ver roadmap completo**: [06-MVP-ROADMAP.md](06-MVP-ROADMAP.md)

---

## 🔗 Links Relacionados

- [06-MVP-ROADMAP.md](06-MVP-ROADMAP.md) - Estado del MVP y estrategia de escalado
- [02-STRUCTURE.md](02-STRUCTURE.md) - Desglose de carpetas
- [03-SETUP.md](03-SETUP.md) - Guía de instalación
- [04-INTERLEDGER.md](04-INTERLEDGER.md) - Integración con Interledger
- [[Interledger]]
- [[Open Payments]]
- [[Django]]
- [[Layered Architecture]]
- [[DDD (Domain-Driven Design)]]
- [[mise]]

---

**Última actualización**: 5 de noviembre de 2025
**Rama**: arquitectura
**Versión MVP**: 0.1.0 ✅
**Siguiente paso**: Inicializar Django para persistencia
