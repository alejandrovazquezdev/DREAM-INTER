# DREAM-INTER - Setup y Configuración

> Guía completa de instalación y configuración del entorno de desarrollo

← Volver a [[DREAM-INTER]]

---

## 📦 Herramientas Requeridas

### mise
**Gestor de versiones de herramientas de desarrollo**

- **Qué es**: Maneja versiones de Python, Node, etc. por proyecto
- **Por qué lo usamos**: Garantiza que todos usen las mismas versiones
- **Versión**: 2025.10.21 o superior
- **Instalación**: https://mise.jdx.dev/

### Git
- Para control de versiones
- Windows: Git Bash o incluido en VS Code

---

## 🔧 Configuración del Proyecto

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/alejandrovazquezdev/DREAM-INTER.git
cd DREAM-INTER
```

### Paso 2: Cambiar a Rama de Arquitectura

```bash
git checkout arquitectura
```

---

## 🐍 Configuración de Python

### Con mise (Recomendado)

#### 1. Instalar Python automáticamente
```bash
mise install
```

Esto lee `.mise.toml` y instala:
- **Python 3.12.12**
- **Node.js 22.x**

#### 2. Verificar instalación
```bash
mise exec -- python --version
# Output: Python 3.12.12

mise exec -- node --version
# Output: v22.x.x
```

#### 3. Setup completo automatizado
```bash
mise run setup
```

Este comando ejecuta automáticamente:
1. Crea entorno virtual (`venv/`)
2. Activa el entorno
3. Instala dependencias Python
4. Instala dependencias Node del microservicio

---

### Sin mise (Manual)

#### 1. Instalar Python manualmente
- Descargar Python 3.12 de https://www.python.org/
- Agregar a PATH durante instalación

#### 2. Verificar instalación
```bash
python --version
# Debe ser 3.12.x
```

#### 3. Crear entorno virtual
```bash
python -m venv venv
```

#### 4. Activar entorno virtual

> **Nota importante**: Los scripts de activación se crean **automáticamente** cuando ejecutas `python -m venv venv`. No necesitas instalarlos ni descargarlos.

**Windows (PowerShell):**
```powershell
.\venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```cmd
venv\Scripts\activate.bat
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

**Estructura de carpetas por sistema:**

| Sistema | Carpeta de scripts | Scripts de activación |
|---------|-------------------|----------------------|
| Windows | `venv/Scripts/` | `Activate.ps1`, `activate.bat` |
| Linux/Mac | `venv/bin/` | `activate`, `activate.csh`, `activate.fish` |

**Después de activar:**
```bash
# El prompt cambia para mostrar que está activo:
(venv) PS C:\...\DREAM-INTER>     # Windows
(venv) user@host:~/DREAM-INTER$   # Linux
```

#### 5. Actualizar pip
```bash
python -m pip install --upgrade pip setuptools wheel
```

#### 6. Instalar dependencias
```bash
pip install -r requirements/development.txt
```

---

## 📚 Dependencias Python Instaladas

> **Importante sobre scripts ejecutables**: Cuando ejecutas `pip install -r requirements/...`, además de instalar los paquetes, se crean **scripts ejecutables** en:
> - Windows: `venv/Scripts/` (ej: `django-admin.exe`, `pytest.exe`, `black.exe`)
> - Linux/Mac: `venv/bin/` (ej: `django-admin`, `pytest`, `black` - sin extensión)
>
> Estos scripts te permiten ejecutar las herramientas directamente desde la terminal cuando el venv está activado.

### Base (`requirements/base.txt`)

Instaladas en **todos** los ambientes (dev, staging, prod):

#### Framework Web
```
Django>=5.0,<5.1              # Framework web principal
djangorestframework>=3.14.0   # API REST para endpoints
```

**Por qué:**
- Django: Framework robusto para web apps
- DRF: Para crear APIs que el frontend consume

#### Base de Datos
```
psycopg2-binary>=2.9.9        # Driver PostgreSQL
dj-database-url>=2.1.0        # Parser de URLs de BD
```

**Por qué:**
- psycopg2: Conectarse a PostgreSQL (producción)
- dj-database-url: Configurar BD desde variable de entorno

#### Variables de Entorno
```
python-dotenv>=1.0.0          # Leer archivos .env
django-environ>=0.11.0        # Configuración con variables
```

**Por qué:**
- Separar configuración de código
- Diferentes configs por ambiente (dev/prod)
- Seguridad (no hardcodear credenciales)

#### Utilidades
```
python-slugify>=8.0.1         # Crear slugs para URLs
Pillow>=10.1.0                # Procesamiento de imágenes
```

**Por qué:**
- Slugify: URLs amigables (evento-cena-restaurante)
- Pillow: Subir/procesar imágenes de eventos

#### Seguridad y CORS
```
django-cors-headers>=4.3.0    # Headers CORS para API
```

**Por qué:**
- Permitir requests desde frontend
- Necesario para arquitectura API REST

#### Fechas
```
python-dateutil>=2.8.2        # Manejo avanzado de fechas
```

**Por qué:**
- Parsear fechas de eventos
- Cálculos de tiempo

---

### Development (`requirements/development.txt`)

Solo para desarrollo local:

#### Debugging
```
django-debug-toolbar>=4.2.0   # Toolbar de debug en navegador
ipython>=8.18.0               # Shell interactivo mejorado
```

**Por qué:**
- Debug toolbar: Ver queries SQL, performance, templates
- IPython: Shell más potente que `python`

#### Testing
```
pytest>=7.4.3                 # Framework de testing
pytest-django>=4.7.0          # Integración pytest + Django
pytest-cov>=4.1.0             # Cobertura de código
factory-boy>=3.3.0            # Factories para tests
```

**Por qué:**
- pytest: Tests más simples que unittest
- pytest-django: Fixtures para Django
- coverage: Ver qué código no está testeado
- factory-boy: Crear datos de prueba fácilmente

#### Calidad de Código
```
black>=23.11.0                # Formateador de código
flake8>=6.1.0                 # Linter (detecta errores)
isort>=5.12.0                 # Ordena imports
```

**Por qué:**
- black: Código consistente (PEP 8)
- flake8: Detecta bugs y code smells
- isort: Imports ordenados alfabéticamente

#### Desarrollo
```
django-extensions>=3.2.3      # Comandos útiles extra
```

**Por qué:**
- `shell_plus`: Shell con models importados
- `runserver_plus`: Mejor servidor de dev
- Otros comandos útiles

---

### Production (`requirements/production.txt`)

Solo para producción:

#### Servidor
```
gunicorn>=21.2.0              # Servidor WSGI
```

**Por qué:**
- Django dev server NO es para producción
- Gunicorn: Robusto, multi-worker

#### Seguridad
```
django-security>=0.18.0       # Headers de seguridad extra
```

**Por qué:**
- Headers HTTP seguros
- Protección adicional

#### Monitoring
```
sentry-sdk>=1.38.0            # Tracking de errores
```

**Por qué:**
- Captura errores en producción
- Alertas automáticas

#### Cache
```
redis>=5.0.1                  # Cliente Redis
django-redis>=5.4.0           # Cache backend Redis
```

**Por qué:**
- Cache de queries
- Sessions en Redis
- Performance

---

## 🎯 Mise vs Sin Mise

### Con Mise ✅

#### Ventajas:
- ✅ **Versiones automáticas**: Instala Python/Node correctos
- ✅ **Por proyecto**: Diferentes proyectos, diferentes versiones
- ✅ **Tasks integrados**: `mise run dev`, `mise run setup`
- ✅ **Documentado**: `.mise.toml` documenta versiones
- ✅ **Team-friendly**: Todos usan mismas versiones
- ✅ **Un comando**: `mise install` lo configura todo

#### Comandos:
```bash
# Setup
mise install
mise run setup

# Desarrollo
mise run dev                 # Django
mise run node-service        # Node microservice

# Ver tasks disponibles
mise tasks
```

#### Configuración (`.mise.toml`):
```toml
[tools]
python = "3.12"
node = "22"

[tasks.setup]
run = "..."  # Script automatizado

[tasks.dev]
run = "python manage.py runserver"

[tasks.node-service]
run = "cd infrastructure/... && node index.js"
```

---

### Sin Mise ⚠️

#### Desventajas:
- ❌ **Manual**: Instalar Python/Node manualmente
- ❌ **Versiones**: Posibles conflictos entre proyectos
- ❌ **Más pasos**: Recordar activar venv, rutas, etc.
- ❌ **No estandarizado**: Cada dev puede usar diferente
- ❌ **Más comandos**: Varios pasos para setup

#### Comandos necesarios:
```bash
# Setup
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements/development.txt
cd infrastructure/external_services/node_microservice
npm install

# Desarrollo
.\venv\Scripts\Activate.ps1
python manage.py runserver

# Node service (otra terminal)
cd infrastructure/external_services/node_microservice
node index.js
```

---

## 📋 Archivos de Configuración

### `.mise.toml`
```toml
# Versiones de herramientas + tasks
[tools]
python = "3.12"
node = "22"

[tasks.setup]
# Automatización de setup

[tasks.dev]
# Comando para Django

[tasks.node-service]
# Comando para microservicio
```

### `.env.example`
Template de variables de entorno:
```bash
DJANGO_SETTINGS_MODULE=config.settings.development
SECRET_KEY=...
DEBUG=True
DATABASE_URL=...
INTERLEDGER_WALLET_URL=...
```

### `.env`
Tu archivo personal (NO en git):
```bash
# Copiar de .env.example
# Agregar tus credenciales reales
```

### `.gitignore`
Archivos que NO se suben a git:
```
venv/
.env
*.pyc
__pycache__/
db.sqlite3
private.key
```

---

## ✅ Verificación de Instalación

### 1. Verificar Python
```bash
python --version
# Python 3.12.12
```

### 2. Verificar Django
```bash
django-admin --version
# 5.0.14
```

### 3. Verificar paquetes instalados
```bash
pip list
```

Debes ver:
- Django
- djangorestframework
- psycopg2-binary
- pytest
- black
- flake8
- etc.

### 4. Verificar mise (si lo usas)
```bash
mise doctor
```

---

## 🚀 Flujo de Trabajo Diario

> **Nota sobre activación del venv**: El comando `mise run setup` crea el entorno virtual e instala dependencias, pero **NO deja el venv activado** en tu terminal. Esto es una limitación técnica (se activa dentro del sub-proceso y se desactiva al terminar).
>
> **Debes activar manualmente** después del setup:
> - Windows: `.\venv\Scripts\Activate.ps1`
> - Linux/Mac: `source venv/bin/activate`

### Con mise:
```bash
# Primera vez (setup)
mise install
mise run setup
.\venv\Scripts\Activate.ps1        # Windows
# o
source venv/bin/activate            # Linux/Mac

# Desarrollo diario
# Terminal 1 - Django
cd DREAM-INTER
.\venv\Scripts\Activate.ps1         # Si no está activado
python manage.py runserver
# o usar mise directamente (sin activar):
mise run dev

# Terminal 2 - Node microservice
cd DREAM-INTER
mise run node-service
```

### Sin mise:
```bash
# Terminal 1 - Django
cd DREAM-INTER
.\venv\Scripts\Activate.ps1         # Windows
# o
source venv/bin/activate            # Linux/Mac
python manage.py runserver

# Terminal 2 - Node
cd DREAM-INTER\infrastructure\external_services\node_microservice
node index.js
```

### Alternativa: usar mise exec (sin activar venv)
```bash
# Ejecuta comandos Python sin activar el venv
mise exec -- python manage.py runserver
mise exec -- python manage.py migrate
mise exec -- pip install nuevo-paquete
```

---

## 🐛 Troubleshooting

### Error: "mise not found"
→ Instalar mise desde https://mise.jdx.dev/

### Error: "Python not found"
→ Con mise: `mise install`
→ Sin mise: Instalar Python 3.12 manualmente

### Error: "venv already exists"
→ Eliminar: `Remove-Item -Recurse -Force venv`
→ Recrear: `python -m venv venv`

### Error al instalar psycopg2
→ Necesitas build tools de C++
→ O usa: `pip install psycopg2-binary` (ya incluido)

### Error: "Execution policy" (PowerShell)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📚 Próximos Pasos

Una vez configurado el entorno:

1. [[DREAM-INTER-Django-Init]] - Inicializar proyecto Django
2. [[DREAM-INTER-First-App]] - Crear primera app
3. [[DREAM-INTER-Node-Service]] - Configurar microservicio Node
4. [[DREAM-INTER-Interledger]] - Integración con Open Payments

---

## 🔗 Ver también

- [[DREAM-INTER]]
- [[DREAM-INTER-Estructura]]
- [[Python Virtual Environments]]
- [[mise]]

---

**Última actualización**: 5 de noviembre de 2025
**Python**: 3.12.12
**Django**: 5.0.14
**Node**: 22.x
