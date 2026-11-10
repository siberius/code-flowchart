# IA durante el uso de aplicaciones educativas

Consulta esta referencia solo cuando la aplicación terminada llame a un servicio de IA durante su uso. Utilizar IA para escribir código o generar contenido revisado por docentes no requiere IA durante el uso. Mantén las actividades sin conexión salvo que el objetivo necesite un servicio.

## Define una función docente acotada

Especifica qué puede hacer el modelo, qué contenido revisado o fuentes puede usar y cómo debe actuar ante evidencias ausentes. Donde importe el fundamento factual, identifica materiales aprobados y conserva su procedencia. No generes citas de apariencia verosímil. Permite incertidumbre y corrección; evita diagnósticos o afirmaciones tajantes sobre capacidades del estudiante a partir de una interacción breve.

Elige la ayuda según la actividad. La práctica puede usar preguntas orientadoras, pistas progresivas, ejemplos resueltos y explicación directa cuando se solicite o cuando preguntar deje de ayudar. Una evaluación puede restringirla según las reglas declaradas por el docente. No impongas un bucle socrático interminable ni una prohibición universal de dar respuestas. Permite solicitar ayuda, detenerse o acudir al docente.

Utiliza rúbricas explícitas para la retroalimentación y las respuestas abiertas. Compara los juicios del modelo con ejemplos revisados por docentes antes de confiar en ellos. Las decisiones importantes de calificación, asignación de nivel o disciplina requieren revisión humana con responsabilidad definida; una única respuesta del modelo no debe decidir por sí sola. Registra la incertidumbre y permite corregir el juicio al docente.

## Minimiza los datos del alumnado

Enumera los datos enviados al proveedor, qué se conserva, quién tiene acceso y cómo funciona el borrado. Recoge solo lo necesario. No añadas automáticamente cuentas, nombres reales, perfiles persistentes ni registro de conversaciones. Utiliza identificadores anónimos o seudónimos de actividad cuando basten, reconociendo que no garantizan anonimato.

Antes del despliegue con menores, comprueba con la institución responsable la edad destinataria, las disposiciones del centro, las condiciones y ajustes del proveedor y los requisitos locales aplicables. No inventes una edad universal de consentimiento ni una norma jurídica universal. Explica el tratamiento de datos al alumnado y al profesorado con lenguaje adecuado.

## Usa protecciones de arquitectura

Conserva las credenciales en un componente protegido del servidor cuando el servicio remoto requiera claves secretas. Nunca las expongas en código del navegador. Aplica autorización, límites de solicitudes y permisos de herramientas fuera del prompt. Trata las entradas del alumnado, los documentos recuperados y las salidas del modelo como datos no confiables.

Separa las instrucciones del contenido suministrado, restringe herramientas y destinos, valida salidas estructuradas y sanea el contenido mostrado. Impide que el texto generado se convierta directamente en código ejecutable u operaciones privilegiadas. Decirle al modelo que ignore inyecciones no garantiza seguridad. Realiza una revisión de seguridad específica de la arquitectura implementada.

## Planifica costes, fallos y continuidad

Fija un presupuesto realista, límites por sesión, tiempos de espera y cancelación. Muestra un estado comprensible durante la espera. Gestiona pérdidas de conexión, modelos no disponibles, salidas inválidas y cuotas agotadas sin perder el trabajo. Reintenta solo de manera segura y limitada.

Ofrece una alternativa adecuada: pistas revisadas, ejercicios estáticos, progreso guardado o ayuda docente. Identifica la retroalimentación no disponible en lugar de inventarla. Antes del uso en el aula, recorre el flujo principal, una respuesta incorrecta, una solicitud de ayuda, retroalimentación incierta y un fallo de servicio. Documenta las limitaciones pendientes y las responsabilidades de revisión del docente.
