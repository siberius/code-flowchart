---
name: learning-methodologies
description: Design or review educational applications by connecting learning goals, learner needs, activities, feedback and evidence of learning. Use for new learning tools or substantive changes to their teaching design. Do not apply to cosmetic changes or ordinary bug fixes without a learning-design issue.
metadata:
  version: "1.3.0"
  license: "MIT"
  repo: "https://github.com/siberius/learning-methodologies"
  author: "Luděk Sušický"
  format: "native bundle with generated standalone Markdown"
---


<!-- Generated from SKILL.md and references/. Edit those sources. -->


# Learning methodologies

Help design, implement or review educational applications whose learning activities, support and assessment serve the intended learners. Adapt the depth of work to the request, consequences and uncertainty. A small classroom activity does not need a full evaluation study or a new planning document.

## Didactic methods for applications built with AI

Use the methods to turn educational goals into learner actions, feedback rules and evidence in the generated application. For example, retrieval requires an attempt before revealing the answer, while scaffolding requires controllable help and a distinction between assisted and independent performance. AI can help implement these decisions; its output still needs subject and teaching review. This applies to offline applications as well as justified runtime AI.

Read [didactic rationale](#reference-didactic-rationale) when explaining why a method fits or tracing it into implementation. It connects methods to product decisions and the evidence needed to assess them.

## Working route

Use this route at the depth the task needs: establish the goal and constraints → choose a method for the learning obstacle → connect the learner's activity to evidence → implement within scope → check the result. For a review, inspect the existing design instead of implementing. Reuse known context; do not require a planning document for every step.

Read [decision examples](#reference-decision-examples) when help, alternative answers or uncertain curriculum alignment need clarification. They illustrate decisions, not scripts to copy into every lesson.

## Establish the learning context

Use information already present in the request, project and supplied materials. Ask only about missing information that materially changes the design. For minor uncertainties, state a reasonable assumption and proceed. Avoid a fixed questionnaire or repeated approval for ordinary choices already covered by the request.

Identify the relevant context: learners and prior knowledge, subject, intended outcomes, classroom or independent use, available time and devices, language, accessibility needs, and any supplied curriculum. Follow a curriculum when relevant to the setting; do not assume one national framework. Choose tone from the context and author preference. Do not infer attention, motivation, ability or preferred pedagogy from generation labels.

Include the surrounding teaching activity where useful: preparation, individual or group work, teacher intervention, discussion and follow-up. A teacher-led demonstration may need a good discussion prompt rather than accounts and individual scores.

## Connect goals to observable activity

For each important goal, connect the learner's action, evidence, success criteria, assistance conditions and next instructional decision. Keep this concise for small tasks. For open inquiry, the evidence may concern question quality, use of evidence or revision of an explanation rather than one predetermined answer.

Example: the learner predicts how changing resistance affects current, checks a model, explains any discrepancy, and solves a new case independently. Moving a slider or completing a screen alone does not establish understanding.

Use the observed learning obstacle to choose a suitable intervention. Treat an explanation of an error as a provisional hypothesis, not a diagnosis. Select a small coherent set of methods; do not add features merely because they appear in the catalog. Read [methods](#reference-methods) when selecting or implementing a method, support sequence or progression rule.

The method reference explicitly covers Socratic learning, the Feynman technique, the Zone of Proximal Development and scaffolding, worked examples, retrieval and spaced practice, error-based learning, metacognition, inquiry, role-play, peer and cooperative learning, projects, flipped teaching and optional gamification. These are selectable approaches, not required features of every application.

Bloom's taxonomy describes cognitive goals and knowledge types. Keep difficulty and prerequisites separate; do not require six locked levels. For practical, interpersonal or other outcomes, choose suitable evidence and acknowledge what an on-screen task cannot establish.

## Choose a proportionate realization

Distinguish AI used to build the application from AI used by learners in the finished product. Choose among reviewed static content, deterministic interactions or simulations, and runtime AI according to the goal and operating constraints. Hints, feedback and spaced practice can work without an AI service.

Before adding a substantial feature, consider its learning contribution, interaction burden, teacher workload, maintenance, data needs and running cost. Explain material tradeoffs. Do not add accounts, analytics, dashboards, a backend, paid services or external data flows merely to make the product appear complete. Confirm scope-changing decisions when not already authorized.

Read [simulations](#reference-simulations) when modeling a system, running an experiment or designing role-play. Clearly distinguish real observations, model calculations and fictional reconstruction. Never present invented AI output as a measurement or pretend an experiment ran.

Read [runtime AI](#reference-runtime-ai) only when the finished product calls an AI service. Define the teaching role, source boundaries, human oversight, data flows, cost limits and failure behavior. A prompt is not a substitute for application security.

Read [tutor modes and continuity](#reference-tutor-state) when implementing multi-step tutoring, practice/assessment transitions or resuming learning. Keep state and evidence in the application; these features do not require runtime AI.

## Make feedback and decisions trustworthy

Provide a useful next step after an error. In practice, allow help and a route to direct explanation or a worked solution when needed; avoid endless questioning. Reduce assistance based on independent performance, while keeping requested support available. An assessment may restrict assistance under explicit conditions.

Distinguish independent success, supported success, exposure to the answer and uncertainty. One correct guess, a confidence statement or two supported successes do not automatically establish mastery. Do not infer stable ability, motivation or a disorder from a short interaction.

Read [assessment](#reference-assessment) when designing scored tasks, rubrics, adaptivity or learning evaluation. Check subject correctness, plausible alternatives, numerical units and tolerances, and whether the task really requires the intended performance. Preserve valid alternative explanations and methods. Keep game rewards and speed separate from achievement unless they serve an explicit goal.

## Preserve access and teacher agency

Design for relevant WCAG 2.2 AA criteria and the learners' actual needs. Check keyboard operation, visible focus, understandable labels and feedback, alternatives to color or sound alone, and justified or adjustable timing. Choose appropriate ways to perceive information and express understanding; do not assign learners fixed learning styles. Seek specialist accessibility help when the implementation warrants it.

Collect only data needed for the activity and identify who sees it, where it goes and how it is retained. Check provider, school and local requirements for the actual deployment when relevant; do not invent universal legal rules. A local anonymous activity need not acquire accounts or persistent tracking.

Provide a proportionate way for the teacher or responsible author to review content, correct judgments and intervene in inappropriate adaptation. This can be an editable content file rather than a management system. Significant grading or placement decisions need accountable human review.

## Coordinate expertise without inflating the workflow

Use these perspectives as needed; one agent can cover them for a small task:

- Methodologist: intended outcomes, teaching context and instructional choices.
- Subject didactician: content accuracy, prerequisites, examples and misconceptions.
- Assessment designer: evidence, criteria, alternatives and limits of inference.
- Interaction designer: learner flow, help, accessibility and classroom use.
- Developer: data contracts, calculations, state, persistence and failure behavior.
- Reviewer: discrepancies between the goal, design and observed behavior.

Carry their decisions into implementation. Do not label a convenient technical choice pedagogically correct without evidence. Resolve material disagreements through source checking, a targeted check or an explicit unresolved question. Use independent review when complexity or consequences justify it; do not start a team for every task. Invoke other skills only for relevant work and when available.

## Verify and report at the right level

For implementation, check the affected learner path, meaningful errors, help and relevant failure states. For analysis-only requests, report findings and proposals without changing the product. Adapt checks to the application: a simulation needs model checks; runtime AI needs service-failure and output-handling checks; a simple static activity needs neither by default.

Keep three conclusions separate: functional correctness, didactic suitability and observed learning outcomes. Technical checks alone do not establish educational effectiveness. A small pilot can reveal problems without proving causal benefit. Report actual checks and unresolved assumptions; do not invent learner observations or efficacy results.

At handoff, summarize the learning goal, selected approach, important operating assumptions, checks actually completed and remaining limits. Include a goal-to-evidence table only when it makes the result easier to use. Keep the form appropriate to the user's request.

## Integration

When selecting a model, effort or speed, or adapting the loading mechanism, read [model and host profiles](#reference-model-profiles). This includes documentation-based guidance for OpenAI, Claude and Gemini. Keep one shared educational contract and report actual testing separately from intended compatibility. Do not load the profile for an ordinary educational task that does not need it.

Suitable for educational games, quizzes, tutorials, simulations, training and reviews of their teaching design. The core requires no packages, API, specific AI model or student data. The references below are embedded for standalone use. In a native bundle they are separate conditional files. Installation, deployment and other external changes require authorization for those actions. This skill does not replace project instructions or authorize additional scope.

Design references: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [CAST UDL Guidelines](https://udlguidelines.cast.org/). These guide design and review; citing them does not certify conformance or educational effectiveness.

## Reference: methods

Source section: Choosing learning methods


Use this reference after defining the learning goal and evidence of success. Choose the smallest useful intervention for the learner's current obstacle. An app format alone does not determine a teaching method. Do not add every method listed here.

### Methods: Choose from an observed learning need

| Observed obstacle | Candidate intervention | Check before adopting |
|---|---|---|
| Essential knowledge is not retained | Retrieval practice with spaced review | Can learners recall it independently after a delay? |
| A novice cannot begin a procedure | Worked example, then partially completed and independent tasks | Are prerequisites available and steps comprehensible? |
| Learners repeat a specific misconception | Contrast cases, explanation, targeted question and corrective practice | Does the task distinguish that misconception from other errors? |
| Learners can execute but cannot explain or transfer | Self-explanation, contrasting cases, application in a new context | Does success require reasoning rather than copying a pattern? |
| Learners struggle to judge their understanding | Prediction, confidence judgment, independent check and reflection | Can they compare their judgment with evidence? |
| The goal involves inquiry or professional interaction | Guided investigation, role-play or simulation with debrief | Are the model, scenario, evidence and criteria trustworthy? |

These observations are provisional instructional hypotheses. A wrong answer, slow response or request for help does not diagnose a learning disorder, motivation, intelligence or a stable learner trait. Ask or inspect further when several explanations fit.

### Methods: Bloom as a design lens

The revised taxonomy has two dimensions: knowledge (factual, conceptual, procedural, metacognitive) and cognitive process (remember, understand, apply, analyze, evaluate, create). Use them to describe goals and inspect task coverage. A task may combine processes; its verb alone does not establish its classification.

Keep task difficulty, curricular prerequisites and progression rules separate. Do not unlock six compulsory levels or infer mastery from a Bloom label. Build prerequisite relationships from the domain. Include practical, interpersonal or affective goals when relevant, with their own observable evidence. Bloom's cognitive categories do not cover every educational goal.

### Methods: Zone of Proximal Development and scaffolding

The Zone of Proximal Development concerns the relationship between independent performance and what becomes possible with appropriate support. Use this lens when a learner can complete a task with help but not yet independently. Scaffolding provides temporary cues, examples or partial steps. Do not infer an exact ability boundary from a single error.

For novices, consider a worked example with the reasoning visible, a completion task and independent practice. Adjust detail to prior knowledge. Provide only information needed for the current step; decorative complexity and simultaneous demands need a learning purpose.

Use a flexible help sequence: clarify the obstacle, give a targeted cue, offer a partial step, then provide a commented solution when needed or requested. Follow supported work with a comparable independent task. Reduce support based on demonstrated independent performance. Two successes or self-reported confidence alone do not establish mastery.

### Methods: Socratic learning

Use targeted questions to inspect assumptions, evidence and reasoning when the learner has enough background to respond. Elenchus examines consistency between a claim and accepted premises; the classroom purpose is not to defeat the learner. Paul and Elder's questioning categories offer prompts about meaning, assumptions, evidence, perspectives, implications and the question itself.

Ask one useful question at a time and respond to the learner's actual explanation. Let a learner defend a correct answer rather than assuming every initial answer is mistaken. Avoid endless questioning or withholding needed explanation. When prerequisites are missing, questioning stops helping or the learner asks to be shown, provide direct instruction or an example.

### Methods: Feynman technique

Invite the learner to explain a topic in their own words to a curious beginner, identify a specific gap, return to a reliable source and revise the explanation. This can reveal reasoning after an initial introduction or before application. Do not pretend not to understand a precise explanation merely to prolong dialogue.

Check factual accuracy against sources and a suitable rubric, then include an application task. Fluent language, simplification and AI praise alone do not establish deep understanding. The technique's name does not guarantee that an implementation is effective.

### Methods: Retrieval, spacing and reflection

Retrieval practice asks learners to reconstruct knowledge before seeing the answer. Provide corrective feedback and another opportunity to use it. Spacing revisits learning after a meaningful delay; immediately returning an error to the queue is corrective practice, not a complete spacing strategy. Review some previously correct material as well as errors. Configure intervals for the content, retention goal and available sessions; do not claim one schedule is universally optimal.

### Methods: Metacognition and self-regulated learning

Help learners set a useful subgoal, plan, monitor understanding and revise their approach using evidence. Ask them to predict success or explain their choice, then compare with independent performance. Keep reflection specific: what evidence changed their view and what they will try next. Do not equate confidence with competence or add a lengthy mandatory journal to a small activity without a purpose.

When working with generated hints, worked examples, or live AI, protect the learner's active role within the Shared Cognitive Space (FALR framework: Choice, Delay / Cognitive Pause, Evaluation, Self-Direction). Prevent an automatic transition from algorithmic output to learner action by inserting a cognitive pause before adopting or copying output. Prompt the learner to evaluate whether the output is valid, what is missing, what they actually understood themselves compared with what the system did for them, and whether to use, revise, verify, or reject the output.

### Methods: Concept maps and relationships

Use a concept map when explaining or constructing relationships is part of the goal. Let learners build a small map, label a missing relationship or critique a proposed connection, then compare it with reviewed sources or a rubric. A polished map generated entirely for the learner is a resource, not evidence of the learner's understanding.

Label links explicitly: prerequisite, part of, contrasts with, associated with or causes under stated conditions. Do not infer causation from co-occurrence or force a network of cross-links into a tree. Accept different valid structures; assess the meaning and justification of relationships rather than screen coordinates or visual similarity. Do not assume the source covers every connection.

For implementation, use stable concept identifiers and typed, directed relationships where needed. Provide a text/list alternative and keyboard editing if manipulation is required; dragging must not be the only way to answer. A short relationship table may serve the goal without a graph editor. Check one valid alternative map and one incorrect link against the feedback rules.

### Methods: Contextual methods

- Inquiry: scaffold question, prediction, test, observation and explanation. Claims about real-world behavior need appropriate real data or an adequately validated model; illustrative outputs must be labeled and bounded. Language-model narration cannot stand in for experimental evidence.
- Role-play: define the role, scenario boundaries and success criteria, then debrief. Mark historical dialogue as a reconstruction and distinguish sourced facts from invented speech. Fictional interaction can still have emotional or social consequences.
- Peer learning: provide a shared task, accountable individual contribution and criteria for useful explanation. Include a way to resolve disagreements and check each learner's understanding.
- Peer teaching: let learners explain and give feedback against understandable criteria, with access to a reviewed explanation or teacher when needed. Do not make an inexperienced peer the final authority on subject accuracy.
- Project learning: define an authentic product, intermediate milestones and individual evidence. Attractive output alone does not establish the intended learning.
- Flipped teaching: connect preparation to classroom application and provide an alternative for learners who could not complete preparation. It is an organizational choice, not an automatic learning benefit.
- Gamification: use optional progress or narrative features when they support the goal. Public competition, rewards and speed scoring need a reason and an accessible alternative.

### Methods: Evidence and further reading

- [Krathwohl, 2002, A Revision of Bloom's Taxonomy](https://people.ucsc.edu/~ktellez/blooms_taxonomy.pdf): two dimensions and a relaxed hierarchy with overlapping categories.
- [IES, Organizing Instruction and Study to Improve Student Learning](https://ies.ed.gov/ncee/wwc/PracticeGuide/1): evidence-informed recommendations for spacing, retrieval, worked examples and explanatory questions. Evidence strength varies by recommendation.
- [UNESCO, Guidance for Generative AI in Education and Research](https://www.iicba.unesco.org/en/africa-education-knowledge-platform/guidance-generative-ai-education-and-research): human agency and validation of educational uses.
- Zinger, D. (CFM / FALR – Four-Action Learner Regulation Framework): learner regulation within a Shared Cognitive Space with AI (Choice, Delay / Cognitive Pause, Evaluation, Self-Direction).

## Reference: assessment

Source section: Evidence, assessment and feedback


### Assessment: Start with the decision

For each important learning goal, specify the learner's action, evidence collected, success criteria and the next instructional decision. Include conditions such as access to hints, reference material, collaboration and time limits. Set practical or social criteria where those are the intended outcomes, rather than substituting a recall quiz.

Example: given an unfamiliar circuit, the learner predicts the effect of a change and explains why. Evidence includes the prediction and causal explanation. A rubric checks the relevant principle, application and reasoning. A misconception triggers a contrasting example and another independent attempt.

### Assessment: Keep purposes explicit

In practice mode, learners may request explanations, retry and use graduated support. Record support use separately from independent success. Feedback should name what is correct, identify the relevant gap and give an actionable next step followed by an opportunity to revise or apply it.

In an assessment mode, define permitted assistance and scoring before the attempt. Keep tutoring assistance consistent with those conditions. Explain whether feedback is immediate or deferred and why. Do not silently transfer practice scores into consequential grades. Formative assessment uses evidence to adjust learning; summative assessment reports achievement against defined criteria. A score without a subsequent decision does not itself constitute formative assessment.

### Assessment: Design trustworthy tasks

Check the answer key, explanation and plausible alternatives. For multiple-choice tasks, prefer meaningful distractors linked to known errors and avoid accidental clues. For open responses, accept equivalent wording, valid alternative methods and appropriate assumptions. Do not make one model answer the only correct formulation.

Use a short rubric with observable criteria, performance descriptions and examples, including borderline and alternative correct responses. Keep dimensions separate when useful: factual accuracy, reasoning, procedure, communication or collaboration. Penalize language mechanics only when they belong to the goal. Speed and public rank need an explicit educational purpose; participation points, badges and completion certificates do not demonstrate mastery.

When implementing a task bank, make the relevant decisions explicit in its existing data format. Useful fields may include a stable task ID, goal ID, prompt, accepted answers or rubric, explanation, hints, source and review state. Add numeric units and tolerances where needed. Keep response records separate: answer, assistance used, attempt and evaluation state. This is an example contract, not a required schema or reason to add tracking to a shared demonstration.

### Assessment: Limits of AI judgment

Treat an AI score or error classification as a provisional judgment. Validate against teacher-reviewed examples and domain checks where available. When evidence is ambiguous, request clarification or mark it for review; do not manufacture certainty or use an uncalibrated confidence number as proof. Give learners a way to challenge feedback and give teachers an override with the original response and scoring rationale visible. Consequential decisions require an accountable human review process appropriate to the setting.

### Assessment: Evaluate the learning claim

Where feasible, compare an initial task with a comparable independent task after instruction, then sample retention after a delay and transfer to a different context. Interpret improvement cautiously: repeated items, hints and unequal starting conditions can change scores. A small classroom pilot can identify problems but does not by itself establish causal efficacy.

Track completion, usage, time, enjoyment, latency and errors as operational or experience indicators. Keep them separate from learning outcomes. Choose the least data needed for the instructional decision, and state what the evidence cannot establish.

### Assessment: Sources

- [EEF, Teacher Feedback to Improve Pupil Learning](https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/feedback): learning intentions, evidence of gaps, purposeful timing and opportunities to act on feedback. This teacher-feedback guidance does not validate every AI feedback implementation.
- [IES practice guide](https://ies.ed.gov/ncee/wwc/PracticeGuide/1): independent retrieval and delayed review inform the proposed evaluation approach.

The workflow, example rubric and implementation choices above are design recommendations. Their suitability must be checked against the learners, subject, stakes and available evidence.

## Reference: simulations

Source section: Simulations and role-play


Read this reference when a product models a system, supports an experiment, or lets learners act within a scenario. Select only the relevant checks.

### Simulations: Identify what the output represents

Distinguish these kinds of evidence in learner-facing language:

- **Measurement:** observations from an actual instrument, dataset, or recorded experiment. Identify the source and relevant measurement limits.
- **Calculation or simulation:** results produced by a specified mathematical or rule-based model. State assumptions and the range within which the model is useful.
- **Fiction or reconstruction:** invented events, dialogue, characters, or consequences used for learning. Identify them as such.

Never describe generated numbers as measurements or invented dialogue as an authentic quotation. A simulation can illustrate a hypothesis; its output alone does not establish how the real world behaves.

### Simulations: Define and check the model

Record the learning objective, state variables, inputs, units, allowed ranges, assumptions, update rules, and observable outputs. Explain simplifications that affect interpretation. Choose controls that expose the intended relationship without requiring learners to discover undocumented settings.

For numerical work, calculate outputs with a verified numerical engine or explicit rules. Keep this engine separate from any LLM commentary. The LLM may explain actual results but must not invent missing calculations or pretend an experiment ran.

Use proportionate checks: a known example, a boundary case, unit consistency, and a relevant invariant or expected trend. For stochastic models, specify the source of randomness and support a reproducible seed when useful. Document limitations rather than implying universal validity.

### Simulations: Design the learning loop

Ask the learner to make a prediction and explain it before running the model when that supports the objective. Let them change meaningful inputs, observe the actual output, compare it with their prediction, and revise their explanation. Provide a debrief that distinguishes model behavior from real-world claims and asks where the model might fail.

Do not award understanding solely for reaching a target configuration. Seek an explanation, comparison, or transfer to a new case.

### Simulations: Historical and social role-play

State whether a character is fictional, composite, or based on documented history. Keep sourced facts distinguishable from reconstructed speech. Give provenance for historical claims and acknowledge disputed interpretations when relevant. Do not claim authentic access to a person's thoughts or fabricate citations.

Define the role, scenario boundaries, learning objective, and debrief. Offer a clear exit from the role and access to an explanation. Match emotional intensity and subject matter to learners and classroom context; provide an alternative activity for sensitive scenarios. Assess the intended reasoning or communication against explicit criteria rather than rewarding agreement with the character.

## Reference: runtime-ai

Source section: Runtime AI in educational applications


Read this reference only when the finished application calls an AI service during use. Using AI to write code or generate teacher-reviewed content does not require runtime AI. Keep offline activities offline unless the learning goal needs a service.

### Runtime Ai: Define a bounded teaching role

Specify what the model may do, which reviewed content or sources it can use, and how it should handle missing evidence. Where factual grounding matters, identify approved materials and preserve source provenance. Do not generate plausible-looking citations. Allow uncertainty and correction; avoid diagnoses or confident claims about a learner's abilities from a short interaction.

Choose assistance by activity. Practice can use guiding questions, progressive hints, worked examples, and direct explanation when requested or when questioning stops helping. An assessment may restrict assistance according to the teacher's stated rules. Do not impose an endless Socratic loop or a universal ban on answers. Give the learner a way to ask for help, stop, or involve the teacher.

Design live AI interfaces to prevent passive copying (cognitive offloading). Before adopting a generated procedure or response, require a brief regulatory action from the learner: clarifying intent before querying, pausing over the output (cognitive pause), evaluating completeness and validity, and consciously choosing the next step (continue, verify, reformulate, or decide not to use the output).

Use explicit rubrics for feedback and open responses. Compare model judgments with teacher-reviewed examples before relying on them. Significant grading, placement, or disciplinary decisions require accountable human review; a single model response must not be the sole decision-maker. Record uncertainty and let the teacher correct a judgment.

### Runtime Ai: Minimize learner data

List the inputs sent to the provider, what is retained, who can access it, and how deletion works. Collect only what the activity needs. Do not add accounts, real names, persistent profiles, or conversation logging automatically. Use anonymous or pseudonymous activity identifiers where sufficient, while recognizing that these do not guarantee anonymity.

Before deployment with minors, check the intended age group, school arrangements, provider terms and settings, and applicable local requirements with the responsible institution. Do not invent a universal consent age or legal rule. Explain data handling to learners and teachers in suitable language.

### Runtime Ai: Use architectural safeguards

Keep service credentials in a protected server-side component when a remote service needs secret keys. Never expose them in browser code. Enforce authorization, request limits, and tool permissions outside the prompt. Treat learner input, retrieved documents, and model output as untrusted data.

Separate instructions from supplied content, restrict tool access and destinations, validate structured outputs, and sanitize rendered content. Prevent generated text from directly becoming executable code or privileged actions. A prompt telling the model to ignore injection is not a security guarantee. Use a dedicated security review for the implemented architecture.

### Runtime Ai: Plan cost, failure, and continuity

Set a realistic usage budget, per-session limits, timeouts, and cancellation. Show an understandable state while waiting. Handle network loss, unavailable models, invalid output, and exhausted quota without losing learner work. Retry only when safe and bounded.

Offer an appropriate fallback such as reviewed hints, static exercises, saved progress, or teacher help. Label unavailable feedback rather than fabricating it. Before classroom use, exercise the main learning path, an incorrect answer, a help request, uncertain feedback, and a service failure. Document unresolved limitations and the teacher's review responsibilities.

## Reference: model-profiles

Source section: Models, effort, speed and host adaptation


Use this reference when recommending a model, choosing a speed/effort setting, or adapting how the host loads this skill. Keep the educational instructions identical across providers. The recommendations below are starting configurations for this workflow, not results of a cross-provider benchmark.

Documentation checked: 2026-11-04. Model names, available settings, plans and prices change. Before using a named model, check the user's actual model list and the current official documentation. Do not claim to switch models or settings unless a supported control actually changed them.

### Model Profiles: Choose by task before choosing a name

Use a smaller model for bounded edits with explicit criteria, a midrange model for ordinary design and implementation, and a stronger model for conflicting evidence, complex simulations or consequential review. These are task categories, not guaranteed capabilities. Keep the user's existing choice when it meets the criteria.

The named table below is an **untested starting recommendation for this skill**, derived from documentation, not a measured ranking. No cross-provider comparison is established. Confirm a configuration with representative tasks before calling it validated.

### Model Profiles: Escalation and stopping rules

For a clear task, begin with the supported default effort or a previously successful setting. For conflicting sources or a complex model, consider higher effort from the outset. If the output misses an explicit constraint, contradicts its own scoring, fails a meaningful calculation check or repeatedly produces invalid tasks, first check that the relevant input and reference were accessible. Correct a missing input or ambiguous criterion before changing models.

After one focused repair still fails the same important criterion, recommend a supported higher effort level and reassess that criterion. If the failure persists, recommend a stronger available model or an independent review according to impact. Do not retry indefinitely or spend beyond the agreed budget. Missing sources, unavailable tools and service outages require resolving the dependency or stating the limit; more reasoning cannot supply the missing evidence. Report unresolved failures. Change settings only through authorized host controls.

Reduce effort or use a smaller model only after relevant checks pass; retain evidence of the tradeoff. Treat serving speed separately: standard is the starting point, paid acceleration needs a time/cost reason and authorization.

### Model Profiles: Keep recommendations current

Recheck named guidance when the model or host version changes, a setting is absent, the provider changes availability, or the documented behavior conflicts with observation. Until checked, mark that pairing unverified and use task categories plus the actual host's supported defaults. Do not invent an equivalent setting for an unknown model. Add provider-specific instructional workarounds only after a repeatable failure demonstrates their need; record the affected version and remove the workaround when no longer justified.

### Model Profiles: Match the task and control

| Work | OpenAI starting point | Claude starting point | Gemini starting point |
|---|---|---|---|
| Small, well-specified content edits or review of structured items | GPT-6 Luna, High; reduce effort only after checks hold | Haiku 5.5, Medium | Gemini 3.5 Flash-Lite, Low where supported |
| Design and implementation of a bounded learning activity | GPT-6.1 Sol, default effort or Medium | Sonnet 5.5, Medium for well-specified agentic work | Gemini 3.8 Flash, Medium |
| Difficult didactic audit, conflicting sources, complex simulation or architecture | GPT-6 Astra, Light/Low or Medium; increase if needed | Opus 5.5, Medium, then High if needed | Gemini 4 Argon, Medium, then High if needed |

These pairings are the skill author's recommendations inferred from vendor guidance. They do not establish equivalence between models or prove that one family teaches better. If a selected model is unavailable, recommend an available alternative and disclose the change; do not change a user selection without authorization. For example, an existing Gemini 3.1 Pro workflow can retain that model and its supported thinking levels. The table does not predict numerical latency; measure a representative task in the actual environment.

Distinguish three choices: the model, the amount of reasoning, and any premium serving-speed tier. Lower effort can reduce reasoning work; a vendor's Fast service tier is a different control and may cost more. A model named Flash is a model family, not a universal fast-mode switch. Equal words such as Low, Medium and High do not promise equal reasoning or latency across products.

Start with standard serving speed. Recommend a paid Fast tier only when waiting time matters and current access/rates justify it. Do not enable it or buy capacity without authorization. Streaming improves the visibility of progress; it is not evidence of earlier completion or higher quality. Judge end-to-end time including review, tool calls and repairs.

### Model Profiles: OpenAI and Codex

Use the native bundle where the host supports skills and can read references. In Codex, explicit invocation can name `$learning-methodologies` or `$vzdelavaci-metodiky`. Do not assume the same filesystem discovery in a regular chat; provide the standalone Markdown as accessible input instead.

The current guide recommends Sol for substantial work, Luna for focused work and Astra for demanding workflows; Luna High and Astra Light/Low are documented starting settings. In Codex, Fast is a serving-speed choice distinct from reasoning effort. Availability and usage rates depend on the model, account and client. Check supported values before proposing configuration; a UI label is not necessarily an API model ID.

Give a concrete deliverable, scope, relevant files and observable acceptance criteria. Ask for concise decisions and evidence, not disclosure of private chain of thought. Use the host's tools and permissions; do not invent shell or browser access from the model name.

Sources: [models](https://learn.chatgpt.com/docs/models), [speed](https://learn.chatgpt.com/docs/agent-configuration/speed), [skills](https://developers.openai.com/plugins/concepts/skills).

### Model Profiles: Claude and Claude Code

Claude Code supports `SKILL.md` bundles and supporting files. Explicit invocation can use `/learning-methodologies` or `/vzdelavaci-metodiky` after discovery. In another Claude host, verify its skill mechanism or supply the standalone edition. Do not add Claude-only hooks, shell substitutions or model overrides to the common frontmatter.

For Sonnet 5.5 agentic work, the effort documentation recommends Medium for well-defined tasks and higher effort for harder ones. Opus 5.5 defaults to Medium; older models and clients can differ. The API effort control and thinking mode are separate concepts. Not all generations support the same combinations. Prefer supported host controls rather than copying an API parameter into a chat instruction. Claude's Fast mode is a separate, model-dependent feature with premium pricing.

Keep the task, materials and desired result explicitly delimited. State where the agent may decide and what requires evidence. Provide one useful example when it resolves ambiguity; avoid repeating the entire skill or prescribing a long thought transcript. This packaging choice helps portability and is not a claim about a Claude-specific cognitive trait.

Sources: [skills](https://code.claude.com/docs/en/skills), [models](https://platform.claude.com/docs/en/models/overview), [effort](https://platform.claude.com/docs/en/build-with-claude/effort), [Fast mode](https://platform.claude.com/docs/en/build-with-claude/fast-mode).

### Model Profiles: Gemini and Gemini CLI

Gemini CLI discovers native skills in its supported skills locations, including the `.agents/skills` alias. Verify with `/skills list` and reload with `/skills reload` when needed. Workspace trust and activation approvals belong to the host; do not bypass them. AI Studio or another chat should receive the standalone file when native skill loading is unavailable.

The checked thinking guide lists Low, Medium and High for Gemini 4 Argon and Gemini 3.8 Flash. Other Gemini versions have different defaults and levels. Use only those supported by the actual model and API/client; do not translate an OpenAI or Claude effort parameter literally. A preview name and a stable name are not interchangeable.

For `gemini-3.1-pro-preview`, the checked API table lists Low, Medium and High, with High as the default. For that endpoint, try Medium for ordinary design and High for a difficult audit as an author recommendation, if the host exposes those controls. A displayed label such as Gemini 3.1 Pro does not prove which endpoint or controls a client uses.

Keep instructions concise and specify the goal, constraints and output evidence. Attach referenced materials so the model can actually access them; a path in a chat is not file access. Preserve required tool-conversation state when implementing a Gemini API application, following the current API documentation. This skill does not implement that API layer and does not authorize adding one.

Sources: [models](https://ai.google.dev/gemini-api/docs/models), [thinking](https://ai.google.dev/gemini-api/docs/thinking), [Gemini CLI skills](https://geminicli.com/docs/cli/tutorials/skills-getting-started/).

### Model Profiles: Portable use and verification

Keep required metadata plain: `name` and `description`, followed by ordinary Markdown. Optional metadata describes the edition; do not rely on a host-specific field to enforce a safety boundary. Use the bundled relative references in a file-capable agent or the complete standalone edition in a chat. Do not load both language editions by default. Reattach essential scope and unfinished work after host context loss rather than assuming every host retains it.

Emoji can carry meaning but should not be the sole instruction or priority signal. Preserve explicit text labels. Research on [emoji semantics](https://arxiv.org/abs/2409.10760) and [contextual ambiguity](https://arxiv.org/abs/2511.07193) does not establish that decorating this skill improves compliance. Test such a change on the actual models and tasks before claiming a benefit.

Before calling a model/host combination tested, verify discovery or successful standalone loading, relevant-reference access, a representative deliverable and the critical boundaries. Record exact model ID or visible label, host/version, language, effort, serving speed, tools, date, artifacts and failures. Distinguish documentation-based compatibility from an observed execution. Never transfer a pass from one model to every model in its family.

For comparison, use the same task and raw materials, and have a reviewer assess actual outputs against the same educational criteria. Include known-context reuse, bounded help, an alternative correct answer, unsupported curriculum claims, a model/data boundary and a tool/service failure where relevant. Reduce effort or choose a smaller model only while important checks keep passing. If direct access to a provider is unavailable, mark it untested instead of inventing results.

## Reference: decision-examples

Source section: Decision examples


Use the relevant example to resolve a concrete ambiguity. Adapt the subject and age; preserve the decision principle.

### Decision Examples: Accept an equivalent answer

Task: express 1.5 A in milliamperes. The learner enters `1500 mA`; a checker expects `1500`. Accept the equivalent quantity, checking the unit and numeric value. If the learning goal specifically tests unit notation, assess that separately. Do not treat every string as equivalent by removing characters: `1500 A` is wrong here. Why: formatting should not replace the intended evidence of unit conversion.

### Decision Examples: End an unproductive Socratic loop

During practice, a learner says “I still do not understand; please show me” after a question about current and resistance. Give a short explanation or worked example at constant voltage, then offer a new prediction with optional support. Do not keep asking questions as a condition for receiving help. Record the worked example as supported learning; a fresh independent problem can supply separate evidence. Why: questions should help the learner progress, not block instruction. A declared assessment can have different assistance rules.

### Decision Examples: Correct an inaccurate Feynman explanation

A learner explains: “Plants get their food from soil; sunlight warms it up.” Acknowledge the understandable wording without accepting the science. Identify the specific misconception, provide or consult a suitable verified source, distinguish water/minerals from sugars produced in photosynthesis, and invite a revised simple explanation. Check transfer with a new case, such as what changes without light. Why: fluency and simplicity do not establish correctness. Do not invent experimental observations or attribute all plant growth to one factor.

### Decision Examples: Work with an unavailable curriculum

A teacher requests “full alignment with our school curriculum” but supplies no school document. Use the stated learning goal to produce a provisional activity. Request the relevant excerpt only when exact alignment matters; identify what remains unverified. Never invent local outcome codes or certify coverage. For Czech schools, a general RVP reference does not establish alignment with the particular ŠVP. Why: useful drafting can proceed while documentary claims remain bounded.

### Decision Examples: Insert a Cognitive Pause Before Adopting AI Output

In an app with an embedded AI assistant, a learner asks for a solution outline or error explanation. Instead of an "Apply to my solution" button, insert a cognitive pause: prevent direct copying and ask a brief verification question ("Which step is central here? What is missing from the AI suggestion for your specific case?"). Allow the learner to revise the suggestion, verify it on another example, or decide not to use it. Record the model's generated text as supported assistance, not as evidence of the learner's understanding. Reason: a cognitive pause prevents an automatic transition from algorithmic output to learner action without active cognitive processing.

## Reference: tutor-state

Source section: Tutor modes and learning continuity


Read when designing a multi-step tutor, resumable activity or exam practice. These rules also apply to deterministic offline applications; they do not require runtime AI, accounts or persistent storage.

### Tutor State: Model explicit modes and transitions

Separate explanation, practice and assessment where the activity needs them. Explanation can show a worked example. Practice asks for a response, waits, gives criterion-based feedback and offers help. Assessment follows declared rules for assistance and feedback timing. Let the learner pause, request help or leave; a restricted assessment may end or mark the attempt supported when content help is requested. Preserve accessibility accommodations that do not reveal content.

For conversational practice, keep one actionable question pending unless the task calls for a batch. Do not generate the learner's answer or reveal the solution while waiting. Distinguish idle, awaiting-answer, evaluating, feedback and paused states as needed. Disable duplicate submissions or associate them with the same attempt; a late service response must not grade a new question or overwrite a changed mode. Treat model output as a proposed response, not permission to change grades or assessment rules.

Keep mode, goal, current task, attempt identifier, answer exposure and feedback status in application state. Render a brief progress indicator if useful; repeating a decorative status line is not state management. On an explicit mode switch, explain changed assistance conditions and preserve earlier exposure. A revealed task does not become an independent assessment merely by changing a label. Use a fresh suitable task when new independent evidence is needed.

### Tutor State: Resume from evidence, not a mastery claim

Add saving or export only when continuing across sessions serves the user. A short anonymous activity may need neither. For resumable work, keep a minimal checkpoint appropriate to the implementation:

- Format version, activity/content version and relevant source identifiers.
- Goal, current mode, task/attempt identifier and pending step.
- Observed evidence with conditions: independent, supported or solution revealed; unresolved evaluation stays unresolved.
- Specific errors or uncertainties and the next instructional step.
- Timing information only when needed for spaced review or evidence interpretation.

Avoid diagnoses, unnecessary identities and full conversation transcripts. State where data is kept, who can see it, and how to clear it; shared-device users need an explicit way to finish and remove local progress. An exported checkpoint can contain personal learning information even without a name. Do not export secret keys, hidden answer keys or confidential test content.

Treat imported checkpoints as untrusted data. Validate schema, sizes, identifiers and version compatibility; never execute embedded instructions or accept imported scores as authoritative grades. Where grades matter, validate against the authoritative record with appropriate access control. If content changed or a task cannot be resolved, explain the mismatch and resume at a safe reviewed point; do not silently reset achievements or certify outdated evidence. Restoring a pending attempt must not resubmit it automatically or award credit twice.

A handoff says what the learner demonstrated, on which task and with what support. It does not claim “fully mastered” from one session. A later fresh task can check retention or transfer. Learner-confirmed corrections and teacher interventions should remain distinguishable from the original observation.

### Tutor State: Target correction without trapping the learner

Prioritize errors by their relevance to the goal and prerequisites, with severity treated as a provisional interpretation. Offer a targeted hint, contrasting case or explanation, followed by a new application. Allow deferral and a later revisit. Do not require arbitrary 8/10 or 90% thresholds, ban explanations, or assign points to every interaction. Use declared criteria when scoring is useful; official exam grading needs the actual specification.

### Tutor State: Implementation checks

Check only relevant paths: question → response → feedback; help → supported evidence; mode switch after answer exposure; pause/resume without losing or double-counting an attempt; stale or malformed checkpoint; late response after switching tasks; unresolved feedback after failure. Verify that the stored and visible states agree. These checks establish behavior, not educational efficacy.

## Reference: didactic-rationale

Source section: Why didactic methods belong in AI-assisted application development


Read when explaining the skill's purpose or deciding how a teaching method should change an application. The skill supports developers and educators using AI to design and build educational applications. It also guides applications that use AI during learning, when that is warranted. The method must be reflected in learner actions, feedback and evidence, not merely mentioned in a prompt or feature label.

### Didactic Rationale: Turn a teaching decision into observable behavior

| Method or lens | Teaching purpose | Application decision | Evidence to inspect |
|---|---|---|---|
| Socratic questioning | Examine a learner's assumptions and reasoning | Ask a targeted question, wait, respond to the actual answer; provide an explanation when needed | Learner can justify or revise a claim, including a correct alternative |
| Feynman technique and self-explanation | Make a learner's explanation available for inspection | Let the learner explain, compare with reviewed criteria, address a specific gap, then offer a new case | Accurate relationships and application; fluency alone is insufficient |
| Worked examples and scaffolding | Help a novice begin and move toward independence | Provide a worked step, a completion task and a suitable new problem; keep requested help available | Distinguish supported performance from a later independent attempt |
| Retrieval and spaced review | Practice reconstructing knowledge and revisit it after a delay | Ask before revealing; provide corrective feedback and schedule appropriate revisits, including previously correct material | Performance before exposure, later retention and transfer when checked |
| Concept maps | Make relationships and prerequisites explicit | Use labeled relations, accept equivalent valid structures and provide an accessible editing alternative | Meaning and justification of links, not visual similarity |
| Inquiry and simulations | Compare predictions with evidence under explicit assumptions | Expose relevant variables, units, constraints and model boundaries; include debrief | Learner revises an explanation using observations or clearly labeled model results |
| Formative assessment and metacognition | Decide a useful next step from evidence | Show specific feedback and let learners compare a prediction with performance | An actionable correction and new evidence; scores and confidence are insufficient by themselves |
| Cooperative and peer learning | Support comparison and explanation with accountability | Assign a shared task with individual contributions and a way to resolve disagreement | Each learner's reasoning; one shared click does not establish group understanding |
| Regulation in Shared Cognitive Space (FALR) | Keep the learner active and critical when using AI or hints | Insert a cognitive pause before adopting output; ask what is missing and what the learner understood vs. what the system did; allow rejecting the output | Distinction between self-understanding and system output, followed by an independent learner step |

Bloom's taxonomy helps describe cognitive goals and knowledge types; it does not prescribe difficulty or a six-stage unlocking system. A method is appropriate only if it addresses the target learners, content and observed obstacle. No catalog is a requirement to implement all methods.

### Didactic Rationale: Why this matters when AI helps write the application

AI can produce an interface, answer checker and feedback quickly. Those artifacts still need a teaching contract: what learners should do, what counts as evidence, what assistance was available, and how the next decision follows. Use that contract to constrain generated code and reviewed content. For example, retrieval practice changes answer-reveal timing, while scaffolding changes help controls and evidence labels. Naming the method without implementing those behaviors does not meet the design goal.

Separate AI at authoring time from AI at runtime. Reviewed static content and deterministic checks can implement many of these behaviors offline. If runtime AI is useful for open responses or dialogue, bound its sources, criteria and tools, validate output and provide a failure path. More generated conversation, stricter scoring or a larger model does not by itself establish better learning.

### Didactic Rationale: State the limits of the rationale

This is an explanation of design choices, not evidence that this skill or every implementation improves outcomes. Subject correctness, accessibility and classroom feasibility require appropriate checks. A technical pass does not demonstrate learning; suitable learner evidence and, for causal claims, an appropriate evaluation are needed. Research guidance linked in the methods reference informs particular choices and does not certify the whole package. Retain teacher review for consequential judgments and adapt curriculum to the actual setting.

## License notice

```text
MIT License

Copyright (c) 2026 Luděk Sušický

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
