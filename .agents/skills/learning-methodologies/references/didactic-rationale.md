# Why didactic methods belong in AI-assisted application development

Read when explaining the skill's purpose or deciding how a teaching method should change an application. The skill supports developers and educators using AI to design and build educational applications. It also guides applications that use AI during learning, when that is warranted. The method must be reflected in learner actions, feedback and evidence, not merely mentioned in a prompt or feature label.

## Turn a teaching decision into observable behavior

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

## Why this matters when AI helps write the application

AI can produce an interface, answer checker and feedback quickly. Those artifacts still need a teaching contract: what learners should do, what counts as evidence, what assistance was available, and how the next decision follows. Use that contract to constrain generated code and reviewed content. For example, retrieval practice changes answer-reveal timing, while scaffolding changes help controls and evidence labels. Naming the method without implementing those behaviors does not meet the design goal.

Separate AI at authoring time from AI at runtime. Reviewed static content and deterministic checks can implement many of these behaviors offline. If runtime AI is useful for open responses or dialogue, bound its sources, criteria and tools, validate output and provide a failure path. More generated conversation, stricter scoring or a larger model does not by itself establish better learning.

## State the limits of the rationale

This is an explanation of design choices, not evidence that this skill or every implementation improves outcomes. Subject correctness, accessibility and classroom feasibility require appropriate checks. A technical pass does not demonstrate learning; suitable learner evidence and, for causal claims, an appropriate evaluation are needed. Research guidance linked in the methods reference informs particular choices and does not certify the whole package. Retain teacher review for consequential judgments and adapt curriculum to the actual setting.
