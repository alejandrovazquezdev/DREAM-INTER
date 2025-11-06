# 📚 DREAM-INTER - Índice de Documentación

> Plataforma de pagos descentralizados para eventos entre amigos usando Django + Interledger

---

## 📖 Guía de Lectura

### Para empezar desde cero:
1. [01-OVERVIEW.md](01-OVERVIEW.md) - Lee primero para entender el proyecto completo
2. [02-STRUCTURE.md](02-STRUCTURE.md) - Comprende la organización de carpetas
3. [03-SETUP.md](03-SETUP.md) - Instala y configura el entorno

### Para trabajar en el proyecto:
4. [04-INTERLEDGER.md](04-INTERLEDGER.md) - Entiende cómo funciona la integración con pagos
5. [05-USER-JOURNEY.md](05-USER-JOURNEY.md) - Flujos de usuario y navegación
6. [06-MVP-ROADMAP.md](06-MVP-ROADMAP.md) - Estado actual y roadmap de desarrollo

---

## 📑 Documentos

### 01 - Vista General
**[01-OVERVIEW.md](01-OVERVIEW.md)**
- 🎯 Objetivo del proyecto
- 🏗️ Arquitectura (Layered + DDD)
- 📁 Estructura de carpetas
- 🛠️ Stack tecnológico
- 🔄 Flujo de requests
- ✅ Estado actual

### 02 - Estructura de Carpetas
**[02-STRUCTURE.md](02-STRUCTURE.md)**
- 📂 Desglose detallado de cada directorio
- 🗂️ Ubicación de cada tipo de archivo
- 📝 Explicación de la organización
- 🎯 Dónde va cada cosa

### 03 - Setup e Instalación
**[03-SETUP.md](03-SETUP.md)**
- 🔧 Instalación de mise
- 🐍 Configuración de Python
- 📦 Instalación de dependencias
- ⚙️ Configuración del entorno virtual
- 🚀 Comandos para iniciar el proyecto
- 🖥️ Diferencias Windows/Linux

### 04 - Integración Interledger
**[04-INTERLEDGER.md](04-INTERLEDGER.md)**
- 💰 ¿Qué es Interledger?
- 🔌 Arquitectura del microservicio Node.js
- 📡 API REST del microservicio
- 🔗 Comunicación Django ↔ Node
- 🔑 Configuración de credenciales
- 🧪 Testing del sistema de pagos

### 05 - User Journey
**[05-USER-JOURNEY.md](05-USER-JOURNEY.md)**
- 🚶 Flujos de usuario
- 🗺️ Navegación de la app
- 📄 Páginas y vistas
- 🔀 Decisiones de usuario
- 📱 Interfaces planeadas

### 06 - MVP y Roadmap
**[06-MVP-ROADMAP.md](06-MVP-ROADMAP.md)**
- ✅ Estado del MVP actual (20% completo)
- 📦 Componentes funcionales
- 🗓️ Roadmap de 10 fases
- 📈 Estrategia de escalado
- 📊 Métricas de éxito
- 🎯 Próximos pasos

---

## 🔍 Navegación Rápida

### Por Tema:

**Arquitectura y Diseño:**
- [[01-DREAM-INTER#🏗️ Arquitectura]]
- [02-STRUCTURE.md](02-STRUCTURE.md)

**Setup y Configuración:**
- [03-SETUP.md](03-SETUP.md)
- [[01-DREAM-INTER#🛠️ Stack Tecnológico]]

**Pagos e Interledger:**
- [04-INTERLEDGER.md](04-INTERLEDGER.md)
- [[06-DREAM-INTER-MVP#1. Microservicio Node.js ✅]]

**Desarrollo:**
- [[06-DREAM-INTER-MVP#🗓️ Roadmap de Crecimiento]]
- [[01-DREAM-INTER#✅ Estado Actual]]

**Usuario Final:**
- [05-USER-JOURNEY.md](05-USER-JOURNEY.md)
- [[01-DREAM-INTER#🎯 Objetivo]]

---

## 📊 Estado del Proyecto

| Aspecto | Estado | Documento |
|---------|--------|-----------|
| **MVP** | ✅ Funcional (20%) | [06-MVP-ROADMAP.md](06-MVP-ROADMAP.md) |
| **Arquitectura** | ✅ Definida | [01-OVERVIEW.md](01-OVERVIEW.md) |
| **Setup** | ✅ Configurado | [03-SETUP.md](03-SETUP.md) |
| **Microservicio Node** | ✅ Funcionando | [04-INTERLEDGER.md](04-INTERLEDGER.md) |
| **Frontend Test** | ✅ Funcionando | [[06-DREAM-INTER-MVP#2. Frontend de Prueba ✅]] |
| **Django** | ⏳ Pendiente | [[06-DREAM-INTER-MVP#Fase 2]] |
| **Base de Datos** | ⏳ Pendiente | [[06-DREAM-INTER-MVP#Fase 2]] |
| **Usuarios** | ⏳ Pendiente | [[06-DREAM-INTER-MVP#Fase 3]] |
| **Eventos** | ⏳ Pendiente | [[06-DREAM-INTER-MVP#Fase 4]] |

---

## 🎯 Próximos Pasos

1. ✅ **Commit del MVP**
   ```bash
   git commit -m "feat: MVP - Integración Interledger funcional"
   ```

2. ⏳ **Inicializar Django**
   ```bash
   django-admin startproject config .
   ```

3. ⏳ **Primera app: Payments**
   ```bash
   python manage.py startapp payments
   ```

Ver roadmap completo: [[06-DREAM-INTER-MVP#🗓️ Roadmap de Crecimiento]]

---

## 🔗 Links Externos

- **Repositorio**: [alejandrovazquezdev/DREAM-INTER](https://github.com/alejandrovazquezdev/DREAM-INTER)
- **Rama actual**: `arquitectura`
- **Interledger**: [[Interledger]]
- **Open Payments**: [[Open Payments]]
- **Django**: [[Django]]
- **mise**: [[mise]]

---

## 📝 Orden de Creación

1. **01-DREAM-INTER.md** - 5 nov 2025 (documento base)
2. **02-DREAM-INTER-Estructura.md** - 5 nov 2025 (detalles de estructura)
3. **03-DREAM-INTER-Setup.md** - 5 nov 2025 (guía de instalación)
4. **04-DREAM-INTER-Interledger.md** - 5 nov 2025 (integración pagos)
5. **05-DREAM-INTER-User-Journey.md** - 5 nov 2025 (flujos de usuario)
6. **06-DREAM-INTER-MVP.md** - 5 nov 2025 (estado MVP y roadmap)

---

**Última actualización**: 5 de noviembre de 2025  
**Versión**: 1.0  
**Mantenido por**: Equipo DREAM-INTER
