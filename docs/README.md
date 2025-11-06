# 📚 DREAM-INTER - Documentación

> Plataforma de pagos descentralizados para eventos entre amigos usando Django + Interledger

---

## 🚀 Inicio Rápido

**¿Primera vez aquí?** Empieza por el **[00-INDEX.md](00-INDEX.md)** para una vista completa de toda la documentación.

---

## 📖 Documentos Principales

### [00-INDEX.md](00-INDEX.md) - Índice General
Tu punto de entrada. Contiene:
- 📖 Guía de lectura recomendada
- 📑 Resumen de cada documento
- 🔍 Navegación rápida por temas
- 📊 Estado del proyecto
- 🎯 Próximos pasos

### [01-OVERVIEW.md](01-OVERVIEW.md) - Vista General del Proyecto
Documento principal con:
- 🎯 Objetivo y alcance
- 🏗️ Arquitectura (Layered + DDD)
- 📁 Estructura general de carpetas
- 🛠️ Stack tecnológico completo
- 🔄 Flujo de requests
- ✅ Estado actual del MVP

### [02-STRUCTURE.md](02-STRUCTURE.md) - Estructura Detallada
Guía completa de la organización:
- 📂 Desglose de cada directorio
- 🗂️ Ubicación de cada tipo de archivo
- 📝 Explicación de la arquitectura de carpetas
- 🎯 Dónde colocar cada cosa nueva

### [03-SETUP.md](03-SETUP.md) - Guía de Instalación
Todo lo necesario para comenzar:
- 🔧 Instalación de mise (gestor de versiones)
- 🐍 Configuración de Python 3.12
- 📦 Instalación de dependencias
- ⚙️ Configuración del entorno virtual
- 🚀 Comandos para iniciar el proyecto
- 🖥️ Diferencias Windows/Linux

### [04-INTERLEDGER.md](04-INTERLEDGER.md) - Integración con Interledger
Documentación del sistema de pagos:
- 💰 ¿Qué es Interledger y Open Payments?
- 🔌 Arquitectura del microservicio Node.js
- 📡 API REST del microservicio
- 🔗 Comunicación Django ↔ Node
- 🔑 Configuración de credenciales
- 🧪 Testing del sistema de pagos

### [05-USER-JOURNEY.md](05-USER-JOURNEY.md) - Flujos de Usuario
Experiencia del usuario final:
- 🚶 Flujos de usuario completos
- 🗺️ Navegación de la aplicación
- 📄 Páginas y vistas
- 🔀 Árbol de decisiones
- 📱 Interfaces planeadas

### [06-MVP-ROADMAP.md](06-MVP-ROADMAP.md) - MVP y Roadmap
Estado actual y plan de desarrollo:
- ✅ MVP actual (20% completo)
- 📦 Componentes funcionales
- 🗓️ Roadmap de 10 fases
- 📈 Estrategia de escalado incremental
- 📊 Métricas de éxito por fase
- 🎯 Próximos pasos inmediatos

---

## 📝 Documentos Específicos

### [MIGRATION.md](MIGRATION.md)
Documentación de la migración de archivos desde "Lo-que-se-tiene" a la arquitectura DREAM-INTER.

### [WHERE_THINGS_GO.md](WHERE_THINGS_GO.md)
Guía rápida de dónde colocar cada tipo de archivo según la arquitectura del proyecto.

---

## 🎯 Flujo de Lectura Recomendado

### Para Desarrolladores Nuevos:
```
1. 00-INDEX.md       → Vista general de la documentación
2. 01-OVERVIEW.md    → Entender el proyecto
3. 03-SETUP.md       → Configurar el entorno
4. 02-STRUCTURE.md   → Conocer la organización
5. 04-INTERLEDGER.md → Entender los pagos
6. 06-MVP-ROADMAP.md → Ver el plan de desarrollo
```

### Para Product Owners:
```
1. 01-OVERVIEW.md    → Visión del proyecto
2. 05-USER-JOURNEY.md → Experiencia del usuario
3. 06-MVP-ROADMAP.md → Estado y plan de desarrollo
```

### Para DevOps/Infraestructura:
```
1. 03-SETUP.md       → Requisitos y configuración
2. 04-INTERLEDGER.md → Microservicio Node.js
3. 02-STRUCTURE.md   → Organización del código
```

---

## 🔍 Navegación por Tema

| Tema | Documentos Relevantes |
|------|----------------------|
| **Arquitectura** | [01-OVERVIEW.md](01-OVERVIEW.md), [02-STRUCTURE.md](02-STRUCTURE.md) |
| **Setup** | [03-SETUP.md](03-SETUP.md) |
| **Pagos** | [04-INTERLEDGER.md](04-INTERLEDGER.md) |
| **UX** | [05-USER-JOURNEY.md](05-USER-JOURNEY.md) |
| **Desarrollo** | [06-MVP-ROADMAP.md](06-MVP-ROADMAP.md) |
| **Migración** | [MIGRATION.md](MIGRATION.md) |

---

## 📊 Estado del Proyecto

| Componente | Estado | Documento |
|------------|--------|-----------|
| **MVP Base** | ✅ Funcional (20%) | [06-MVP-ROADMAP.md](06-MVP-ROADMAP.md) |
| **Arquitectura** | ✅ Definida | [01-OVERVIEW.md](01-OVERVIEW.md) |
| **Microservicio Node** | ✅ Funcionando | [04-INTERLEDGER.md](04-INTERLEDGER.md) |
| **Frontend Test** | ✅ Funcionando | [06-MVP-ROADMAP.md](06-MVP-ROADMAP.md#2-frontend-de-prueba-) |
| **Django** | ⏳ Pendiente | [06-MVP-ROADMAP.md](06-MVP-ROADMAP.md#fase-2-persistencia-básica-) |
| **Base de Datos** | ⏳ Pendiente | [06-MVP-ROADMAP.md](06-MVP-ROADMAP.md#fase-2-persistencia-básica-) |
| **Usuarios** | ⏳ Pendiente | [06-MVP-ROADMAP.md](06-MVP-ROADMAP.md#fase-3-mvp-con-usuarios-) |
| **Eventos** | ⏳ Pendiente | [06-MVP-ROADMAP.md](06-MVP-ROADMAP.md#fase-4-eventos-básicos-) |

---

## 🎯 Próximos Pasos

Ver el roadmap completo en [06-MVP-ROADMAP.md](06-MVP-ROADMAP.md#-próximos-pasos-inmediatos)

**Fase actual:** MVP Base ✅  
**Próxima fase:** Persistencia Básica (Inicializar Django)

---

## 🔗 Enlaces Útiles

- **Repositorio**: [alejandrovazquezdev/DREAM-INTER](https://github.com/alejandrovazquezdev/DREAM-INTER)
- **Rama actual**: `arquitectura`
- **Interledger**: https://interledger.org/
- **Open Payments**: https://openpayments.guide/

---

## 📝 Mantenimiento

**Última actualización**: 5 de noviembre de 2025  
**Versión**: 1.0  
**Mantenido por**: Equipo DREAM-INTER

### Contribuir a la Documentación

Si encuentras información desactualizada o necesitas agregar documentación:

1. Los documentos siguen numeración cronológica (00-06)
2. Mantén la estructura de enlaces relativos
3. Actualiza el [00-INDEX.md](00-INDEX.md) si agregas documentos nuevos
4. Usa emojis para mejor legibilidad
5. Incluye ejemplos de código cuando sea relevante

---

**¿Tienes dudas?** Revisa el [00-INDEX.md](00-INDEX.md) o el [01-OVERVIEW.md](01-OVERVIEW.md)
