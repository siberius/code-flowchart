# Uso e instalación

## Elige el punto de entrada adecuado

Utiliza el skill para una aplicación educativa nueva, un cambio sustancial en su diseño didáctico o una revisión de este. Un cambio estético o una corrección ordinaria de errores no requiere rediseñar la enseñanza.

Aporta los datos conocidos sobre alumnado, objetivo, contexto y restricciones prácticas. El agente debe aprovechar la información existente y preguntar solo por carencias relevantes. No debe repetir una entrevista fija sobre público y tono ni solicitar aprobación para decisiones ordinarias ya cubiertas por la petición.

## Paquete nativo del skill

Conserva `SKILL.md`, `LICENSE` y `references/` en el mismo directorio, normalmente llamado `metodologias-de-aprendizaje`. Utiliza el mecanismo de instalación admitido por tu cliente. La presencia de un Markdown en alguna parte del disco no garantiza por sí sola el descubrimiento automático.

Para clientes que utilizan `~/.agents/skills`, un destino posible es:

```text
~/.agents/skills/metodologias-de-aprendizaje/
  SKILL.md
  references/
  LICENSE
```

En Claude Code, el directorio equivalente suele ser `~/.claude/skills/metodologias-de-aprendizaje/`. Conserva los archivos existentes del usuario; examina los conflictos antes de instalar. Confirma el descubrimiento en el cliente real. La instalación no demuestra que un agente haya utilizado el skill.

## Markdown independiente

Entrega a un agente capaz de seguir instrucciones el archivo generado `metodologias-de-aprendizaje.md` y pídele explícitamente usarlo para la tarea. Incluye las referencias condicionales como secciones integradas y no depende de archivos relativos. Esta vía carga más texto al principio, pero necesita un solo archivo de instrucciones.

Los nombres de modelos no son mecanismos de instalación. La compatibilidad depende de la capacidad del entorno para cargar y seguir instrucciones Markdown, sus herramientas y sus permisos.

## Trabaja según las necesidades

| Necesidad | Orientación pertinente |
|---|---|
| Modos del tutor, aprendizaje reanudable y puntos de control | `references/tutor-state.md` |
| Diseño general, revisión o alcance | Núcleo de `SKILL.md` |
| Ayuda ambigua, respuestas alternativas o afirmaciones curriculares | `references/decision-examples.md` |
| Selección de métodos, ayuda o progresión | `references/methods.md` |
| Puntuación, rúbricas, adaptación o evidencias de aprendizaje | `references/assessment.md` |
| Modelo científico, experimento o juego de roles | `references/simulations.md` |
| Servicio de IA en la aplicación terminada | `references/runtime-ai.md` |
| Modelo, esfuerzo de razonamiento, velocidad o adaptación al cliente | `references/model-profiles.md` |

No cargues automáticamente todas las referencias en modo nativo. Un cuestionario sin conexión puede dar retroalimentación y pistas sin IA durante el uso. Una demostración docente puede necesitar preguntas de discusión en lugar de registros individuales. Utiliza una o varias perspectivas según la tarea, sin iniciar automáticamente varios agentes.

## Mantén las ediciones

Las fuentes de autoría son `SKILL.md` y sus referencias condicionales. El archivo independiente es un artefacto de distribución generado. En la copia de trabajo del mantenedor, reconstruye con:

```sh
python3 testing/build_portable.py --edition es
python3 testing/build_portable.py --edition es --check
python3 testing/build_portable.py --edition all --check
```

El generador reside en herramientas de desarrollo locales excluidas del control de versiones. Los usuarios de la distribución pueden utilizar cualquiera de los formatos terminados sin ejecutarlo. Integra referencias con anclas únicas para que los títulos repetidos no sean ambiguos.

Mantén README y ejemplos docentes coherentes con el núcleo. Conserva autor, versión, procedencia y licencia MIT. Para otro agente, registra el paquete mantenido en lugar de crear otra copia editable. Hay cuatro ediciones: inglesa (`en`), checa (`cs`), rusa (`ru`) y española (`es`). Cada una conserva los principios comunes; la orientación local checa sigue siendo condicional. Genera una edición con `--edition` y su código, o todas con `--edition all`. Examina las implicaciones para las cuatro al cambiar un principio compartido; no impongas automáticamente requisitos curriculares checos a proyectos internacionales.

## Revisa un resultado

Comprueba la acción y evidencia previstas del estudiante, la corrección disciplinar, la retroalimentación, la ayuda, la accesibilidad y las condiciones de funcionamiento pertinentes. Distingue comportamiento técnico, adecuación didáctica y resultados reales de aprendizaje. Indica qué se comprobó y qué sigue siendo desconocido.

El [protocolo publicado de evaluación de ocho tareas](MODEL-EVALUATION.md) proporciona tareas comparables y criterios de evaluación. No incluyas esos criterios en la entrada del modelo probado. La batería está preparada, no ejecutada; las ejecuciones exploratorias anteriores no establecen fiabilidad entre proveedores. Informa solo de evaluaciones realmente realizadas, separando resultados iniciales y correcciones.

Elige según la complejidad antes que según el nombre del modelo. Si sigue fallando un criterio significativo tras una corrección dirigida, sigue las reglas de escalado y parada de la referencia de modelos. Aumentar esfuerzo no corrige fuentes o herramientas ausentes. La velocidad estándar es el punto de partida; la aceleración de pago es una elección autorizada aparte.

Al elegir un método para desarrollar aplicaciones, consulta la [justificación didáctica](../references/didactic-rationale.md). Explica cómo cambia las acciones del estudiante y la retroalimentación; no demuestra la eficacia de la aplicación terminada.
