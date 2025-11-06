# Frontend de Prueba - Open Payments

Frontend estático para probar el microservicio Node de Open Payments.

## 🎯 Propósito

Este es un **frontend de prueba simple** para validar que el microservicio de Open Payments funciona correctamente antes de integrarlo con Django.

## 📂 Ubicación

`DREAM-INTER/static/test-frontend/`

**Por qué aquí:**
- Archivos estáticos (HTML/CSS/JS)
- No es el frontend de producción
- Para testing y desarrollo

## 🚀 Uso

### 1. Iniciar el microservicio Node

```bash
cd infrastructure/external_services/node_microservice
npm install
node server.js
```

### 2. Abrir el frontend

Simplemente abre `index.html` en tu navegador o usa un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node
npx http-server

# O directamente abrir index.html
```

### 3. Probar

- **Health check**: Verifica conexión con el microservicio
- **Consultar wallet**: Obtiene info de una wallet de Interledger
- **Ejecutar pago**: Realiza un pago completo entre dos wallets

## 📝 Archivos

- `index.html` - Interfaz de usuario
- `script.js` - Lógica de la aplicación
- `styles.css` - Estilos modernos

## 🔗 Migración futura

Cuando el proyecto madure, este frontend será reemplazado por:
- Templates Django en `templates/`
- Frontend moderno (React/Vue) en directorio separado
- API REST con DRF

Por ahora, sirve para **validar la integración con Interledger**.
