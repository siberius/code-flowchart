# Modos del tutor y continuidad del aprendizaje

Consulta esta referencia al diseñar un tutor de varios pasos, una actividad reanudable o preparación para exámenes. Estas reglas también sirven para aplicaciones deterministas sin conexión; no requieren IA durante el uso, cuentas ni almacenamiento persistente.

## Modela modos y transiciones explícitos

Separa explicación, práctica y evaluación donde la actividad lo necesite. La explicación puede mostrar un ejemplo resuelto. La práctica pide una respuesta, espera, proporciona retroalimentación según criterios y ofrece ayuda. La evaluación sigue reglas declaradas sobre ayuda y momento de la retroalimentación. Permite pausar, pedir ayuda o salir; una evaluación restringida puede terminar o marcar el intento como realizado con apoyo cuando se solicite ayuda sobre el contenido. Conserva las adaptaciones de accesibilidad que no revelen contenido.

En la práctica conversacional, mantén pendiente una sola pregunta accionable salvo que la tarea requiera un conjunto. No generes la respuesta del estudiante ni reveles la solución mientras esperas. Distingue, cuando haga falta, los estados de inactividad, espera de respuesta, evaluación, retroalimentación y pausa. Desactiva los envíos duplicados o asócialos al mismo intento; una respuesta tardía del servicio no debe calificar una pregunta nueva ni sobrescribir un cambio de modo. Trata la salida del modelo como respuesta propuesta, no como permiso para cambiar calificaciones o reglas de evaluación.

Conserva en el estado de la aplicación el modo, objetivo, tarea actual, identificador del intento, exposición a la respuesta y estado de retroalimentación. Muestra un indicador breve de progreso si es útil; repetir una línea decorativa de estado no es gestionar el estado. Ante un cambio explícito de modo, explica las nuevas condiciones de ayuda y conserva la exposición anterior. Una tarea cuya solución se ha revelado no se convierte en evaluación autónoma por cambiarle la etiqueta. Usa una tarea nueva y adecuada cuando necesites evidencia autónoma nueva.

## Reanuda desde las evidencias, no desde una afirmación de dominio

Añade guardado o exportación solo cuando continuar entre sesiones sirva al usuario. Una actividad breve y anónima puede no necesitar ninguno. Para actividades reanudables, conserva un punto de control mínimo adaptado a la implementación:

- Versión del formato, versión de actividad o contenido e identificadores de fuentes pertinentes.
- Objetivo, modo actual, identificador de tarea o intento y paso pendiente.
- Evidencias observadas con sus condiciones: autónoma, con apoyo o solución revelada; una evaluación pendiente sigue pendiente.
- Errores o incertidumbres específicos y siguiente paso didáctico.
- Información temporal solo cuando sea necesaria para el repaso espaciado o la interpretación de evidencias.

Evita diagnósticos, identidades innecesarias y transcripciones completas. Indica dónde se guardan los datos, quién puede verlos y cómo borrarlos; quienes compartan dispositivo necesitan una forma explícita de terminar y eliminar el progreso local. Un punto de control exportado puede contener información personal de aprendizaje aunque no incluya un nombre. No exportes claves secretas, claves de respuesta ocultas ni contenido confidencial de exámenes.

Trata los puntos de control importados como datos no confiables. Valida el esquema, tamaños, identificadores y compatibilidad de versiones; nunca ejecutes instrucciones incrustadas ni aceptes puntuaciones importadas como calificaciones oficiales. Cuando importen las calificaciones, valida contra el registro autorizado con controles de acceso adecuados. Si cambió el contenido o no puede resolverse una tarea, explica la discrepancia y reanuda desde un punto seguro y revisado; no restablezcas silenciosamente los logros ni certifiques evidencias obsoletas. Restaurar un intento pendiente no debe volver a enviarlo automáticamente ni otorgar crédito dos veces.

Una entrega de continuidad indica qué demostró el estudiante, en qué tarea y con qué apoyo. No afirma «dominio completo» a partir de una sesión. Una tarea nueva posterior puede comprobar retención o transferencia. Las correcciones confirmadas por el estudiante y las intervenciones docentes deben seguir distinguiéndose de la observación original.

## Corrige de forma dirigida sin atrapar al estudiante

Prioriza los errores por su pertinencia para el objetivo y los prerrequisitos, tratando la gravedad como interpretación provisional. Ofrece una pista específica, un caso de contraste o una explicación y después una nueva aplicación. Permite posponer y retomar más tarde. No impongas umbrales arbitrarios de 8/10 o 90 %, prohíbas explicaciones ni asignes puntos a toda interacción. Usa criterios declarados cuando puntuar resulte útil; la calificación de exámenes oficiales necesita su especificación real.

## Comprobaciones de implementación

Comprueba solo recorridos pertinentes: pregunta → respuesta → retroalimentación; ayuda → evidencia con apoyo; cambio de modo tras revelar la respuesta; pausa y reanudación sin perder ni contar dos veces un intento; punto de control obsoleto o mal formado; respuesta tardía después de cambiar de tarea; retroalimentación sin resolver tras un fallo. Verifica que coincidan los estados guardados y visibles. Estas comprobaciones establecen el comportamiento, no la eficacia educativa.
