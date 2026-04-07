# OmniRoute — Dashboard Features Gallery (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Guía visual de cada sección del panel de OmniRoute.---

## 🔌 Providers

Administre las conexiones de proveedores de IA: proveedores de OAuth (Claude Code, Codex, Gemini CLI), proveedores de claves API (Groq, DeepSeek, OpenRouter) y proveedores gratuitos (Qoder, Qwen, Kiro). Las cuentas Kiro incluyen seguimiento del saldo de crédito: créditos restantes, asignación total y fecha de renovación visibles en Panel → Uso.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Cree combinaciones de enrutamiento de modelos con 6 estrategias: prioridad, ponderada, por turnos, aleatoria, menos utilizada y de costo optimizado. Cada combo encadena múltiples modelos con respaldo automático e incluye plantillas rápidas y comprobaciones de preparación.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Análisis de uso integral con consumo de tokens, estimaciones de costos, mapas de actividad, gráficos de distribución semanal y desgloses por proveedor.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Monitoreo en tiempo real: tiempo de actividad, memoria, versión, percentiles de latencia (p50/p95/p99), estadísticas de caché y estados de los disyuntores del proveedor.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Cuatro modos para depurar traducciones de API:**Playground**(convertidor de formato),**Chat Tester**(solicitudes en vivo),**Test Bench**(pruebas por lotes) y**Live Monitor**(transmisión en tiempo real).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Pruebe cualquier modelo directamente desde el tablero. Seleccione proveedor, modelo y punto final, escriba mensajes con Monaco Editor, transmita respuestas en tiempo real, cancele la transmisión a mitad de camino y vea métricas de tiempo.---

## 🎨 Themes _(v2.0.5+)_

Temas de colores personalizables para todo el tablero. Elija entre 7 colores preestablecidos (coral, azul, rojo, verde, violeta, naranja, cian) o cree un tema personalizado eligiendo cualquier color hexadecimal. Admite modo claro, oscuro y de sistema.---

## ⚙️ Settings

Panel de configuración completo con pestañas:

-**General**— Almacenamiento del sistema, gestión de copias de seguridad (exportación/importación de base de datos) -**Apariencia**: selector de tema (oscuro/claro/sistema), ajustes preestablecidos de tema de color y colores personalizados, visibilidad del registro de estado, controles de visibilidad de elementos de la barra lateral -**Seguridad**: protección API de endpoints, bloqueo de proveedores personalizado, filtrado de IP, información de sesión -**Enrutamiento**: alias de modelo, degradación de tareas en segundo plano -**Resiliencia**: persistencia del límite de velocidad, ajuste de disyuntores, desactivación automática de cuentas prohibidas, monitoreo de vencimiento del proveedor -**Avanzado**: anulaciones de configuración, seguimiento de auditoría de configuración, modo de degradación alternativa![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Configuración con un clic para herramientas de codificación de IA: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continuar, Cursor y Factory Droid. Incluye aplicación/restablecimiento de configuración automatizada, perfiles de conexión y mapeo de modelos.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Panel para descubrir y administrar agentes CLI. Muestra una cuadrícula de 14 agentes integrados (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) con:

-**Estado de instalación**: Instalado/No encontrado con detección de versión -**Insignias de protocolo**: stdio, HTTP, etc. -**Agentes personalizados**: registre cualquier herramienta CLI a través del formulario (nombre, binario, comando de versión, argumentos de generación) -**CLI Fingerprint Matching**: alternancia por proveedor para hacer coincidir las firmas de solicitud CLI nativas, lo que reduce el riesgo de prohibición y preserva la IP del proxy.---

## 🖼️ Media _(v2.0.3+)_

Genere imágenes, videos y música desde el tablero. Admite OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open y MusicGen.---

## 📝 Request Logs

Registro de solicitudes en tiempo real con filtrado por proveedor, modelo, cuenta y clave API. Muestra códigos de estado, uso de token, latencia y detalles de respuesta.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Su punto final API unificado con desglose de capacidades: finalización de chat, API de respuestas, incrustaciones, generación de imágenes, reclasificación, transcripción de audio, texto a voz, moderaciones y claves API registradas. Integración de Cloudflare Quick Tunnel y soporte de proxy en la nube para acceso remoto.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

Cree, alcance y revoque claves API. Cada clave se puede restringir a modelos/proveedores específicos con acceso completo o permisos de solo lectura. Gestión visual de claves con seguimiento de uso.---

## 📋 Audit Log

Seguimiento de acciones administrativas con filtrado por tipo de acción, actor, objetivo, dirección IP y marca de tiempo. Historial completo de eventos de seguridad.---

## 🖥️ Desktop Application

Aplicación de escritorio Native Electron para Windows, macOS y Linux. Ejecute OmniRoute como una aplicación independiente con integración en la bandeja del sistema, soporte sin conexión, actualización automática e instalación con un solo clic.

Características clave:

- Sondeo de preparación del servidor (no hay pantalla en blanco durante el arranque en frío)
- Bandeja del sistema con gestión de puertos.
- Política de seguridad de contenidos
- Cerradura de instancia única
- Actualización automática al reiniciar
- UI condicionada a la plataforma (semáforos de macOS, barra de título predeterminada de Windows/Linux)
- Paquete de compilación de Electron reforzado: los `node_modules' vinculados simbólicamente en el paquete independiente se detectan y rechazan antes del empaquetado, lo que evita la dependencia del tiempo de ejecución en la máquina de compilación (v2.5.5+)

📖 Consulte [`electron/README.md`](../electron/README.md) para obtener la documentación completa.
