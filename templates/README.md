# Templates Globales

## 📁 Plantillas HTML Compartidas

Aquí van los templates que se usan en TODA la aplicación.

### Archivo principal:

**base.html** - Template padre del que heredan todos los demás:
```html
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}DREAM-INTER{% endblock %}</title>
    {% load static %}
    <link rel="stylesheet" href="{% static 'css/base.css' %}">
    {% block extra_css %}{% endblock %}
</head>
<body>
    {% include 'components/navbar.html' %}
    
    <main>
        {% block content %}
        <!-- Aquí va el contenido específico de cada página -->
        {% endblock %}
    </main>
    
    {% include 'components/footer.html' %}
    
    <script src="{% static 'js/main.js' %}"></script>
    {% block extra_js %}{% endblock %}
</body>
</html>
```

### Componentes reutilizables:

- `components/navbar.html` - Barra de navegación
- `components/footer.html` - Footer
- `components/card.html` - Tarjetas de contenido

### Páginas de error:

- `errors/404.html` - Página no encontrada
- `errors/500.html` - Error del servidor

## ¿Cómo usar?

En cualquier template específico (ej: `apps/events/templates/events/dashboard.html`):

```html
{% extends 'base.html' %}

{% block title %}Mis Eventos - DREAM-INTER{% endblock %}

{% block content %}
    <h1>Mis Eventos</h1>
    <!-- Contenido específico aquí -->
{% endblock %}
```
