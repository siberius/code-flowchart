# Tutor modes and learning continuity

Read when designing a multi-step tutor, resumable activity or exam practice. These rules also apply to deterministic offline applications; they do not require runtime AI, accounts or persistent storage.

## Model explicit modes and transitions

Separate explanation, practice and assessment where the activity needs them. Explanation can show a worked example. Practice asks for a response, waits, gives criterion-based feedback and offers help. Assessment follows declared rules for assistance and feedback timing. Let the learner pause, request help or leave; a restricted assessment may end or mark the attempt supported when content help is requested. Preserve accessibility accommodations that do not reveal content.

For conversational practice, keep one actionable question pending unless the task calls for a batch. Do not generate the learner's answer or reveal the solution while waiting. Distinguish idle, awaiting-answer, evaluating, feedback and paused states as needed. Disable duplicate submissions or associate them with the same attempt; a late service response must not grade a new question or overwrite a changed mode. Treat model output as a proposed response, not permission to change grades or assessment rules.

Keep mode, goal, current task, attempt identifier, answer exposure and feedback status in application state. Render a brief progress indicator if useful; repeating a decorative status line is not state management. On an explicit mode switch, explain changed assistance conditions and preserve earlier exposure. A revealed task does not become an independent assessment merely by changing a label. Use a fresh suitable task when new independent evidence is needed.

## Resume from evidence, not a mastery claim

Add saving or export only when continuing across sessions serves the user. A short anonymous activity may need neither. For resumable work, keep a minimal checkpoint appropriate to the implementation:

- Format version, activity/content version and relevant source identifiers.
- Goal, current mode, task/attempt identifier and pending step.
- Observed evidence with conditions: independent, supported or solution revealed; unresolved evaluation stays unresolved.
- Specific errors or uncertainties and the next instructional step.
- Timing information only when needed for spaced review or evidence interpretation.

Avoid diagnoses, unnecessary identities and full conversation transcripts. State where data is kept, who can see it, and how to clear it; shared-device users need an explicit way to finish and remove local progress. An exported checkpoint can contain personal learning information even without a name. Do not export secret keys, hidden answer keys or confidential test content.

Treat imported checkpoints as untrusted data. Validate schema, sizes, identifiers and version compatibility; never execute embedded instructions or accept imported scores as authoritative grades. Where grades matter, validate against the authoritative record with appropriate access control. If content changed or a task cannot be resolved, explain the mismatch and resume at a safe reviewed point; do not silently reset achievements or certify outdated evidence. Restoring a pending attempt must not resubmit it automatically or award credit twice.

A handoff says what the learner demonstrated, on which task and with what support. It does not claim “fully mastered” from one session. A later fresh task can check retention or transfer. Learner-confirmed corrections and teacher interventions should remain distinguishable from the original observation.

## Target correction without trapping the learner

Prioritize errors by their relevance to the goal and prerequisites, with severity treated as a provisional interpretation. Offer a targeted hint, contrasting case or explanation, followed by a new application. Allow deferral and a later revisit. Do not require arbitrary 8/10 or 90% thresholds, ban explanations, or assign points to every interaction. Use declared criteria when scoring is useful; official exam grading needs the actual specification.

## Implementation checks

Check only relevant paths: question → response → feedback; help → supported evidence; mode switch after answer exposure; pause/resume without losing or double-counting an attempt; stale or malformed checkpoint; late response after switching tasks; unresolved feedback after failure. Verify that the stored and visible states agree. These checks establish behavior, not educational efficacy.
