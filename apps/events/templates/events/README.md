# Event Templates

## 📄 Plantillas HTML del Módulo de Eventos

Aquí van todos los archivos HTML relacionados con eventos.

### Archivos que irían aquí:

#### dashboard.html
Pantalla principal del usuario logueado. Muestra:
- Lista de eventos creados por el usuario
- Lista de eventos donde es participante
- Botón "Crear Nuevo Evento"

#### create.html
Formulario para crear un evento:
- Nombre del evento
- Descripción
- Monto total
- Fecha
- Participantes a invitar

#### detail.html
Vista detallada de un evento específico:
- Información del evento
- Lista de participantes
- Estado de pagos de cada uno
- Botón "Pagar mi parte" (si eres participante)

#### list.html
Lista de todos los eventos (vista pública o filtrada)

### Ejemplo de estructura:

```html
{% extends 'base.html' %}
{% load static %}

{% block title %}Dashboard - Mis Eventos{% endblock %}

{% block extra_css %}
<link rel="stylesheet" href="{% static 'css/events.css' %}">
{% endblock %}

{% block content %}
<div class="dashboard-container">
    <h1>Mis Eventos</h1>
    
    <a href="{% url 'events:create' %}" class="btn-primary">
        Crear Nuevo Evento
    </a>
    
    <div class="events-grid">
        {% for event in my_events %}
            {% include 'components/event-card.html' %}
        {% endfor %}
    </div>
</div>
{% endblock %}
```
