# PRODUCT REQUIREMENTS DOCUMENT (PRD)

# Sistema Web de Gestión de Menú con QR para Cafetería

**Estado del documento:** Draft

---

# ONE PAGER

## Overview

El proyecto consiste en un sistema web para gestionar y visualizar la carta de una cafetería mediante un código QR.

El administrador puede crear y editar productos (nombre, precio, disponibilidad) organizados por categorías.
Los usuarios acceden al menú escaneando un QR y visualizan la carta actualizada en tiempo real.

El sistema funciona como un gestor de contenido simple orientado a menús dinámicos.

---

## Problem

Las cafeterías operan con cartas físicas o archivos estáticos que presentan problemas:

* costos de reimpresión ante cambios de precio
* dificultad para actualizar contenido
* inconsistencia entre distintas versiones del menú
* baja flexibilidad para activar/desactivar productos

No existe un sistema simple que permita actualizar la carta en tiempo real sin fricción operativa.

---

## Objectives

1. Permitir la visualización pública del menú mediante QR.
2. Facilitar la gestión de productos y precios en tiempo real.
3. Eliminar la necesidad de reimpresión de cartas.
4. Proveer una estructura clara basada en Categoría → Producto.

---

## Constraints

1. No se incluye sistema de pedidos online.
2. No se incluye sistema de pagos.
3. No se contempla aplicación móvil nativa.
4. Solo existe un rol administrador.
5. No se incluye multi-sucursal.

---

# Personas

## Usuario Público

Cliente de la cafetería que accede al menú escaneando un QR.

**Objetivos**

* ver el menú actualizado
* navegar categorías fácilmente
* identificar precios de forma clara
* visualizar disponibilidad de productos

---

## Administrador

Dueño o encargado del local.

**Objetivos**

* modificar precios rápidamente
* crear/eliminar productos
* activar/desactivar productos
* organizar categorías

---

# Use Cases

## Escenario 1 — Acceso al menú

El usuario escanea un QR y accede al menú desde su dispositivo móvil.

---

## Escenario 2 — Visualización del menú

El usuario navega categorías y visualiza productos con sus precios.

---

## Escenario 3 — Gestión de productos

El administrador crea, edita o elimina productos desde el panel.

---

## Escenario 4 — Actualización de precios

El administrador modifica un precio y el cambio se refleja inmediatamente en el menú público.

---

## Escenario 5 — Control de disponibilidad

El administrador desactiva un producto y deja de mostrarse en el menú.

---

# PRD

# Features In

## Visualización pública del menú

El sistema muestra una carta accesible para cualquier usuario mediante URL/QR.

Incluye:

* listado por categorías
* productos con nombre y precio
* indicador de disponibilidad
* diseño mobile-first

---

## Estructura del contenido

El contenido se organiza en dos niveles:

Categoría → Producto

Cada categoría contiene múltiples productos ordenados.

---

## Panel administrador

Interfaz privada para gestión del menú.

Permite:

* login básico
* crear productos
* editar productos
* eliminar productos
* activar/desactivar productos
* editar precios
* crear y editar categorías
* ordenar productos y categorías

---

## Actualización en tiempo real (ISR)

Los cambios en el panel se reflejan en el menú público sin necesidad de recargar infraestructura.

---

# Features Out

* pedidos desde mesa
* carrito de compras
* pagos online
* sistema de usuarios públicos
* notificaciones
* analytics complejos

---

# Modelo de Datos

## Category

Campos:

* id (UUID)
* name
* order (entero)
* createdAt
* updatedAt

Relación:

Una categoría contiene múltiples productos.

---

## Product

Campos:

* id (UUID)
* name
* price (Decimal)
* categoryId (FK)
* available (boolean)
* order (entero)
* createdAt
* updatedAt

Relación:

Un producto pertenece a una categoría.

---

## User

Campos:

* id (UUID)
* dni (string, único)
* password
* role ("admin")
* createdAt
* updatedAt

**Nota**: La autenticación se realiza con DNI (Documento Nacional de Identidad) en lugar de email.

---

## Relaciones

```
Category → múltiples Products
User → autenticación del sistema
```

---

# Pantallas del Sistema

## Públicas

* `/menu` — visualización del menú (QR target)

---

## Administrador

* `/admin/login` — login
* `/admin` — dashboard simple
* `/admin/products` — gestión de productos
* `/admin/categories` — gestión de categorías

---

# Flujo del Usuario

## Flujo Público

1. Usuario escanea QR.
2. Accede a `/menu`.
3. Visualiza categorías y productos.

---

## Flujo Administrador

1. Accede a `/admin/login`.
2. Inicia sesión.
3. Gestiona productos y precios.
4. Guarda cambios.
5. El menú se actualiza automáticamente.

---

# Reglas del Sistema

* Solo el administrador puede modificar datos.
* Los productos no disponibles no se muestran.
* El orden de productos y categorías debe respetarse.
* El menú debe ser accesible sin autenticación.
* El QR siempre apunta a la misma URL.

---

# Stack Tecnológico

**Frontend / Backend**

* Next.js
* React
* TypeScript

**ORM**

* Prisma

**Base de datos**

* PostgreSQL

**Auth**

* sesión simple o NextAuth

**Deploy**

* Vercel

---

# Arquitectura

## Server Actions

### Productos

* createProduct
* updateProduct
* deleteProduct
* reorderProducts

### Categorías

* createCategory
* updateCategory
* deleteCategory
* reorderCategories

### Auth

* signIn
* signOut

---

## Cache

Uso de `revalidatePath("/menu")` tras cada mutación.

---

# Consideraciones Técnicas

* diseño mobile-first
* SSR o ISR para carga rápida
* estructura simple sin estado global complejo
* panel desacoplado del frontend público

---

# Success Metrics

* cantidad de accesos al menú
* frecuencia de actualización de precios
* reducción de uso de cartas físicas

---

# Open Issues

| Issue                 | Status  | Resolution                 |
| --------------------- | ------- | -------------------------- |
| Soporte multi-idioma  | Backlog | Baja prioridad             |
| Imágenes de productos | Backlog | Evaluar impacto            |
| SEO                   | Low     | No crítico (acceso por QR) |

---

# Feature Timeline and Phasing

## Fase 1 — MVP

* visualización de menú
* CRUD productos
* CRUD categorías
* panel admin básico

---

## Fase 2

* mejoras UI
* ordenamiento drag-and-drop
* optimización de carga

---

## Fase 3

* soporte imágenes (opcional)
* mejoras de UX

---

## Roadmap futura

* multi-sucursal
* integración con pedidos
* analytics básicos
