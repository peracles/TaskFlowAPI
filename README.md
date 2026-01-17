# 🚀 TaskFlow Ecosystem

Este es un ecosistema completo de gestión de tareas que incluye una API robusta, una base de datos relacional y múltiples interfaces de usuario (Web, Desktop y Mobile).

## 🛠️ Arquitectura del Proyecto
El proyecto está orquestado mediante **Docker Compose**, lo que permite levantar toda la infraestructura con un solo comando.

- **Backend**: Node.js + Express (Puerto 3000)
- **Database**: PostgreSQL 18 (Puerto 5432)
- **Frontend Web**: React + Vite (Puerto 5173)
- **Frontend Mobile**: React Native + Expo (Puerto 8081)
- **Desktop (Próximamente)**: Tauri + Rust

---

## 📋 Requisitos Previos

Para ejecutar este proyecto, necesitas tener instalado:

1.  **Docker & Docker Desktop**: Para correr la infraestructura base.
2.  **Node.js & pnpm**: Para desarrollo local fuera de contenedores.
3.  **Para Mobile**: Aplicación [Expo Go](https://expo.dev/go) en tu celular.
4.  **Para Tauri (Escritorio)**: 
    * [Rust](https://www.rust-lang.org/tools/install)
    * C++ Build Tools (Visual Studio Installer).

---

## 🚀 Instalación y Uso rápido

1. **Clonar el repo**:
   ```bash
   git clone <tu-url-del-repo>
   cd Proyecto1-TaskFlowAPI
   ```
2. **Levantar el entorno (Docker)**:
    ```bash
   docker-compose up --build
   ```
3. **Acceso:**:
- Web: http://localhost:5173
- API: http://localhost:3000