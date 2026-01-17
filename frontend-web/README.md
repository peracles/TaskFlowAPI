# 🌐 TaskFlow Web
Interfaz de usuario de escritorio y navegador.

## 🚀 Tecnologías
- **React 19**
- **Vite**
- **Tailwind CSS**

## 🔧 Configuración
Para conectar con la API, asegúrate de que la variable de entorno apunta a `http://localhost:3000`.

# 🖥️ TaskFlow Desktop (Tauri)
Aplicación nativa de alto rendimiento.

## ⚠️ Nota de Desarrollo
Debido a que Tauri requiere acceso a las APIs nativas del Sistema Operativo (Windows/macOS), **no se recomienda ejecutarlo dentro de Docker para desarrollo visual**.

### Pasos para iniciar:
1. Instalar [Rust](https://www.rust-lang.org/tools/install).
2. Instalar dependencias: `pnpm install`.
3. Ejecutar en modo desarrollo: `pnpm tauri dev`.