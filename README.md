# 🛍️ Product Store

Aplicación web de tienda de productos construida con **React 19**, **TypeScript** y **Vite**, desplegada en **Cloudflare Workers** mediante CI/CD con GitHub Actions.

---

## 🚀 Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 5.9 | Tipado estático |
| Vite | 7 | Bundler y dev server |
| Tailwind CSS | 4 | Estilos |
| React Router DOM | 7 | Enrutamiento |
| Axios | 1.x | HTTP client |
| Cloudflare Workers | — | Hosting / deploy |
| Wrangler | 4 | CLI de Cloudflare |

---

## 📁 Estructura del Proyecto

```
src/
├── core/                        # Lógica de negocio (Clean Architecture)
│   ├── application/             # Casos de uso
│   ├── domain/                  # Modelos e interfaces del dominio
│   │   ├── models/              # Entidades (Product, etc.)
│   │   └── repositories/        # Contratos de repositorios
│   └── infraestructure/         # Implementaciones concretas
│       ├── api/                 # Configuración de API
│       └── services/            # Servicios (ProductApi, etc.)
│
└── presentation/                # Capa de presentación
    ├── common/
    │   ├── components/          # Componentes reutilizables
    │   │   ├── Header/          # Navegación principal (responsive)
    │   │   ├── CartProduct/     # Panel del carrito
    │   │   ├── Input/           # Input de búsqueda
    │   │   └── ...
    │   ├── layout/              # Layout general
    │   ├── stores/              # Estado global (Context / hooks)
    │   └── views/               # Vistas / páginas
    ├── routes/                  # Definición de rutas
    └── toolbox/                 # Utilidades, mocks e interfaces
```

---

## ⚙️ Instalación y Uso Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/jorgexxvp/product-store
cd product-store
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar servidor de desarrollo

```bash
npm run dev
```

### 4. Otros comandos

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualizar el build |
| `npm run lint` | Lint del código |
| `npm run lint:fix` | Lint con auto-fix |
| `npm run format` | Formatear con Prettier |
| `npm run deploy` | Deploy manual a Cloudflare |
| `npm run start` | Build + Wrangler local dev |

---

## 🌐 Deploy — Cloudflare Workers

El proyecto usa **Cloudflare Workers** con el archivo `wrangler.toml` para configurar el deploy. El build genera los archivos estáticos en `dist/` y Wrangler los sirve como un Worker.

### Deploy manual

```bash
npm run deploy
```

### Variables de entorno requeridas en GitHub Secrets

| Secret | Descripción |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Token de la API de Cloudflare |
| `CLOUDFLARE_ACCOUNT_ID` | ID de tu cuenta de Cloudflare |

---

## 🔄 CI/CD — GitHub Actions

El pipeline se encuentra en `.github/workflows/deploy.yml` y se ejecuta automáticamente en cada `push`.

**Pasos del pipeline:**
1. ✅ Checkout del código
2. 📦 Instalación de dependencias (`npm install`)
3. 🏗️ Build del proyecto (`npm run build`)
4. 🚀 Deploy a Cloudflare Workers (`wrangler deploy`)

---

## 🏗️ Arquitectura

El proyecto sigue principios de **Clean Architecture** separando la lógica de negocio de la capa de presentación:

- **Domain**: Entidades y contratos (interfaces de repositorios)
- **Application**: Casos de uso
- **Infrastructure**: Implementaciones concretas (API, servicios)
- **Presentation**: Componentes React, stores y vistas

---

## ✨ Funcionalidades

- 🔍 **Búsqueda** de productos en tiempo real (normalización de acentos/mayúsculas)
- 🗂️ **Filtro por categoría** desde el menú de navegación
- 🛒 **Carrito de compras** con persistencia en `localStorage`
- 📱 **Diseño responsive** con menú hamburguesa para mobile
- ☁️ **Deploy automático** en cada push a la rama principal
