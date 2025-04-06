# 🛰️ Decimetrix Assets

**Decimetrix Assets** es una aplicación web desarrollada como **prueba técnica para la empresa Decimetrix**. Su objetivo es permitir la **gestión y monitoreo en tiempo real de activos empresariales**, representados visualmente mediante puntos y líneas sobre un mapa interactivo.


🔗 **Enlace de despliegue del frontend:**  
👉 [https://decimetrix-assets.netlify.app/](https://decimetrix-assets.netlify.app/)
👉 Usuario de prueba:
    -User: jose.operator@decimetrix.com
    -Password: operator123456
---

## 🧩 Descripción del Proyecto

La aplicación permite visualizar, crear y administrar activos distribuidos geográficamente, integrando funcionalidades de geolocalización, control de roles (Admin / Operario), y notificaciones en tiempo real.  
Se implementó usando **Mapbox GL JS** para el mapa y **WebSockets** para actualizaciones en vivo, haciendo uso de **React Hooks** como `SWR`.


## 🛠️ Tecnologías Utilizadas

### 🔧 Backend
- `Node.js`
- `Express`
- `express-formidable`
- `express-async-handler`
- `mongoose`
- `jsonwebtoken`
- `dotenv`
- `cors`
- `cookie-parser`
- `bcryptjs`
- `concurrently`
- WebSockets (`socket.io`)
- Base de datos: **MongoDB** / **PostgreSQL**
- ORM: **Mongoose** / **Sequelize**

### 💻 Frontend
- `React`
- `Vite`
- `react-dom`
- `react-router-dom`
- `react-toastify`
- `redux`
- `axios`
- `tailwindcss`
- `swr`
- `socket.io-client`
- `mapbox-gl`

---

## ✅ Funcionalidades Clave

### Backend
- Autenticación con JWT y contraseñas encriptadas con `bcryptjs`.
- Manejo de roles (admin / operario).
- API RESTful para usuarios y activos.
- Notificaciones en tiempo real mediante WebSockets:
  - Creación de nuevo activo por el operador o el administrador.
  - Edición de activo por el operador o el administrador.
  - Eliminación de activo por el operador o el administrador.

### Frontend
- Inicio de sesión con validación de roles.
- Visualización de activos en un mapa.
- Notificaciones visuales usando `react-toastify`.
- Actualizaciones en tiempo real con WebSockets + SWR.
- Dashboard de administración para registro y gestión de operarios.
- Diseño responsive con TailwindCSS y CSS3.

---

## 📁 Estructura del Proyecto

### Backend (`/backend`)
```
backend/
├── config/              # Configuraciones (DB)
├── controllers/         # Lógica de usuarios y activos
├── middlewares/         # Autenticación, manejo de asincronismo
├── models/              # Esquemas Mongoose
├── routes/              # Endpoints para API (usuarios y activos)
├── utils/               # Funciones auxiliares (JWT)
├── server.js            # Punto de entrada del servidor
├── package.json
└── .env
```

### Frontend (`/frontend`)
```
frontend/
├── public/              # Archivos estáticos
├── src/
│   ├── api/             # Funciones de comunicación con API usando axios
│   ├── assets/          # Íconos, imágenes
│   ├── components/      # Componentes reutilizables
│   ├── hooks/           # Hooks personalizados (ej. notificaciones)
│   ├── pages/           # Paginas: Login, Dashboard y Home. (Dashboard contiene Users y assets)
│   ├── redux/           # Gestión de estado global con Redux Toolkit
│   ├── socket.js        # Configuración de socket.io-client
│   ├── main.jsx         # Punto de entrada de React
│   └── index.css        # Estilos globales con Tailwind
├── package.json
├── vite.config.js
└── .env
```

---

## 🧪 ¿Cómo probar el proyecto?

### Requisitos:
- Node.js y npm
- MongoDB Atlas 
- Mapbox Token

### 1. Clonar el repositorio
```bash
git clone https://github.com/josesalopasog/decimetrix-assets.git
cd decimetrix-assets
```

### 2. Backend
```bash
cd backend
npm install
```
Crear archivo `.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/decimetrix
JWT_SECRET=supersecret
CLIENT_URL=http://localhost:5173
```

Iniciar el servidor:
```bash
npm run dev
```

### 3. Frontend
```bash
cd ../frontend
npm install
```
Crear archivo `.env`:
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_MAPBOX_TOKEN=tu_token_mapbox
```

Iniciar Vite:
```bash
npm run dev
```

---

## 🌍 Despliegue

- 🔧 **Backend** desplegado en **Render**
- 🧩 **Frontend** desplegado en **Netlify**:  
👉 [https://decimetrix-assets.netlify.app](https://decimetrix-assets.netlify.app)

---

---

## 📝 Licencia

Este proyecto fue desarrollado como una prueba técnica y no tiene una licencia de uso comercial.

---

Desarrollado con ❤️ por [@josesalopasog](https://github.com/josesalopasog)
