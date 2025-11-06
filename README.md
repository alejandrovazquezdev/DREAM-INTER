# 💸 DREAM-INTER

> Plataforma de pagos descentralizados para eventos entre amigos usando Django + Interledger

[![Python](https://img.shields.io/badge/Python-3.12-blue.svg)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-5.0-green.svg)](https://www.djangoproject.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22-green.svg)](https://nodejs.org/)
[![MVP](https://img.shields.io/badge/MVP-Funcional-success.svg)](docs/06-MVP-ROADMAP.md)

---

## 🎯 ¿Qué es DREAM-INTER?

DREAM-INTER facilita **pagos entre amigos para eventos** de forma descentralizada usando la red **Interledger**.

### Caso de Uso Principal
```
1. Usuario crea evento: "Cena en restaurante - $500"
2. Invita amigos por email/link
3. Cada amigo paga su parte vía Interledger
4. El organizador recibe los fondos automáticamente
```

---

## ✨ Estado Actual: MVP Funcional ✅

**Versión**: 0.1.0 (MVP - 20% completo)  
**Rama**: `arquitectura`

### ✅ Componentes Funcionando

- **Microservicio Node.js** con Open Payments SDK
- **Frontend de prueba** (HTML/CSS/JS)
- **Integración Interledger** completa y probada
- **Arquitectura escalable** definida

### 📊 Próximos Pasos

Ver roadmap completo en: **[docs/06-MVP-ROADMAP.md](docs/06-MVP-ROADMAP.md)**

---

## 🚀 Inicio Rápido

### Prerequisitos

- [mise](https://mise.jdx.dev/) (gestor de versiones)
- Git

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/alejandrovazquezdev/DREAM-INTER.git
cd DREAM-INTER

# 2. Instalar herramientas (Python 3.12, Node.js 22)
mise install

# 3. Configurar entorno Python
mise run setup

# 4. Instalar dependencias Node
mise run setup-node

# 5. Configurar variables de entorno
cp infrastructure/external_services/node_microservice/.env.example \
   infrastructure/external_services/node_microservice/.env

# Editar .env con tus credenciales de Interledger
```

### Ejecutar el MVP

```bash
# Terminal 1: Iniciar microservicio de pagos
mise run node-service

# Terminal 2: Abrir frontend de prueba
# Abrir: static/test-frontend/index.html
```

📖 **Guía completa**: [docs/03-SETUP.md](docs/03-SETUP.md)

---

## 📚 Documentación

Toda la documentación está en **[`docs/`](docs/)**

### Documentos Principales

| Documento | Descripción |
|-----------|-------------|
| **[00-INDEX.md](docs/00-INDEX.md)** | 📖 Índice general de documentación |
| **[01-OVERVIEW.md](docs/01-OVERVIEW.md)** | 🎯 Vista general del proyecto |
| **[02-STRUCTURE.md](docs/02-STRUCTURE.md)** | 📁 Estructura de carpetas |
| **[03-SETUP.md](docs/03-SETUP.md)** | 🔧 Guía de instalación |
| **[04-INTERLEDGER.md](docs/04-INTERLEDGER.md)** | 💰 Integración con Interledger |
| **[05-USER-JOURNEY.md](docs/05-USER-JOURNEY.md)** | 🚶 Flujos de usuario |
| **[06-MVP-ROADMAP.md](docs/06-MVP-ROADMAP.md)** | 📈 MVP y roadmap de desarrollo |

🚀 **Empieza aquí**: [docs/README.md](docs/README.md)

---

## 🏗️ Arquitectura

**Patrón**: Layered Architecture + Domain-Driven Design (DDD) Simplificado

```
┌─────────────────────────────────────────┐
│  PRESENTATION LAYER                     │  ← Templates, Forms, Views
│  (Interface de Usuario)                 │
├─────────────────────────────────────────┤
│  APPLICATION LAYER                      │  ← Services, Use Cases
│  (Lógica de Negocio)                    │
├─────────────────────────────────────────┤
│  DOMAIN LAYER                           │  ← Models, Business Rules
│  (Modelos de Dominio)                   │
├─────────────────────────────────────────┤
│  INFRASTRUCTURE LAYER                   │  ← DB, Cache, External APIs
│  (Persistencia y Servicios Externos)    │
└─────────────────────────────────────────┘
```

### Estructura del Proyecto

```
DREAM-INTER/
├── apps/                       # Aplicaciones Django
│   ├── accounts/              # Usuarios y autenticación
│   ├── events/                # Gestión de eventos
│   ├── payments/              # Integración de pagos
│   └── notifications/         # Sistema de notificaciones
├── infrastructure/            # Capa de infraestructura
│   └── external_services/
│       └── node_microservice/ # ✅ Microservicio Interledger
├── static/                    # CSS, JS, imágenes
│   └── test-frontend/         # ✅ Frontend de prueba MVP
├── templates/                 # Templates Django
├── docs/                      # 📚 Documentación completa
└── config/                    # Configuración Django
```

📖 **Detalles**: [docs/02-STRUCTURE.md](docs/02-STRUCTURE.md)

---

## 🛠️ Stack Tecnológico

### Backend
- **Python 3.12** - Lenguaje principal
- **Django 5.0** - Framework web
- **Django REST Framework** - API REST
- **PostgreSQL** / SQLite - Base de datos

### Frontend
- **HTML5 + CSS3** - UI
- **JavaScript** - Interactividad
- *(Futuro: React/Vue)*

### Pagos
- **Node.js 22** - Microservicio de pagos
- **@interledger/open-payments** - SDK oficial
- **Express.js** - API REST

### DevOps
- **mise** - Gestor de versiones
- **Git** - Control de versiones
- **pytest** - Testing

---

## 🧪 Testing

```bash
# Verificar salud del microservicio
curl http://localhost:3000/health

# Consultar wallet
curl http://localhost:3000/api/wallet/YOUR_WALLET_ADDRESS

# Ejecutar tests (futuro)
mise run test
```

📖 **Guía de testing**: [docs/04-INTERLEDGER.md](docs/04-INTERLEDGER.md)

---

## 🗓️ Roadmap

### ✅ Fase 1: MVP Base (Completado)
- Microservicio Node con Interledger
- Frontend de prueba
- Arquitectura definida

### ⏳ Fase 2: Persistencia Básica (En progreso)
- Inicializar Django
- Base de datos SQLite
- Modelo Transaction
- Django Admin básico

### 📋 Fases Futuras
- Fase 3: Sistema de usuarios
- Fase 4: Gestión de eventos
- Fase 5: División de gastos
- Fase 6: API REST completa
- ...hasta Fase 10

📈 **Roadmap completo**: [docs/06-MVP-ROADMAP.md](docs/06-MVP-ROADMAP.md)

---

## 🤝 Contribuir

### Workflow de Desarrollo

```bash
# 1. Crear rama desde arquitectura
git checkout -b feature/nombre-feature arquitectura

# 2. Hacer cambios
# ...

# 3. Commit
git add .
git commit -m "feat: descripción del cambio"

# 4. Push
git push origin feature/nombre-feature

# 5. Crear Pull Request a 'arquitectura'
```

### Convenciones

- **Commits**: Seguir [Conventional Commits](https://www.conventionalcommits.org/)
- **Código**: PEP 8 para Python, ESLint para JavaScript
- **Documentación**: Actualizar `docs/` con cada cambio arquitectónico

---

## 📄 Licencia

Este proyecto es privado y propiedad de [alejandrovazquezdev](https://github.com/alejandrovazquezdev).

---

## 🔗 Enlaces

- **Documentación completa**: [docs/](docs/)
- **Interledger**: https://interledger.org/
- **Open Payments**: https://openpayments.guide/
- **Django**: https://www.djangoproject.com/
- **mise**: https://mise.jdx.dev/

---

## 📞 Contacto

**Repositorio**: [alejandrovazquezdev/DREAM-INTER](https://github.com/alejandrovazquezdev/DREAM-INTER)  
**Rama principal**: `main` (arquitectura base)  
**Rama de desarrollo**: `arquitectura`

---

<p align="center">
  <strong>Construido con ❤️ usando Django + Interledger</strong>
</p>
