# Test Coverage Plan (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Última actualización: 2026-03-28## Baseline

Hay varios números de cobertura según cómo se calcula el informe. Para la planificación, sólo uno de ellos es útil.

| Métrica                   | Alcance                                                 | Declaraciones / Líneas | Sucursales | Funciones | Notas                                                          |
| ------------------------- | ------------------------------------------------------- | ---------------------: | ---------: | --------: | -------------------------------------------------------------- |
| Legado                    | Antiguo `npm run test:cobertura`                        |                 79,42% |     75,15% |    67,94% | Inflado: cuenta los archivos de prueba y excluye `open-sse`    |
| Diagnóstico               | Sólo fuente, excluyendo pruebas y excluyendo `open-sse` |                 68,16% |     63,55% |    64,06% | Útil sólo para aislar `src/**`                                 |
| Línea de base recomendada | Solo fuente, excluyendo pruebas e incluyendo `open-sse` |                 56,95% |     66,05% |    57,80% | Esta es la base de referencia para mejorar en todo el proyecto |

La línea de base recomendada es el número contra el cual optimizar.## Rules

- Los objetivos de cobertura se aplican a los archivos fuente, no a `tests/**`.
- `open-sse/**` es parte del producto y debe permanecer dentro del alcance.
- El nuevo código no debería reducir la cobertura en las áreas afectadas.
- Prefiera el comportamiento de prueba y los resultados de la rama a los detalles de implementación.
- Prefiera bases de datos temporales SQLite y dispositivos pequeños a simulacros amplios para `src/lib/db/**`.## Current command set

- `npm ejecutar prueba:cobertura`
  - Puerta de cobertura de fuente principal para el conjunto de pruebas unitarias.
  - Genera `text-summary`, `html`, `json-summary` y `lcov`
- `cobertura de ejecución de npm: informe`
  - Informe detallado archivo por archivo de la última ejecución
- `npm ejecutar prueba:cobertura:legado`
  - Sólo comparación histórica## Milestones

| Fase   |                 Objetivo | Enfoque                                                                |
| ------ | -----------------------: | ---------------------------------------------------------------------- |
| Fase 1 | 60% declaraciones/líneas | Ganancias rápidas y cobertura de servicios públicos de bajo riesgo     |
| Fase 2 | 65% declaraciones/líneas | DB y cimentaciones de rutas                                            |
| Fase 3 | 70% declaraciones/líneas | Validación de proveedores y análisis de uso                            |
| Fase 4 | 75% declaraciones/líneas | Traductores y ayudantes `open-sse`                                     |
| Fase 5 | 80% declaraciones/líneas | Controladores y ramas ejecutoras `open-sse`                            |
| Fase 6 | 85% declaraciones/líneas | Casos extremos más difíciles, deuda de sucursales, suites de regresión |
| Fase 7 | 90% declaraciones/líneas | Barrido final, cierre de brechas, trinquete estricto                   |

Las ramas y funciones deberían aumentar con cada fase, pero el objetivo principal son las declaraciones/líneas.## Priority hotspots

Estos archivos o áreas ofrecen el mejor retorno para las siguientes fases:

1. `open-sse/handlers`
   - `chatCore.ts` al 7,57%
   - Directorio general en 29,07%
2. `open-sse/traductor/solicitud`
   - Directorio general en 36,39%
   - Muchos traductores todavía se encuentran cerca de una cobertura de un solo dígito
3. `open-sse/traductor/respuesta`
   - Directorio general en 8,07%
4. `open-sse/ejecutores`
   - Directorio general en 36,62%
5. `src/lib/db`
   - `models.ts` al 20,66%
   - `registeredKeys.ts` al 34,46%
   - `modelComboMappings.ts` al 36,25%
   - `settings.ts` al 46,40%
   - `webhooks.ts` al 33,33%
6. `src/lib/uso`
   - `usageHistory.ts` al 21,12%
   - `usageStats.ts` al 9,56%
   - `costCalculator.ts` al 30,00%
7. `src/lib/proveedores`
   - `validation.ts` al 41,16%
8. Archivos API y de utilidad de bajo riesgo para obtener ganancias tempranas
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Se corrigió la métrica de cobertura para que refleje el código fuente en lugar de los archivos de prueba.
- [x] Mantenga un guión de cobertura heredado para comparar
- [x] Registrar la línea de base y los puntos de acceso en el repositorio
- [] Agregar pruebas enfocadas para servicios públicos de bajo riesgo:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [] Agregar pruebas de ruta para:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [] Agregar pruebas respaldadas por bases de datos para:
  - `src/lib/db/modelComboMappings.ts` -`src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Cubrir el comportamiento de las ramas en:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [] Agregar pruebas de análisis de uso para:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [] Ampliar la cobertura de ruta para las ramas de configuración y administración de proxy### Phase 4: 70% -> 75%

- [] Cubre ayudantes de traductor y rutas de traducción centrales:
  - `open-sse/traductor/index.ts`
  - `open-sse/traductor/helpers/*`
  - `open-sse/traductor/solicitud/*`
  - `open-sse/traductor/respuesta/*`### Phase 5: 75% -> 80%

- [] Agregar pruebas a nivel de controlador para: -`open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js` -`open-sse/handlers/embeddings.js`
- [] Agregar cobertura de rama ejecutora para autenticación, reintentos y anulaciones de puntos finales específicos del proveedor### Phase 6: 80% -> 85%

- [] Fusionar más conjuntos de casos extremos en la ruta de cobertura principal
- [] Aumentar la cobertura de funciones para módulos de base de datos con cobertura de constructor/ayudante débil
- [] Cerrar los espacios entre ramas en `settings.ts`, `registeredKeys.ts`, `validation.ts` y ayudas del traductor### Phase 7: 85% -> 90%

- [] Trate los archivos restantes de baja cobertura como bloqueadores
- [] Agregar pruebas de regresión para cada error de producción descubierto corregido durante el impulso al 90%
- [] Levante la puerta de cobertura en CI solo después de que la línea de base local esté estable durante al menos dos carreras consecutivas.## Ratchet policy

Actualice los umbrales de `npm run test:coverage` solo después de que el proyecto realmente supere el siguiente hito con un búfer cómodo.

Secuencia de trinquete recomendada:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

El orden es `declaraciones-líneas/ramas/funciones`.## Known gap

El comando de cobertura actual mide el conjunto de unidades del nodo principal e incluye la fuente alcanzada desde él, incluido "open-sse". Aún no fusiona la cobertura de Vitest en un único informe unificado. Vale la pena hacer esa fusión más adelante, pero no es un obstáculo para iniciar el ascenso del 60% -> 80%.
