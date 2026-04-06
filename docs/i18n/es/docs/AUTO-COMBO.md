# OmniRoute Auto-Combo Engine (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Cadenas de modelos autogestionables con puntuación adaptativa## How It Works

El motor Auto-Combo selecciona dinámicamente el mejor proveedor/modelo para cada solicitud utilizando una**función de puntuación de 6 factores**:

| factor           | Peso | Descripción                                      |
| :--------------- | :--- | :----------------------------------------------- | ------------- |
| Cuota            | 0,20 | Capacidad restante [0..1]                        |
| Salud            | 0,25 | Disyuntor: CERRADO=1,0, MITAD=0,5, ABIERTO=0,0   |
| InvCosto         | 0,20 | Costo inverso (más barato = puntuación más alta) |
| LatenciaInv      | 0,15 | Latencia p95 inversa (más rápida = mayor)        |
| Ajuste de tareas | 0,10 | Modelo × puntuación de aptitud del tipo de tarea |
| Estabilidad      | 0,10 | Baja variación en latencia/errores               | ## Mode Packs |

| Paquete                       | Enfoque        | Peso clave        |
| :---------------------------- | :------------- | :---------------- | --------------- |
| 🚀**Envío rápido**            | Velocidad      | latenciaInv: 0,35 |
| 💰**Ahorro de costos**        | Economía       | costoInv: 0,40    |
| 🎯**Calidad primero**         | Mejor modelo   | tareaFit: 0,40    |
| 📡**Compatible sin conexión** | Disponibilidad | cuota: 0,40       | ## Self-Healing |

-**Exclusión temporal**: Puntuación < 0,2 → excluido durante 5 min (retroceso progresivo, máximo 30 min) -**Reconocimiento del disyuntor**: ABIERTO → autoexcluido; HALF_OPEN → solicitudes de sondeo -**Modo incidente**: >50% ABIERTO → deshabilita la exploración, maximiza la estabilidad -**Recuperación de tiempo de reutilización**: después de la exclusión, la primera solicitud es una "sonda" con tiempo de espera reducido## Bandit Exploration

El 5 % de las solicitudes (configurables) se enrutan a proveedores aleatorios para su exploración. Deshabilitado en modo incidente.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

Más de 30 modelos puntuados en 6 tipos de tareas (`codificación`, `revisión`, `planificación`, `análisis`, `depuración`, `documentación`). Admite patrones comodín (por ejemplo, `*-coder` → puntuación de codificación alta).## Files

| Archivo                                      | Propósito                                           |
| :------------------------------------------- | :-------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | Función de puntuación y normalización del grupo     |
| `open-sse/services/autoCombo/taskFitness.ts` | Búsqueda de aptitud modelo × tarea                  |
| `open-sse/services/autoCombo/engine.ts`      | Lógica de selección, bandido, límite presupuestario |
| `open-sse/services/autoCombo/selfHealing.ts` | Exclusión, sondas, modo incidente                   |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 perfiles de peso                                  |
| `src/app/api/combos/auto/route.ts`           | API REST                                            |
