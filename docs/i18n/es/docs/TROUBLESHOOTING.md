# Troubleshooting (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

Problemas comunes y soluciones para OmniRoute.---

## Quick Fixes

| Problema                                   | Solución                                                                                       |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- | --- |
| El primer inicio de sesión no funciona     | Establezca `INITIAL_PASSWORD` en `.env` (sin valor predeterminado codificado)                  |
| El panel se abre en el puerto incorrecto   | Establezca `PORT=20128` y `NEXT_PUBLIC_BASE_URL=http://localhost:20128`                        |
| No hay registros de solicitudes en `logs/` | Establezca `ENABLE_REQUEST_LOGS = verdadero`                                                   |
| EACCES: permiso denegado                   | Establezca `DATA_DIR=/path/to/writable/dir` para anular `~/.omniroute`                         |
| La estrategia de enrutamiento no se guarda | Actualización a v1.4.11+ (corrección del esquema Zod para la persistencia de la configuración) | --- |

## Provider Issues

### "Language model did not provide messages"

**Causa:**Cuota de proveedor agotada.

**Arreglo:**

1. Verifique el rastreador de cuotas del panel
2. Utilice un combo con niveles alternativos
3. Cambiar al nivel más barato/gratuito### Rate Limiting

**Causa:**Cuota de suscripción agotada.

**Arreglo:**

- Agregar respaldo: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Utilice GLM/MiniMax como copia de seguridad económica### OAuth Token Expired

OmniRoute actualiza automáticamente los tokens. Si los problemas persisten:

1. Panel de control → Proveedor → Reconectar
2. Eliminar y volver a agregar la conexión del proveedor.---

## Cloud Issues

### Cloud Sync Errors

1. Verifique que `BASE_URL` apunte a su instancia en ejecución (por ejemplo, `http://localhost:20128`)
2. Verifique que `CLOUD_URL` apunte a su punto final en la nube (por ejemplo, `https://omniroute.dev`).
3. Mantenga los valores `NEXT_PUBLIC_*` alineados con los valores del lado del servidor### Cloud `stream=false` Returns 500

**Síntoma:**`Token inesperado 'd'...` en el punto final de la nube para llamadas que no son de transmisión.

**Causa:**Upstream devuelve la carga útil SSE mientras que el cliente espera JSON.

**Solución alternativa:**Utilice `stream=true` para llamadas directas en la nube. El tiempo de ejecución local incluye el respaldo SSE → JSON.### Cloud Says Connected but "Invalid API key"

1. Cree una clave nueva desde el panel local (`/api/keys`)
2. Ejecute la sincronización en la nube: Habilitar nube → Sincronizar ahora
3. Las claves antiguas/no sincronizadas aún pueden devolver "401" en la nube---

## Docker Issues

### CLI Tool Shows Not Installed

1. Verifique los campos de tiempo de ejecución: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Para el modo portátil: use el destino de imagen `runner-cli` (CLI incluidas)
3. Para el modo de montaje del host: configure `CLI_EXTRA_PATHS` y monte el directorio bin del host como de solo lectura
4. Si `installed=true` y `runnable=false`: se encontró el binario pero falló la verificación de estado### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Verifique las estadísticas de uso en Panel → Uso
2. Cambie el modelo principal a GLM/MiniMax
3. Utilice el nivel gratuito (Gemini CLI, Qoder) para tareas no críticas
4. Establezca presupuestos de costos por clave API: Panel → Claves API → Presupuesto---

## Debugging

### Enable Request Logs

Establezca `ENABLE_REQUEST_LOGS=true` en su archivo `.env`. Los registros aparecen en el directorio `logs/`.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Estado principal: `${DATA_DIR}/storage.sqlite` (proveedores, combos, alias, claves, configuraciones)
- Uso: tablas SQLite en `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + opcional `${DATA_DIR}/log.txt` y `${DATA_DIR}/call_logs/`
- Solicitar registros: `<repo>/logs/...` (cuando `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Cuando el disyuntor de un proveedor está ABIERTO, las solicitudes se bloquean hasta que expire el tiempo de reutilización.

**Arreglo:**

1. Vaya a**Panel → Configuración → Resiliencia**
2. Verifique la tarjeta del disyuntor del proveedor afectado.
3. Haga clic en**Restablecer todo**para borrar todos los interruptores o espere a que expire el tiempo de reutilización.
4. Verifique que el proveedor esté realmente disponible antes de restablecer### Provider keeps tripping the circuit breaker

Si un proveedor ingresa repetidamente al estado ABIERTO:

1. Marque**Panel → Estado → Estado del proveedor**para ver el patrón de error.
2. Vaya a**Configuración → Resiliencia → Perfiles de proveedores**y aumente el umbral de falla.
3. Verifique si el proveedor ha cambiado los límites de API o requiere una nueva autenticación.
4. Revise la telemetría de latencia: una latencia alta puede causar fallas basadas en el tiempo de espera---

## Audio Transcription Issues

### "Unsupported model" error

- Asegúrate de estar usando el prefijo correcto: `deepgram/nova-3` o `assemblyai/best`
- Verifique que el proveedor esté conectado en**Panel → Proveedores**### Transcription returns empty or fails

- Verifique los formatos de audio admitidos: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Verifique que el tamaño del archivo esté dentro de los límites del proveedor (normalmente < 25 MB)
- Verifique la validez de la clave API del proveedor en la tarjeta del proveedor---

## Translator Debugging

Utilice**Panel → Traductor**para depurar problemas de traducción de formato:

| Modo                       | Cuándo utilizar                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Parque infantil**        | Compare formatos de entrada/salida uno al lado del otro: pegue una solicitud fallida para ver cómo se traduce |
| **Probador de chat**       | Envíe mensajes en vivo e inspeccione la carga útil completa de solicitud/respuesta, incluidos los encabezados |
| **Banco de pruebas**       | Ejecute pruebas por lotes en combinaciones de formatos para encontrar qué traducciones no funcionan           |
| **Monitorización en vivo** | Observe el flujo de solicitudes en tiempo real para detectar problemas de traducción intermitentes            | ### Common format issues |

-**Las etiquetas de pensamiento no aparecen**: compruebe si el proveedor objetivo apoya el pensamiento y la configuración del presupuesto de pensamiento. -**Caídas de llamadas a herramientas**: algunas traducciones de formatos pueden eliminar campos no admitidos; verificar en modo Patio de Juegos -**Falta el mensaje del sistema**: Claude y Gemini manejan los mensajes del sistema de manera diferente; comprobar la salida de la traducción -**El SDK devuelve una cadena sin formato en lugar de un objeto**— Corregido en v1.1.0: el desinfectante de respuesta ahora elimina los campos no estándar (`x_groq`, `usage_breakdown`, etc.) que causan fallas de validación de Pydantic en el SDK de OpenAI -**GLM/ERNIE rechaza la función `sistema`**— Corregido en v1.1.0: el normalizador de funciones fusiona automáticamente mensajes del sistema con mensajes de usuario para modelos incompatibles -**Rol de "desarrollador" no reconocido**- Corregido en v1.1.0: convertido automáticamente a "sistema" para proveedores que no son OpenAI -**`json_schema` no funciona con Gemini**— Corregido en v1.1.0: `response_format` ahora se convierte a `responseMimeType` + `responseSchema` de Gemini---

## Resilience Settings

### Auto rate-limit not triggering

- El límite de velocidad automático solo se aplica a los proveedores de claves API (no a OAuth/suscripción)
- Verifique que**Configuración → Resiliencia → Perfiles de proveedores**tenga habilitado el límite de tasa automática
- Verifique si el proveedor devuelve códigos de estado `429` o encabezados `Reintentar después`### Tuning exponential backoff

Los perfiles de proveedor admiten estas configuraciones:

-**Retraso base**: tiempo de espera inicial después del primer fallo (predeterminado: 1 s) -**Retraso máximo**: límite máximo de tiempo de espera (predeterminado: 30 segundos) -**Multiplicador**: cuánto aumentar el retraso por falla consecutiva (predeterminado: 2x)### Anti-thundering herd

Cuando muchas solicitudes simultáneas llegan a un proveedor de velocidad limitada, OmniRoute utiliza mutex + limitación de velocidad automática para serializar solicitudes y evitar fallas en cascada. Esto es automático para los proveedores de claves API.---

## Optional RAG / LLM failure taxonomy (16 problems)

Some OmniRoute users place the gateway in front of RAG or agent stacks. In those setups it is common to see a strange pattern: OmniRoute looks healthy (providers up, routing profiles ok, no rate limit alerts) but the final answer is still wrong.

In practice these incidents usually come from the downstream RAG pipeline, not from the gateway itself.

If you want a shared vocabulary to describe those failures you can use the WFGY ProblemMap, an external MIT license text resource that defines sixteen recurring RAG / LLM failure patterns. At a high level it covers:

- retrieval drift and broken context boundaries
- empty or stale indexes and vector stores
- embedding versus semantic mismatch
- prompt assembly and context window issues
- logic collapse and overconfident answers
- long chain and agent coordination failures
- multi agent memory and role drift
- deployment and bootstrap ordering problems

The idea is simple:

1. When you investigate a bad response, capture:
   - user task and request
   - route or provider combo in OmniRoute
   - any RAG context used downstream (retrieved documents, tool calls, etc)
2. Map the incident to one or two WFGY ProblemMap numbers (`No.1` … `No.16`).
3. Store the number in your own dashboard, runbook, or incident tracker next to the OmniRoute logs.
4. Use the corresponding WFGY page to decide whether you need to change your RAG stack, retriever, or routing strategy.

Full text and concrete recipes live here (MIT license, text only):

[WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

You can ignore this section if you do not run RAG or agent pipelines behind OmniRoute.

---

## Still Stuck?

-**Problemas de GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Arquitectura**: consulte [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) para obtener detalles internos -**Referencia de API**: consulte [`docs/API_REFERENCE.md`](API_REFERENCE.md) para todos los puntos finales -**Panel de estado**: marque**Panel → Salud**para ver el estado del sistema en tiempo real -**Traductor**: use**Panel → Traductor**para depurar problemas de formato
