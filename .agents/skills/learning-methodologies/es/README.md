# Metodologías de aprendizaje

Un skill de IA portátil para diseñar y revisar aplicaciones educativas. Conecta objetivos de aprendizaje, actividad del alumnado, retroalimentación y evidencias, y ayuda a convertir esas decisiones en el comportamiento de la aplicación.

Autor: Luděk Sušický. Licencia MIT. Esta edición española comparte la base metodológica internacional y no presupone un currículo nacional, IA durante el uso, cuentas ni un modelo concreto.

biolog, středoškolský a vysokoškolský učitel informatických předmětů

Versión actual: **1.3.0**. Las ediciones lingüísticas incluyen una ruta de trabajo breve, ejemplos de decisión, modos del tutor y aprendizaje reanudable, mapas conceptuales y reglas explícitas para elegir modelos y escalar. Las configuraciones con nombres de modelos son recomendaciones iniciales, no resultados de pruebas entre proveedores.

## Para qué sirve

- Elegir métodos a partir de una necesidad concreta y el contexto del aula.
- Diseñar ayuda útil, retroalimentación ante errores y práctica autónoma.
- Separar objetivos, dificultad, prerrequisitos y evidencias del logro.
- Construir simulaciones fiables y tutoría con IA acotada cuando corresponda.
- Considerar accesibilidad, control docente, datos del alumnado y condiciones de funcionamiento.
- Distinguir una aplicación funcional, un diseño didáctico fundamentado y resultados de aprendizaje observados.
- Elegir modelo, esfuerzo y velocidad adecuados mediante orientación fechada de OpenAI, Claude y Gemini, explicitando el estado de verificación.

Los métodos incluyen aprendizaje socrático, técnica de Feynman, zona de desarrollo próximo y andamiaje, ejemplos resueltos, práctica de recuperación y espaciada, metacognición, indagación, juego de roles, aprendizaje entre iguales y cooperativo, proyectos y enseñanza invertida. Son opciones seleccionadas para la tarea; instalar el skill no las convierte en funciones obligatorias.

## Elige un formato

- [SKILL.md](SKILL.md) y `references/`: paquete nativo con detalle condicional. Conserva los archivos juntos.
- [metodologias-de-aprendizaje.md](metodologias-de-aprendizaje.md): archivo independiente generado para agentes que acepten instrucciones Markdown directamente. Contiene el núcleo y todas las referencias.

Ambos formatos proceden de las mismas fuentes mantenidas. Edita `SKILL.md` y la referencia pertinente y regenera después la edición independiente. No edites por separado la copia generada.

## Ejemplo de petición

> Usa metodologias-de-aprendizaje para construir una actividad sin conexión sobre circuitos para estudiantes de 16 años. Deben predecir cómo cambia la corriente con la resistencia y explicar su razonamiento. Servirá para una discusión dirigida por el docente y debe poder utilizarse con teclado. Sin cuentas ni llamadas a IA externa.

El agente debe reutilizar ese contexto, elegir apoyos proporcionados e identificar cómo puede revelar comprensión la actividad. Solo debe preguntar por información ausente que cambie el diseño.

## Documentación

- [Uso e instalación](docs/USAGE.md)
- [Guía docente y ejemplos de peticiones](docs/TEACHERS.md)
- [Historial de versiones](../CHANGELOG.md)

## Ediciones lingüísticas

La edición española adapta la misma base metodológica para trabajar en español sin imponer requisitos curriculares nacionales. La edición checa añade orientación condicional para centros checos, RVP/ŠVP, condiciones de aula y formatos de respuesta. Hay ediciones inglesa, checa, rusa y española. Utiliza una edición lingüística adecuada; normalmente no hace falta cargar varias. Mantén los principios compartidos de forma coordinada y aplica orientaciones locales solo cuando correspondan.

El proceso es una ayuda de diseño. No certifica accesibilidad, precisión disciplinar ni eficacia educativa. Utiliza comprobaciones adecuadas a la materia, el alumnado y las consecuencias.

## Licencia

MIT, copyright 2026 Luděk Sušický. Consulta [LICENSE](LICENSE). Conserva el aviso de autoría y licencia al redistribuir cualquier formato. Las publicaciones enlazadas conservan sus propios derechos.

## Evaluación de modelos

Usa el [protocolo de evaluación de ocho tareas](docs/MODEL-EVALUATION.md) para comparar configuraciones. El protocolo está preparado; no es una evaluación comparativa ejecutada.

## Métodos didácticos para aplicaciones creadas con IA

Utiliza los métodos para traducir objetivos educativos en acciones del estudiante, reglas de retroalimentación y evidencias en la aplicación generada. La recuperación requiere un intento antes de revelar la respuesta; el andamiaje requiere ayuda accesible y distinguir desempeño con apoyo e independiente. La IA ayuda a implementar estas decisiones; el resultado necesita revisión disciplinar y didáctica. Se aplica a aplicaciones sin conexión y al uso justificado de IA durante el aprendizaje.

Consulta la [justificación didáctica](references/didactic-rationale.md) al explicar la elección de un método o su implementación. Vincula métodos con decisiones de producto y evidencias necesarias.


[English](../README.md) · [Čeština](../cs/README.md) · [Русский](../ru/README.md) · [Español](../es/README.md)
