# Script de configuración inicial para DREAM-INTER
# Ejecutar: .\setup-django.ps1

Write-Host "🚀 Configurando DREAM-INTER (Django)..." -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en el directorio correcto
$projectRoot = "c:\Users\phantomia\dev\DREAM-INTER"
Set-Location $projectRoot

# 1. Verificar mise y Python
Write-Host "📋 Verificando mise y Python..." -ForegroundColor Yellow
mise install
$pythonVersion = mise exec -- python --version
Write-Host "✅ $pythonVersion" -ForegroundColor Green
Write-Host ""

# 2. Crear entorno virtual
Write-Host "🐍 Creando entorno virtual..." -ForegroundColor Yellow
if (Test-Path "venv") {
    Write-Host "⚠️  venv ya existe, eliminando..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "venv"
}

mise exec -- python -m venv venv
Write-Host "✅ Entorno virtual creado" -ForegroundColor Green
Write-Host ""

# 3. Activar entorno virtual y actualizar pip
Write-Host "📦 Activando entorno y actualizando pip..." -ForegroundColor Yellow
& ".\venv\Scripts\Activate.ps1"
python -m pip install --upgrade pip setuptools wheel
Write-Host "✅ pip actualizado" -ForegroundColor Green
Write-Host ""

# 4. Instalar dependencias
Write-Host "📥 Instalando dependencias de desarrollo..." -ForegroundColor Yellow
pip install -r requirements/development.txt
Write-Host "✅ Dependencias instaladas" -ForegroundColor Green
Write-Host ""

# 5. Crear archivo .env si no existe
Write-Host "⚙️  Configurando variables de entorno..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" -Destination ".env"
    Write-Host "✅ .env creado desde .env.example" -ForegroundColor Green
} else {
    Write-Host "ℹ️  .env ya existe" -ForegroundColor Cyan
}
Write-Host ""

# 6. Información final
Write-Host "✅ Configuración completada!" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Próximos pasos:" -ForegroundColor Cyan
Write-Host "   1. Activar entorno virtual:" -ForegroundColor White
Write-Host "      .\venv\Scripts\Activate.ps1" -ForegroundColor Gray
Write-Host ""
Write-Host "   2. Inicializar Django (próximo script):" -ForegroundColor White
Write-Host "      django-admin startproject config ." -ForegroundColor Gray
Write-Host ""
Write-Host "   3. Ejecutar migraciones:" -ForegroundColor White
Write-Host "      python manage.py migrate" -ForegroundColor Gray
Write-Host ""
Write-Host "   4. Crear superusuario:" -ForegroundColor White
Write-Host "      python manage.py createsuperuser" -ForegroundColor Gray
Write-Host ""
Write-Host "   5. Ejecutar servidor:" -ForegroundColor White
Write-Host "      python manage.py runserver" -ForegroundColor Gray
Write-Host ""
