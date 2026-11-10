# Modelos, esfuerzo, velocidad y adaptación al entorno

Utiliza esta referencia al recomendar un modelo, elegir velocidad o esfuerzo de razonamiento, o adaptar la carga del skill al entorno. Conserva las mismas instrucciones educativas entre proveedores. Las recomendaciones siguientes son configuraciones iniciales para este proceso, no resultados de una evaluación comparativa entre proveedores.

Documentación comprobada: 2026-11-04. Los nombres de modelos, ajustes disponibles, planes y precios cambian. Antes de usar un modelo identificado por su nombre, comprueba la lista real del usuario y la documentación oficial actual. No afirmes haber cambiado modelos o ajustes salvo que un control compatible los haya cambiado.

## Elige por tarea antes que por nombre

Usa un modelo pequeño para ediciones acotadas con criterios explícitos, uno intermedio para diseño e implementación ordinarios y otro más potente para evidencias contradictorias, simulaciones complejas o revisiones con consecuencias. Son categorías de tareas, no capacidades garantizadas. Conserva la elección existente del usuario cuando cumpla los criterios.

La tabla con nombres es una **recomendación inicial no probada para este skill**, derivada de documentación, no una clasificación medida. No se ha establecido una comparación entre proveedores. Confirma una configuración con tareas representativas antes de llamarla validada.

## Reglas de escalado y parada

Para una tarea clara, empieza con el esfuerzo predeterminado compatible o un ajuste que haya funcionado antes. Ante fuentes contradictorias o un modelo complejo, considera más esfuerzo desde el principio. Si la salida incumple una restricción explícita, contradice su propia puntuación, falla una comprobación de cálculo significativa o produce reiteradamente tareas inválidas, comprueba primero el acceso a la entrada y referencia pertinentes. Corrige una entrada ausente o un criterio ambiguo antes de cambiar de modelo.

Si tras una corrección dirigida sigue fallando el mismo criterio importante, recomienda un nivel superior de esfuerzo compatible y vuelve a evaluar ese criterio. Si persiste el fallo, recomienda un modelo disponible más potente o una revisión independiente según el impacto. No reintentes indefinidamente ni gastes más del presupuesto acordado. Las fuentes ausentes, herramientas no disponibles y caídas del servicio requieren resolver la dependencia o declarar la limitación; más razonamiento no aporta la evidencia ausente. Informa de los fallos pendientes. Cambia ajustes solo mediante controles autorizados del entorno.

Reduce el esfuerzo o usa un modelo más pequeño solo después de superar las comprobaciones pertinentes; conserva evidencias de la compensación. Trata la velocidad de servicio por separado: empieza con la estándar; la aceleración de pago necesita justificación de tiempo y coste y autorización.

## Mantén actualizadas las recomendaciones

Revisa la orientación con nombres cuando cambie la versión del modelo o del entorno, falte un ajuste, el proveedor modifique la disponibilidad o el comportamiento documentado contradiga las observaciones. Hasta comprobarlo, marca esa combinación como no verificada y utiliza categorías de tareas y los ajustes predeterminados compatibles del entorno real. No inventes un ajuste equivalente para un modelo desconocido. Añade soluciones específicas de un proveedor a las instrucciones solo cuando un fallo reproducible demuestre su necesidad; registra la versión afectada y retíralas cuando dejen de justificarse.

## Relaciona tarea y controles

| Trabajo | Punto de partida OpenAI | Punto de partida Claude | Punto de partida Gemini |
|---|---|---|---|
| Ediciones pequeñas y bien definidas de contenido o revisión de ítems estructurados | GPT-6 Luna, High; reducir el esfuerzo solo tras superar las comprobaciones | Haiku 5.5, Medium | Gemini 3.5 Flash-Lite, Low cuando sea compatible |
| Diseño e implementación de una actividad acotada | GPT-6.1 Sol, esfuerzo predeterminado o Medium | Sonnet 5.5, Medium para trabajo agéntico bien definido | Gemini 3.8 Flash, Medium |
| Auditoría didáctica difícil, fuentes contradictorias, simulación o arquitectura complejas | GPT-6 Astra, Light/Low o Medium; aumentar si hace falta | Opus 5.5, Medium y después High si hace falta | Gemini 4 Argon, Medium y después High si hace falta |

Estas combinaciones son recomendaciones del autor del skill inferidas de la orientación de los proveedores. No establecen equivalencia entre modelos ni prueban que una familia enseñe mejor. Si el modelo elegido no está disponible, recomienda una alternativa disponible e informa del cambio; no cambies una selección del usuario sin autorización. Por ejemplo, un proceso existente con Gemini 3.1 Pro puede conservar ese modelo y sus niveles compatibles de razonamiento. La tabla no predice latencias numéricas; mide una tarea representativa en el entorno real.

Distingue tres decisiones: modelo, cantidad de razonamiento y cualquier nivel prémium de velocidad de servicio. Un esfuerzo menor puede reducir el trabajo de razonamiento; el nivel Fast del proveedor es otro control y puede costar más. Flash es una familia de modelos, no un interruptor universal de modo rápido. Las mismas palabras Low, Medium y High no prometen igual razonamiento ni latencia entre productos.

Empieza con velocidad estándar. Recomienda un nivel Fast de pago solo cuando importe el tiempo de espera y lo justifiquen el acceso y las tarifas actuales. No lo actives ni compres capacidad sin autorización. La emisión progresiva hace visible el avance; no demuestra finalización más temprana ni calidad superior. Valora el tiempo completo, incluidas revisión, llamadas a herramientas y correcciones.

## OpenAI y Codex

Usa el paquete nativo cuando el entorno admita skills y pueda leer referencias. En Codex, la invocación explícita puede indicar `$metodologias-de-aprendizaje` una vez descubierto. No presupongas el mismo descubrimiento en disco en un chat ordinario; aporta el Markdown independiente como entrada accesible.

La guía comprobada recomienda Sol para trabajo sustancial, Luna para tareas delimitadas y Astra para procesos exigentes; Luna High y Astra Light/Low son ajustes iniciales documentados. En Codex, Fast es una elección de velocidad de servicio distinta del esfuerzo. La disponibilidad y las tasas de consumo dependen del modelo, cuenta y cliente. Comprueba los valores compatibles antes de proponer configuración; una etiqueta de interfaz no es necesariamente un identificador de modelo de API.

Da un entregable concreto, alcance, archivos pertinentes y criterios observables de aceptación. Pide decisiones concisas y evidencias, no revelar la cadena de pensamiento privada. Utiliza las herramientas y permisos del entorno; no inventes acceso a terminal o navegador a partir del nombre del modelo.

Fuentes: [modelos](https://learn.chatgpt.com/docs/models), [velocidad](https://learn.chatgpt.com/docs/agent-configuration/speed), [skills](https://developers.openai.com/plugins/concepts/skills).

## Claude y Claude Code

Claude Code admite paquetes `SKILL.md` y archivos auxiliares. Tras el descubrimiento, puede usarse `/metodologias-de-aprendizaje`. En otro entorno Claude, verifica el mecanismo de skills o aporta la edición independiente. No añadas hooks exclusivos de Claude, sustituciones de shell ni cambios de modelo a los metadatos comunes.

Para trabajo agéntico con Sonnet 5.5, la documentación de esfuerzo recomienda Medium en tareas bien definidas y niveles superiores en las difíciles. Opus 5.5 tiene Medium como valor predeterminado; modelos anteriores y clientes pueden diferir. El control de esfuerzo de API y el modo de pensamiento son conceptos diferentes. No todas las generaciones admiten las mismas combinaciones. Prefiere los controles compatibles del entorno a copiar un parámetro API en una instrucción de chat. El modo Fast de Claude es una función distinta, dependiente del modelo y con precio prémium.

Delimita explícitamente tarea, materiales y resultado esperado. Declara dónde puede decidir el agente y qué requiere evidencia. Proporciona un ejemplo útil cuando resuelva ambigüedad; evita repetir todo el skill o prescribir una larga transcripción de pensamiento. Esta forma de presentar las instrucciones favorece la portabilidad; no afirma un rasgo cognitivo específico de Claude.

Fuentes: [skills](https://code.claude.com/docs/en/skills), [modelos](https://platform.claude.com/docs/en/models/overview), [esfuerzo](https://platform.claude.com/docs/en/build-with-claude/effort), [modo Fast](https://platform.claude.com/docs/en/build-with-claude/fast-mode).

## Gemini y Gemini CLI

Gemini CLI descubre skills nativos en las ubicaciones compatibles, incluido el alias `.agents/skills`. Comprueba con `/skills list` y recarga con `/skills reload` cuando sea necesario. La confianza del espacio de trabajo y las aprobaciones de activación corresponden al entorno; no las eludas. AI Studio u otro chat deben recibir el archivo independiente cuando no dispongan de carga nativa.

La guía comprobada enumera Low, Medium y High para Gemini 4 Argon y Gemini 3.8 Flash. Otras versiones tienen valores predeterminados y niveles diferentes. Usa solo los compatibles con el modelo y API o cliente reales; no traduzcas literalmente un parámetro de esfuerzo de OpenAI o Claude. Un nombre de vista previa y uno estable no son intercambiables.

Para `gemini-3.1-pro-preview`, la tabla API comprobada enumera Low, Medium y High, con High predeterminado. Para ese endpoint, prueba Medium en diseño ordinario y High en una auditoría difícil como recomendación del autor, si el entorno expone esos controles. Una etiqueta como Gemini 3.1 Pro no demuestra qué endpoint o controles utiliza el cliente.

Mantén instrucciones concisas y especifica objetivo, restricciones y evidencias de salida. Adjunta los materiales para que el modelo pueda acceder; una ruta en el chat no proporciona acceso. Conserva el estado necesario de conversación con herramientas al implementar una aplicación con Gemini API, siguiendo su documentación actual. Este skill no implementa esa capa API ni autoriza añadirla.

Fuentes: [modelos](https://ai.google.dev/gemini-api/docs/models), [pensamiento](https://ai.google.dev/gemini-api/docs/thinking), [skills de Gemini CLI](https://geminicli.com/docs/cli/tutorials/skills-getting-started/).

## Uso portátil y verificación

Mantén metadatos obligatorios sencillos: `name` y `description`, seguidos de Markdown ordinario. Los metadatos opcionales describen la edición; no dependas de un campo específico del entorno para imponer un límite de seguridad. Usa referencias relativas del paquete con un agente capaz de leer archivos o la edición independiente completa en un chat. No cargues por defecto varias ediciones lingüísticas. Tras perder contexto, vuelve a aportar el alcance esencial y el trabajo pendiente en lugar de suponer que todos los entornos lo conservan.

Los emoji pueden transmitir significado, pero no deben ser la única instrucción o señal de prioridad. Conserva etiquetas textuales explícitas. La investigación sobre [semántica de emoji](https://arxiv.org/abs/2409.10760) y [ambigüedad contextual](https://arxiv.org/abs/2511.07193) no demuestra que decorar este skill mejore el cumplimiento. Prueba ese cambio con los modelos y tareas reales antes de afirmar un beneficio.

Antes de llamar probada una combinación de modelo y entorno, verifica el descubrimiento o la carga independiente, el acceso a referencias pertinentes, un entregable representativo y los límites críticos. Registra identificador exacto del modelo o etiqueta visible, entorno y versión, idioma, esfuerzo, velocidad, herramientas, fecha, artefactos y fallos. Distingue compatibilidad documental de ejecución observada. Nunca extrapoles el éxito de un modelo a todos los de su familia.

Para comparar, usa la misma tarea y materiales originales y pide a un revisor valorar los resultados reales con los mismos criterios educativos. Incluye reutilización del contexto conocido, ayuda acotada, una respuesta alternativa correcta, afirmaciones curriculares sin respaldo, un límite entre modelo y datos y un fallo de herramienta o servicio cuando corresponda. Reduce esfuerzo o elige un modelo menor solo mientras sigan superándose las comprobaciones importantes. Si no tienes acceso directo a un proveedor, márcalo como no probado en lugar de inventar resultados.
