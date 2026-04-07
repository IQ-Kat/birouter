# Changelog (Español)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Middleware:**Se resolvió el bucle de redireccionamiento infinito en el panel para instancias nuevas cuando requireLogin está deshabilitado.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Integración nativa de la API de Qoder:**Se refactorizó completamente Qoder Executor para evitar el algoritmo de cifrado COZY AES/RSA heredado y enrutarlo directamente a la URL nativa compatible con DashScope OpenAi. Elimina dependencias complejas de los módulos "crypto" de Node al tiempo que mejora la fidelidad de la transmisión. -**Revisión del motor de resiliencia:**Respaldos elegantes de desbordamiento de contexto integrados, detección proactiva de tokens OAuth y prevención de emisiones de contenido vacío (#990). -**Estrategia de enrutamiento optimizada para el contexto:**Se agregó una nueva capacidad de enrutamiento inteligente para maximizar de forma nativa las ventanas de contexto en implementaciones combinadas automatizadas (#990).### 🐛 Bug Fixes

-**Corrupción de la transmisión de API de respuestas:**Se corrigió la corrupción de clonación profunda donde los límites de traducción Anthropic/OpenAI eliminaban los prefijos SSE específicos de "respuesta" de los límites de transmisión (#992). -**Alineación de paso a través de caché de Claude:**Marcadores de caché compatibles con CC alineados de manera consistente con el modo de paso a través del cliente ascendente, preservando el almacenamiento en caché de avisos. -**Pérdida de memoria de Turbopack:**Se fijó Next.js en el estricto `16.0.10` para evitar pérdidas de memoria y generar obsolescencia a partir de regresiones recientes del módulo hash de Turbopack (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Integración de Models.dev:**Models.dev integrado como fuente de tiempo de ejecución autorizada para precios, capacidades y especificaciones de modelos, anulando los precios codificados. Incluye una interfaz de usuario de configuración para administrar intervalos de sincronización, cadenas de traducción para los 30 idiomas y una sólida cobertura de pruebas. -**Capacidades nativas del proveedor:**Se agregó soporte para declarar y verificar características nativas de API (por ejemplo, `systemInstructions_supported`) que previenen fallas al desinfectar roles no válidos. Actualmente configurado para proveedores Gemini Base y Antigravity OAuth. -**Configuración avanzada del proveedor de API:**Se agregaron anulaciones personalizadas de "Agente de usuario" por conexión para conexiones de proveedores de claves API. La anulación se almacena en `providerSpecificData.customUserAgent` y ahora se aplica a las sondas de validación y las solicitudes de ejecución ascendentes.### 🐛 Bug Fixes

-**Confiabilidad de Qwen OAuth:**Se resolvió una serie de problemas de integración de OAuth, incluido un bloqueador de 400 solicitudes incorrectas en tokens caducados, generación alternativa para analizar las propiedades `access_token` de OIDC cuando se omite `id_token`, errores de descubrimiento de catálogo de modelos y filtrado estricto de encabezados `X-Dashscope-*` para evitar el rechazo 400 de puntos finales compatibles con OpenAI.## [3.5.0] — 2026-04-03

### ✨ New Features

-**Auto-Combo y enrutamiento:**Se completó la integración del ciclo de vida CRUD nativo para el motor Auto-Combo avanzado (n.º 955). -**Operaciones principales:**Se corrigieron las traducciones faltantes para las nuevas opciones nativas de Auto-Combos (#955). -**Validación de seguridad:**Se deshabilitaron las tareas de copia de seguridad automática de SQLite de forma nativa durante la ejecución de CI de prueba unitaria para resolver explícitamente las pérdidas de memoria del bucle de eventos del Nodo 22 (#956). -**Proxies del ecosistema:**Se completaron los programadores de sincronización del modelo de mapeo de integración explícito, los ciclos de OAuth y las actualizaciones de Token Check de forma segura a través de los proxies ascendentes del sistema nativo de OmniRoute (#953). -**Extensibilidad de MCP:**Se agregó y registró con éxito la nueva herramienta de marco MCP `omniroute_web_search` desde la versión beta a los esquemas de producción (#951). -**Lógica del búfer de tokens:**Se agregaron límites de configuración de tiempo de ejecución que extienden los búferes de tokens de entrada/salida configurables para métricas precisas de seguimiento de uso (#959).### 🐛 Bug Fixes

-**Remediación CodeQL:**Operaciones de indexación de cadenas críticas totalmente resueltas y seguras que evitan que las matrices de falsificación de solicitudes del lado del servidor (SSRF) indexen heurísticas junto con el retroceso algorítmico polinómico (ReDoS) dentro de los módulos de distribución de proxy profundo. -**Crypto Hashes:**Se reemplazaron los hashes de OAuth 1.0 heredados, débiles y no verificados, por primitivas de validación estándar HMAC-SHA-256 sólidas que garantizan controles de acceso estrictos. -**Protección de límites de API:**Protecciones de rutas estructurales correctamente verificadas y asignadas que aplican una estricta lógica de middleware `isAuthenticated()` que cubre puntos finales dinámicos más nuevos dirigidos a la manipulación de configuraciones y la carga de habilidades nativas. -**Compatibilidad del ecosistema CLI:**Se resolvieron enlaces rotos del analizador de tiempo de ejecución nativo que bloqueaban los detectores de entorno `where` estrictamente sobre los casos extremos `.cmd/.exe` elegantemente para complementos externos (#969). -**Arquitectura de caché:**Se refactorizó el almacenamiento en caché de la estructura del diseño de los parámetros del panel de configuración del sistema y análisis exactos para mantener ciclos de persistencia de rehidratación estables y resolver destellos visuales de estado no alineados (#952). -**Estándares de almacenamiento en caché de Claude:**Marcadores de bloques efímeros críticos normalizados y estrictamente conservados con precisión, almacenamiento en caché "efímero" de órdenes TTL para nodos posteriores que aplican solicitudes CC estándar compatibles y se asignan de manera limpia sin perder métricas (#948). -**Autentificación de alias internos:**Asignaciones de tiempo de ejecución internas simplificadas que normalizan las búsquedas de carga útil de credenciales del Codex dentro de los parámetros de traducción globales y resuelven 401 caídas no autenticadas (#958).### 🛠️ Maintenance

-**Descubribilidad de la interfaz de usuario:**Categorizaciones de diseño correctamente ajustadas que separan explícitamente la lógica de los proveedores de nivel gratuito y mejoran los flujos de clasificación de UX dentro de las páginas de registro de API generales (#950). -**Topología de implementación:**artefactos de implementación unificados de Docker que garantizan que la raíz `fly.toml` coincida con los parámetros esperados de la instancia de nube de forma inmediata y que gestionen de forma nativa las implementaciones automatizadas y se escalen correctamente. -**Herramientas de desarrollo:**Parámetros de tiempo de ejecución `LKGP` desacoplados en utilidades de almacenamiento en caché de abstracción de capa de base de datos explícitas que garantizan una cobertura de aislamiento de prueba estricta para las capas de almacenamiento en caché centrales de forma segura.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Panel de combinación automática del panel:**Se refactorizó completamente la interfaz de usuario `/dashboard/auto-combo` para integrarla perfectamente con las tarjetas de panel nativas y los encabezados/rellenos visuales estandarizados. Se agregaron barras de progreso visual dinámicas que mapean los mecanismos de peso de selección del modelo. -**Sincronización de enrutamiento de configuración:**Objetivos de esquema "prioritario" y "ponderado" de enrutamiento avanzado completamente expuestos internamente dentro de las listas de respaldo de configuración global.### Bug Fixes

-**Nodos de configuración regional de Memoria y Habilidades:**Se resolvieron etiquetas de representación vacías para las opciones de Memoria y Habilidades directamente dentro de las vistas de configuración global al conectar todos los valores de mapeo `settings.*` internamente en `en.json` (también asignados implícitamente para herramientas de traducción cruzada).### Internal Integrations

- PR integrado #946 — solución: preservar la compatibilidad de Claude Code en la conversión de respuestas
- PR integrado n.º 944: solución (géminis): preservar las firmas de pensamiento en las llamadas a herramientas antigravedad
- PR integrado #943 — solución: restaurar el cuerpo de GitHub Copilot
- PR #942 integrado: corrige marcadores de caché compatibles con cc
- PR integrado #941 — refactor(auth): mejora la búsqueda de alias de NVIDIA + agrega el registro de errores LKGP
- PR integrado #939 — Restaurar el manejo de devolución de llamada de Claude OAuth localhost
- _(Nota: PR #934 se omitió del ciclo 3.4.9 para evitar regresiones de conflictos centrales)_---

## [3.4.8] — 2026-04-03

### Seguridad

- Se remediaron por completo todos los hallazgos pendientes de Github Advanced Security (CodeQL) y las alertas de Dependabot.
- Se corrigieron vulnerabilidades de aleatoriedad inseguras al migrar de `Math.random` a `crypto.randomUUID()`.
- Comandos de shell seguros en scripts automatizados a partir de inyección de cadenas.
- Se migraron patrones de análisis RegEx de retroceso catastróficos vulnerables en canales de chat/traducción.
- Controles de desinfección de salida mejorados dentro de los componentes de React UI e inyección de etiquetas de eventos enviados por el servidor (SSE).---

## [3.4.7] — 2026-04-03

### Funcionalidades

- Se agregó el nodo `Criptografía` a los controles de salud de MCP y monitoreo (#798)
- Asignación reforzada de permisos de ruta de catálogo de modelo (`/models`) (#781)### Bug Fixes

- Se corrigió que las actualizaciones del token Claude OAuth no pudieran preservar los contextos de caché (#937)
- Se corrigieron errores de proveedores compatibles con CC que hacían que los modelos almacenados en caché fueran inalcanzables (#937)
- Se corrigieron errores de GitHub Executor relacionados con matrices de contexto no válidas (#937)
- Se corrigieron fallas de verificación de estado de las herramientas CLI instaladas por NPM en Windows (#935)
- Se corrigió la traducción de la carga útil que eliminaba contenido válido debido a campos API no válidos (#927)
- Se corrigió la falla del tiempo de ejecución en el Nodo 25 con respecto a la ejecución de la clave API (#867)
- Se corrigió la resolución del módulo independiente de MCP (`ERR_MODULE_NOT_FOUND`) a través de `esbuild` (#936)
- Se corrigió la discrepancia en el alias de resolución de credenciales de enrutamiento NVIDIA NIM (#931)### Seguridad

- Se agregó protección estricta y segura de los límites de entrada contra inyecciones de ejecución remota de código `shell: true` sin formato.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Proveedores:**Proveedores registrados de generación de nuevas imágenes, videos y audio de la lista solicitada por la comunidad (#926). -**Interfaz de usuario del panel:**Se agregó navegación en la barra lateral independiente para los nuevos módulos de Memoria y Habilidades (#926). -**i18n:**Se agregaron cadenas de traducción y asignaciones de diseño en 30 idiomas para los espacios de nombres de Memoria y Habilidades.### 🐛 Bug Fixes

-**Resiliencia:**Se evitó que el disyuntor proxy se quedara atascado en un estado ABIERTO indefinidamente al manejar transiciones directas al estado CERRADO dentro de rutas combinadas de respaldo (#930). -**Traducción de protocolo:**Se parcheó el transformador de transmisión para desinfectar los bloques de respuesta según el protocolo _fuente_ esperado en lugar del protocolo _destino_ del proveedor, arreglando los modelos de Anthropics envueltos en cargas útiles de OpenAI que bloqueaban Claude Code (#929). -**Especificaciones de API y Gemini:**Se corrigió el análisis de `think_signature` en los traductores `openai-to-gemini` y `claude-to-gemini`, evitando errores HTTP 400 en todas las llamadas a herramientas API de Gemini 3. -**Proveedores:**Se limpiaron los puntos finales no compatibles con OpenAI que impedían conexiones ascendentes válidas (#926). -**Tendencias de caché:**Se corrigió una discrepancia en los datos de asignación de propiedades no válidas que provocaba que los gráficos de la interfaz de usuario de Tendencias de caché fallaran y se extrajeron widgets de métricas de caché redundantes (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**Integración del ecosistema CLIProxyAPI:**Se agregó el ejecutor `cliproxyapi` con almacenamiento en caché a nivel de módulo integrado y enrutamiento de proxy. Se introdujo un servicio integral de Administrador de versiones para probar automáticamente el estado, descargar archivos binarios de GitHub, generar procesos en segundo plano aislados y administrar de forma limpia el ciclo de vida de las herramientas CLI externas directamente a través de la interfaz de usuario. Incluye tablas de base de datos para la configuración de proxy para permitir el enrutamiento cruzado automático controlado por SSRF de solicitudes OpenAI externas a través de la capa de herramientas CLI local (#914, #915, #916). -**Compatibilidad con Qoder PAT:**Compatibilidad con tokens de acceso personal (PAT) integrados directamente a través del transporte local `qodercli` en lugar de configuraciones remotas heredadas del navegador `.cn` (#913). -**Gemini 3.1 Pro Preview (GitHub):**Se agregó compatibilidad con el modelo explícito canónico `gemini-3.1-pro-preview` de forma nativa en el proveedor GitHub Copilot y al mismo tiempo se conservan los alias de enrutamiento más antiguos (#924).### 🐛 Bug Fixes

-**Estabilidad del token de GitHub Copilot:**Se reparó el ciclo de actualización del token de Copilot donde los tokens obsoletos no se fusionaban profundamente en la base de datos y se eliminaron los campos `reasoning_text` que estaban rompiendo fatalmente las conversiones de bloques antrópicos posteriores para chats de varios turnos (#923). -**Matriz de tiempo de espera global:**Tiempos de espera de solicitud centralizados y parametrizados explícitamente desde `REQUEST_TIMEOUT_MS` para evitar que los buffers de recuperación predeterminados ocultos (~300 s) corten prematuramente las respuestas de transmisión SSE de larga duración de modelos de razonamiento pesado (#918). -**Estado de túneles rápidos de Cloudflare:**Se corrigió una inconsistencia de estado grave en la que las instancias de OmniRoute reiniciadas mostraban erróneamente túneles destruidos como activos y el túnel en la nube predeterminado era `HTTP/2` para eliminar el spam del registro del búfer de recepción UDP (#925). -**Revisión de traducción de i18n (checo e hindi):**Se corrigió el código hindi de `in.json` DEPRECADO a `hi.json` canónico, se revisaron las asignaciones de texto checo, se extrajo `untranslatable-keys.json` para corregir validaciones de falsos positivos de CI/CD y se generaron documentos completos `I18N.md` para guiar a los traductores (#912). -**Recuperación del proveedor de tokens:**Se corrigió que Qwen perdiera puntos finales `resourceUrl` específicos después de las actualizaciones automáticas de tokens de verificación de estado debido a que faltaban fusiones profundas de bases de datos (#917). -**UX y Streaming compatibles con CC:**Unificó las acciones Agregar CC/OpenAI/Anthropic compatible en torno al tratamiento de Anthropic UI, obligó a las solicitudes ascendentes compatibles con CC a usar SSE y al mismo tiempo devolvió respuestas de transmisión o no transmisión según la solicitud del cliente, eliminó la configuración/importación de la lista de modelos CC a favor de un error explícito de lista de modelos no compatibles y hizo que los modelos disponibles compatibles con CC reflejen la lista de registro de Código Claude de OAuth (#921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Reportes de tokens API de respuestas:**Emitir `response.completed` con los campos `input_tokens`/`output_tokens` correctos para los clientes de Codex CLI, arreglando la visualización del uso de tokens (#909 - gracias @christopher-s). -**Punto de control de SQLite WAL al apagar:**Vacíe los cambios de WAL en el archivo de base de datos principal durante el apagado/reinicio ordenado, evitando la pérdida de datos en las paradas del contenedor Docker (#905 - gracias @rdself). -**Señal de apagado elegante:**Se cambiaron las rutas `/api/restart` y `/api/shutdown` de `process.exit(0)` a `process.kill(SIGTERM)`, lo que garantiza que el controlador de apagado se ejecute antes de la salida. -**Docker Stop Grace Period:**Se agregó `stop_grace_period: 40s` a los archivos de Docker Compose y `--stop-timeout 40` a los ejemplos de ejecución de Docker.### 🛠️ Maintenance

- Se cerraron 5 problemas resueltos/sin errores (#872, #814, #816, #890, #877).
- Clasifiqué 6 problemas con solicitudes de información de necesidades (#892, #887, #886, #865, #895, #870).
- Se respondió al problema de seguimiento de detección de CLI (n.º 863) con orientación para los contribuyentes.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Memoria y habilidades de Antigravity:**Se completó la inyección de habilidades y memoria remota para el proveedor de Antigravity a nivel de red proxy. -**Compatibilidad con Claude Code:**Creó un puente de compatibilidad oculto de forma nativa para Claude Code, pasando herramientas y formateando de manera limpia. -**Web Search MCP:**Se agregó la herramienta `omniroute_web_search` con el alcance `execute:search`. -**Componentes de caché:**Componentes de caché dinámicos implementados utilizando TDD. -**UI y personalización:**Se agregó compatibilidad con favicon personalizado, pestañas de apariencia, etiquetas blancas cableadas en la barra lateral y se agregaron pasos de la guía de Windsurf en los 33 idiomas. -**Retención de registros:**Retención de registros de solicitudes unificadas y artefactos de forma nativa. -**Mejoras del modelo:**Se agregó `contextLength` explícito para todos los modelos opencode-zen. -**i18n y traducciones:**Traducciones integradas de 33 idiomas de forma nativa, incluidas validaciones de CI de marcador de posición y actualizaciones de documentación en chino (#873, #869).### 🐛 Bug Fixes

-**Mapeo Qwen OAuth:**Se revirtió la dependencia de `id_token` a `access_token` y se habilitó la inyección dinámica de punto final API `resource_url` para un enrutamiento regional adecuado (#900). -**Motor de sincronización de modelo:**almacenó el ID de proveedor interno estricto en las rutinas de sincronización `getCustomModels()` en lugar del formato de alias del canal UI, evitando errores de inserción del catálogo SQLite (#903). -**Claude Code & Codex:**Respuestas en blanco estandarizadas y sin transmisión a "(respuesta vacía)" con formato Anthropic para evitar fallas del proxy CLI (#866). -**Enrutamiento compatible con CC:**Se resolvió una colisión de punto final `/v1` duplicada durante la concatenación de rutas para puertas de enlace genéricas de Claude Code (#904). -**Paneles de Antigravity:**Se bloqueó el registro falso de modelos de cuotas ilimitadas como estados límite de "Uso del 100 %" agotados en la IU de uso del proveedor (#857). -**Paso a través de imágenes de Claude:**Se corrigió que a los modelos de Claude les faltaran pasos a través de bloques de imágenes (#898). -**Enrutamiento CLI de Gemini:**Se resolvió bloqueos de autorización 403 y problemas de acumulación de contenido al actualizar la ID del proyecto a través de `loadCodeAssist` (#868). -**Estabilidad antigravedad:**Listas de acceso a modelos corregidas, bloqueos 404 aplicados, cascadas 429 fijas que bloquean conexiones estándar y tokens de salida `gemini-3.1-pro` limitados (#885). -**Cadencia de sincronización del proveedor:**Se reparó la cadencia de sincronización de los límites del proveedor a través del programador interno (#888). -**Optimización del panel:**Se resolvió la congelación de la interfaz de usuario `/dashboard/limits` al procesar más de 70 cuentas mediante paralelización de fragmentos (#784). -**Refuerzo SSRF:**Se aplicó un estricto filtrado de rango de IP SSRF y se bloqueó la interfaz de bucle invertido `::1`. -**Tipos MIME:**`mime_type` estandarizado a Snake_case para que coincida con las especificaciones de la API de Gemini. -**Estabilización de CI:**Se corrigieron análisis/configuraciones fallidos, selectores de dramaturgos y aserciones de solicitud para que las ejecuciones de GitHub Actions E2E pasen de manera confiable a través de interfaces de usuario localizadas y controles basados ​​en conmutadores. -**Pruebas deterministas:**Se eliminaron las fijaciones de cuota sensibles a la fecha de las pruebas de uso de Copilot y se alinearon las pruebas de catálogo de modelos/idempotencia con el comportamiento de tiempo de ejecución combinado. -**Refuerzo de tipo MCP:**Se eliminaron las regresiones explícitas "cualquier" de presupuesto cero de la ruta de registro de la herramienta del servidor MCP. -**Motor de sincronización de modelos:**Se omitieron las anulaciones destructivas de "reemplazo" cuando la sincronización automática del proveedor genera una lista de modelos vacía, lo que mantiene la estabilidad de los catálogos dinámicos (#899).### 🛠️ Maintenance

-**Registro de canalización:**Artefactos de registro de canalización refinados y aplicación de límites de retención (#880). -**AGENTS.md Revisión:**Condensado de 297→153 líneas. Se agregaron pautas de compilación/prueba/estilo, flujos de trabajo de código (Prettier, TypeScript, ESLint) y tablas detalladas recortadas (#882). -**Integración de rama de lanzamiento:**Consolidó las ramas de funciones activas en `versión/v3.4.2` además de la actual `principal` y validó la rama con ejecuciones E2E en modo lint, unidad, cobertura, compilación y CI. -**Pruebas:**Se agregó configuración de vitest para pruebas de componentes y especificaciones de Playwright para alternar configuraciones. -**Actualizaciones de documentos:**Archivos Léame raíz ampliados, documentos traducidos al chino de forma nativa y limpieza de archivos obsoletos.## [3.4.1] - 2026-03-31

> [!ADVERTENCIA]
> **CAMBIO IMPORTANTE: se han rediseñado las variables de entorno de registro, retención y registro de solicitudes.**
> En el primer inicio después de la actualización, OmniRoute archiva los registros de solicitudes heredados de `DATA_DIR/logs/`, `DATA_DIR/call_logs/` heredado y `DATA_DIR/log.txt` en `DATA_DIR/log_archives/*.zip`, luego elimina el diseño obsoleto y cambia al nuevo formato de artefacto unificado en `DATA_DIR/call_logs/`.### ✨ New Features

-**Utilidad de migración .ENV:**Se incluye `scripts/migrate-env.mjs` para migrar sin problemas configuraciones `<v3.3` a restricciones estrictas de validación de seguridad `v3.4.x` (FASE-01), reparando fallas de inicio causadas por instancias cortas de `JWT_SECRET`. -**Optimización de la caché de Kiro AI:**Se implementó la generación determinista de `conversationId` (uuidv5) para habilitar el almacenamiento en caché de solicitud de ID de AWS Builder correctamente en todas las invocaciones (#814). -**Restauración y consolidación de la interfaz de usuario del panel:**Se resolvió la lógica de la barra lateral que omite la sección Depurar y se borraron las advertencias de enrutamiento de Nextjs al mover las páginas independientes `/dashboard/mcp` y `/dashboard/a2a` explícitamente a los componentes integrados de la interfaz de usuario de Endpoint Proxy. -**Artefactos del registro de solicitudes unificadas:**El registro de solicitudes ahora almacena una fila de índice SQLite más un artefacto JSON por solicitud en `DATA_DIR/call_logs/`, con captura de canalización opcional integrada en el mismo archivo. -**Idioma:**Se mejoró la traducción al chino (#855) -**Modelos Opencode-Zen:**Se agregaron 4 modelos gratuitos al registro opencode-zen (#854) -**Pruebas:**Se agregaron pruebas unitarias y E2E para alternar configuraciones y corregir errores (#850)### 🐛 Bug Fixes

-**429 Análisis de cuotas:**Se analizaron tiempos prolongados de restablecimiento de cuotas de los cuerpos de error para cumplir con los retrasos correctos y evitar prohibiciones de cuentas con tasa limitada (#859) -**Almacenamiento en caché rápido:**encabezados `cache_control` del cliente preservados para todos los proveedores de protocolo Claude (como Minimax, GLM y Bailian), reconociendo correctamente el soporte de almacenamiento en caché (#856) -**Registros de sincronización de modelos:**Se redujo el spam de registros al registrar "modelos de sincronización" solo cuando el canal realmente modifica la lista (#853) -**Cuota de proveedor y análisis de tokens:**Se cambiaron los límites de Antigravity para usar `retrieveUserQuota` de forma nativa y se asignaron correctamente las cargas útiles de actualización de tokens de Claude a formularios codificados en URL (#862). -**Estabilidad de limitación de velocidad:**Se universalizó la arquitectura de análisis de reintento posterior 429 para limitar los tiempos de reutilización inducidos por el proveedor a un máximo de 24 horas (#862) -**Representación de límites del panel:**Se rediseñó la asignación de cuotas `/dashboard/limits` para representar inmediatamente dentro de los fragmentos, solucionando un retraso importante en la congelación de la interfaz de usuario en cuentas que superan las 70 conexiones activas (#784) -**Autorización QWEN OAuth:**Se asignó el OIDC `id_token` como el token portador de API principal para las solicitudes de Dashscope, corrigiendo errores 401 no autorizados inmediatamente después de conectar cuentas o actualizar tokens (#864). -**Estabilidad de la API ZAI:**Compilador reforzado de eventos enviados por el servidor para recurrir elegantemente a cadenas vacías cuando los proveedores de DeepSeek transmiten contenido matemáticamente nulo durante las fases de razonamiento (#871) -**Claude Code/Codex Translations:**Protegió las conversiones de carga útil que no son de transmisión contra respuestas vacías de las herramientas anteriores del Codex, evitando errores de tipo catastróficos (#866) -**NVIDIA NIM Rendering:**Prefijos de proveedores idénticos eliminados condicionalmente impulsados dinámicamente por modelos de audio, eliminando estructuras de etiquetas duplicadas `nim/nim` que arrojan 404 en Media Playground (#872)### ⚠️ Breaking Changes

-**Diseño de registro de solicitudes:**Se eliminaron las antiguas sesiones de registro de solicitudes de archivos múltiples `DATA_DIR/logs/` y el archivo de resumen `DATA_DIR/log.txt`. Las nuevas solicitudes se escriben como artefactos JSON únicos en `DATA_DIR/call_logs/AAAA-MM-DD/`. -**Variables de entorno de registro:**Se reemplazaron `LOG_*`, `ENABLE_REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE` y `PROXY_LOG_MAX_ENTRIES` con el nuevo modelo de configuración `APP_LOG_*` y `CALL_LOG_RETENTION_DAYS`. -**Configuración de alternancia de canalización:**Se reemplazó la configuración heredada `detailed_logs_enabled` con `call_log_pipeline_enabled`. Los nuevos detalles de la canalización se incrustan dentro del artefacto de solicitud en lugar de almacenarse como registros `request_detail_logs` separados.### 🛠️ Maintenance

-**Copia de seguridad de actualización de registro de solicitud heredada:**Las actualizaciones ahora archivan los diseños antiguos `data/logs/`, `data/call_logs/` heredados y `data/log.txt` en `DATA_DIR/log_archives/*.zip` antes de eliminar la estructura obsoleta. -**Persistencia del uso de transmisión:**Las solicitudes de transmisión ahora escriben una sola fila `usage_history` al finalizar en lugar de emitir una fila de uso duplicada en progreso con metadatos de estado vacíos. -**Limpieza de seguimiento de registros:**Los registros de canalización ya no capturan `SOURCE REQUEST`, las entradas de artefactos de solicitud ahora respetan `CALL_LOG_MAX_ENTRIES` y los archivos de registro de aplicaciones ahora respetan `APP_LOG_MAX_FILES`.---

## [3.4.0] - 2026-03-31

### Funcionalidades

-**Análisis de utilización de suscripciones:**Se agregaron seguimiento de series de tiempo de instantáneas de cuota, pestañas Utilización del proveedor y Estado combinado con visualizaciones de gráficos y puntos finales de API correspondientes (#847) -**Control de copia de seguridad de SQLite:**Nuevo indicador de entorno `OMNIROUTE_DISABLE_AUTO_BACKUP` para deshabilitar las copias de seguridad automáticas de SQLite (#846) -**Actualización del registro de modelos:**Se inyectó `gpt-5.4-mini` en la variedad de modelos del proveedor del Codex (#756) -**Seguimiento del límite de proveedores:**Realice un seguimiento y muestre cuándo se actualizaron por última vez los límites de tarifas del proveedor por cuenta (#843)### 🐛 Bug Fixes

-**Enrutamiento de autenticación Qwen:**Redirigió las finalizaciones de Qwen OAuth desde la API de DashScope a la API de inferencia web (`chat.qwen.ai`), resolviendo fallas de autorización (#844, #807, #832) -**Bucle de reintento automático de Qwen:**Se agregó manejo de retroceso de cuota 429 objetivo excedido dentro de `chatCore` para proteger las solicitudes de ráfaga -**Codex OAuth Fallback:**El bloqueo de ventanas emergentes del navegador moderno ya no atrapa al usuario; automáticamente vuelve a la entrada manual de URL (#808) -**Claude Token Refresh:**Los estrictos límites `application/json` de Anthropic ahora se respetan durante la generación del token en lugar de las URL codificadas (#836) -**Esquema de mensajes del Codex:**Se eliminan los "mensajes" puristas de las solicitudes de transferencia nativas para evitar rechazos estructurales del ChatGPT ascendente (#806) -**Límite de tamaño de detección de CLI:**Aumentó de forma segura el límite superior del escaneo binario del nodo de 100 MB a 350 MB, lo que permite que herramientas independientes pesadas como Claude Code (229 MB) y OpenCode (153 MB) sean detectadas correctamente por el tiempo de ejecución del VPS (#809). -**CLI Runtime Environment:**Capacidad restaurada para que las configuraciones CLI respeten las rutas de anulación del usuario (`CLI_{PROVIDER}_BIN`) sin pasar por estrictas reglas de descubrimiento vinculadas a rutas -**Conflictos de encabezado de Nvidia:**Se eliminaron las propiedades `prompt_cache_key` de los encabezados ascendentes al llamar a proveedores no antrópicos (#848) -**Alternancia rápida de nivel de Codex:**Contraste de alternancia de nivel de servicio de Codex restaurado en modo claro (#842) -**Infraestructura de prueba:**Prueba `t28-model-catalog-updates` actualizada que esperaba incorrectamente el punto final DashScope obsoleto para el registro nativo de Qwen---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Rotación de proveedor personalizada:**`getRotatingApiKey` integrada internamente dentro de DefaultExecutor, lo que garantiza que la rotación de `extraApiKeys` se active correctamente para proveedores ascendentes personalizados y compatibles (#815)---

## [3.3.8] - 2026-03-30

### Funcionalidades

-**Filtrado de API de modelos:**El punto final `/v1/models` ahora filtra dinámicamente su lista según los permisos vinculados a `Autorización: Portador <token>` cuando el acceso restringido está activado (#781) -**Integración de Qoder:**Integración nativa para Qoder AI que reemplaza de forma nativa las asignaciones de la plataforma iFlow heredada (#660) -**Seguimiento de caché rápido:**Se agregaron capacidades de seguimiento y visualización frontal (tarjeta de estadísticas) para el almacenamiento en caché semántico y rápido en la interfaz de usuario del panel.### 🐛 Bug Fixes

-**Tamaño del panel de caché:**Se mejoraron los tamaños de diseño de la interfaz de usuario y los encabezados contextuales para las páginas de caché avanzadas (#835) -**Visibilidad de la barra lateral de depuración:**Se solucionó un problema por el cual la opción de depuración no mostraba/ocultaba correctamente los detalles de depuración de la barra lateral (#834) -**Prefijo del modelo Gemini:**Se modificó el espacio de nombres alternativo para enrutar correctamente a través de `gemini-cli/` en lugar de `gc/` para respetar las especificaciones ascendentes (#831) -**OpenRouter Sync:**Sincronización de compatibilidad mejorada para ingerir automáticamente el catálogo de modelos disponibles correctamente desde OpenRouter (#830) -**Asignación de cargas útiles de transmisión:**La reserialización de campos de razonamiento resuelve de forma nativa rutas de alias en conflicto cuando la salida se transmite a dispositivos perimetrales.---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**OpenCode Config:**Reestructurado `opencode.json` generado para usar el esquema basado en registros `@ai-sdk/openai-compatible` con `opciones` y `modelos` como mapas de objetos en lugar de matrices planas, solucionando fallas de validación de configuración (#816) -**Claves faltantes de i18n:**Se agregó la clave de traducción faltante `cloudflaredUrlNotice` en los archivos de 30 idiomas para evitar errores de consola `MISSING_MESSAGE` en la página Endpoint (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Contabilidad de tokens:**Se incluyeron tokens de caché de aviso de forma segura en los cálculos de entradas de uso histórico para las deducciones de cuota correctas (PR #822) -**Sondas de prueba combinadas:**Se corrigieron los falsos negativos de la lógica de prueba combinada al resolver el análisis de respuestas de solo razonamiento y se permitió la paralelización masiva a través de Promise.all (PR #828) -**Docker Quick Tunnels:**Se incorporaron certificados ca requeridos dentro del contenedor de tiempo de ejecución base para resolver fallas de inicio de TLS de Cloudflared y se detectaron errores de red estándar que reemplazan los códigos de salida genéricos (PR #829).---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Seguimiento de cuota de Gemini:**Se agregó seguimiento de cuota de CLI de Gemini en tiempo real a través de la API `retrieveUserQuota` (PR #825) -**Panel de caché:**Se mejoró el Panel de caché para mostrar métricas de caché rápidas, tendencias de 24 horas y ahorros de costos estimados (PR n.º 824)### 🐛 Bug Fixes

-**Experiencia de usuario:**Se eliminaron los bucles modales invasivos de OAuth de apertura automática en páginas detalladas de proveedores estériles (PR #820) -**Actualizaciones de dependencias:**Dependencias modificadas y bloqueadas para árboles de desarrollo y producción, incluidos Next.js 16.2.1, Recharts y TailwindCSS 4.2.2 (PR #826, #827)---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**Flujos de trabajo A2A:**Se agregó un orquestador FSM determinista para flujos de trabajo de agentes de varios pasos. -**Degradación elegante:**Se agregó un nuevo marco de respaldo multicapa para preservar la funcionalidad principal durante interrupciones parciales del sistema. -**Auditoría de configuración:**Se agregó un seguimiento de auditoría con detección de diferencias para rastrear cambios y permitir reversiones de configuración. -**Estado del proveedor:**Se agregó seguimiento de vencimiento del proveedor con alertas de interfaz de usuario proactivas para claves API que vencen. -**Enrutamiento adaptable:**Se agregó un detector de complejidad y volumen adaptable para anular las estrategias de enrutamiento dinámicamente según la carga. -**Diversidad de proveedores:**Se implementó la puntuación de diversidad de proveedores mediante la entropía de Shannon para mejorar la distribución de la carga. -**Límites de desactivación automática:**Se agregó una opción de configuración para desactivar automáticamente cuentas prohibidas al panel de Resiliencia.### 🐛 Bug Fixes

-**Compatibilidad de Codex y Claude:**Se corrigieron fallas de la interfaz de usuario, se solucionaron problemas de integración sin transmisión del Codex y se resolvió la detección del tiempo de ejecución de CLI en Windows. -**Automatización de lanzamiento:**Se requieren permisos ampliados para la compilación de la aplicación Electron en GitHub Actions. -**Cloudflare Runtime:**Se corrigieron los códigos de salida de aislamiento del tiempo de ejecución correctos para los componentes del túnel de Cloudflared.### 🧪 Tests

-**Actualizaciones del conjunto de pruebas:**Cobertura de prueba ampliada para detectores de volumen, diversidad de proveedores, auditoría de configuración y FSM.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**Confiabilidad de CI/CD:**Acciones de GitHub parcheadas para versiones de dependencia estables (`actions/checkout@v4`, `actions/upload-artifact@v4`) para mitigar las desaprobaciones no anunciadas del entorno del constructor. -**Retrocesos de imágenes:**Se reemplazaron cadenas de respaldo arbitrarias en `ProviderIcon.tsx` con validación de activos explícita para evitar que la interfaz de usuario cargue componentes `<Imagen>` para archivos que no existen, eliminando errores `404` en los registros de la consola del panel (#745). -**Admin Updater:**Detección dinámica de instalación de origen para el actualizador del panel. Desactiva de forma segura el botón "Actualizar ahora" cuando OmniRoute se construye localmente en lugar de a través de npm, solicitando "git pull" (#743). -**Error de actualización de ERESOLVE:**Se inyectaron anulaciones de `package.json` para `react`/`react-dom` y se habilitó `--legacy-peer-deps` dentro de los scripts de actualización automática interna para resolver conflictos de ruptura del árbol de dependencia con `@lobehub/ui`.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Túneles de Cloudflare:**Integración de Cloudflare Quick Tunnel con controles del panel (PR #772). -**Diagnóstico:**Omisión de caché semántica para pruebas en vivo combinadas (PR n.º 773).### 🐛 Bug Fixes

-**Estabilidad de transmisión:**Aplique `FETCH_TIMEOUT_MS` a la llamada inicial `fetch()` de las solicitudes de transmisión para evitar que el tiempo de espera de TCP de Node.js 300 provoque fallas en tareas silenciosas (#769). -**i18n:**Agregue las entradas faltantes de `windsurf` y `copilot` a `toolDescriptions` en los 33 archivos locales (#748). -**Auditoría de codificación GLM:**Auditoría completa del proveedor que soluciona las vulnerabilidades ReDoS, el tamaño de la ventana de contexto (128k/16k) y la sincronización del registro de modelos (PR #778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI Codex:**Corrección de procesamiento alternativo para elementos `tipo: "texto"` que transportaban conjuntos de datos nulos o vacíos que causaron un rechazo 400 (#742). -**Código abierto:**Actualice la alineación del esquema al `proveedor` singular para que coincida con la especificación oficial (#774). -**Gemini CLI:**Inyecte encabezados de cuota de usuario final faltantes para evitar bloqueos de autorización 403 (#775). -**Recuperación de base de datos:**Refactorice las importaciones de carga útil de varias partes en matrices almacenadas en búfer binario sin formato para evitar los límites máximos de cuerpo del proxy inverso (#770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Estabilización de versión**: versión finalizada v3.2.9 (diagnóstico combinado, puertas de calidad, corrección de la herramienta Gemini) y se creó la etiqueta git faltante. Se consolidaron todos los cambios por etapas en una única confirmación de lanzamiento atómico.### 🐛 Bug Fixes

-**Prueba de actualización automática**: se corrigió la aserción de prueba `buildDockerComposeUpdateScript` para que coincida con las referencias de variables de shell no expandidas (`$TARGET_TAG`, `${TARGET_TAG#v}`) en el script de implementación generado, alineándose con la plantilla refactorizada de v3.2.8. -**Prueba de disyuntor**: `combo-circuit-breaker.test.mjs` reforzado mediante la inyección de `maxRetries: 0` para evitar que la inflación de reintentos sesgue las afirmaciones de recuento de fallas durante las transiciones de estado del disyuntor.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Diagnóstico combinado**: se introdujo un indicador de omisión de prueba en vivo (`forceLiveComboTest`) que permite a los administradores ejecutar verificaciones de estado ascendentes reales que omiten todos los mecanismos de estado de enfriamiento y disyuntores locales, lo que permite diagnósticos precisos durante las interrupciones continuas (PR #759). -**Puertas de calidad**: se agregó validación de calidad de respuesta automatizada para combos y soporte del modelo `claude-4.6` oficialmente integrado en los esquemas de enrutamiento principales (PR #762)### 🐛 Bug Fixes

-**Validación de definición de herramienta**: se reparó la integración de la API de Gemini al normalizar los tipos de enumeración dentro de las definiciones de herramientas, evitando errores de parámetros HTTP 400 ascendentes (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Interfaz de usuario de actualización automática de Docker**: se integró un proceso de actualización en segundo plano independiente para las implementaciones de Docker Compose. La interfaz de usuario del panel ahora rastrea sin problemas los eventos del ciclo de vida de las actualizaciones combinando respuestas JSON REST con superposiciones de progreso de transmisión SSE para una sólida confiabilidad entre entornos. -**Cache Analytics**: se reparó el mapeo de visualización de métricas cero migrando los registros de telemetría de Semantic Cache directamente al módulo SQLite de seguimiento centralizado.### 🐛 Bug Fixes

-**Lógica de autenticación**: se corrigió un error por el cual fallaba al guardar la configuración del panel o agregar modelos con un error 401 no autorizado cuando "requireLogin" estaba deshabilitado. Los puntos finales de API ahora evalúan correctamente la alternancia de autenticación global. Se resolvió la redirección global reactivando `src/middleware.ts`. -**Detección de herramientas CLI (Windows)**: se evitaron excepciones fatales de inicialización durante la detección del entorno CLI al detectar correctamente los errores ENOENT de "generación cruzada". Agrega rutas de detección explícitas para `\AppData\Local\droid\droid.exe`. -**Pasaje nativo del Codex**: parámetros de traducción del modelo normalizados que evitan el envenenamiento del contexto en el modo de paso a través del proxy, aplicando restricciones genéricas de "almacenamiento: falso" explícitamente para todas las solicitudes originadas en el Codex. -**Informes de tokens SSE**: detección normalizada del fragmento de llamada de herramienta del proveedor `finish_reason`, lo que corrige el análisis de uso del 0% para respuestas de solo transmisión que carecen de indicadores estrictos `<DONE>`. -**Etiquetas DeepSeek <think>**: se implementó un mapeo de extracción `<think>` explícito dentro de `responsesHandler.ts`, lo que garantiza que los flujos de razonamiento de DeepSeek se mapeen de manera equivalente a las estructuras antrópicas nativas `<thinking>`.---

## [3.2.7] - 2026-03-29

### Fixed

-**Actualizaciones fluidas de la interfaz de usuario**: la función "Actualizar ahora" en el Panel ahora proporciona comentarios en vivo y transparentes mediante eventos enviados por el servidor (SSE). Realiza la instalación de paquetes, reconstruye módulos nativos (better-sqlite3) y PM2 se reinicia de manera confiable mientras muestra cargadores en tiempo real en lugar de colgarse silenciosamente.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Revelación de clave API (#740)**: se agregó un flujo de copia de clave API con alcance en Api Manager, protegido por la variable de entorno `ALLOW_API_KEY_REVEAL`. -**Controles de visibilidad de la barra lateral (#739)**: los administradores ahora pueden ocultar cualquier enlace de navegación de la barra lateral a través de la configuración de Apariencia para reducir el desorden visual. -**Pruebas combinadas estrictas (#735)**: se fortaleció el punto final de verificación de estado combinado para requerir respuestas de texto en vivo de los modelos en lugar de solo señales suaves de accesibilidad. -**Registros detallados transmitidos (#734)**: se cambió el registro de solicitudes detalladas para transmisiones SSE para reconstruir la carga útil final, lo que ahorra inmensas cantidades de tamaño de la base de datos SQLite y limpia significativamente la interfaz de usuario.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**: se corrigió la lógica del encabezado de autenticación para los modelos `minimax` en OpenCode Go para usar `x-api-key` en lugar de tokens de portador estándar en todo el protocolo `/messages`.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Void Linux Deployment Support (#732)**— Plantilla de empaquetado `xbps-src` integrada e instrucciones para compilar e instalar OmniRoute de forma nativa con enlaces `better-sqlite3` a través de un destino de compilación cruzada.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Migración de Qoder AI (#660)**: migré completamente el proveedor principal heredado `iFlow` a `Qoder AI` manteniendo capacidades de enrutamiento API estables.### 🐛 Bug Fixes

-**Argumento no válido de carga útil HTTP 400 de Gemini Tools (n.° 731)**: se evitaron las inyecciones de matriz `thinkSignature` dentro de las secuencias estándar `functionCall` de Gemini que bloqueaban los flujos de enrutamiento agente.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**IU de cuota de límites de proveedor (#728)**— Lógica de límite de cuota normalizada y etiquetado de datos dentro de la interfaz de Límites.### 🐛 Bug Fixes

-**Esquemas y fugas de enrutamiento central**: `comboStrategySchema` ampliado para admitir de forma nativa estrategias `fill-first` y `p2c` para desbloquear la edición combinada compleja de forma nativa. -**Extracción de etiquetas de pensamiento (CLI)**: RegEx reestructurado del desinfectante de respuestas de token CLI que captura las estructuras de razonamiento del modelo dentro de las secuencias evitando extracciones de `<pensamiento>` rotas que rompen el formato de salida del texto de respuesta. -**Aplicaciones estrictas de formato**: ejecución de saneamiento de canalización reforzada que hace que se aplique universalmente a los objetivos del modo de traducción.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Canalización de registro de solicitudes de cuatro etapas (n.° 705)**: persistencia de registros refactorizada para guardar cargas útiles completas en cuatro etapas distintas de la canalización: solicitud del cliente, solicitud del proveedor traducida, respuesta del proveedor y respuesta del cliente traducida. Se introdujo `streamPayloadCollector` para un robusto truncamiento de flujo SSE y serialización de carga útil.### 🐛 Bug Fixes

-**Correcciones de la interfaz de usuario móvil (#659)**: se evitó que los componentes de la tabla en el tablero rompieran el diseño en ventanas de visualización estrechas al agregar desplazamiento horizontal adecuado y contención de desbordamiento a "DashboardLayout". -**Correcciones de caché de solicitud de Claude (n.º 708)**: se garantiza que los bloques `cache_control` en los bucles de respaldo de Claude a Claude se conserven fielmente y se pasen de forma segura a los modelos Anthropic. -**Definiciones de herramientas Gemini (#725)**: se corrigieron errores de traducción de esquemas al declarar tipos de parámetros de "objeto" simples para la llamada a funciones de Gemini.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Proveedor de respaldo global (#689)**: cuando se agotan todos los modelos combinados (502/503), OmniRoute ahora intenta un modelo de respaldo global configurable antes de devolver el error. Establezca `globalFallbackModel` en la configuración para habilitarlo.### 🐛 Bug Fixes

-**Solución n.º 721**: se corrigió la omisión de fijación de contexto durante las respuestas de llamadas de herramientas. El etiquetado sin transmisión utilizó una ruta JSON incorrecta (`json.messages` → `json.choices[0].message`). La inyección de transmisión ahora se activa en fragmentos `finish_reason` para transmisiones de solo llamada a herramientas. `injectModelTag()` ahora agrega mensajes pin sintéticos para contenido que no es cadena. -**Solución #709**— Confirmado ya arreglado (v3.1.9) — `system-info.mjs` crea directorios de forma recursiva. Cerrado. -**Solución #707**— Confirmado ya arreglado (v3.1.9) — desinfección de nombre de herramienta vacía en `chatCore.ts`. Cerrado.### 🧪 Tests

- Se agregaron 6 pruebas unitarias para fijación de contexto con respuestas de llamadas de herramientas (contenido nulo, contenido de matriz, ida y vuelta, reinyección)## [3.2.0] — 2026-03-28

### ✨ New Features

-**IU de administración de caché**: se agregó un panel de almacenamiento en caché semántico dedicado en \`/dashboard/cache\` con invalidación de API específica y compatibilidad con i18n en 31 idiomas (PR #701 por @oyi77) -**Seguimiento de cuota de GLM**: Se agregó seguimiento de cuota de sesión y uso en tiempo real para el proveedor de codificación GLM (Z.AI) (PR #698 por @christopher-s) -**Cargas útiles de registro detalladas**: captura cableada de carga útil de canalización completa de cuatro etapas (original, traducida, respuesta del proveedor, deltas transmitidos) directamente a la interfaz de usuario (PR #705 por @rdself)### 🐛 Bug Fixes

-**Solución n.º 708**: se evitó la pérdida de token para los usuarios de Claude Code que enrutaban a través de OmniRoute al conservar correctamente los encabezados nativos \`cache_control\` durante el paso de Claude a Claude (PR n.º 708 de @tombii) -**Solución n.° 719**: configure límites de autenticación internos para \`ModelSyncScheduler\` para evitar fallas de demonios no autenticados en el inicio (PR n.° 719 de @rdself) -**Solución n.º 718**: representación de insignia reconstruida en la interfaz de usuario de límites del proveedor para evitar la superposición de límites de cuota incorrectos (PR n.º 718 de @rdself) -**Solución n.º 704**: se corrigieron las alternativas combinadas que se rompían en errores de política de contenido HTTP 400 que impedían el enrutamiento muerto de la rotación del modelo (PR n.° 704 de @rdself)### 🔒 Security & Dependencies

- Se modificó \`path-to-regexp\` a \`8.4.0\` resolviendo vulnerabilidades de dependientes (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**Solución #706**— Se corrigió la representación alternativa de íconos causada por la anulación de `font-sans` de Tailwind V4 al aplicar `!important` a `.material-symbols-outlined`. -**Solución n.º 703**: se corrigieron los flujos rotos de GitHub Copilot al habilitar la traducción del formato `respuestas` a `openai` para cualquier modelo personalizado que aproveche `apiFormat: "responses"`. -**Solución n.º 702**: se reemplazó el seguimiento de uso de tarifa plana con cálculos precisos de precios de base de datos para respuestas tanto de transmisión como de no transmisión. -**Solución n.º 716**: se limpió el estado de traducción de las llamadas a herramientas de Claude, se analizaron correctamente los argumentos de transmisión y se evitó que los fragmentos de `tool_calls` de OpenAI repitieran el campo `id`.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Coerción de esquema**: coacciona automáticamente las restricciones de esquema JSON numérico con codificación de cadena (por ejemplo, `"mínimo": "1"`) a los tipos adecuados, lo que evita errores 400 de Cursor, Cline y otros clientes que envían esquemas de herramientas con formato incorrecto. -**Desinfección de descripciones de herramientas**: asegúrese de que las descripciones de las herramientas sean siempre cadenas; convierte descripciones nulas, indefinidas o numéricas en cadenas vacías antes de enviarlas a los proveedores. -**Botón Borrar todos los modelos**: se agregaron traducciones i18n para la acción del proveedor "Borrar todos los modelos" en los 30 idiomas. -**Exportación de autenticación de Codex**: se agregaron botones de exportación y aplicación local de Codex `auth.json` para una integración CLI perfecta. -**Notas de Windsurf BYOK**: se agregaron advertencias de limitación oficiales a la tarjeta de herramientas CLI de Windsurf que documentan las restricciones de BYOK.### 🐛 Bug Fixes

-**Solución #709**— `system-info.mjs` ya no falla cuando el directorio de salida no existe (se agregó `mkdirSync` con indicador recursivo). -**Solución n.º 710**: el singleton A2A `TaskManager` ahora usa `globalThis` para evitar fugas de estado en las recopilaciones de rutas de la API Next.js en modo de desarrollo. Conjunto de pruebas E2E actualizado para manejar 401 con elegancia. -**Solución n.º 711**: se agregó la aplicación del límite de `max_tokens` específico del proveedor para solicitudes ascendentes. -**Corrección n.º 605/n.º 592**: elimina el prefijo `proxy_` de los nombres de las herramientas en las respuestas de Claude que no se transmiten; Se corrigió la URL de validación de LongCat. -**Límite máximo de registros de llamadas**: `getMaxCallLogs()` actualizado con capa de almacenamiento en caché, compatibilidad con env var (`CALL_LOGS_MAX`) e integración de configuración de base de datos.### 🧪 Tests

- Conjunto de pruebas ampliado de 964 → 1027 pruebas (63 pruebas nuevas)
- Se agregó `schema-coercion.test.mjs`: 9 pruebas para coerción de campos numéricos y desinfección de descripciones de herramientas.
- Se agregó `t40-opencode-cli-tools-integration.test.mjs`: pruebas de integración de OpenCode/Windsurf CLI
- Rama de pruebas de funciones mejorada con herramientas de cobertura integral### 📁 New Files

| Archivo                                                      | Propósito                                                                     |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------- | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`              | Coerción de esquemas y descripción de herramientas utilidades de desinfección |
| `pruebas/unidad/schema-coercion.test.mjs`                    | Pruebas unitarias para coerción de esquemas                                   |
| `pruebas/unidad/t40-opencode-cli-tools-integration.test.mjs` | Pruebas de integración de herramientas CLI                                    |
| `COVERAGE_PLAN.md`                                           | Documento de planificación de cobertura de prueba                             | ### 🐛 Bug Fixes |

-**Claude Prompt Caching Passthrough**: se corrigieron los marcadores cache_control que se eliminaban en el modo de paso a través de Claude (Claude → OmniRoute → Claude), lo que causaba que los usuarios de Claude Code agotaran su cuota de Anthropic API entre 5 y 10 veces más rápido que las conexiones directas. OmniRoute ahora conserva los marcadores cache_control del cliente cuando sourceFormat y targetFormat son Claude, lo que garantiza que el almacenamiento en caché rápido funcione correctamente y reduzca drásticamente el consumo de tokens.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Núcleo de la plataforma:**Se implementó el manejo del estado global para los modelos y combos ocultos, evitando que saturaran el catálogo o se filtraran a los agentes MCP conectados (#681). -**Estabilidad:**Fallos de transmisión parcheados relacionados con la falla de integración del proveedor nativo de Antigravity debido a matrices de estado indefinidas no controladas (#684). -**Sincronización de localización:**Se implementó un sincronizador `i18n` completamente revisado que detecta propiedades JSON anidadas faltantes y actualiza 30 configuraciones regionales secuencialmente (#685).## [3.1.7] - 2026-03-27### 🐛 Bug Fixes

-**Estabilidad de transmisión:**Se corrigió que `hasValuableContent` devolviera `indefinido` para fragmentos vacíos en transmisiones SSE (#676). -**Llamadas a herramientas:**Se solucionó un problema en `sseParser.ts` donde las respuestas de Claude sin transmisión con múltiples llamadas a herramientas eliminaban el `id` de las llamadas a herramientas posteriores debido a una deduplicación basada en índices incorrecta (#671).---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Restauración de nombres de herramientas nativas de Claude**: los nombres de herramientas como `TodoWrite` ya no tienen el prefijo `proxy_` en las respuestas de paso a través de Claude (tanto de transmisión como de no transmisión). Incluye cobertura de prueba unitaria (PR #663 por @coobabm) -**Borrar limpieza de alias de todos los modelos**: el botón "Borrar todos los modelos" ahora también elimina los alias de modelos asociados, evitando modelos fantasma en la interfaz de usuario (PR #664 por @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Backoff Auto-Decay**: las cuentas con tasa limitada ahora se recuperan automáticamente cuando expira su ventana de recuperación, solucionando un punto muerto donde un alto `backoffLevel` quitaba prioridad permanentemente a las cuentas (PR #657 por @brendandebeasi)### 🌍 i18n

-**Revisión de la traducción al chino**: reescritura integral de `zh-CN.json` con precisión mejorada (PR #658 por @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Solución de anulación de transmisión**: el `stream: true` explícito en el cuerpo de la solicitud ahora tiene prioridad sobre el encabezado `Accept: application/json`. Los clientes que envíen ambos recibirán correctamente las respuestas de transmisión SSE (#656)### 🌍 i18n

-**Mejoras en las cadenas checas**: terminología refinada en `cs.json` (PR #655 por @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 claves de traducción faltantes**agregadas a `en.json` y 12 idiomas (PR #652 por @zen0bit) -**Documentación checa actualizada**: guías CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT (PR #652) -**Scripts de validación de traducción**: `check_translations.py` y `validate_translation.py` para CI/QA (PR #651 por @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Crítico: Regresión de llamadas a herramientas**: se corrigieron errores de `proxy_Bash` al deshabilitar el prefijo del nombre de la herramienta `proxy_` en la ruta de paso de Claude. Herramientas como `Bash`, `Read`, `Write` fueron renombradas a `proxy_Bash`, `proxy_Read`, etc., lo que provocó que Claude las rechazara (#618) -**Documentación de prohibición de cuentas de Kiro**: documentado como falso positivo antifraude de AWS ascendente, no como un problema de OmniRoute (#649)### 🧪 Tests

-**936 pruebas, 0 fallas**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Metadatos de capacidad de visión**: se agregaron `capabilities.vision`, `input_modalities` y `output_modalities` a las entradas `/v1/models` para modelos con capacidad de visión (PR #646) -**Modelos Gemini 3.1**: Se agregaron `gemini-3.1-pro-preview` y `gemini-3.1-flash-lite-preview` al proveedor Antigravity (#645)### 🐛 Bug Fixes

-**Error 401 de Ollama Cloud**: se corrigió la URL base de API incorrecta: se cambió de `api.ollama.com` a `ollama.com/v1/chat/completions` oficial (#643) -**Reintento de token vencido**: se agregó reintento limitado con retroceso exponencial (5→10→20 min) para conexiones OAuth vencidas en lugar de omitirlas permanentemente (PR #647)### 🧪 Tests

-**936 pruebas, 0 fallas**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**Plantillas de problemas de GitHub**: se agregaron informes de errores estandarizados, solicitud de funciones y plantillas de problemas de configuración/proxy (#641) -**Borrar todos los modelos**: se agregó un botón "Borrar todos los modelos" a la página de detalles del proveedor con soporte i18n en 29 idiomas (#634)### 🐛 Bug Fixes

-**Conflicto de configuración regional (`in.json`)**: se cambió el nombre del archivo de configuración regional en hindi de `in.json` (código ISO de Indonesia) a `hi.json` para solucionar conflictos de traducción en Weblate (#642) -**Nombres de herramientas vacías del Codex**: se movió la desinfección de nombres de herramientas antes del paso nativo del Codex, corrigiendo 400 errores de proveedores anteriores cuando las herramientas tenían nombres vacíos (#637) -**Transmisión de artefactos de nueva línea**: se agregó `collapseExcessiveNewlines` al desinfectante de respuesta, colapsando ejecuciones de más de 3 nuevas líneas consecutivas de modelos de pensamiento en una doble nueva línea estándar (#638) -**Esfuerzo de razonamiento de Claude**: se convirtió el parámetro `reasoning_effort` de OpenAI al bloque de presupuesto nativo `thinking` de Claude en todas las rutas de solicitud, incluido el ajuste automático de `max_tokens` (#627) -**Actualización de token Qwen**: se implementaron actualizaciones proactivas de token OAuth antes de la caducidad (búfer de 5 minutos) para evitar que las solicitudes fallen cuando se utilizan tokens de corta duración (#631).### 🧪 Tests

-**936 pruebas, 0 fallas**(+10 pruebas desde 3.0.9)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**Tokens NaN en Claude Code/respuestas de clientes (#617):**

- `sanitizeUsage()` ahora cruza mapas `input_tokens`→`prompt_tokens` y `output_tokens`→`completion_tokens` antes del filtro de lista blanca, corrigiendo respuestas que muestran recuentos de tokens NaN/0 cuando los proveedores devuelven nombres de campos de uso estilo Claude### Seguridad

- Paquete `yaml` actualizado para corregir la vulnerabilidad de desbordamiento de pila (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

- Cerrado #613 (Codestral – resuelto con una solución alternativa del Proveedor personalizado)
- Comentado en el n.º 615 (punto final dual OpenCode: solución alternativa proporcionada, rastreada como solicitud de función)
- Comentado en el n.º 618 (visibilidad de llamada de herramienta: solicitud de prueba v3.0.9)
- Comentado en el n.° 627 (nivel de esfuerzo, ya admitido)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Errores de traducción para proveedores de formato OpenAI en Claude CLI (#632):**

- Maneja el formato de matriz `reasoning_details[]` de StepFun/OpenRouter; se convierte a `reasoning_content`
- Manejar el alias del campo `razoning` de algunos proveedores → normalizado a `reasoning_content`
- Nombres de campos de uso entre mapas: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` en `filterUsageForFormat`
- Se corrigió `extractUsage` para aceptar `input_tokens`/`output_tokens` y `prompt_tokens`/`completion_tokens` como campos de uso válidos.
- Se aplica tanto a rutas de streaming (`sanitizeStreamingChunk`, traductor `openai-to-claude.ts`) como a rutas de no streaming (`sanitizeMessage`)---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Actualización del token de Antigravity:**Se corrigió el error "falta client_secret" para los usuarios instalados con npm: "clientSecretDefault" estaba vacío en el registro de proveedores, lo que provocó que Google rechazara las solicitudes de actualización del token (#588). -**Modelos OpenCode Zen:**Se agregó `modelsUrl` a la entrada del registro OpenCode Zen para que "Importar desde /modelos" funcione correctamente (#612) -**Artefactos de transmisión:**Se corrigieron las nuevas líneas excesivas que quedaban en las respuestas después de eliminar la firma de la etiqueta de pensamiento (#626) -**Retroceso de proxy:**Se agregó reintento automático sin proxy cuando falla el relé SOCKS5 -**Prueba de proxy:**El punto final de prueba ahora resuelve las credenciales reales de la base de datos a través de proxyId### ✨ New Features

-**Selector de claves/cuentas de Playground:**Menú desplegable persistente y siempre visible para seleccionar cuentas/claves de proveedores específicos para realizar pruebas: recupera todas las conexiones al inicio y filtra por proveedor seleccionado -**Modelos dinámicos de herramientas CLI:**La selección de modelos ahora se obtiene dinámicamente de la API `/v1/models`; proveedores como Kiro ahora muestran su catálogo de modelos completo -**Lista de modelos antigravedad:**Actualizado con Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; habilitado `passthroughModels` para acceso dinámico al modelo (#628)### 🔧 Maintenance

- PR n.º 625 fusionado: corrección de fondo del modo de luz de límites del proveedor---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Límites/Proxy:**Se corrigió el límite de recuperación del Codex para cuentas detrás de proxies SOCKS5: la actualización del token ahora se ejecuta dentro del contexto del proxy -**CI:**Se corrigió el error de aserción de la prueba de integración `v1/modelos` en entornos de CI sin conexiones de proveedor -**Configuración:**El botón de prueba proxy ahora muestra los resultados de éxito/fracaso inmediatamente (anteriormente oculto detrás de los datos de salud)### ✨ New Features

-**Playground:**Menú desplegable de selección de cuentas agregado: pruebe conexiones específicas individualmente cuando un proveedor tiene varias cuentas### 🔧 Maintenance

- PR n.º 623 fusionado: corrección de la ruta de URL base de la API de LongCat---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Limita la interfaz de usuario:**Se agregó la función de agrupación de etiquetas al panel de conexiones para mejorar la organización visual de las cuentas con etiquetas personalizadas.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Transmisión:**Se corrigió la corrupción del estado de `TextDecoder` dentro del combo `sanitize` TransformStream que causaba que SSE confundiera la salida que coincidía con caracteres multibyte (PR #614) -**IU de proveedores:**Represente de forma segura etiquetas HTML dentro de información sobre herramientas de error de conexión del proveedor usando `dangerfullySetInnerHTML` -**Configuración de proxy:**Se agregaron las propiedades del cuerpo de carga útil `nombre de usuario` y `contraseña` que faltaban, lo que permite verificar con éxito los servidores proxy autenticados desde el Panel de control. -**API del proveedor:**La excepción suave vinculada regresa a `getCodexUsage`, lo que evita fallas de API HTTP 500 cuando falla la recuperación del token.---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Modelos de sincronización automática:**Se agregó un interruptor de interfaz de usuario y un punto final de "modelos de sincronización" para sincronizar automáticamente las listas de modelos por proveedor usando un programador de intervalos programados (PR #597)### 🐛 Bug Fixes

-**Tiempos de espera:**Proxies predeterminados elevados `FETCH_TIMEOUT_MS` y `STREAM_IDLE_TIMEOUT_MS` a 10 minutos para admitir adecuadamente modelos de razonamiento profundo (como o1) sin abortar solicitudes (Correcciones #609) -**Detección de herramienta CLI:**Detección multiplataforma mejorada que maneja rutas NVM, `PATHEXT` de Windows (evitando el problema de contenedores `.cmd`) y prefijos NPM personalizados (PR #598) -**Registros de transmisión:**Se implementó la acumulación delta de `tool_calls` en los registros de respuesta de transmisión para que las llamadas a funciones se realicen un seguimiento y persistan con precisión en la base de datos (PR #603) -**Catálogo de modelos:**Se eliminó la exención de autenticación, ocultando correctamente los modelos `comfyui` y `sdwebui` cuando no hay ningún proveedor configurado explícitamente (PR #599)### 🌐 Translations

-**cs:**Cadenas de traducción checas mejoradas en toda la aplicación (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Se agregó un campo Etiqueta/Grupo a `EditConnectionModal` (almacenado en `providerSpecificData.tag`) sin requerir migraciones de esquema de base de datos.
- Las conexiones en la vista del proveedor ahora se agrupan dinámicamente por etiqueta con divisores visuales.
- Las conexiones sin etiquetar aparecen primero sin encabezado, seguidas de los grupos etiquetados en orden alfabético.
- La agrupación de etiquetas se aplica automáticamente a la sección Codex/Copilot/Límites de antigravedad ya que existen opciones dentro de las filas de conexión.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Faltan insignias en las tarjetas de conexión:**Se solucionó usando `resolveProxyForConnection()` en lugar de mapeo estático. -**Probar conexión deshabilitada en modo guardado:**Habilitó el botón Probar resolviendo la configuración de proxy de la lista guardada. -**Congelación modal de configuración:**Se agregaron llamadas `onClose()` después de guardar/borrar para evitar que la interfaz de usuario se congele. -**Recuento de uso doble:**`ProxyRegistryManager` ahora carga el uso con entusiasmo en el montaje con deduplicación mediante `scope` + `scopeId`. Los recuentos de uso se reemplazaron con un botón de prueba que muestra IP/latencia en línea.#### fix(translator): `function_call` prefix stripping

- Se reparó una solución incompleta del PR #607 donde solo los bloques `tool_use` eliminaban el prefijo de herramienta `proxy_` de Claude. Ahora, los clientes que utilicen el formato API de OpenAI Responses también recibirán correctamente herramientas sin el prefijo `proxy_`.---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Se han resuelto tres regresiones críticas informadas por los usuarios después del lanzamiento de la versión 3.0.0.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

El prefijo `proxy_` agregado por Claude OAuth solo se eliminó de las respuestas de**transmisión**. En el modo**sin transmisión**, `translateNonStreamingResponse` no tenía acceso a `toolNameMap`, lo que provocaba que los clientes recibieran nombres de herramientas alterados como `proxy_read_file` en lugar de `read_file`.

**Solución:**Se agregó el parámetro opcional `toolNameMap` a `translateNonStreamingResponse` y se aplicó la eliminación de prefijos en el controlador de bloques Claude `tool_use`. `chatCore.ts` ahora pasa el mapa.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI no expone "GET /v1/models". El validador genérico `validateOpenAICompatibleProvider` pasó a un respaldo de finalización de chat solo si se configuró `validationModelId`, que LongCat no configura. Esto provocó que la validación del proveedor fallara con un error engañoso al agregar/guardar.

**Solución:**Se agregó `longcat` al mapa de validadores especializados, investigando `/chat/completions` directamente y tratando cualquier respuesta que no sea de autenticación como un pase.#### fix(translator): normalize object tool schemas for Anthropic (#595)

Las herramientas MCP (por ejemplo, `pencil`, `computer_use`) envían definiciones de herramientas con `{type:"object"}` pero sin un campo `properties`. La API de Anthropic los rechaza con: "propiedades faltantes del esquema de objeto".

**Solución:**En `openai-to-claude.ts`, inyecte `properties: {}` como valor predeterminado seguro cuando `type` es `"object"` y `properties` está ausente.---

### 🔀 Community PRs Merged (2)

| relaciones públicas | Autor   | Resumen                                                                                                                 |
| ------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------- | --- |
| **#589**            | @flobo3 | docs(i18n): corrige la traducción al ruso para Playground y Testbed                                                     |
| **#591**            | @rdself | corrección (ui): mejora el contraste del modo de luz de los límites del proveedor y la visualización del nivel del plan | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

-**926 pruebas, 0 fallas**(sin cambios desde v3.0.0)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **El lanzamiento más grande hasta la fecha.**Desde 36 proveedores en v2.9.5 hasta**67+ proveedores**en v3.0.0, con servidor MCP, protocolo A2A, motor de combinación automática, iconos de proveedores, API de claves registradas, 926 pruebas y contribuciones de**12 miembros de la comunidad**en**10 RP fusionados**.
>
> Consolidado desde v3.0.0-rc.1 hasta rc.17 (17 versiones candidatas durante 3 días de intenso desarrollo).---

### 🆕 New Providers (+31 since v2.9.5)

| Proveedor                                | Alias ​​               | Nivel         | Notas                                                                                                   |
| ---------------------------------------- | ---------------------- | ------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Zen de código abierto**                | `código abierto-zen`   | Gratis        | 3 modelos a través de `opencode.ai/zen/v1` (PR #530 por @kang-heewon)                                   |
| **OpenCode Ir**                          | `código abierto-ir`    | Pagado        | 4 modelos a través de `opencode.ai/zen/go/v1` (PR #530 por @kang-heewon)                                |
| **AI de gato largo**                     | `lc`                   | Gratis        | 50 millones de tokens/día (Flash-Lite) + 500 000/día (Chat/Pensamiento) durante la versión beta pública |
| **Polinizaciones AI**                    | `pol`                  | Gratis        | No se necesita clave API: GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 solicitud/15 s)                |
| **IA de los trabajadores de Cloudflare** | `cf`                   | Gratis        | 10.000 neuronas/día: ~150 respuestas LLM o 500 audios Whisper, inferencia de bordes                     |
| **Escala IA**                            | `scw`                  | Gratis        | 1 millón de tokens gratis para cuentas nuevas: cumple con el RGPD/UE (París)                            |
| **API de IA/ML**                         | `apunta`               | Gratis        | Créditos gratuitos de $0,025/día: más de 200 modelos a través de un único punto final                   |
| **Computadora IA**                       | `pu`                   | Gratis        | Más de 500 modelos (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)                            |
| **Nube de Alibaba (DashScope)**          | `ali`                  | Pagado        | Puntos finales internacionales + China a través de `alicode`/`alicode-intl`                             |
| **Plan de codificación de Alibaba**      | `bcp`                  | Pagado        | Alibaba Model Studio con API compatible con Anthropic                                                   |
| **Codificación Kimi (clave API)**        | `kmca`                 | Pagado        | Acceso Kimi dedicado basado en clave API (separado de OAuth)                                            |
| **Codificación MiniMax**                 | `minimax`              | Pagado        | Punto final internacional                                                                               |
| **MiniMax (China)**                      | `minimax-cn`           | Pagado        | Punto final específico de China                                                                         |
| **Z.AI (GLM-5)**                         | `zai`                  | Pagado        | Modelos GLM de próxima generación de Zhipu AI                                                           |
| **IA de vértice**                        | `vértice`              | Pagado        | Google Cloud: cuenta de servicio JSON u OAuth access_token                                              |
| **Nube de Ollama**                       | `ollamacloud`          | Pagado        | Servicio API alojado de Ollama                                                                          |
| **Sintético**                            | `sintético`            | Pagado        | Pasarela de modelos de paso                                                                             |
| **Puerta de enlace Kilo**                | `kg`                   | Pagado        | Pasarela de modelos de paso                                                                             |
| **Búsqueda de perplejidad**              | `pplx-búsqueda`        | Pagado        | Punto final dedicado basado en búsquedas                                                                |
| **Búsqueda de Serper**                   | `búsqueda de servidor` | Pagado        | Integración de API de búsqueda web                                                                      |
| **Búsqueda valiente**                    | `búsqueda valiente`    | Pagado        | Integración de la API de Brave Search                                                                   |
| **Búsqueda adicional**                   | `exa-búsqueda`         | Pagado        | Integración de API de búsqueda neuronal                                                                 |
| **Búsqueda de Tavily**                   | `tavily-buscar`        | Pagado        | Integración de API de búsqueda de IA                                                                    |
| **NanoPlátano**                          | `nb`                   | Pagado        | API de generación de imágenes                                                                           |
| **ElevenLabs**                           | `el`                   | Pagado        | Síntesis de voz de texto a voz                                                                          |
| **Cartesia**                             | `cartesia`             | Pagado        | Síntesis de voz TTS ultrarrápida                                                                        |
| **ReproducirHT**                         | `playht`               | Pagado        | Clonación de voz y TTS                                                                                  |
| **Inmundo**                              | `inmundo`              | Pagado        | Chat de voz con personajes de IA                                                                        |
| **UI web SD**                            | `sdwebui`              | Autohospedado | Generación de imágenes locales de difusión estable                                                      |
| **Interfaz de usuario cómoda**           | `cómodo`               | Autohospedado | Generación basada en nodos de flujo de trabajo local de ComfyUI                                         |
| **Codificación GLM**                     | `glm`                  | Pagado        | Punto final específico de codificación BigModel/Zhipu                                                   | **Total: más de 67 proveedores**(4 gratuitos, 8 OAuth, 55 clave API) + proveedores personalizados ilimitados compatibles con OpenAI/Anthropic.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Genere y emita automáticamente claves API de OmniRoute mediante programación con aplicación de cuotas por proveedor y por cuenta.

| Punto final                        | Método             | Descripción                                                              |
| ---------------------------------- | ------------------ | ------------------------------------------------------------------------ |
| `/api/v1/claves-registradas`       | `POST`             | Emitir una nueva clave: la clave sin formato se devuelve**solo una vez** |
| `/api/v1/claves-registradas`       | `OBTENER`          | Lista de claves registradas (enmascaradas)                               |
| `/api/v1/claves-registradas/{id}`  | `OBTENER/ELIMINAR` | Obtener metadatos/Revocar                                                |
| `/api/v1/quotas/check`             | `OBTENER`          | Prevalidar cuota antes de emitir                                         |
| `/api/v1/proveedores/{id}/limites` | `OBTENER/PONER`    | Configurar límites de emisión por proveedor                              |
| `/api/v1/cuentas/{id}/límites`     | `OBTENER/PONER`    | Configurar límites de emisión por cuenta                                 |
| `/api/v1/issues/report`            | `POST`             | Informar eventos de cuota a GitHub Problemas                             |

**Seguridad:**Claves almacenadas como hashes SHA-256. La clave sin formato se muestra una vez en el momento de la creación y nunca más se puede recuperar.#### 🎨 Provider Icons via @lobehub/icons (#529)

Más de 130 logotipos de proveedores que utilizan componentes React `@lobehub/icons` (SVG). Cadena alternativa:**Lobehub SVG → PNG existente → icono genérico**. Se aplica en las páginas de Panel de control, Proveedores y Agentes con el componente estandarizado "ProviderIcon".#### 🔄 Model Auto-Sync Scheduler (#488)

Actualiza automáticamente las listas de modelos para proveedores conectados cada**24 horas**. Se ejecuta al iniciar el servidor. Configurable a través de `MODEL_SYNC_INTERVAL_HOURS`.#### 🔀 Per-Model Combo Routing (#563)

Asigne patrones de nombres de modelos (glob) a combinaciones específicas para el enrutamiento automático:

- `claude-sonnet*` → código-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- Nueva tabla `model_combo_mappings` con coincidencia de glob a regex
- Sección de interfaz de usuario del panel: "Reglas de enrutamiento del modelo" con agregar/editar/alternar/eliminar en línea#### 🧭 API Endpoints Dashboard

Catálogo interactivo, administración de webhooks, visor OpenAPI: todo en una página con pestañas en `/dashboard/endpoint`.#### 🔍 Web Search Providers

5 nuevas integraciones de proveedores de búsqueda:**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**: permiten respuestas de IA basadas en datos web en tiempo real.#### 📊 Search Analytics

Nueva pestaña en `/dashboard/analytics`: desglose de proveedores, tasa de aciertos de caché, seguimiento de costos. API: `OBTENER /api/v1/search/analytics`.#### 🛡️ Per-API-Key Rate Limits (#452)

Columnas `max_requests_per_day` y `max_requests_per_minuto` con aplicación de ventana deslizante en memoria que devuelve HTTP 429.#### 🎵 Media Playground

Área de juegos de generación de medios completa en `/dashboard/media`: generación de imágenes, video, música, transcripción de audio (límite de carga de 2 GB) y texto a voz.---

### 🔒 Security & CI/CD

-**Remediación de CodeQL**— Se corrigieron más de 10 alertas: 6 rehacer polinomiales, 1 aleatoriedad insegura (`Math.random()` → `crypto.randomUUID()`), 1 inyección de comando de shell -**Validación de ruta**— Esquemas Zod + `validateBody()` en**rutas API 176/176**— CI aplicado -**Corrección CVE**: vulnerabilidad XSS de dompurify (GHSA-v2wj-7wpq-c8vv) resuelta mediante anulaciones de npm -**Aplanado**— Actualizado 3.3.3 → 3.4.2 (contaminación del prototipo CWE-1321) -**Docker**— `docker/setup-buildx-action` v3 → v4 actualizado---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**— Gemini CLI OAuth: borrar error procesable cuando falta `GEMINI_OAUTH_CLIENT_SECRET` en Docker -**#549**: las rutas de configuración de CLI ahora resuelven la clave API real a partir de `keyId` (no cadenas enmascaradas) -**#574**— El inicio de sesión ya no se congela después de omitir la configuración de contraseña del asistente -**#506**— `machineId` multiplataforma reescrito (Windows REG.exe → macOS ioreg → Linux → reserva de nombre de host)#### Providers & Routing

-**#536**— LongCat AI: `baseUrl` y `authHeader` corregidos -**#535**— Anulación del modelo fijado: `body.model` configurado correctamente en `pinnedModel` -**#570**— Los modelos Claude sin prefijo ahora se resuelven en un proveedor antrópico -**#585**— Las etiquetas internas `<omniModel>` ya no se filtran a los clientes en la transmisión SSE -**#493**— La denominación del modelo de proveedor personalizado ya no está alterada por la eliminación de prefijos -**#490**— Streaming + protección de caché de contexto mediante inyección `TransformStream` -**#511**— Etiqueta `<omniModel>` inyectada en el primer fragmento de contenido (no después de `[DONE]`)#### CLI & Tools

-**#527**— Código Claude + bucle Codex: los bloques `tool_result` ahora se convierten en texto -**#524**— La configuración de OpenCode se guardó correctamente (XDG_CONFIG_HOME, formato TOML) -**#522**— API Manager: se eliminó el botón engañoso "Copiar clave enmascarada" -**#546**— `--version` devuelve `desconocido` en Windows (PR por @k0valik) -**#544**— Detección segura de herramientas CLI a través de rutas de instalación conocidas (PR por @k0valik) -**#510**— Rutas de Windows MSYS2/Git-Bash normalizadas automáticamente -**#492**— CLI detecta el nodo administrado por `mise`/`nvm` cuando falta `app/server.js`#### Streaming & SSE

-**PR #587**— Revertir la importación de `resolveDataDir` en respuestasTransformer para la compatibilidad de Cloudflare Workers (@k0valik) -**PR #495**— Cuello de botella 429 espera infinita: elimine los trabajos en espera en el límite de velocidad (@xandr0s) -**#483**— Deja de seguir `datos: nulos` después de la señal `[DONE]` -**#473**— Transmisiones Zombie SSE: tiempo de espera reducido 300s → 120s para un retroceso más rápido#### Media & Transcription

-**Transcripción**— Deepgram `video/mp4` → `audio/mp4` Mapeo MIME, detección automática de idioma, puntuación -**TTS**— Se corrigió la visualización del error `[object Object]` para errores anidados al estilo de ElevenLabs -**Límites de carga**: la transcripción de medios aumentó a 2 GB (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**— columna `requested_model` en los registros de llamadas (migración 009) -**T02**— Elimina bloques de texto vacíos del `tool_result.content` anidado -**T03**— Analizar encabezados de cuota `x-codex-5h-*` / `x-codex-7d-*` -**T04**— Encabezado `X-Session-Id` para enrutamiento fijo externo -**T05**— Persistencia de base de datos con límite de velocidad con API dedicada -**T06**— Cuenta desactivada → bloqueo permanente (tiempo de reutilización de 1 año) -**T07**— X-Reenviado-Para validación de IP (`extractClientIp()`) -**T08**— Límites de sesión por clave API con aplicación de ventana deslizante -**T09**— Ámbitos de límite de velocidad de Codex vs Spark (grupos separados) -**T10**— Créditos agotados → retroceso de enfriamiento de 1 hora distinto -**T11**— Esfuerzo de razonamiento `máximo` → 131072 tokens de presupuesto -**T12**— Entradas de precios de MiniMax M2.7 -**T13**— Corrección de visualización de cuota obsoleta (restablecer reconocimiento de ventana) -**T14**— Comprobación de TCP de fallo rápido de proxy (≤2 s, 30 s en caché) -**T15**— Normalización del contenido de la matriz para Anthropic -**T23**— Respaldo inteligente para el restablecimiento de cuotas (extracción de encabezados) -**T24**— Tiempo de reutilización `503` + mapeo `406` -**T25**— Reserva de validación del proveedor -**T29**— Autenticación JWT de cuenta de servicio Vertex AI -**T33**— Conversión del nivel de pensamiento a presupuesto -**T36**— Clasificación de error `403` frente a `429` -**T38**— Especificaciones de modelo centralizadas (`modelSpecs.ts`) -**T39**— Reserva de punto final para `fetchAvailableModels` -**T41**— Redirección automática de tareas en segundo plano a modelos flash -**T42**— Mapeo de relación de aspecto de generación de imágenes#### Other Improvements

-**Encabezados personalizados ascendentes por modelo**: a través de la interfaz de usuario de configuración (PR #575 por @zhangqiang8vip) -**Longitud del contexto del modelo**: configurable en los metadatos del modelo (PR #578 por @hijak) -**Eliminación del prefijo del modelo**: opción para eliminar el prefijo del proveedor de los nombres de los modelos (PR #582 por @jay77721) -**Gemini CLI en desuso**: marcado en desuso con una advertencia de restricción de Google OAuth -**Analizador YAML**: reemplazó el analizador personalizado con `js-yaml` para un análisis correcto de las especificaciones de OpenAPI -**ZWS v5**— Corrección de fugas de HMR (conexiones de 485 DB → 1, memoria 2,4 GB → 195 MB) -**Exportación de registros**: nuevo botón de exportación JSON en el panel con menú desplegable de rango de tiempo -**Banner de notificación de actualización**: la página de inicio del panel muestra cuándo hay nuevas versiones disponibles---

### 🌐 i18n & Documentation

-**30 idiomas**con 100 % de paridad: 2788 claves faltantes sincronizadas -**Checo**— Traducción completa: 22 documentos, 2606 cadenas de interfaz de usuario (PR por @zen0bit) -**Chino (zh-CN)**— Retraducción completa (PR por @only4copilot) -**Guía de implementación de VM**: traducida al inglés como documento fuente -**Referencia de API**: se agregaron puntos finales `/v1/embeddings` y `/v1/audio/speech` -**Recuento de proveedores**: actualizado de 36+/40+/44+ a**67+**en README y los 30 README i18n---

### 🔀 Community PRs Merged (10)

| relaciones públicas | Autor           | Resumen                                                                                                |
| ------------------- | --------------- | ------------------------------------------------------------------------------------------------------ |
| **#587**            | @k0valik        | solución (sse): revertir la importación de resolveDataDir para la compatibilidad de Cloudflare Workers |
| **#582**            | @jay77721       | hazaña (proxy): opción de eliminación del prefijo del nombre del modelo                                |
| **#581**            | @jay77721       | corrección (npm): vincula la liberación de electrones al flujo de trabajo de publicación de npm        |
| **#578**            | @hijak          | hazaña: longitud de contexto configurable en metadatos del modelo                                      |
| **#575**            | @zhangqiang8vip | hazaña: encabezados ascendentes por modelo, PATCH compatible, alineación de chat                       |
| **#562**            | @coobabm        | solución: gestión de sesión MCP, paso a través de Claude, detectFormat                                 |
| **#561**            | @zen0bit        | fix(i18n): correcciones de traducción al checo                                                         |
| **#555**            | @k0valik        | corrección (sse): `resolveDataDir()` centralizado para resolución de ruta                              |
| **#546**            | @k0valik        | corrección (cli): `--version` devuelve `desconocido` en Windows                                        |
| **#544**            | @k0valik        | corrección (cli): detección segura de la herramienta CLI a través de rutas de instalación              |
| **#542**            | @rdself         | corrección (ui): variables de tema CSS de contraste de modo claro                                      |
| **#530**            | @kang-heewon    | hazaña: Proveedores OpenCode Zen + Go con `OpencodeExecutor`                                           |
| **#512**            | @zhangqiang8vip | hazaña: compatibilidad de modelos por protocolo (`compatByProtocol`)                                   |
| **#497**            | @zhangqiang8vip | solución: fugas de recursos HMR en modo de desarrollo (ZWS v5)                                         |
| **#495**            | @xandr0s        | solución: cuello de botella 429 espera infinita (eliminar trabajos en espera)                          |
| **#494**            | @zhangqiang8vip | hazaña: Desarrollador MiniMax → corrección de rol del sistema                                          |
| **#480**            | @prakersh       | solución: extracción de uso de flujo de flujo                                                          |
| **#479**            | @prakersh       | hazaña: Codex 5.3/5.4 y entradas de precios antrópicos                                                 |
| **#475**            | @only4copilot   | hazaña (i18n): traducción al chino mejorada                                                            |

**¡Gracias a todos los contribuyentes!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` `#492` `#493` `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#532` `#535` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`---

### 🧪 Tests

-**926 pruebas, 0 fallas**(frente a 821 en v2.9.5)

- +105 pruebas nuevas que cubren: asignaciones de combinaciones de modelos, claves registradas, OpencodeExecutor, proveedor Bailian, validación de rutas, clasificación de errores, asignación de relaciones de aspecto y más---

### 📦 Database Migrations

| Migración | Descripción                                                           |
| --------- | --------------------------------------------------------------------- | --- |
| **008**   | Tablas `registered_keys`, `provider_key_limits`, `account_key_limits` |
| **009**   | columna `requested_model` en `call_logs`                              |
| **010**   | Tabla `model_combo_mappings` para enrutamiento combinado por modelo   | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Cambios importantes:**Ninguno. Se conservan todas las configuraciones, combinaciones y claves API existentes.
> Las migraciones de bases de datos 008-010 se ejecutan automáticamente al inicio.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**Remediación de CodeQL**: se corrigieron más de 10 alertas:

- 6 rehacer polinomios en `provider.ts` / `chatCore.ts` (se reemplazaron los patrones de alternancia `(?:^|/)` con coincidencia basada en segmentos)
- 1 aleatoriedad insegura en `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
- 1 inyección de comando de shell en `prepublish.mjs` (escapado de ruta `JSON.stringify()`) -**Validación de ruta**: se agregaron esquemas Zod + `validateBody()` a 5 rutas a las que les falta validación:
- `model-combo-mappings` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
- CI `check:route-validation:t06` ahora pasa:**176/176 rutas validadas**### 🐛 Bug Fixes

-**#585**— Las etiquetas internas `<omniModel>` ya no se filtran a los clientes en las respuestas de SSE. Se agregó desinfección saliente `TransformStream` en `combo.ts`### ⚙️ Infrastructure

-**Docker**: `docker/setup-buildx-action` actualizado de v3 → v4 (corrección de obsolescencia de Node.js 20) -**Limpieza de CI**: se eliminaron más de 150 ejecuciones de flujo de trabajo fallidas/canceladas### 🧪 Tests

- Conjunto de pruebas:**926 pruebas, 0 fallas**(+3 nuevas)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Mayores límites de transcripción de medios.
- Se agregó la longitud del contexto del modelo a los metadatos del registro.
- Se agregaron encabezados personalizados ascendentes por modelo a través de la interfaz de usuario de configuración
- Se corrigieron múltiples errores, validación de Zod para parches y se resolvieron varios problemas de la comunidad.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— Enrutamiento combinado por modelo: asigna patrones de nombres de modelos (glob) a combos específicos para enrutamiento automático

- Nueva tabla `model_combo_mappings` (migración 010) con patrón, combo_id, prioridad, habilitado
- Función de base de datos `resolveComboForModel()` con coincidencia global-a-regex (no distingue entre mayúsculas y minúsculas, comodines `*` y `?`)
- `getComboForModel()` en `model.ts`: aumenta `getCombo()` con respaldo de patrón de modelo
- `chat.ts`: la decisión de enrutamiento ahora verifica las asignaciones de modelos combinados antes de manejar un solo modelo
- API: `GET/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
- Panel de control: sección "Reglas de enrutamiento del modelo" agregada a la página de Combos con agregar/editar/alternar/eliminar en línea
- Ejemplos: `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo### 🌐 i18n

-**Sincronización completa de i18n**: se agregaron 2788 claves faltantes en archivos de 30 idiomas; ahora todos los idiomas tienen una paridad del 100 % con `en.json` -**Página de agentes i18n**: Sección de integración OpenCode totalmente internacionalizada (título, descripción, escaneo, etiquetas de descarga) -**6 claves nuevas**agregadas al espacio de nombres "agentes" para la sección OpenCode### 🎨 UI/UX

-**Iconos de proveedores**: se agregaron 16 íconos de proveedores faltantes (3 copiados, 2 descargados, 11 SVG creados) -**Reserva de SVG**: componente `ProviderIcon` actualizado con estrategia de 4 niveles: Lobehub → PNG → SVG → Icono genérico -**Toma de huellas digitales de agentes**: sincronizado con herramientas CLI: se agregaron droide, openclaw, copiloto y código abierto a la lista de huellas digitales (14 en total)### Seguridad

-**Corrección CVE**: Se resolvió la vulnerabilidad XSS de dompurify (GHSA-v2wj-7wpq-c8vv) a través de anulaciones de npm que obligaban a `dompurify@^3.3.2`

- `npm audit` ahora informa**0 vulnerabilidades**### 🧪 Tests

- Conjunto de pruebas:**923 pruebas, 0 fallas**(+15 nuevas pruebas de mapeo de combinación de modelos)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| relaciones públicas | Autor    | Resumen                                                                                                            |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ | ------------ |
| **#562**            | @coobabm | corrección (ux): gestión de sesiones MCP, normalización de paso a través de Claude, modal OAuth, detectFormat      |
| **#561**            | @zen0bit | corrección (i18n): correcciones de traducción al checo: nombres de métodos HTTP y actualizaciones de documentación | ### 🧪 Tests |

- Conjunto de pruebas:**908 pruebas, 0 fallas**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**resuelve la clave API real desde `keyId` en las rutas de configuración CLI (`codex-settings`, `droid-settings`, `kilo-settings`) para evitar escribir cadenas enmascaradas (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| relaciones públicas | Autor    | Resumen                                                                                                                                                                                                                                                 |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546**            | @k0valik | corrección (cli): `--version` devuelve `desconocido` en Windows; use `JSON.parse(readFileSync)` en lugar de importación ESM                                                                                                                             |
| **#555**            | @k0valik | corrección (sse): `resolveDataDir()` centralizado para resolución de ruta en credenciales, autoCombo, registrador de respuestas y registrador de solicitudes                                                                                            |
| **#544**            | @k0valik | corrección (cli): detección segura de herramientas CLI a través de rutas de instalación conocidas (8 herramientas) con validación de enlaces simbólicos, comprobaciones de tipo de archivo, límites de tamaño, entorno mínimo en comprobación de estado |
| **#542**            | @rdself  | corrección (ui): mejora el contraste del modo claro: agrega variables de tema CSS que faltan (`bg-primary`, `bg-subtle`, `text-primary`) y corrige los colores solo oscuros en los detalles del registro                                                | ### 🔧 Bug Fixes |

-**Corrección TDZ en `cliRuntime.ts`**— `validateEnvPath` se usó antes de la inicialización al iniciar el módulo mediante `getExpectedParentPaths()`. Declaraciones reordenadas para corregir `ReferenceError`. -**Correcciones de compilación**: se agregaron `pino` y `pino-pretty` a `serverExternalPackages` para evitar que Turbopack rompa la carga de trabajo interna de Pino.### 🧪 Tests

- Conjunto de pruebas:**905 pruebas, 0 fallas**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Regresión de compilación de Electron: se degradó Next.js de `16.1.x` a `16.0.10` para eliminar la inestabilidad del hash del módulo Turbopack que causaba pantallas en blanco en el paquete de escritorio Electron. -**Correcciones de pruebas unitarias**: se corrigieron dos afirmaciones de prueba obsoletas (relación de aspecto/resolución `nanobanana-image-handler`, mapeo de campo `thinking-budget` Gemini `thinkingConfig`) que se habían desviado después de cambios recientes en la implementación. -**#541**: respondió a los comentarios de los usuarios sobre la complejidad de la instalación; no se requieren cambios de código.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON Executor: implementado utilizando la biblioteca `jose` para manejar la autenticación de JWT/cuenta de servicio, junto con regiones configurables en la interfaz de usuario y la creación automática de URL del modelo de socio. -**T42**— Mapeo de relaciones de aspecto de generación de imágenes: se creó la lógica `sizeMapper` para formatos OpenAI genéricos (`size`), se agregó manejo nativo de `imagen3` y se actualizaron los puntos finales de NanoBanana para utilizar relaciones de aspecto mapeadas automáticamente. -**T38**— Especificaciones de modelo centralizadas: `modelSpecs.ts` creado para límites y parámetros por modelo.### 🔧 Improvements

-**T40**— Integración de herramientas OpenCode CLI: integración nativa `opencode-zen` y `opencode-go` completada en relaciones públicas anteriores.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— Tiempo de reutilización de `503` en espera de solución + asignación `406`: asignado `406 no aceptable` a `503 Servicio no disponible` con intervalos de reutilización adecuados. -**T25**: respaldo de validación del proveedor: respaldo elegante a los modelos de validación estándar cuando un `validationModelId` específico no está presente. -**T36**— Refinamiento en el manejo del proveedor `403` vs `429`: extraído en `errorClassifier.ts` para segregar adecuadamente las fallas de permisos físicos (`403`) de los límites de velocidad (`429`). -**T39**— Respaldo de punto final para `fetchAvailableModels`: implementó un mecanismo de tres niveles (`/models` -> `/v1/models` -> catálogo genérico local) + actualizaciones de la herramienta MCP `list_models_catalog` para reflejar la `fuente` y la `advertencia`. -**T33**— Conversión del nivel de pensamiento a presupuesto: traduce niveles de pensamiento cualitativos en asignaciones presupuestarias precisas. -**T41**— Redirección automática de tareas en segundo plano: dirige tareas pesadas de evaluación en segundo plano a modelos flash/eficientes automáticamente. -**T23**— Respaldo inteligente para el restablecimiento de cuotas: extrae con precisión los valores del encabezado `x-ratelimit-reset`/`retry-after` o asigna tiempos de reutilización estáticos.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Actualización desde v2.9.5:**16 problemas resueltos · 2 RP comunitarios fusionados · 2 nuevos proveedores · 7 nuevos puntos finales API · 3 nuevas características · Migración de base de datos 008+009 · 832 pruebas aprobadas · 15 mejoras en la brecha sub2api (T01–T15 completa).### 🆕 New Providers

| Proveedor                 | Alias ​​             | Nivel  | Notas                                                                    |
| ------------------------- | -------------------- | ------ | ------------------------------------------------------------------------ |
| **Zen de código abierto** | `código abierto-zen` | Gratis | 3 modelos a través de `opencode.ai/zen/v1` (PR #530 por @kang-heewon)    |
| **OpenCode Ir**           | `código abierto-ir`  | Pagado | 4 modelos a través de `opencode.ai/zen/go/v1` (PR #530 por @kang-heewon) |

Ambos proveedores utilizan el nuevo `OpencodeExecutor` con enrutamiento multiformato (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Genere y emita automáticamente claves API de OmniRoute mediante programación con aplicación de cuotas por proveedor y por cuenta.

| Punto final                               | Método          | Descripción                                                              |
| ----------------------------------------- | --------------- | ------------------------------------------------------------------------ |
| `/api/v1/claves-registradas`              | `POST`          | Emitir una nueva clave: la clave sin formato se devuelve**solo una vez** |
| `/api/v1/claves-registradas`              | `OBTENER`       | Lista de claves registradas (enmascaradas)                               |
| `/api/v1/claves-registradas/{id}`         | `OBTENER`       | Obtener metadatos clave                                                  |
| `/api/v1/claves-registradas/{id}`         | `BORRAR`        | Revocar una clave                                                        |
| `/api/v1/claves-registradas/{id}/revocar` | `POST`          | Revocar (para clientes sin soporte DELETE)                               |
| `/api/v1/quotas/check`                    | `OBTENER`       | Prevalidar cuota antes de emitir                                         |
| `/api/v1/proveedores/{id}/limites`        | `OBTENER/PONER` | Configurar límites de emisión por proveedor                              |
| `/api/v1/cuentas/{id}/límites`            | `OBTENER/PONER` | Configurar límites de emisión por cuenta                                 |
| `/api/v1/issues/report`                   | `POST`          | Informar eventos de cuota a GitHub Problemas                             |

**DB — Migración 008:**Tres tablas nuevas: `registered_keys`, `provider_key_limits`, `account_key_limits`.
**Seguridad:**Claves almacenadas como hashes SHA-256. La clave sin formato se muestra una vez en el momento de la creación y nunca más se puede recuperar.
**Tipos de cuotas:**`maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` por proveedor y por cuenta.
**Idempotencia:**El campo `idempotency_key` evita la emisión duplicada. Devuelve `409 IDEMPOTENCY_CONFLICT` si la clave ya se utilizó.
**Presupuesto por clave:**`dailyBudget` / `hourlyBudget`: limita la cantidad de solicitudes que una clave puede enrutar por ventana.
**Informes de GitHub:**Opcional. Configure `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` para crear automáticamente problemas de GitHub en caso de cuota excedida o fallas de emisión.#### 🎨 Provider Icons — @lobehub/icons (#529)

Todos los íconos de proveedores en el panel ahora usan componentes React `@lobehub/icons` (más de 130 proveedores con SVG).
Cadena alternativa:**Lobehub SVG → existente `/providers/{id}.png` → icono genérico**. Utiliza un patrón React `ErrorBoundary` adecuado.#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute ahora actualiza automáticamente las listas de modelos para proveedores conectados cada**24 horas**.

- Se ejecuta al iniciar el servidor a través del gancho `/api/sync/initialize` existente
- Configurable a través de la variable de entorno `MODEL_SYNC_INTERVAL_HOURS`
- Cubre 16 proveedores principales
- Registra la hora de la última sincronización en la base de datos de configuración---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 — Gemini CLI OAuth:**Borrar el error procesable cuando falta `GEMINI_OAUTH_CLIENT_SECRET` en implementaciones Docker/autohospedadas. Anteriormente se mostró críptico "falta client_secret" de Google. Ahora proporciona instrucciones específicas `docker-compose.yml` y `~/.omniroute/.env`.#### Providers & Routing

-**#536 — LongCat AI:**Se corrigió `baseUrl` (`api.longcat.chat/openai`) y `authHeader` (`Autorización: Portador`). -**#535 — Anulación del modelo fijado:**`body.model` ahora está configurado correctamente en `pinnedModel` cuando la protección de caché de contexto está activa. -**#532 — Validación de clave OpenCode Go:**Ahora usa el punto final de prueba `zen/v1` (`testKeyBaseUrl`): la misma clave funciona para ambos niveles.#### CLI & Tools

-**#527 — Código Claude + bucle Codex:**Los bloques `tool_result` ahora se convierten en texto en lugar de soltarse, lo que detiene infinitos bucles de resultados de herramientas. -**#524 — Guardar configuración de OpenCode:**Se agregó el controlador `saveOpenCodeConfig()` (conoce XDG_CONFIG_HOME, escribe TOML). -**#521 — Inicio de sesión bloqueado:**El inicio de sesión ya no se congela después de omitir la configuración de la contraseña; redirige correctamente a la incorporación. -**#522 — Administrador de API:**Se eliminó el botón engañoso "Copiar clave enmascarada" (reemplazado con información sobre herramientas de icono de candado). -**#532 — Configuración de OpenCode Go:**El controlador de configuración de la guía ahora maneja el ID de herramienta `opencode`.#### Developer Experience

-**#489 — Antigravedad:**La falta de `googleProjectId` devuelve un error 422 estructurado con orientación para la reconexión en lugar de un bloqueo críptico. -**#510 — Rutas de Windows:**Las rutas de MSYS2/Git-Bash (`/c/Program Files/...`) ahora están normalizadas a `C:\Program Files\...` automáticamente. -**#492 — Inicio de CLI:**La CLI `omniroute` ahora detecta el nodo administrado por `mise`/`nvm` cuando falta `app/server.js` y muestra instrucciones de reparación específicas.---

### 📖 Documentation Updates

-**#513**— Restablecimiento de contraseña de Docker: solución alternativa de var env `INITIAL_PASSWORD` documentada -**#520**— pnpm: paso `pnpm aprobar-construye mejor-sqlite3` documentado---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#536` `#537`---

### 🔀 Community PRs Merged

| relaciones públicas | Autor        | Resumen                                                                  |
| ------------------- | ------------ | ------------------------------------------------------------------------ | --- |
| **#530**            | @kang-heewon | Proveedores OpenCode Zen + Go con `OpencodeExecutor` y pruebas mejoradas | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— Persistencia de base de datos con límite de velocidad: `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()` en `providers.ts`. La columna existente `rate_limited_until` ahora está expuesta como una API dedicada: la actualización del token de OAuth NO debe tocar este campo para evitar bucles de límite de velocidad. -**T08**— Límite de sesión por clave API: `max_sessions INTEGER DEFAULT 0` agregado a `api_keys` mediante migración automática. `sessionManager.ts` gana `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()` y `getActiveSessionCountForKey()`. Las personas que llaman en `chatCore.js` pueden imponer el límite y disminuir en `req.close`. -**T09**— Ámbitos de límite de velocidad de Codex vs Spark: `getCodexModelScope()` y `getCodexRateLimitKey()` en `codex.ts`. Los modelos estándar (`gpt-5.x-codex`, `codex-mini`) obtienen alcance `"codex"`; Los modelos Spark (`codex-spark*`) obtienen el alcance `"spark"`. Las claves de límite de velocidad deben ser `${accountId}:${scope}` para que agotar un grupo no bloquee el otro. -**T13**— Corrección de visualización de cuota obsoleta: `getEffectiveQuotaUsage(used, resetAt)` devuelve `0` cuando la ventana de reinicio ha pasado; `formatResetCountdown(resetAt)` devuelve una cadena de cuenta regresiva legible por humanos (por ejemplo, `"2h 35m"`). Ambos exportados desde `providers.ts` + `localDb.ts` para consumo en el panel. -**T14**— Fallo rápido de proxy: nuevo `src/lib/proxyHealth.ts` con `isProxyReachable(proxyUrl, timeoutMs=2000)` (verificación de TCP, ≤2 s en lugar de 30 s de tiempo de espera), `getCachedProxyHealth()`, `invalidateProxyHealth()` y `getAllProxyHealthStatuses()`. Los resultados se almacenan en caché durante 30 segundos de forma predeterminada; configurable a través de `PROXY_FAST_FAIL_TIMEOUT_MS` / `PROXY_HEALTH_CACHE_TTL_MS`.### 🧪 Tests

- Conjunto de pruebas:**832 pruebas, 0 fallas**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**— columna `requested_model` en `call_logs` (migración 009): rastrea qué modelo solicitó originalmente el cliente versus el modelo enrutado real. Habilita el análisis de la tasa de reserva. -**T02**— Elimina los bloques de texto vacíos del `tool_result.content` anidado: evita errores Anthropic 400 (`los bloques de contenido de texto no deben estar vacíos`) cuando Claude Code encadena los resultados de la herramienta. -**T03**— Analiza los encabezados `x-codex-5h-*` / `x-codex-7d-*`: `parseCodexQuotaHeaders()` + `getCodexResetTime()` extrae las ventanas de cuota del Codex para una programación precisa del tiempo de reutilización en lugar de un respaldo genérico de 5 minutos. -**T04**— Encabezado `X-Session-Id` para enrutamiento fijo externo: `extractExternalSessionId()` en `sessionManager.ts` lee los encabezados `x-session-id` / `x-omniroute-session` con el prefijo `ext:` para evitar colisiones con ID de sesión SHA-256 internos. Compatible con Nginx (encabezado con guión). -**T06**— Cuenta desactivada → bloqueo permanente: `isAccountDeactivated()` en `accountFallback.ts` detecta señales de desactivación 401 y aplica un tiempo de reutilización de 1 año para evitar volver a intentar cuentas permanentemente muertas. -**T07**— Validación de IP X-Forwarded-For: nuevo `src/lib/ipUtils.ts` con `extractClientIp()` y `getClientIpFromRequest()` — omite entradas `desconocidas`/sin IP en cadenas `X-Forwarded-For` (solicitudes reenviadas por Nginx/proxy). -**T10**— Créditos agotados → respaldo distinto: `isCreditsExhausted()` en `accountFallback.ts` devuelve un tiempo de reutilización de 1 h con el indicador `creditsExhausted`, distinto del límite genérico de tasa 429. -**T11**— Esfuerzo de razonamiento `max` → 131072 tokens de presupuesto: `EFFORT_BUDGETS` y `THINKING_LEVEL_MAP` actualizados; El mapeo inverso ahora devuelve `"max"` para respuestas de presupuesto completo. Prueba unitaria actualizada. -**T12**— Se agregaron entradas de precios de MiniMax M2.7: `minimax-m2.7`, `MiniMax-M2.7`, `minimax-m2.7-highspeed` agregadas a la tabla de precios (sub2api PR #1120). Los precios de M2.5/GLM-4.7/GLM-5/Kimi ya existían. -**T15**— Normalización del contenido de la matriz: el ayudante `normalizeContentToString()` en `openai-to-claude.ts` colapsa correctamente los mensajes del sistema/herramienta con formato de matriz en una cadena antes de enviarlos a Anthropic.### 🧪 Tests

- Conjunto de pruebas:**832 pruebas, 0 fallas**(sin cambios desde rc.5)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**— API de aprovisionamiento de claves registradas: claves API de emisión automática con aplicación de cuotas por proveedor y por cuenta

- `POST /api/v1/registered-keys` — emitir claves con soporte de idempotencia
- `GET /api/v1/registered-keys` — lista de claves registradas (enmascaradas)
- `GET /api/v1/registered-keys/{id}` — obtiene metadatos clave
- `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — revocar claves
- `GET /api/v1/quotas/check` — validar previamente antes de emitir
- `PUT /api/v1/providers/{id}/limits` — establece límites de emisión del proveedor
- `PUT /api/v1/accounts/{id}/limits` — establece límites de emisión de cuentas
- `POST /api/v1/issues/report` — informe de problemas de GitHub opcional
- Migración de base de datos 008: tablas `registered_keys`, `provider_key_limits`, `account_key_limits`---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**— Se agregaron proveedores OpenCode Zen y OpenCode Go (por @kang-heewon)

- Nuevo `OpencodeExecutor` con enrutamiento multiformato (`/chat/completions`, `/messages`, `/responses`)
- 7 modelos en ambos niveles---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**— Los íconos de proveedores ahora usan [@lobehub/icons](https://github.com/lobehub/lobe-icons) con un elegante respaldo PNG y un componente `ProviderIcon` (se admiten más de 130 proveedores) -**#488**— Listas de modelos de actualización automática cada 24 horas mediante `modelSyncScheduler` (configurable mediante `MODEL_SYNC_INTERVAL_HOURS`)### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth: ahora muestra un error procesable claro cuando falta `GEMINI_OAUTH_CLIENT_SECRET` en implementaciones Docker/autohospedadas---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— Validación de clave de IA de LongCat: baseUrl fija (`api.longcat.chat/openai`) y authHeader (`Autorización: Portador`) -**#535**— Anulación del modelo fijado: `body.model` ahora se establece en `pinnedModel` cuando la protección de caché de contexto detecta un modelo fijado -**#524**— La configuración de OpenCode ahora se guarda correctamente: se agregó el controlador `saveOpenCodeConfig()` (conoce XDG_CONFIG_HOME, escribe TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**— El inicio de sesión ya no se bloquea después de omitir la configuración de la contraseña (redirecciona a la incorporación) -**#522**— API Manager: se eliminó el botón engañoso "Copiar clave enmascarada" (reemplazado con información sobre herramientas del icono de candado) -**#527**— Claude Code + bucle de superpoderes del Codex: los bloques `tool_result` ahora se convierten en texto en lugar de eliminarse -**#532**— La validación de la clave API de OpenCode GO ahora utiliza el punto final `zen/v1` correcto (`testKeyBaseUrl`) -**#489**— Antigravity: falta `googleProjectId` y devuelve un error estructurado 422 con guía de reconexión -**#510**— Windows: las rutas MSYS2/Git-Bash (`/c/Program Files/...`) ahora están normalizadas a `C:\Program Files\...` -**#492**— La CLI `omniroute` ahora detecta `mise`/`nvm` cuando falta `app/server.js` y muestra la solución específica### Documentación

-**#513**— Restablecimiento de contraseña de Docker: solución alternativa de var env `INITIAL_PASSWORD` documentada -**#520**— pnpm: `pnpm aprobar-construye mejor-sqlite3` documentado### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint: nuevos proveedores de OpenCode, corrección de incrustación de credenciales, error de clave enmascarada de CLI, corrección de CACHE_TAG_PATTERN.### 🐛 Bug Fixes

-**Las herramientas CLI guardan la clave API enmascarada en los archivos de configuración**: las rutas POST `claude-settings`, `cline-settings` y `openclaw-settings` ahora aceptan un parámetro `keyId` y resuelven la clave API real de la base de datos antes de escribir en el disco. `ClaudeToolCard` se actualizó para enviar `keyId` en lugar de la cadena de visualización enmascarada. Corrige #523, #526. -**Proveedores de incrustación personalizados: error `Sin credenciales`**: `/v1/embeddings` ahora rastrea `credentialsProviderId` por separado del prefijo de enrutamiento, por lo que las credenciales se obtienen del ID del nodo del proveedor coincidente en lugar de la cadena de prefijo público. Corrige una regresión en la que `google/gemini-embedding-001` y modelos similares de proveedores personalizados siempre fallaban con un error de credenciales. Correcciones relacionadas con el n.° 532. (PR #528 por @jacob2826) -**La expresión regular de protección de caché de contexto falla `
`prefijo**— `CACHE_TAG_PATTERN` en `comboAgentMiddleware.ts` actualizado para que coincida con ambos literales `
` (barra invertida-n) y la nueva línea real U+000A que la transmisión `combo.ts` inyecta alrededor de la etiqueta `<omniModel>` después de la corrección n.° 515. Corrige el n.º 531.### ✨ New Providers

-**OpenCode Zen**— Puerta de enlace de nivel gratuito en `opencode.ai/zen/v1` con 3 modelos: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano` -**OpenCode Go**— Servicio de suscripción en `opencode.ai/zen/go/v1` con 4 modelos: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (formato Claude), `minimax-m2.5` (formato Claude)

- Ambos proveedores utilizan el nuevo `OpencodeExecutor` que enruta dinámicamente a `/chat/completions`, `/messages`, `/responses` o `/models/{model}:generateContent` según el modelo solicitado. (PR #530 por @kang-heewon)---

## [2.9.4] — 2026-03-21

> Sprint: Corrección de errores: conserve la clave de caché del mensaje del Codex, corrija el escape del JSON del contenido de la etiqueta, sincronice el estado del token caducado con la base de datos.### 🐛 Bug Fixes

-**corrección(traductor)**: Preservar `prompt_cache_key` en API de Respuestas → Traducción de finalización de chat (#517)
— el campo es una señal de afinidad de caché utilizada por el Codex; eliminarlo impedía los rápidos accesos al caché.
Corregido en `openai-responses.ts` y `responsesApiHelper.ts`.

-**arreglar(combo)**: Escape `
` en `tagContent` por lo que la cadena JSON inyectada es válida (#515)
— No se permiten nuevas líneas literales de plantilla (U+000A) sin escape dentro de valores de cadena JSON.
Reemplazado con secuencias literales `\n` en `open-sse/services/combo.ts`.

-**solución(uso)**: Sincronizar el estado del token caducado con la base de datos en caso de error de autenticación en vivo (#491)
— Cuando la verificación en vivo de Límites y Cuotas arroja 401/403, la conexión `testStatus` ahora está actualizada
a `"caducado"` en la base de datos para que la página de Proveedores refleje el mismo estado degradado.
Corregido en `src/app/api/usage/[connectionId]/route.ts`.---

## [2.9.3] — 2026-03-21

> Sprint: agregue 5 nuevos proveedores de IA gratuitos: LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.### ✨ New Providers

-**feat(providers/longcat)**: Agregue LongCat AI (`lc/`): 50 millones de tokens/día gratis (Flash-Lite) + 500 000/día (Chat/Thinking) durante la versión beta pública. Autenticación de portador estándar compatible con OpenAI. -**feat(providers/polinations)**: Agregar polinizaciones AI (`pol/`): no se requiere clave API. Proxies GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 solicitud/15 s gratis). El ejecutor personalizado maneja la autenticación opcional. -**feat(providers/cloudflare-ai)**: agregue la IA de los trabajadores de Cloudflare (`cf/`): 10 000 neuronas/día gratis (~150 respuestas de LLM o 500 audios de Whisper). Más de 50 modelos en la vanguardia global. El ejecutor personalizado crea una URL dinámica con "accountId" a partir de las credenciales. -**feat(providers/scaleway)**: Agregar API generativas de Scaleway (`scw/`): 1 millón de tokens gratis para cuentas nuevas. Cumple con UE/GDPR (París). Qwen3 235B, Llama 3.1 70B, Mistral Pequeño 3.2. -**feat(providers/aimlapi)**: agregue API AI/ML (`aiml/`): crédito gratuito de $0,025/día, más de 200 modelos (GPT-4o, Claude, Gemini, Llama) a través de un único punto final de agregador.### 🔄 Provider Updates

-**feat(providers/together)**: agregue `hasFree: true` + 3 ID de modelo permanentemente libres: `Llama-3.3-70B-Instruct-Turbo-Free`, `Llama-Vision-Free`, `DeepSeek-R1-Distill-Llama-70B-Free` -**feat(providers/gemini)**: agregue `hasFree: true` + `freeNote` (1500 solicitudes/día, no se necesita tarjeta de crédito, aistudio.google.com) -**chore(providers/gemini)**: cambie el nombre para mostrar a `Gemini (Google AI Studio)` para mayor claridad### ⚙️ Infrastructure

-**feat(executors/pollinations)**: Nuevo `PollinationsExecutor` — omite el encabezado `Authorization` cuando no se proporciona ninguna clave API -**feat(executors/cloudflare-ai)**: Nuevo `CloudflareAIExecutor`: la construcción de URL dinámica requiere `accountId` en las credenciales del proveedor -**feat(executors)**: Registrar asignaciones de ejecutores `polnations`, `pol`, `cloudflare-ai`, `cf`### Documentación

-**docs(léame)**: pila combinada gratuita ampliada a 11 proveedores ($0 para siempre) -**docs(léame)**: Se agregaron 4 nuevas secciones de proveedores gratuitas (LongCat, Pollinations, Cloudflare AI, Scaleway) con tablas de modelos -**docs(léame)**: tabla de precios actualizada con 4 nuevas filas de niveles gratuitos -**docs(i18n/pt-BR)**: tabla de precios actualizada + secciones LongCat/Pollinations/Cloudflare AI/Scaleway agregadas en portugués -**docs(new-features/ai)**: 10 archivos de especificaciones de tareas + plan maestro de implementación en `docs/new-features/ai/`### 🧪 Tests

- Conjunto de pruebas:**821 pruebas, 0 fallas**(sin cambios)---

## [2.9.2] — 2026-03-21

> Sprint: Corrige la transcripción de medios (Deepgram/HuggingFace Content-Type, detección de idioma) y la visualización de errores TTS.### 🐛 Bug Fixes

-**corrección(transcripción)**: La transcripción de audio de Deepgram y HuggingFace ahora asigna correctamente `video/mp4` → `audio/mp4` y otros tipos MIME de medios a través del nuevo asistente `resolveAudioContentType()`. Anteriormente, al cargar archivos `.mp4` se devolvía constantemente "No se detectó voz" porque Deepgram recibía `Tipo de contenido: video/mp4`. -**corrección(transcripción)**: Se agregó `detect_language=true` a las solicitudes de Deepgram: detecta automáticamente el idioma de audio (portugués, español, etc.) en lugar de usar el inglés de forma predeterminada. Corrige transcripciones que no están en inglés y que devuelven resultados vacíos o basura. -**arreglo(transcripción)**: Se agregó `punctuate=true` a las solicitudes de Deepgram para una salida de transcripción de mayor calidad con puntuación correcta. -**fix(tts)**: visualización del error `[object Object]` en las respuestas de texto a voz arreglado tanto en `audioSpeech.ts` como en `audioTranscription.ts`. La función `upstreamErrorResponse()` ahora extrae correctamente mensajes de cadena anidados de proveedores como ElevenLabs que devuelven `{ error: { mensaje: "...", status_code: 401 } }` en lugar de una cadena de error plana.### 🧪 Tests

- Conjunto de pruebas:**821 pruebas, 0 fallas**(sin cambios)### Triaged Issues

-**#508**— Regresión del formato de llamada de herramienta: registros de proxy solicitados e información de la cadena de proveedores (`needs-info`) -**#510**— Ruta de comprobación del estado de la CLI de Windows: información de versión de shell/nodo solicitada (`needs-info`) -**#485**— Llamadas a la herramienta Kiro MCP: cerradas como problema externo de Kiro (no OmniRoute) -**#442**— Punto final Baseten /models: cerrado (solución alternativa manual documentada) -**#464**— API de aprovisionamiento de claves: reconocida como elemento de la hoja de ruta---

## [2.9.1] — 2026-03-21

> Sprint: corrige la pérdida de datos de SSE omniModel y fusiona la compatibilidad del modelo por protocolo.### Bug Fixes

-**#511**— Crítico: la etiqueta `<omniModel>` se envió después de `finish_reason:stop` en transmisiones SSE, lo que provocó la pérdida de datos. La etiqueta ahora se inyecta en el primer fragmento de contenido que no está vacío, lo que garantiza la entrega antes de que los SDK cierren la conexión.### Merged PRs

-**PR #512**(@zhangqiang8vip): Compatibilidad del modelo por protocolo: `normalizeToolCallId` y `preserveOpenAIDeveloperRole` ahora se pueden configurar por protocolo de cliente (OpenAI, Claude, Responses API). Nuevo campo `compatByProtocol` en la configuración del modelo con validación Zod.### Triaged Issues

-**#510**— Healthcheck_failed de la CLI de Windows: información de RUTA/versión solicitada -**#509**— Regresión de electrones de Turbopack: error de Next.js en sentido ascendente, soluciones documentadas -**#508**— Pantalla negra de macOS: solución alternativa sugerida para `--disable-gpu`---

## [2.9.0] — 2026-03-20

> Sprint: corrección de MachineId multiplataforma, límites de velocidad por clave API, caché de contexto de transmisión, Alibaba DashScope, análisis de búsqueda, ZWS v5 y 8 problemas cerrados.### ✨ New Features

-**feat(search)**: pestaña Search Analytics en `/dashboard/analytics`: desglose de proveedores, tasa de aciertos de caché, seguimiento de costos. Nueva API: `GET /api/v1/search/analytics` (#feat/search-provider-routing) -**feat(provider)**: Alibaba Cloud DashScope agregado con validación de ruta de punto final personalizada: `chatPath` y `modelsPath` configurables por nodo (#feat/custom-endpoint-paths) -**feat(api)**: Límites de recuento de solicitudes por clave API: columnas `max_requests_per_day` y `max_requests_per_minuto` con aplicación de ventana deslizante en memoria que devuelve HTTP 429 (#452) -**feat(dev)**: ZWS v5 — Corrección de fugas de HMR (485 conexiones DB → 1), memoria 2,4 GB → 195 MB, singletons `globalThis`, corrección de advertencia de Edge Runtime (@zhangqiang8vip)### 🐛 Bug Fixes

-**corrección(#506)**: `machineId` multiplataforma — `getMachineIdRaw()` reescrito con try/catch en cascada (Windows REG.exe → macOS ioreg → lectura de archivo de Linux → nombre de host → `os.hostname()`). Elimina la ramificación `process.platform` que elimina el código muerto del paquete Next.js, arreglando ``head' no se reconoce` en Windows. También corrige el n.° 466. -**solución(#493)**: Nomenclatura personalizada del modelo de proveedor: se eliminó la eliminación incorrecta de prefijos en `DefaultExecutor.transformRequest()` que alteraba los ID de modelo con ámbito de organización como `zai-org/GLM-5-FP8`. -**corrección(#490)**: Transmisión + protección de caché de contexto: `TransformStream` intercepta SSE para inyectar la etiqueta `<omniModel>` antes del marcador `[DONE]`, lo que habilita la protección de caché de contexto para respuestas de transmisión. -**corrección(#458)**: Validación de esquema combinado: los campos `system_message`, `tool_filter_regex`, `context_cache_protection` ahora pasan la validación de Zod al guardar. -**solución(#487)**: Limpieza de la tarjeta KIRO MITM: se eliminó ZWS_README, se generó `AntigravityToolCard` para usar metadatos de herramientas dinámicas.### 🧪 Tests

- Se agregaron pruebas unitarias de filtro de herramientas de formato antrópico (PR #397): 8 pruebas de regresión para `tool.name` sin contenedor `.function`
- Conjunto de pruebas:**821 pruebas, 0 fallas**(en comparación con 813)### 📋 Issues Closed (8)

-**#506**— No se reconoce el ID de máquina de Windows `head` (solucionado) -**#493**— Nomenclatura personalizada del modelo de proveedor (corregido) -**#490**— Caché de contexto de transmisión (corregido) -**#452**— Límites de solicitud por clave API (implementado) -**#466**: error al iniciar sesión en Windows (la misma causa raíz que el número 506) -**#504**— MITM inactivo (comportamiento esperado) -**#462**— Anuncio de servicio público de Gemini CLI (resuelto) -**#434**— Fallo de la aplicación Electron (duplicado del n.° 402)## [2.8.9] — 2026-03-20

> Sprint: fusionar relaciones públicas de la comunidad, reparar la tarjeta KIRO MITM, actualizaciones de dependencia.### Merged PRs

-**PR #498**(@Sajid11194): Soluciona el fallo del ID de máquina de Windows (`undefinido\REG.exe`). Reemplaza `node-machine-id` con consultas de registro del sistema operativo nativo.**Cierra #486.** -**PR #497**(@zhangqiang8vip): Reparar fugas de recursos HMR en modo de desarrollo: 485 conexiones de base de datos filtradas → 1, memoria 2,4 GB → 195 MB. Singletons `globalThis`, corrección de advertencia de Edge Runtime, estabilidad de prueba de Windows. (+1168/-338 en 22 archivos) -**PRs #499-503**(Dependabot): Actualizaciones de acciones de GitHub: `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `docker/login-action@4`.### Bug Fixes

-**#505**— La tarjeta KIRO MITM ahora muestra instrucciones específicas de la herramienta (`api.anthropic.com`) en lugar de texto específico de Antigravity. -**#504**: respondió con una aclaración de UX (se espera que MITM tenga un comportamiento "inactivo" cuando el proxy no se está ejecutando).---

## [2.8.8] — 2026-03-20

> Sprint: Solucionar fallas en las pruebas por lotes de OAuth, agregar el botón "Probar todo" a las páginas de proveedores individuales.### Bug Fixes

-**Caída de la prueba por lotes de OAuth**(ERR_CONNECTION_REFUSED): Se reemplazó el bucle for secuencial con un límite de concurrencia de 5 conexiones + tiempo de espera de 30 segundos por conexión a través de `Promise.race()` + `Promise.allSettled()`. Previene la falla del servidor al probar grandes grupos de proveedores de OAuth (~30+ conexiones).### Funcionalidades

-**Botón "Probar todo" en las páginas de proveedores**: las páginas de proveedores individuales (por ejemplo, `/providers/codex`) ahora muestran un botón "Probar todo" en el encabezado Conexiones cuando hay más de 2 conexiones. Utiliza `POST /api/providers/test-batch` con `{modo: "proveedor", proveedorId}`. Los resultados se muestran en un modal con resumen de pasa/falla y diagnóstico por conexión.---

## [2.8.7] — 2026-03-20

> Sprint: fusionar PR n.° 495 (eliminación del cuello de botella 429), corregir n.° 496 (proveedores de integración personalizados), funciones de clasificación.### Bug Fixes

-**Cuello de botella 429 de espera infinita**(PR #495 por @xandr0s): En 429, `limiter.stop({ dropWaitingJobs: true })` falla inmediatamente en todas las solicitudes en cola para que los llamadores ascendentes puedan activar el respaldo. El limitador se elimina del mapa, por lo que la siguiente solicitud crea una instancia nueva. -**Modelos de incrustación personalizados que no se pueden resolver**(#496): `POST /v1/embeddings` ahora resuelve modelos de incrustación personalizados de TODOS los nodos_proveedor (no solo del host local). Permite agregar modelos como `google/gemini-embedding-001` a través del panel.### Issues Responded

-**#452**— Límites de recuento de solicitudes por clave API (reconocido, en la hoja de ruta) -**#464**: claves API de emisión automática con límites de cuenta/proveedor (necesita más detalles) -**#488**— Listas de modelos de actualización automática (reconocidas, en la hoja de ruta) -**#496**— Resolución personalizada del proveedor de incrustación (fija)---

## [2.8.6] — 2026-03-20

> Sprint: fusionar PR #494 (solución de rol MiniMax), arreglar el panel de KIRO MITM, clasificar 8 problemas.### Funcionalidades

-**Desarrollador MiniMax→corrección de rol del sistema**(PR #494 por @zhangqiang8vip): alternancia `preserveDeveloperRole` por modelo. Agrega la interfaz de usuario "Compatibilidad" en la página de proveedores. Corrige el "error de parámetro de función" 422 para MiniMax y puertas de enlace similares. -**roleNormalizer**: `normalizeDeveloperRole()` ahora acepta el parámetro `preserveDeveloperRole` con comportamiento de tres estados (indefinido=mantener, true=mantener, false=convertir). -**DB**: Nuevos `getModelPreserveOpenAIDeveloperRole()` y `mergeModelCompatOverride()` en `models.ts`.### Bug Fixes

-**Panel de control KIRO MITM**(#481/#487): `CLIToolsPageClient` ahora enruta cualquier herramienta `configType: "mitm"` a `AntigravityToolCard` (controles de inicio/parada de MITM). Anteriormente, sólo Antigravity estaba codificado. -**AntigravityToolCard genérico**: utiliza `tool.image`, `tool.description`, `tool.id` en lugar de valores Antigravity codificados. Protege contra la falta de "modelos predeterminados".### Cleanup

- Se eliminó `ZWS_README_V2.md` (documentos solo de desarrollo del PR #494).### Issues Triaged (8)

-**#487**— Cerrado (KIRO MITM solucionado en esta versión) -**#486**— necesita información (problema de RUTA REG.exe de Windows) -**#489**— need-info (Falta el ID del proyecto Antigravity, se necesita reconexión de OAuth) -**#492**— necesita información (falta app/server.js en un nodo mal administrado) -**#490**— Reconocido (transmisión + bloqueo de caché de contexto, solución planificada) -**#491**— Reconocido (inconsistencia del estado de autenticación del Codex) -**#493**— Reconocido (prefijo de nombre de modelo de proveedor modal, solución alternativa proporcionada) -**#488**— Trabajo pendiente de solicitud de funciones (listas de modelos de actualización automática)---

## [2.8.5] — 2026-03-19

> Sprint: corrige transmisiones zombies SSE, caché de contexto en el primer turno, KIRO MITM y clasificación de 5 problemas externos.### Bug Fixes

-**Zombie SSE Streams**(#473): Reduzca `STREAM_IDLE_TIMEOUT_MS` de 300s → 120s para un retroceso combinado más rápido cuando los proveedores se cuelgan a mitad de la transmisión. Configurable a través de env var. -**Etiqueta de caché de contexto**(#474): corrige `injectModelTag()` para manejar solicitudes de primer turno (sin mensajes del asistente): la protección de caché de contexto ahora funciona desde la primera respuesta. -**KIRO MITM**(#481): Cambie KIRO `configType` de `guide` → `mitm` para que el tablero muestre los controles MITM Start/Stop. -**Prueba E2E**(CI): corrige `providers-bailian-coding-plan.spec.ts`: descarta la superposición modal preexistente antes de hacer clic en el botón Agregar clave API.### Closed Issues

- #473 — Las transmisiones Zombie SSE evitan el combo alternativo
- #474 — Falta la etiqueta `<omniModel>` de caché de contexto en el primer turno
- #481 — MITM para KIRO no se puede activar desde el tablero
- #468 — Servidor remoto Gemini CLI (reemplazado por el #462 en desuso)
- #438 — Claude no puede escribir archivos (problema de CLI externa)
- #439 — AppImage no funciona (solución alternativa documentada de libfuse2)
- #402 — ARM64 DMG "dañado" (solución alternativa documentada de xattr -cr)
- #460: CLI no se puede ejecutar en Windows (corrección de RUTA documentada)---

## [2.8.4] — 2026-03-19

> Sprint: obsolescencia de la CLI de Gemini, corrección de la guía VM i18n, corrección de seguridad del dependabot, expansión del esquema del proveedor.### Funcionalidades

-**Desuso de Gemini CLI**(#462): marcar el proveedor `gemini-cli` como obsoleto con una advertencia: Google restringe el uso de OAuth de terceros a partir de marzo de 2026 -**Esquema de proveedor**(#462): Expanda la validación de Zod con los campos opcionales `deprecated`, `deprecationReason`, `hasFree`, `freeNote`, `authHint`, `apiHint`### Bug Fixes

-**VM Guide i18n**(#471): agregue `VM_DEPLOYMENT_GUIDE.md` al proceso de traducción de i18n, regenere las 30 traducciones locales desde la fuente en inglés (estaban bloqueadas en portugués)### Seguridad

-**deps**: Bump `flatted` 3.3.3 → 3.4.2 — corrige la contaminación del prototipo CWE-1321 (#484, @dependabot)### Closed Issues

- #472 — Regresión de alias de modelo (corregido en v2.8.2)
- #471 — Traducciones de la guía VM rotas
- #483 — `Datos: nulos` después de `[HECHO]` (corregido en v2.8.3)### Merged PRs

- #484 — deps: golpe plano de 3.3.3 a 3.4.2 (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint: i18n checo, corrección del protocolo SSE, traducción de la guía VM.### Funcionalidades

-**Idioma checo**(#482): checo completo (cs) i18n: 22 documentos, 2606 cadenas de interfaz de usuario, actualizaciones del selector de idiomas (@zen0bit) -**Guía de implementación de VM**: traducida del portugués al inglés como documento fuente (@zen0bit)### Bug Fixes

-**Protocolo SSE**(#483): Dejar de enviar `datos: nulos` después de la señal `[DONE]`; corrige `AI_TypeValidationError` en clientes estrictos de AI SDK (validadores basados ​​en Zod)### Merged PRs

- #482 — Agregar idioma checo + Reparar VM_DEPLOYMENT_GUIDE.md Fuente en inglés (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint: 2 relaciones públicas fusionadas, corrección de enrutamiento de alias de modelo, exportación de registros y clasificación de problemas.### Funcionalidades

-**Exportación de registros**: Nuevo botón Exportar en `/dashboard/logs` con menú desplegable de rango de tiempo (1h, 6h, 12h, 24h). Descarga JSON de registros de solicitudes/proxy/llamadas a través de la API `/api/logs/export` (#user-request)### Bug Fixes

-**Enrutamiento de alias de modelo**(#472): Configuración → Los alias de modelo ahora afectan correctamente el enrutamiento del proveedor, no solo la detección de formato. Anteriormente, la salida `resolveModelAlias()` solo se usaba para `getModelTargetFormat()` pero el ID del modelo original se enviaba al proveedor. -**Uso de descarga de flujo**(n.º 480): los datos de uso del último evento SSE en el búfer ahora se extraen correctamente durante el vaciado de flujo (combinado de @prakersh)### Merged PRs

- #480 — Extraer el uso del búfer restante en el controlador de descarga (@prakersh)
- N.º 479: agregue las entradas de precios de ID del modelo antrópico y del Codex 5.3/5.4 que faltan (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint: cinco relaciones públicas de la comunidad: correcciones del registro de llamadas de transmisión, compatibilidad con Kiro, análisis de tokens de caché, traducción al chino e ID de llamadas de herramientas configurables.### Funcionalidades

-**feat(logs)**: El contenido de respuesta del registro de llamadas ahora se acumula correctamente a partir de fragmentos sin procesar del proveedor (OpenAI/Claude/Gemini) antes de la traducción, lo que corrige las cargas útiles de respuesta vacías en el modo de transmisión (#470, @zhangqiang8vip) -**feat(providers)**: Normalización de ID de llamada de herramienta de 9 caracteres configurable por modelo (estilo Mistral): solo los modelos con la opción habilitada obtienen ID truncadas (#470) -**feat(api)**: API Key PATCH ampliada para admitir los campos `allowedConnections`, `name`, `autoResolve`, `isActive` y `accessSchedule` (#470) -**feat(dashboard)**: Diseño de respuesta primero en la interfaz de usuario de detalles del registro de solicitudes (#470) -**feat(i18n)**: Traducción mejorada al chino (zh-CN): retraducción completa (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)**: Elimina el campo "modelo" inyectado del cuerpo de la solicitud: la API de Kiro rechaza campos desconocidos de nivel superior (#478, @prakersh) -**corrección(uso)**: Incluir tokens de lectura de caché + creación de caché en los totales de entrada del historial de uso para análisis precisos (#477, @prakersh) -**fix(callLogs)**: admite campos de uso del formato Claude (`input_tokens`/`output_tokens`) junto con el formato OpenAI, incluye todas las variantes de token de caché (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: proveedor de Bailian Coding Plan con URL base editables, además de contribuciones de la comunidad para Alibaba Cloud y Kimi Coding.### Funcionalidades

-**feat(providers)**: Plan de codificación Bailian agregado (`bailian-coding-plan`): Alibaba Model Studio con API compatible con Anthropic. Catálogo estático de 8 modelos incluidos Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5 y Kimi K2.5. Incluye validación de autenticación personalizada (400=válida, 401/403=no válida) (#467, @Mind-Dragon) -**feat(admin)**: URL predeterminada editable en los flujos de creación/edición del administrador de proveedores: los usuarios pueden configurar URL base personalizadas por conexión. Persistió en `providerSpecificData.baseUrl` con la validación del esquema Zod que rechaza los esquemas que no son http(s) (#467)### 🧪 Tests

- Se agregaron más de 30 pruebas unitarias y 2 escenarios e2e para el proveedor del Plan de codificación Bailian que cubren validación de autenticación, refuerzo de esquemas, comportamiento a nivel de ruta e integración entre capas.---

## [2.7.10] — 2026-03-19

> Sprint: dos nuevos proveedores aportados por la comunidad (Alibaba Cloud Coding, Kimi Coding API-key) y Docker Pin Fix.### Funcionalidades

-**feat(providers)**: Se agregó soporte para Alibaba Cloud Coding Plan con dos terminales compatibles con OpenAI: `alicode` (China) y `alicode-intl` (internacional), cada uno con 8 modelos (#465, @dtk1985) -**feat(providers)**: Se agregó una ruta de proveedor dedicada `kimi-coding-apikey`; el acceso a Kimi Coding basado en clave API ya no se fuerza a través de la ruta `kimi-coding` exclusiva de OAuth. Incluye registro, constantes, API de modelos, configuración y prueba de validación (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**corrección(docker)**: Se agregó la dependencia `split2` que faltaba a la imagen de Docker; `pino-abstract-transport` la requiere en tiempo de ejecución pero no se estaba copiando en el contenedor independiente, lo que provocaba fallas de `No se puede encontrar el módulo 'split2'` (#459)---

## [2.7.9] — 2026-03-18

> Sprint: transferencia de subruta de respuestas del Codex compatible de forma nativa, falla de Windows MITM corregida y esquemas de agente Combos ajustados.### Funcionalidades

-**feat(codex)**: paso de subruta de respuestas nativas para Codex: enruta de forma nativa `POST /v1/responses/compact` al Codex en sentido ascendente, manteniendo la compatibilidad con Claude Code sin eliminar el sufijo `/compact` (#457)### 🐛 Bug Fixes

-**corrección(combos)**: Los esquemas Zod (`updateComboSchema` y `createComboSchema`) ahora incluyen `system_message`, `tool_filter_regex` y `context_cache_protection`. Corrige el error por el cual la capa de validación del backend descartaba silenciosamente las configuraciones específicas del agente creadas a través del panel (#458) -**corrección(mitm)**: Se corrigió el bloqueo del perfil de Kiro MITM en Windows: `node-machine-id` falló debido a que faltaba el entorno `REG.exe` y el respaldo arrojó un error fatal `cripto no está definido`. Fallback ahora importa criptomonedas de forma segura y correcta (#456)---

## [2.7.8] — 2026-03-18

> Sprint: error de ahorro de presupuesto + combinación de funciones de agente UI + corrección de seguridad de etiqueta omniModel.### 🐛 Bug Fixes

-**arreglo(presupuesto)**: "Límites de guardado" ya no devuelve 422; `warningThreshold` ahora se envía correctamente como fracción (0–1) en lugar de porcentaje (0–100) (#451) -**corrección(combos)**: `<omniModel>` la etiqueta de caché interna ahora se elimina antes de reenviar solicitudes a los proveedores, lo que evita interrupciones en la sesión de caché (#454)### Funcionalidades

-**feat(combos)**: Sección de características del agente agregada al modo combinado de creación/edición: expone la anulación de `system_message`, `tool_filter_regex` y `context_cache_protection` directamente desde el panel (#454)---

## [2.7.7] — 2026-03-18

> Sprint: falla de Docker Pino, corrección del trabajador de respuestas de Codex CLI, sincronización de bloqueo de paquetes.### 🐛 Bug Fixes

-**corrección(docker)**: `pino-abstract-transport` y `pino-pretty` ahora se copian explícitamente en la etapa de ejecución de Docker: el rastreo independiente de Next.js omite estos departamentos de pares, lo que provoca el bloqueo de `No se puede encontrar el módulo pino-abstract-transport` al inicio (#449) -**corrección(respuestas)**: Elimine `initTranslators()` de la ruta `/v1/responses`; fallaba el trabajador de Next.js con `el trabajador ha salido` de una excepción no detectada en las solicitudes de CLI del Codex (#450)### 🔧 Maintenance

-**chore(deps)**: `package-lock.json` ahora se confirma en cada aumento de versión para garantizar que Docker `npm ci` use versiones de dependencia exactas---

## [2.7.5] — 2026-03-18

> Sprint: mejoras de UX y corrección de comprobación de estado de la CLI de Windows.### 🐛 Bug Fixes

-**fix(ux)**: muestra la sugerencia de contraseña predeterminada en la página de inicio de sesión; los nuevos usuarios ahora ven `"Contraseña predeterminada: 123456"` debajo de la entrada de contraseña (#437) -**fix(cli)**: Claude CLI y otras herramientas instaladas en npm ahora se detectan correctamente como ejecutables en Windows; spawn usa `shell:true` para resolver contenedores `.cmd` a través de PATHEXT (#447)---

## [2.7.4] — 2026-03-18

> Sprint: panel de herramientas de búsqueda, correcciones de i18n, límites de Copilot, corrección de validación de Serper.### Funcionalidades

-**feat(search)**: agregar Search Playground (décimo punto final), página de herramientas de búsqueda con comparar proveedores/canalización de reclasificación/historial de búsqueda, enrutamiento de reclasificación local, guardias de autenticación en la API de búsqueda (#443 por @Regis-RCR)

- Nueva ruta: `/dashboard/search-tools`
- Entrada de la barra lateral en la sección Depurar
- `GET /api/search/providers` y `GET /api/search/stats` con protecciones de autenticación
- Enrutamiento local de nodos_proveedor para `/v1/rerank`
- Más de 30 claves i18n en el espacio de nombres de búsqueda### 🐛 Bug Fixes

-**corrección(búsqueda)**: corrige el normalizador de Brave News (devolvía 0 resultados), aplica la posnormalización del truncamiento de max_results, corrige la URL de recuperación de la página Endpoints (#443 de @Regis-RCR) -**fix(analytics)**: localice las etiquetas de día/fecha de análisis; reemplace las cadenas portuguesas codificadas con `Intl.DateTimeFormat(locale)` (#444 por @hijak) -**corrección(copilot)**: Corrija la visualización del tipo de cuenta de GitHub Copilot, filtre filas de cuota ilimitadas engañosas desde el panel de límites (#445 por @hijak) -**corrección(proveedores)**: Deje de rechazar claves API de Serper válidas; trate las respuestas que no sean 4xx como autenticación válida (#446 por @hijak)---

## [2.7.3] — 2026-03-18

> Sprint: corrección alternativa de cuota de API directa del Codex.### 🐛 Bug Fixes

-**corrección(codex)**: bloquear cuentas agotadas semanalmente en respaldo directo de API (#440)

- Coincidencia de prefijo `"resolveQuotaWindow()`: `"weekly"` ahora coincide con las claves de caché `"weekly (7d)"`
- `applyCodexWindowPolicy()` aplica los cambios `useWeekly`/`use5h` correctamente
- 4 nuevas pruebas de regresión (766 en total)---

## [2.7.2] — 2026-03-18

> Sprint: Se corrige el contraste de la interfaz de usuario del modo de luz.### 🐛 Bug Fixes

-**fix(logs)**: Se corrigió el contraste del modo de luz en los botones de filtro de registros de solicitud y la insignia combinada (#378)

- Los botones de filtro Error/Éxito/Combo ahora se pueden leer en modo claro
- La insignia de la fila combinada usa un violeta más intenso en el modo claro.---

## [2.7.1] — 2026-03-17

> Sprint: enrutamiento de búsqueda web unificado (POST /v1/search) con 5 proveedores + correcciones de seguridad de Next.js 16.1.7 (6 CVE).### ✨ New Features

-**feat(search)**: enrutamiento de búsqueda web unificado: `POST /v1/search` con 5 proveedores (Serper, Brave, Perplexity, Exa, Tavily)

- Conmutación por error automática entre proveedores, más de 6500 búsquedas gratuitas al mes
- Caché en memoria con fusión de solicitudes (TTL configurable)
- Panel de control: pestaña Análisis de búsqueda en `/dashboard/analytics` con desglose de proveedores, tasa de aciertos de caché y seguimiento de costos
- Nueva API: `GET /api/v1/search/analytics` para estadísticas de solicitudes de búsqueda
- Migración de base de datos: columna `request_type` en `call_logs` para seguimiento de solicitudes fuera del chat
- Validación de Zod (`v1SearchSchema`), autenticada, costo registrado a través de `recordCost()`### Seguridad

-**deps**: Next.js 16.1.6 → 16.1.7 — corrige 6 CVE: -**Crítico**: CVE-2026-29057 (contrabando de solicitudes HTTP a través de proxy http) -**Alto**: CVE-2026-27977, CVE-2026-27978 (WebSocket + Acciones de servidor) -**Medio**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| Archivo                                                          | Propósito                                                  |
| ---------------------------------------------------------------- | ---------------------------------------------------------- | --- |
| `open-sse/handlers/search.ts`                                    | Controlador de búsqueda con enrutamiento de 5 proveedores  |
| `open-sse/config/searchRegistry.ts`                              | Registro de proveedores (autenticación, costo, cuota, TTL) |
| `open-sse/servicios/searchCache.ts`                              | Caché en memoria con fusión de solicitudes                 |
| `src/app/api/v1/search/route.ts`                                 | Ruta Next.js (POST + GET)                                  |
| `src/app/api/v1/search/analytics/route.ts`                       | API de estadísticas de búsqueda                            |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Pestaña del panel de análisis                              |
| `src/lib/db/migrations/007_search_request_type.sql`              | Migración de base de datos                                 |
| `pruebas/unidad/registro-de-búsqueda.test.mjs`                   | 277 líneas de pruebas unitarias                            | --- |

## [2.7.0] — 2026-03-17

> Sprint: funciones inspiradas en ClawRouter: indicador de llamada de herramientas, detección de intención multilingüe, respaldo basado en pruebas comparativas, deduplicación de solicitudes, RouterStrategy conectable, precios Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5.### ✨ New Models & Pricing

-**feat(precios)**: xAI Grok-4 Fast: `$0,20/$0,50 por 1 millón de tokens`, latencia p50 de 1143 ms, compatible con llamadas de herramientas -**feat(precios)**: xAI Grok-4 (estándar) — `$0,20/$1,50 por 1 millón de tokens`, razonamiento emblemático -**feat(precios)**: GLM-5 vía Z.AI — `$0,5/1M`, contexto de salida de 128K -**feat(precios)**: MiniMax M2.5 — `$0,30/1 millón de entrada`, razonamiento + tareas de agente -**feat(precios)**: DeepSeek V3.2 — precio actualizado `$0,27/$1,10 por 1M` -**feat(precios)**: Kimi K2.5 a través de Moonshot API: acceso directo a Moonshot API -**feat(providers)**: Proveedor Z.AI agregado (alias `zai`) — Familia GLM-5 con salida de 128K### 🧠 Routing Intelligence

-**feat(registry)**: indicador `toolCalling` por modelo en el registro de proveedores; los combos ahora pueden preferir/requerir modelos capaces de llamar a herramientas -**feat(scoring)**: Detección de intención multilingüe para puntuación AutoCombo: los patrones de lenguaje/escritura PT/ZH/ES/AR influyen en la selección del modelo por contexto de solicitud -**feat(fallback)**: Cadenas de respaldo basadas en puntos de referencia: datos de latencia real (p50 de `comboMetrics`) utilizados para reordenar la prioridad de respaldo dinámicamente -**feat(dedup)**: Solicitar deduplicación a través de content-hash: la ventana de idempotencia de 5 segundos evita que las llamadas duplicadas del proveedor vuelvan a intentarlo con los clientes. -**feat(router)**: Interfaz `RouterStrategy` conectable en `autoCombo/routerStrategy.ts`: se puede inyectar lógica de enrutamiento personalizada sin modificar el núcleo### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 nuevos esquemas de herramientas avanzadas: `omniroute_get_provider_metrics` (p50/p95/p99 por proveedor) y `omniroute_explain_route` (explicación de la decisión de enrutamiento) -**feat(mcp)**: Se actualizaron los alcances de autenticación de la herramienta MCP; se agregó el alcance `metrics:read` para las herramientas de métricas del proveedor -**feat(mcp)**: `omniroute_best_combo_for_task` ahora acepta el parámetro `languageHint` para enrutamiento multilingüe### 📊 Observability

-**feat(metrics)**: `comboMetrics.ts` ampliado con seguimiento percentil de latencia en tiempo real por proveedor/cuenta -**feat(health)**: La API de salud (`/api/monitoring/health`) ahora devuelve los campos `p50Latency` y `errorRate` por proveedor -**feat(usage)**: Migración del historial de uso para seguimiento de latencia por modelo### 🗄️ DB Migrations

-**feat(migrations)**: Nueva columna `latency_p50` en la tabla `combo_metrics`: interrupción cero, segura para los usuarios existentes### 🐛 Bug Fixes / Closures

-**close(#411)**: resolución del módulo hash better-sqlite3 en Windows — corregido en v2.6.10 (f02c5b5) -**close(#409)**: La finalización del chat de GitHub Copilot falla con los modelos de Claude cuando se adjuntan archivos; solucionado en v2.6.9 (838f1d6) -**close(#405)**: Duplicado de #411 — resuelto## [2.6.10] — 2026-03-17

> Corrección de Windows: descarga precompilada de better-sqlite3 sin node-gyp/Python/MSVC (#426).### 🐛 Bug Fixes

-**fix(install/#426)**: En Windows, `npm install -g omniroute` solía fallar con `better_sqlite3.node no es una aplicación Win32 válida` porque el binario nativo incluido se compiló para Linux. Agrega**Estrategia 1.5**a `scripts/postinstall.mjs`: usa `@mapbox/node-pre-gyp install --fallback-to-build=false` (incluido en `better-sqlite3`) para descargar el binario prediseñado correcto para el sistema operativo/arch actual sin necesidad de ninguna herramienta de compilación (sin node-gyp, sin Python, sin MSVC). Vuelve a `npm build` solo si falla la descarga. Agrega mensajes de error específicos de la plataforma con instrucciones claras de reparación manual.---

## [2.6.9] — 2026-03-17

> Correcciones de CI (t11 de cualquier presupuesto), corrección de errores n.º 409 (archivos adjuntos a través de Copilot+Claude), corrección del flujo de trabajo de lanzamiento.### 🐛 Bug Fixes

-**fix(ci)**: Eliminar la palabra "cualquiera" de los comentarios en `openai-responses.ts` y `chatCore.ts` que no pasaron la verificación de presupuesto t11 `cualquier` (falso positivo de los comentarios de conteo de expresiones regulares) -**fix(chatCore)**: normaliza los tipos de partes de contenido no compatibles antes de reenviarlos a los proveedores (#409: el cursor envía `{type:"file"}` cuando se adjuntan archivos `.md`; Copilot y otros proveedores compatibles con OpenAI rechazan con "el tipo tiene que ser 'image_url' o 'text'"; la corrección convierte bloques de `file`/`document` en `text` y descarta tipos desconocidos)### 🔧 Workflow

-**chore(generate-release)**: agregue REGLA DE COMMIT ATÓMICO: el aumento de versión (`parche de versión npm`) DEBE ocurrir antes de confirmar los archivos de características para garantizar que la etiqueta siempre apunte a una confirmación que contenga todos los cambios de versión juntos---

## [2.6.8] — 2026-03-17

> Sprint: Combo como agente (indicador del sistema + filtro de herramientas), protección de almacenamiento en caché de contexto, actualización automática, registros detallados, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: `ALTERAR TABLA combos AGREGAR COLUMNA system_message TEXTO POR DEFECTO NULO`, `tool_filter_regex TEXTO POR DEFECTO NULO`, `context_cache_protection INTEGER POR DEFECTO 0` -**006_detailed_request_logs.sql**: Nueva tabla `request_detail_logs` con activador de búfer de anillo de 500 entradas, habilitación mediante alternancia de configuración### Funcionalidades

-**feat(combo)**: Anulación de mensajes del sistema por combo (#399: el campo `system_message` reemplaza o inyecta el mensaje del sistema antes de reenviarlo al proveedor) -**feat(combo)**: expresión regular del filtro de herramientas por combo (#399 — `tool_filter_regex` mantiene solo las herramientas que coinciden con el patrón; admite formatos OpenAI + Anthropic) -**feat(combo)**: Protección de almacenamiento en caché de contexto (#401 — `context_cache_protection` etiqueta las respuestas con `<omniModel>proveedor/model</omniModel>` y modelo de pines para la continuidad de la sesión) -**feat(settings)**: Actualización automática a través de Configuración (#320 — `GET /api/system/version` + `POST /api/system/update` — verifica el registro de npm y las actualizaciones en segundo plano con el reinicio de pm2) -**feat(logs)**: Registros de solicitudes detallados (#378: captura los cuerpos completos del proceso en 4 etapas: solicitud del cliente, solicitud traducida, respuesta del proveedor, respuesta del cliente: alternancia de participación, recorte de 64 KB, búfer de anillo de 500 entradas) -**feat(mitm)**: perfil MITM Kiro IDE (#336 — `src/mitm/targets/kiro.ts` apunta a api.anthropic.com, reutiliza la infraestructura MITM existente)---

## [2.6.7] — 2026-03-17

> Sprint: mejoras de SSE, extensiones de proveedores_nodos locales, registro de proxy, correcciones de paso a través de Claude.### Funcionalidades

-**feat(health)**: Verificación de estado de fondo para `provider_nodes` locales con retroceso exponencial (30s→300s) y `Promise.allSettled` para evitar el bloqueo (#423, @Regis-RCR) -**feat(embeddings)**: Ruta `/v1/embeddings` a `provider_nodes` local — `buildDynamicEmbeddingProvider()` con validación de nombre de host (#422, @Regis-RCR) -**feat(audio)**: Enrute TTS/STT a `provider_nodes` local — `buildDynamicAudioProvider()` con protección SSRF (#416, @Regis-RCR) -**feat(proxy)**: registro de proxy, API de administración y generalización de límite de cuota (#429, @Regis-RCR)### 🐛 Bug Fixes

-**corrección(sse)**: Elimina los campos específicos de Claude (`metadata`, `anthropic_version`) cuando el objetivo es compatible con OpenAI (#421, @prakersh) -**fix(sse)**: Extrae el uso de Claude SSE (`input_tokens`, `output_tokens`, tokens de caché) en modo de transmisión de paso (#420, @prakersh) -**corrección(sse)**: genera `call_id` alternativo para llamadas a herramientas con ID faltantes o vacíos (#419, @prakersh) -**corrección(sse)**: paso de Claude a Claude: cuerpo delantero completamente intacto, sin retraducción (#418, @prakersh) -**corrección(sse)**: Filtra elementos huérfanos `tool_result` después de la compactación del contexto de Claude Code para evitar errores 400 (#417, @prakersh) -**corrección(sse)**: omitir llamadas a herramientas de nombre vacío en el traductor de API de Respuestas para evitar bucles infinitos de `placeholder_tool` (#415, @prakersh) -**corrección(sse)**: Elimina los bloques de contenido de texto vacíos antes de la traducción (#427, @prakersh) -**arreglo(api)**: Agregue `refreshable: true` a la configuración de prueba de Claude OAuth (#428, @prakersh)### 📦 Dependencies

- Mejora `vitest`, `@vitest/*` y devDependencies relacionadas (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Revisión: compatibilidad con Turbopack/Docker: elimine el protocolo `node:` de todas las importaciones `src/`.### 🐛 Bug Fixes

-**fix(build)**: Se eliminó el prefijo de protocolo `node:` de las declaraciones `import` en 17 archivos bajo `src/`. Las importaciones de `node:fs`, `node:path`, `node:url`, `node:os`, etc. provocaron que `el archivo Ecmascript tuvo un error` en las compilaciones de Turbopack (Next.js 15 Docker) y en las actualizaciones de instalaciones globales de npm anteriores. Archivos afectados: `migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts` y otros 12 en `src/app/api/` y `src/lib/`. -**chore(workflow)**: `generate-release.md` actualizado para sincronizar Docker Hub y implementar VPS dual pasos**obligatorios**en cada versión.---

## [2.6.5] — 2026-03-17

> Sprint: filtrado de parámetros del modelo de razonamiento, corrección 404 del proveedor local, proveedor Kilo Gateway, aumentos de dependencia.### ✨ New Features

-**feat(api)**: Se agregó**Kilo Gateway**(`api.kilo.ai`) como nuevo proveedor de claves API (alias `kg`): más de 335 modelos, 6 modelos gratuitos, 3 modelos de enrutamiento automático (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free`). Modelos de paso admitidos a través del punto final `/api/gateway/models`. (PR #408 por @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: elimina los parámetros no admitidos para los modelos de razonamiento (o1, o1-mini, o1-pro, o3, o3-mini). Los modelos de la familia `o1`/`o3` rechazan `temperature`, `top_p`, `frequency_penalty`, `presence_penalty`, `logprobs`, `top_logprobs` y `n` con HTTP 400. Los parámetros ahora se eliminan en la capa `chatCore` antes del reenvío. Utiliza un campo declarativo `unsupportedParams` por modelo y un mapa O(1) precalculado para la búsqueda. (PR #412 por @Regis-RCR) -**corrección(sse)**: el proveedor local 404 ahora genera un**bloqueo solo del modelo (5 segundos)**en lugar de un bloqueo a nivel de conexión (2 minutos). Cuando un backend de inferencia local (Ollama, LM Studio, oMLX) devuelve 404 para un modelo desconocido, la conexión permanece activa y otros modelos continúan funcionando inmediatamente. También corrige un error preexistente donde "modelo" no se pasaba a "markAccountUnavailable()". Proveedores locales detectados a través del nombre de host (`localhost`, `127.0.0.1`, `::1`, extensible a través de la var de entorno `LOCAL_HOSTNAMES`). (PR #410 por @Regis-RCR)### 📦 Dependencies

- `mejor-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-agente-proxy` 7 → 8
- `base-agente` 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**corrección(proveedores)**: Se eliminaron nombres de modelos inexistentes en 5 proveedores: -**gemini / gemini-cli**: eliminado `gemini-3.1-pro/flash` y `gemini-3-*-preview` (no existen en Google API v1beta); reemplazado por `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro/flash` -**antigravity**: eliminado `gemini-3.1-pro-high/low` y `gemini-3-flash` (alias internos no válidos); reemplazado con modelos 2.x reales -**github (Copilot)**: eliminado `gemini-3-flash-preview` y `gemini-3-pro-preview`; reemplazado por `gemini-2.5-flash` -**nvidia**: corregido `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (NVIDIA NIM usa el espacio de nombres `meta/` para los modelos Meta); se agregaron `nvidia/llama-3.1-70b-instruct` y `nvidia/llama-3.1-405b-instruct` -**fix(db/combo)**: Combo `free-stack` actualizado en la base de datos remota: eliminado `qw/qwen3-coder-plus` (token de actualización caducado), corregido `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-70b-instruct`, corregido `gemini/gemini-3.1-flash` → `gemini/gemini-2.5-flash`, agregado `if/deepseek-v3.2`---

## [2.6.3] — 2026-03-16

> Sprint: zod/pino hash-strip integrado en el proceso de compilación, se agregó el proveedor sintético, se corrigió la ruta VPS PM2.### 🐛 Bug Fixes

-**corrección(compilación)**: Turbopack hash-strip ahora se ejecuta en**tiempo de compilación**para TODOS los paquetes, no solo para `better-sqlite3`. El paso 5.6 en `prepublish.mjs` recorre cada `.js` en `app/.next/server/` y elimina el sufijo hexadecimal de 16 caracteres de cualquier `require()` con hash. Corrige `zod-dcb22c...`, `pino-...`, etc. MODULE_NOT_FOUND en instalaciones globales de npm. Cierra #398 -**solución(implementación)**: PM2 en ambos VPS apuntaba a directorios obsoletos de git-clone. Reconfigurado a `app/server.js` en el paquete global npm. Se actualizó el flujo de trabajo `/deploy-vps` para usar `npm pack + scp` (el registro npm rechaza paquetes de 299 MB).### Funcionalidades

-**feat(provider)**: Synthetic ([synthetic.new](https://synthetic.new)): inferencia compatible con OpenAI centrada en la privacidad. `passthroughModels: true` para el catálogo de modelos dinámico de HuggingFace. Modelos iniciales: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 por @Regis-RCR)### 📋 Issues Closed

-**cerrar n.º 398**: regresión hash de npm: corregida mediante hash-strip en tiempo de compilación en la publicación previa -**clasificación n.º 324**: captura de pantalla del error sin pasos: detalles de reproducción solicitados---

## [2.6.2] — 2026-03-16

> Sprint: hash del módulo completamente arreglado, 2 RP fusionados (filtro de herramientas antrópicas + rutas de punto final personalizadas), se agregó el proveedor Alibaba Cloud DashScope, 3 problemas obsoletos cerrados.### 🐛 Bug Fixes

-**corrección(compilación)**: tira hash extendida del paquete web `externals` para cubrir TODOS los `serverExternalPackages`, no solo `better-sqlite3`. Next.js 16 Turbopack convierte `zod`, `pino` y todos los demás paquetes externos del servidor en nombres como `zod-dcb22c6336e0bc69` que no existen en `node_modules` en tiempo de ejecución. Una expresión regular HASH_PATTERN ahora elimina el sufijo de 16 caracteres y vuelve al nombre del paquete base. También se agregó `NEXT_PRIVATE_BUILD_WORKER=0` en `prepublish.mjs` para reforzar el modo de paquete web, además de un escaneo posterior a la compilación que informa cualquier referencia hash restante. (#396, #398, PR #403) -**corrección(chat)**: Los nombres de herramientas en formato antrópico (`tool.name` sin el envoltorio `.function`) fueron eliminados silenciosamente por el filtro de nombre vacío introducido en el n.° 346. LiteLLM representa solicitudes con el prefijo `anthropic/` en formato API de Anthropic Messages, lo que hace que todas las herramientas se filtren y Anthropic devuelva `400: tool_choice.any solo se puede especificar al proporcionar herramientas`. Se solucionó recurriendo a `tool.name` cuando `tool.function.name` está ausente. Se agregaron 8 pruebas unitarias de regresión. (PR#397)### Funcionalidades

-**feat(api)**: Rutas de punto final personalizadas para nodos de proveedores compatibles con OpenAI: configure `chatPath` y `modelsPath` por nodo (por ejemplo, `/v4/chat/completions`) en la interfaz de usuario de conexión del proveedor. Incluye una migración de base de datos (`003_provider_node_custom_paths.sql`) y desinfección de la ruta URL (sin recorrido `..`, debe comenzar con `/`). (PR#400) -**feat(proveedor)**: Alibaba Cloud DashScope agregado como proveedor compatible con OpenAI. Punto final internacional: `dashscope-intl.aliyuncs.com/compatible-mode/v1`. 12 modelos: `qwen-max`, `qwen-plus`, `qwen-turbo`, `qwen3-coder-plus/flash`, `qwq-plus`, `qwq-32b`, `qwen3-32b`, `qwen3-235b-a22b`. Autenticación: clave API de portador.### 📋 Issues Closed

-**cerrar #323**: Error de conexión de línea `[objeto Objeto]` — corregido en v2.3.7; usuario indicado para actualizar desde v2.2.9 -**cerrar #337**: Seguimiento de crédito de Kiro: implementado en v2.5.5 (#381); dirigió al usuario al Panel → Uso -**clasificación #402**: ARM64 macOS DMG dañado: versión de macOS solicitada, error exacto y solución alternativa `xattr -d com.apple.quarantine`---

## [2.6.1] — 2026-03-15

> Solución de inicio crítica: las instalaciones globales de npm v2.6.0 fallaron con un error 500 debido a un error de hash del nombre del módulo Turbopack/webpack en el enlace de instrumentación Next.js 16.### 🐛 Bug Fixes

-**fix(build)**: Fuerza que `better-sqlite3` siempre sea requerido por su nombre de paquete exacto en el paquete del servidor webpack. Next.js 16 compiló el enlace de instrumentación en un fragmento separado y emitió `require('better-sqlite3-<hash>')`, un nombre de módulo con hash que no existe en `node_modules`, aunque el paquete figuraba en `serverExternalPackages`. Se agregó una función `externals` explícita a la configuración del paquete web del servidor para que el paquete siempre emita `require('better-sqlite3')`, resolviendo el `500 Internal Server Error` de inicio en instalaciones globales limpias. (#394, PR #395)### 🔧 CI

-**ci**: Se agregó `workflow_dispatch` a `npm-publish.yml` con protección de sincronización de versiones para activadores manuales (#392) -**ci**: Se agregó `workflow_dispatch` a `docker-publish.yml`, se actualizaron GitHub Actions a las últimas versiones (#392)---

## [2.6.0] - 2026-03-15

> Sprint de resolución de problemas: 4 errores corregidos, registros UX mejorados, seguimiento de crédito de Kiro agregado.### 🐛 Bug Fixes

-**corrección(media)**: ComfyUI y SD WebUI ya no aparecen en la lista de proveedores de la página de medios cuando no están configurados: recupera `/api/providers` en el montaje y oculta los proveedores locales sin conexiones (#390) -**corrección(auth)**: la operación por turnos ya no vuelve a seleccionar cuentas con tasa limitada inmediatamente después del tiempo de reutilización; `backoffLevel` ahora se usa como clave de clasificación principal en la rotación de LRU (#340) -**corrección(oauth)**: Qoder (y otros proveedores que redireccionan a su propia interfaz de usuario) ya no dejan el modo OAuth bloqueado en "Esperando autorización": el detector de ventanas emergentes cerradas realiza transiciones automáticas al modo de entrada manual de URL (#344) -**corrección(logs)**: la tabla de registro de solicitudes ahora se puede leer en modo claro: las insignias de estado, los recuentos de tokens y las etiquetas combinadas utilizan clases de color "oscuras" adaptables (#378)### Funcionalidades

-**feat(kiro)**: Se agregó el seguimiento de créditos de Kiro al buscador de uso: consultas `getUserCredits` desde el punto final de AWS CodeWhisperer (#337)### 🛠 Chores

-**chore(tests)**: `test:plan3`, `test:fixes`, `test:security` alineados para usar el mismo cargador `tsx/esm` que `npm test`; elimina los falsos negativos de la resolución del módulo en ejecuciones específicas (PR #386)---

## [2.5.9] - 2026-03-15

> Corrección de paso nativo del Codex + refuerzo de validación del cuerpo de ruta.### 🐛 Bug Fixes

-**corrección(codex)**: Preservar el paso a través de la API de Respuestas nativa para clientes Codex: evita mutaciones de traducción innecesarias (PR #387) -**corrección(api)**: valida los cuerpos de solicitud en rutas de fijación de precios/sincronización y enrutamiento de tareas: evita fallas por entradas con formato incorrecto (PR #388) -**fix(auth)**: Los secretos de JWT persisten durante los reinicios a través de `src/lib/db/secrets.ts`: elimina los errores 401 después del reinicio de pm2 (PR #388)---

## [2.5.8] - 2026-03-15

> Corrección de compilación: restaurar la conectividad VPS rota por la publicación incompleta de v2.5.7.### 🐛 Bug Fixes

-**corrección(compilación)**: `scripts/prepublish.mjs` todavía usaba el indicador obsoleto `--webpack` que provocaba que la compilación independiente de Next.js fallara silenciosamente; la publicación de npm se completó sin `app/server.js`, interrumpiendo la implementación de VPS---

## [2.5.7] - 2026-03-15

> Correcciones de errores en el manejo de errores del área de juegos multimedia.### 🐛 Bug Fixes

-**corrección(media)**: Transcripción "Se requiere clave API" falso positivo cuando el audio no contiene voz (música, silencio) - ahora muestra "No se detectó voz" en su lugar -**fix(media)**: `upstreamErrorResponse` en `audioTranscription.ts` y `audioSpeech.ts` ahora devuelve JSON adecuado (`{error:{message}}`), lo que permite la detección correcta de errores de credenciales 401/403 en MediaPageClient -**fix(media)**: `parseApiError` ahora maneja el campo `err_msg` de Deepgram y detecta la `"clave de API"` en los mensajes de error para una clasificación precisa de los errores de credenciales---

## [2.5.6] - 2026-03-15

> Correcciones críticas de seguridad/autenticación: Antigravity OAuth roto + sesiones JWT perdidas después del reinicio.### 🐛 Bug Fixes

-**corrección(oauth) #384**: Antigravity Google OAuth ahora envía correctamente `client_secret` al punto final del token. La alternativa para `ANTIGRAVITY_OAUTH_CLIENT_SECRET` era una cadena vacía, lo cual es falso, por lo que `client_secret` nunca se incluyó en la solicitud, lo que provocó errores de `"falta client_secret"` para todos los usuarios sin una var de entorno personalizada. Cierra el número 383. -**fix(auth) #385**: `JWT_SECRET` ahora persiste en SQLite (`namespace='secrets'`) en la primera generación y se recarga en inicios posteriores. Anteriormente, se generaba un nuevo secreto aleatorio en cada inicio del proceso, lo que invalidaba todas las cookies/sesiones existentes después de cualquier reinicio o actualización. Afecta tanto a `JWT_SECRET` como a `API_KEY_SECRET`. Cierra el número 382.---

## [2.5.5] - 2026-03-15

> Corrección de deduplicación de lista de modelos, refuerzo de compilación independiente de Electron y seguimiento de crédito de Kiro.### 🐛 Bug Fixes

-**fix(models) #380**: `GET /api/models` ahora incluye alias de proveedores al crear el filtro de proveedor activo; los modelos para `claude` (alias `cc`) y `github` (alias `gh`) siempre se mostraban independientemente de si se configuró una conexión, porque las claves `PROVIDER_MODELS` son alias, pero las conexiones de base de datos se almacenan bajo ID de proveedor. Se solucionó expandiendo cada ID de proveedor activo para incluir también su alias a través de `PROVIDER_ID_TO_ALIAS`. Cierra el número 353. -**fix(electron) #379**: El nuevo `scripts/prepare-electron-standalone.mjs` organiza un paquete `/.next/electron-standalone` dedicado antes del empaquetado de Electron. Se cancela con un error claro si `node_modules` es un enlace simbólico (electron-builder enviaría una dependencia de tiempo de ejecución en la máquina de compilación). Saneamiento de rutas multiplataforma a través de `path.basename`. Por @kfiramar.### ✨ New Features

-**feat(kiro) #381**: Seguimiento del saldo de crédito de Kiro: el punto final de uso ahora devuelve datos de crédito para las cuentas de Kiro llamando a `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (el mismo punto final que Kiro IDE usa internamente). Devuelve los créditos restantes, la asignación total, la fecha de renovación y el nivel de suscripción. Cierra el número 337.## [2.5.4] - 2026-03-15

> Corrección de inicio del registrador, corrección de seguridad de arranque de inicio de sesión y mejora de la confiabilidad del HMR del desarrollador. Infraestructura de CI reforzada.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**: Restaurar la ruta del registrador de transporte de pino: pino rechaza `formatters.level` combinado con `transport.targets`. Las configuraciones respaldadas por transporte ahora eliminan el formateador de nivel mediante `getTransportCompatibleConfig()`. También corrige la asignación de niveles numéricos en `/api/logs/console`: `30→info, 40→warn, 50→error` (se desplazó en uno). -**fix(login) #375**: La página de inicio de sesión ahora arranca desde el punto final público `/api/settings/require-login` en lugar del protegido `/api/settings`. En configuraciones protegidas con contraseña, la página de autenticación previa recibía un 401 y recurría innecesariamente a valores predeterminados seguros. La ruta pública ahora devuelve todos los metadatos de arranque (`requireLogin`, `hasPassword`, `setupComplete`) con un respaldo conservador de 200 en caso de error. -**corrección(dev) #374**: Agregue `localhost` y `127.0.0.1` a `allowedDevOrigins` en `next.config.mjs`: el websocket de HMR se bloqueó al acceder a la aplicación a través de la dirección de bucle invertido, lo que generó repetidas advertencias de origen cruzado.### 🔧 CI & Infrastructure

-**Corrección de ESLint OOM**: `eslint.config.mjs` ahora ignora `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**` y `clipr/**`. ESLint fallaba con un OOM de montón JS al escanear blobs binarios de VS Code y fragmentos compilados. -**Corrección de prueba unitaria**: se eliminó `ALTER TABLE provedor_conexiones AGREGAR COLUMNA "grupo"` de 2 archivos de prueba; la columna ahora es parte del esquema base (agregado en #373), causando `SQLITE_ERROR: nombre de columna duplicado` en cada ejecución de CI. -**Gancho de confirmación previa**: se agregó `npm run test:unit` a `.husky/pre-commit`; las pruebas unitarias ahora bloquean las confirmaciones rotas antes de que lleguen a CI.## [2.5.3] - 2026-03-14

> Correcciones de errores críticos: migración del esquema de base de datos, carga del entorno de inicio, eliminación del estado de error del proveedor y corrección de información sobre herramientas de i18n. Mejoras en la calidad del código además de cada PR.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373**: Agregar la columna `provider_connections.group` al esquema base + migración de reposición para las bases de datos existentes; la columna se usó en todas las consultas pero faltaba en la definición del esquema -**fix(i18n) #371**: Reemplace la clave `t("deleteConnection")` inexistente con la clave `providers.delete` existente; corrige el error de tiempo de ejecución `MISSING_MESSAGE: proveedores.deleteConnection` en la página de detalles del proveedor -**corrección(auth) #372**: borra los metadatos de errores obsoletos (`errorCode`, `lastErrorType`, `lastErrorSource`) de las cuentas del proveedor después de una recuperación genuina; anteriormente, las cuentas recuperadas seguían apareciendo como fallidas. -**corrección(inicio) #369**: unifique la carga de entorno en `npm run start`, `run-standalone.mjs` y Electron para respetar la prioridad `DATA_DIR/.env → ~/.omniroute/.env → ./.env`; evita generar una nueva `STORAGE_ENCRYPTION_KEY` sobre una base de datos cifrada existente### 🔧 Code Quality

- Patrones documentados `result.success` vs `response?.ok` en `auth.ts` (ambos intencionales, ahora explicados)
- Normalizado `overridePath?.trim()` en `electron/main.js` para que coincida con `bootstrap-env.mjs`
- Se agregó el comentario de orden de fusión `preferredEnv` en el inicio de Electron.

> Política de cuota de cuenta del Codex con rotación automática, cambio rápido de niveles, modelo gpt-5.4 y corrección de etiquetas de análisis.### ✨ New Features (PRs #366, #367, #368)

-**Política de cuotas del Codex (PR n.º 366)**: la ventana de cuota semanal por cuenta de 5 horas se alterna en el panel del proveedor. Las cuentas se omiten automáticamente cuando las ventanas habilitadas alcanzan el umbral del 90% y se vuelven a admitir después de "resetAt". Incluye `quotaCache.ts` con captador de estado sin efectos secundarios. -**Alternancia rápida de nivel de Codex (PR #367)**: Panel → Configuración → Nivel de servicio de Codex. La opción de desactivación predeterminada inyecta `service_tier: "flex"` solo para las solicitudes del Codex, lo que reduce el costo en aproximadamente un 80 %. Pila completa: pestaña UI + punto final API + ejecutor + traductor + restauración de inicio. -**Modelo gpt-5.4 (PR #368)**: Agrega `cx/gpt-5.4` y `codex/gpt-5.4` al registro del modelo Codex. Prueba de regresión incluida.### 🐛 Bug Fixes

-**solución #356**: Los gráficos de análisis (proveedor principal, por cuenta, desglose de proveedores) ahora muestran nombres/etiquetas de proveedores legibles por humanos en lugar de ID internos sin procesar para proveedores compatibles con OpenAI.

> Lanzamiento principal: estrategia de enrutamiento estrictamente aleatorio, controles de acceso a claves API, grupos de conexión, sincronización de precios externa y correcciones de errores críticos para modelos de pensamiento, pruebas combinadas y validación de nombres de herramientas.### ✨ New Features (PRs #363 & #365)

-**Estrategia de enrutamiento aleatorio estricto**: baraja Fisher-Yates con garantía anti-repetición y serialización mutex para solicitudes simultáneas. Decks independientes por combo y por proveedor. -**Controles de acceso a claves API**: `allowedConnections` (restringe qué conexiones puede usar una clave), `is_active` (activar/desactivar clave con 403), `accessSchedule` (control de acceso basado en tiempo), alternar `autoResolve`, cambiar el nombre de las claves a través de PATCH. -**Grupos de conexiones**: Conexiones de proveedores de grupos por entorno. Vista de acordeón en la página Límites con persistencia de almacenamiento local y cambio automático inteligente. -**Sincronización de precios externa (LiteLLM)**: resolución de precios de 3 niveles (anulaciones de usuario → sincronizados → valores predeterminados). Regístrese a través de `PRICING_SYNC_ENABLED=true`. Herramienta MCP `omniroute_sync_pricing`. 23 nuevas pruebas. -**i18n**: 30 idiomas actualizados con estrategia estrictamente aleatoria, cadenas de administración de claves API. pt-BR completamente traducido.### 🐛 Bug Fixes

-**solución n.º 355**: el tiempo de espera de inactividad de la transmisión aumentó de 60 a 300 segundos: evita la cancelación de modelos de pensamiento extendido (claude-opus-4-6, o3, etc.) durante fases de razonamiento prolongadas. Configurable a través de `STREAM_IDLE_TIMEOUT_MS`. -**solución #350**: La prueba combinada ahora omite `REQUIRE_API_KEY=true` usando el encabezado interno y usa el formato compatible con OpenAI universalmente. El tiempo de espera se amplió de 15 a 20 segundos. -**solución #346**: Las herramientas con `function.name` vacío (reenviado por Claude Code) ahora se filtran antes de que los proveedores ascendentes las reciban, evitando errores de "Entrada no válida[N].nombre: cadena vacía".### 🗑️ Closed Issues

-**#341**: Se eliminó la sección de depuración; el reemplazo es `/dashboard/logs` y `/dashboard/health`.

> Compatibilidad con API Key Round-Robin para configuraciones de proveedores de claves múltiples y confirmación de enrutamiento con comodines y ventana de cuotas ya implementadas.### ✨ New Features

-**API Key Round-Robin (T07)**: Provider connections can now hold multiple API keys (Edit Connection → Extra API Keys). Las solicitudes rotan por turnos entre claves primarias + adicionales a través de `providerSpecificData.extraApiKeys[]`. Las claves se mantienen en memoria indexadas por conexión; no se requieren cambios en el esquema de base de datos.### 📝 Already Implemented (confirmed in audit)

-**Enrutamiento de modelo comodín (T13)**: `wildcardRouter.ts` con coincidencia de comodines de estilo global (`gpt*`, `claude-?-sonnet`, etc.) ya está integrado en `model.ts` con clasificación de especificidad. -**Quota Window Rolling (T08)**: `accountFallback.ts:isModelLocked()` ya avanza automáticamente la ventana; si `Date.now() > Entry.until`, el bloqueo se elimina inmediatamente (sin bloqueo obsoleto).

> Pulido de la interfaz de usuario, adiciones a estrategias de enrutamiento y manejo elegante de errores para límites de uso.### ✨ New Features

-**Estrategias de enrutamiento Fill-First y P2C**: se agregó `fill-first` (drenaje de cuota antes de continuar) y `p2c` (selección de baja latencia con poder de dos opciones) al selector de estrategias combinado, con paneles de orientación completos e insignias codificadas por colores. -**Modelos preestablecidos de Free Stack**: la creación de un combo con la plantilla Free Stack ahora completa automáticamente 7 modelos de proveedores gratuitos de primer nivel (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Los usuarios simplemente activan los proveedores y obtienen un combo de $0/mes listo para usar. -**Modal de combo más amplio**: el modo de combo Crear/Editar ahora usa `max-w-4xl` para una edición cómoda de combos grandes.### 🐛 Bug Fixes

-**Página de límites HTTP 500 para Codex y GitHub**: `getCodexUsage()` y `getGitHubUsage()` ahora devuelven un mensaje fácil de usar cuando el proveedor devuelve 401/403 (token caducado), en lugar de generar y causar un error 500 en la página de límites. -**MaintenanceBanner falso positivo**: el banner ya no muestra "El servidor es inalcanzable" de forma espuria al cargar la página. Se solucionó llamando a `checkHealth()` inmediatamente en el montaje y eliminando el cierre de estado obsoleto `show`. -**Información sobre herramientas del ícono del proveedor**: los botones Editar (lápiz) y eliminar ícono en la fila de conexión del proveedor ahora tienen información sobre herramientas HTML nativa; los 6 íconos de acción ahora están autodocumentados.

> Múltiples mejoras provenientes del análisis de problemas de la comunidad, soporte para nuevos proveedores, correcciones de errores para el seguimiento de tokens, enrutamiento de modelos y confiabilidad de la transmisión.### ✨ New Features

-**Enrutamiento inteligente según tareas (T05)**: selección automática de modelo según el tipo de contenido de la solicitud: codificación → deepseek-chat, análisis → gemini-2.5-pro, visión → gpt-4o, resumen → gemini-2.5-flash. Configurable a través de Configuración. New `GET/PUT/POST /api/settings/task-routing` API. -**Proveedor HuggingFace**: Se agregó el enrutador HuggingFace como proveedor compatible con OpenAI con Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini. -**Proveedor Vertex AI**: se agregó el proveedor Vertex AI (Google Cloud) con Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude a través de Vertex. -**Cargas de archivos de Playground**: carga de audio para transcripción, carga de imágenes para modelos de visión (detección automática por nombre de modelo), representación de imágenes en línea para resultados de generación de imágenes. -**Comentarios visuales de selección de modelo**: los modelos ya agregados en el selector combinado ahora muestran ✓ insignia verde: evita confusión duplicada. -**Compatibilidad con Qwen (PR #352)**: Configuración actualizada de huellas dactilares de CLI y User-Agent para compatibilidad con proveedores de Qwen. -**Gestión de estado por turnos (PR #349)**: Lógica de turnos mejorada para manejar cuentas excluidas y mantener el estado de rotación correctamente. -**Clipboard UX (PR #360)**: Operaciones de portapapeles reforzadas con respaldo para contextos no seguros; Mejoras en la normalización de la herramienta Claude.### 🐛 Bug Fixes

-**Solución n.º 302: OpenAI SDK stream=False elimina tool_calls**: T01 Aceptar la negociación del encabezado ya no fuerza la transmisión cuando `body.stream` es explícitamente `falso`. Estaba provocando que las llamadas a herramientas se eliminaran silenciosamente al usar el SDK de OpenAI Python en modo sin transmisión. -**Solución n.º 73: Claude Haiku enrutado a OpenAI sin prefijo de proveedor**: los modelos `claude-*` enviados sin un prefijo de proveedor ahora se enrutan correctamente al proveedor `antigravedad` (antrópico). También se agregó la heurística `gemini-*`/`gemma-*` → `gemini`. -**Solución n.º 74: el recuento de tokens siempre es 0 para la transmisión Antigravity/Claude**: el evento SSE `message_start` que transporta `input_tokens` no estaba siendo analizado por `extractUsage()`, lo que provocaba que todos los recuentos de tokens de entrada disminuyeran. El seguimiento de tokens de entrada/salida ahora funciona correctamente para la transmisión de respuestas. -**Solución n.º 180: importación de modelos duplicados sin comentarios**: `ModelSelectModal` ahora muestra ✓ resaltado verde para los modelos que ya están en el combo, lo que hace obvio que ya están agregados. -**Errores de generación de páginas multimedia**: los resultados de las imágenes ahora se muestran como etiquetas `<img>` en lugar de JSON sin formato. Los resultados de la transcripción se muestran como texto legible. Los errores de credenciales muestran un banner ámbar en lugar de un error silencioso. -**Botón de actualización de token en la página del proveedor**: se agregó la interfaz de usuario de actualización de token manual para proveedores de OAuth.### 🔧 Improvements

-**Registro de proveedores**: HuggingFace y Vertex AI agregados a `providerRegistry.ts` y `providers.ts` (frontend). -**Caché de lectura**: Nuevo `src/lib/db/readCache.ts` para un almacenamiento en caché de lectura de base de datos eficiente. -**Quota Cache**: Improved quota cache with TTL-based eviction.### 📦 Dependencies

- `dompurificar` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| Archivo                                       | Propósito                                                   |
| --------------------------------------------- | ----------------------------------------------------------- | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Lógica de enrutamiento basada en tareas (7 tipos de tareas) |
| `src/app/api/settings/task-routing/route.ts`  | API de configuración de enrutamiento de tareas              |
| `src/app/api/providers/[id]/refresh/route.ts` | Actualización manual del token de OAuth                     |
| `src/lib/db/readCache.ts`                     | Efficient DB read cache                                     |
| `src/shared/utils/clipboard.ts`               | Portapapeles reforzado con respaldo                         | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Modalidad de combos: Free Stack visible y destacado**— La plantilla de Free Stack estaba oculta (cuarta en la cuadrícula de 3 columnas). Corregido: movido a la posición 1, cambiado a cuadrícula de 2x2 para que las 4 plantillas sean visibles, borde verde + resaltado de insignia GRATIS.## [2.4.0] - 2026-03-13

> **Lanzamiento principal**: ecosistema Free Stack, revisión del área de transcripción, más de 44 proveedores, documentación completa del nivel gratuito y mejoras en la interfaz de usuario en todos los ámbitos.### Funcionalidades

-**Combos: plantilla de pila gratuita**: nueva cuarta plantilla "Pila gratuita ($0)" que usa round-robin en Kiro + Qoder + Qwen + Gemini CLI. Sugiere el combo prediseñado de costo cero en el primer uso. -**Medios/Transcripción: Deepgram por defecto**— Deepgram (Nova 3, $200 gratis) es ahora el proveedor de transcripción predeterminado. AssemblyAI ($50 gratis) y Groq Whisper (gratis para siempre) se muestran con insignias de crédito gratuitas. -**README: sección "Comenzar gratis"**: nueva tabla de 5 pasos del archivo LÉAME temprano que muestra cómo configurar IA sin costo en minutos. -**README: Combinación de transcripción gratuita**: nueva sección con sugerencias combinadas de Deepgram/AssemblyAI/Groq y detalles de crédito gratuitos por proveedor. -**providers.ts: bandera hasFree**: NVIDIA NIM, Cerebras y Groq marcados con la insignia hasFree y freeNote para la interfaz de usuario de los proveedores. -**i18n: templateFreeStack Keys**: plantilla combinada de Free Stack traducida y sincronizada en los 30 idiomas.## [2.3.16] - 2026-03-13

### Documentación

-**README: Más de 44 proveedores**: se actualizaron las 3 apariciones de "36+ proveedores" a "44+", lo que refleja el recuento de código base real (44 proveedores en proveedores.ts). -**README: Nueva sección "🆓 Modelos gratuitos: lo que realmente obtienes"**- Se agregó una tabla de 7 proveedores con límites de tarifas por modelo para: Kiro (Claude ilimitado a través de AWS Builder ID), Qoder (5 modelos ilimitados), Qwen (4 modelos ilimitados), Gemini CLI (180K/mes), NVIDIA NIM (~40 RPM dev-forever), Cerebras (1 millón de tok/día / 60K TPM), Groq (30 RPM / 14,4K RPD). Incluye la recomendación del combo \/usr/bin/bash Ultimate Free Stack. -**README: Tabla de precios actualizada**: se agregó Cerebras al nivel API KEY, se corrigió NVIDIA de "1000 créditos" a "dev-forever free", se actualizaron los recuentos y nombres de los modelos Qoder/Qwen -**README: modelos Qoder 8→5**(llamados: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**README: modelos Qwen 3→4**(llamado: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)## [2.3.15] - 2026-03-13

### Funcionalidades

-**Panel de control de combinación automática (prioridad de nivel)**: se agregó `🏷️ Nivel` como la séptima etiqueta de factor de puntuación en la pantalla de desglose de factores `/tablero/auto-combo`; los 7 factores de puntuación de combinación automática ahora son visibles. -**i18n — sección autoCombo**: Se agregaron 20 nuevas claves de traducción para el panel de Auto-Combo (`title`, `status`, `modePack`, `providerScores`, `factorTierPriority`, etc.) a los 30 archivos de idioma.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: se restauró el `clientSecret` predeterminado válido; anteriormente era una cadena vacía, lo que provocaba "Credenciales de cliente incorrectas" en cada intento de conexión. La credencial pública ahora es la alternativa predeterminada (anulable a través de la var env `QODER_OAUTH_CLIENT_SECRET`). -**Servidor MITM no encontrado (#335)**: `prepublish.mjs` ahora compila `src/mitm/*.ts` en JavaScript usando `tsc` antes de copiar al paquete npm. Anteriormente, solo se copiaban archivos `.ts` sin procesar, lo que significa que `server.js` nunca existía en las instalaciones globales de npm/Volta. -**GeminiCLI falta projectId (#338)**: en lugar de generar un error 500 cuando falta "projectId" en las credenciales almacenadas (por ejemplo, después de reiniciar Docker), OmniRoute ahora registra una advertencia e intenta la solicitud, devolviendo un error significativo del lado del proveedor en lugar de un bloqueo de OmniRoute. -**La versión de Electron no coincide (#323)**: Sincronizó la versión `electron/package.json` con `2.3.13` (antes `2.0.13`) para que la versión binaria de escritorio coincida con el paquete npm.### ✨ New Models (#334)

-**Kiro**: `claude-sonnet-4`, `claude-opus-4.6`, `deepseek-v3.2`, `minimax-m2.1`, `qwen3-coder-next`, `auto` -**Códice**: `gpt5.4`### 🔧 Improvements

-**Puntuación de nivel (API + Validación)**: se agregó `tierPriority` (peso `0.05`) al esquema Zod `ScoringWeights` y a la ruta API `combos/auto`; el séptimo factor de puntuación ahora es totalmente aceptado por la API REST y validado en la entrada. Peso de "estabilidad" ajustado de "0,10" a "0,05" para mantener la suma total = "1,0".### ✨ New Features

-**Puntuación de cuota escalonada (Combo automático)**: se agregó `tierPriority` como séptimo factor de puntuación; las cuentas con niveles Ultra/Pro ahora se prefieren a los niveles gratuitos cuando otros factores son iguales. Nuevos campos opcionales `accountTier` y `quotaResetIntervalSecs` en `ProviderCandidate`. Se actualizaron los 4 paquetes de modos (`envío rápido`, `ahorro de costos`, `calidad primero`, `compatible sin conexión`). -**Retroceso de modelo intrafamiliar (T5)**: cuando un modelo no está disponible (404/400/403), OmniRoute ahora recurre automáticamente a modelos hermanos de la misma familia antes de devolver un error (`modelFamilyFallback.ts`). -**Tiempo de espera del puente API configurable**: `API_BRIDGE_PROXY_TIMEOUT_MS` env var permite a los operadores ajustar el tiempo de espera del proxy (30 segundos predeterminado). Corrige errores 504 en respuestas ascendentes lentas. (#332) -**Historial de estrellas**: se reemplazó el widget star-history.com con starchart.cc (`?variant=adaptive`) en los 30 README: se adapta al tema claro/oscuro y se actualiza en tiempo real.### 🐛 Bug Fixes

-**Auth — First-time password**: `INITIAL_PASSWORD` env var is now accepted when setting the first dashboard password. Utiliza `timingSafeEqual` para comparar tiempos constantes, evitando ataques de tiempo. (#333) -**truncamiento del archivo LÉAME**: se corrigió una etiqueta de cierre `</details>` que faltaba en la sección Solución de problemas que causaba que GitHub dejara de representar todo lo que había debajo (Tech Stack, Docs, Roadmap, Colaboradores). -**pnpm install**: Se eliminó la anulación redundante de `@swc/helpers` de `package.json` que entraba en conflicto con la dependencia directa, causando errores `EOVERRIDE` en pnpm. Se agregó la configuración `pnpm.onlyBuiltDependencies`. -**Inyección de ruta CLI (T12)**: se agregó el validador `isSafePath()` en `cliRuntime.ts` para bloquear el recorrido de ruta y los metacaracteres de shell en las variables de entorno `CLI_*_BIN`. -**CI**: `package-lock.json` regenerado después de la eliminación de anulación para corregir fallas de `npm ci` en GitHub Actions.### 🔧 Improvements

-**Formato de respuesta (T1)**: `response_format` (json_schema/json_object) ahora se inyecta como un mensaje del sistema para Claude, lo que permite la compatibilidad de salida estructurada. -**Reintento 429 (T2)**: reintento dentro de la URL para 429 respuestas (2 intentos con un retraso de 2 segundos) antes de volver a la siguiente URL. -**Encabezados de CLI de Gemini (T3)**: Se agregaron encabezados de huellas dactilares `User-Agent` y `X-Goog-Api-Client` para compatibilidad con Gemini CLI. -**Catálogo de precios (T9)**: se agregaron entradas de precios `deepseek-3.1`, `deepseek-3.2` y `qwen3-coder-next`.### 📁 New Files

| Archivo                                    | Propósito                                                          |
| ------------------------------------------ | ------------------------------------------------------------------ | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Definiciones de familias modelo y lógica alternativa intrafamiliar | ### Fixed |

-**KiloCode**: el tiempo de espera de verificación de salud del kilocódigo ya se corrigió en v2.3.11 -**OpenCode**: agregue código abierto al registro cliRuntime con un tiempo de espera de verificación de estado de 15 segundos -**OpenClaw / Cursor**: aumenta el tiempo de espera de la verificación de estado a 15 segundos para variantes de inicio lento -**VPS**: Instalar paquetes npm droid y openclaw; activar CLI_EXTRA_PATHS para kiro-cli -**cliRuntime**: agregue el registro de la herramienta de código abierto y aumente el tiempo de espera para continuar## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode healthcheck**: aumenta `healthcheckTimeoutMs` de 4000 ms a 15000 ms; kilocode muestra un banner con el logotipo ASCII al inicio, lo que provoca un falso `healthcheck_failed` en entornos lentos o de arranque en frío## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: Se solucionó el error `check:any-budget:t11`; reemplace `as any` con `as Record<cadena, desconocida>` en OAuthModal.tsx (3 veces)### Docs

-**CLI-TOOLS.md**: Guía completa para las 11 herramientas CLI (claude, codex, gemini, opencode, cline, kilocode, continue, kiro-cli, cursor, droid, openclaw) -**i18n**: CLI-TOOLS.md sincronizado en 30 idiomas con título traducido + introducción## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions**: Nuevo punto final de finalización de OpenAI heredado: acepta tanto la cadena `prompt` como la matriz `messages`, se normaliza al formato de chat automáticamente -**EndpointPage**: ahora muestra los 3 tipos de puntos finales compatibles con OpenAI: finalización de chat, API de respuestas y finalización heredada. -**i18n**: Se agregó `completionsLegacy/completionsLegacyDesc` a archivos de 30 idiomas### Fixed

-**OAuthModal**: corrige `[object Object]` que se muestra en todos los errores de conexión de OAuth; extrae correctamente `.message` de los objetos de respuesta de error en las 3 llamadas `throw new Error(data.error)` (intercambio, código de dispositivo, autorización)

- Afecta a Cline, Codex, GitHub, Qwen, Kiro y todos los demás proveedores de OAuth## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: agregue `decodeURIComponent` antes de la decodificación base64 para que los códigos de autenticación codificados en URL de la URL de devolución de llamada se analicen correctamente, solucionando errores de "código de autorización no válido o caducado" en configuraciones remotas (LAN IP) -**Cline OAuth**: `mapTokens` ahora completa `nombre = nombre + apellido || correo electrónico` para que las cuentas de Cline muestren nombres de usuario reales en lugar de "N.º de cuenta" -**Nombres de cuentas de OAuth**: todos los flujos de intercambio de OAuth (intercambio, encuesta, devolución de llamada de encuesta) ahora normalizan "nombre = correo electrónico" cuando falta el nombre, por lo que cada cuenta de OAuth muestra su correo electrónico como etiqueta de visualización en el panel de proveedores. -**Nombres de cuentas OAuth**: Se eliminó el respaldo secuencial de la "Cuenta N" en `db/providers.ts`; las cuentas sin correo electrónico/nombre ahora usan una etiqueta estable basada en ID a través de `getAccountDisplayName()` en lugar de un número secuencial que cambia cuando se eliminan las cuentas.## [2.3.6] - 2026-03-12

### Fixed

-**Lote de prueba del proveedor**: Se corrigió el esquema Zod para aceptar `providerId: null` (la interfaz envía un valor nulo para los modos que no son de proveedor); devolvía incorrectamente una "Solicitud no válida" para todas las pruebas por lotes -**Modo de prueba de proveedor**: Se corrigió la visualización de `[object Object]` normalizando los objetos de error de API a cadenas antes de renderizar en `setTestResults` y `ProviderTestResultsView` -**i18n**: Se agregaron las claves faltantes `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` a `en.json` -**i18n**: Se sincronizaron 1111 claves faltantes en los 29 archivos en idiomas distintos del inglés utilizando valores en inglés como alternativas## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**: Se agregó una solución `postinstall` permanente para copiar `@swc/helpers` en los `node_modules` de la aplicación independiente; evita que MODULE_NOT_FOUND se bloquee en las instalaciones globales de npm## [2.3.4] - 2026-03-10

### Added

- Múltiples integraciones de proveedores y mejoras en el panel.
