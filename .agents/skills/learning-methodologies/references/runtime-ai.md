# Runtime AI in educational applications

Read this reference only when the finished application calls an AI service during use. Using AI to write code or generate teacher-reviewed content does not require runtime AI. Keep offline activities offline unless the learning goal needs a service.

## Define a bounded teaching role

Specify what the model may do, which reviewed content or sources it can use, and how it should handle missing evidence. Where factual grounding matters, identify approved materials and preserve source provenance. Do not generate plausible-looking citations. Allow uncertainty and correction; avoid diagnoses or confident claims about a learner's abilities from a short interaction.

Choose assistance by activity. Practice can use guiding questions, progressive hints, worked examples, and direct explanation when requested or when questioning stops helping. An assessment may restrict assistance according to the teacher's stated rules. Do not impose an endless Socratic loop or a universal ban on answers. Give the learner a way to ask for help, stop, or involve the teacher.

Design live AI interfaces to prevent passive copying (cognitive offloading). Before adopting a generated procedure or response, require a brief regulatory action from the learner: clarifying intent before querying, pausing over the output (cognitive pause), evaluating completeness and validity, and consciously choosing the next step (continue, verify, reformulate, or decide not to use the output).

Use explicit rubrics for feedback and open responses. Compare model judgments with teacher-reviewed examples before relying on them. Significant grading, placement, or disciplinary decisions require accountable human review; a single model response must not be the sole decision-maker. Record uncertainty and let the teacher correct a judgment.

## Minimize learner data

List the inputs sent to the provider, what is retained, who can access it, and how deletion works. Collect only what the activity needs. Do not add accounts, real names, persistent profiles, or conversation logging automatically. Use anonymous or pseudonymous activity identifiers where sufficient, while recognizing that these do not guarantee anonymity.

Before deployment with minors, check the intended age group, school arrangements, provider terms and settings, and applicable local requirements with the responsible institution. Do not invent a universal consent age or legal rule. Explain data handling to learners and teachers in suitable language.

## Use architectural safeguards

Keep service credentials in a protected server-side component when a remote service needs secret keys. Never expose them in browser code. Enforce authorization, request limits, and tool permissions outside the prompt. Treat learner input, retrieved documents, and model output as untrusted data.

Separate instructions from supplied content, restrict tool access and destinations, validate structured outputs, and sanitize rendered content. Prevent generated text from directly becoming executable code or privileged actions. A prompt telling the model to ignore injection is not a security guarantee. Use a dedicated security review for the implemented architecture.

## Plan cost, failure, and continuity

Set a realistic usage budget, per-session limits, timeouts, and cancellation. Show an understandable state while waiting. Handle network loss, unavailable models, invalid output, and exhausted quota without losing learner work. Retry only when safe and bounded.

Offer an appropriate fallback such as reviewed hints, static exercises, saved progress, or teacher help. Label unavailable feedback rather than fabricating it. Before classroom use, exercise the main learning path, an incorrect answer, a help request, uncertain feedback, and a service failure. Document unresolved limitations and the teacher's review responsibilities.
