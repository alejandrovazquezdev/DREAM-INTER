# Static Files

## 📁 Directorio de Archivos Estáticos

Aquí van todos los archivos que NO son dinámicos (CSS, JavaScript, imágenes, fuentes).

### Estructura:

```
static/
├── css/              # ← Aquí van tus archivos .css
├── js/               # ← Aquí van tus archivos .js
└── images/           # ← Aquí van logos, iconos, imágenes fijas
```

### Ejemplos de uso:

#### En tus templates HTML:
```html
{% load static %}

<!-- CSS -->
<link rel="stylesheet" href="{% static 'css/base.css' %}">
<link rel="stylesheet" href="{% static 'css/events.css' %}">

<!-- JavaScript -->
<script src="{% static 'js/main.js' %}"></script>

<!-- Imágenes -->
<img src="{% static 'images/logo.png' %}" alt="Logo">
```

### Ejemplos de archivos CSS que irían aquí:

- `css/base.css` - Reset, variables, estilos globales
- `css/components.css` - Botones, cards, forms
- `css/home.css` - Estilos del landing
- `css/events.css` - Estilos de eventos
- `css/payments.css` - Estilos de pagos

### Ejemplos de archivos JS que irían aquí:

- `js/main.js` - Funcionalidad global (menú móvil)
- `js/events.js` - Lógica de creación de eventos
- `js/payments.js` - Integración con pagos
- `js/interledger-client.js` - Cliente para microservicio
