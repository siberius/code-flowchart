# Models, effort, speed and host adaptation

Use this reference when recommending a model, choosing a speed/effort setting, or adapting how the host loads this skill. Keep the educational instructions identical across providers. The recommendations below are starting configurations for this workflow, not results of a cross-provider benchmark.

Documentation checked: 2026-11-04. Model names, available settings, plans and prices change. Before using a named model, check the user's actual model list and the current official documentation. Do not claim to switch models or settings unless a supported control actually changed them.

## Choose by task before choosing a name

Use a smaller model for bounded edits with explicit criteria, a midrange model for ordinary design and implementation, and a stronger model for conflicting evidence, complex simulations or consequential review. These are task categories, not guaranteed capabilities. Keep the user's existing choice when it meets the criteria.

The named table below is an **untested starting recommendation for this skill**, derived from documentation, not a measured ranking. No cross-provider comparison is established. Confirm a configuration with representative tasks before calling it validated.

## Escalation and stopping rules

For a clear task, begin with the supported default effort or a previously successful setting. For conflicting sources or a complex model, consider higher effort from the outset. If the output misses an explicit constraint, contradicts its own scoring, fails a meaningful calculation check or repeatedly produces invalid tasks, first check that the relevant input and reference were accessible. Correct a missing input or ambiguous criterion before changing models.

After one focused repair still fails the same important criterion, recommend a supported higher effort level and reassess that criterion. If the failure persists, recommend a stronger available model or an independent review according to impact. Do not retry indefinitely or spend beyond the agreed budget. Missing sources, unavailable tools and service outages require resolving the dependency or stating the limit; more reasoning cannot supply the missing evidence. Report unresolved failures. Change settings only through authorized host controls.

Reduce effort or use a smaller model only after relevant checks pass; retain evidence of the tradeoff. Treat serving speed separately: standard is the starting point, paid acceleration needs a time/cost reason and authorization.

## Keep recommendations current

Recheck named guidance when the model or host version changes, a setting is absent, the provider changes availability, or the documented behavior conflicts with observation. Until checked, mark that pairing unverified and use task categories plus the actual host's supported defaults. Do not invent an equivalent setting for an unknown model. Add provider-specific instructional workarounds only after a repeatable failure demonstrates their need; record the affected version and remove the workaround when no longer justified.

## Match the task and control

| Work | OpenAI starting point | Claude starting point | Gemini starting point |
|---|---|---|---|
| Small, well-specified content edits or review of structured items | GPT-6 Luna, High; reduce effort only after checks hold | Haiku 5.5, Medium | Gemini 3.5 Flash-Lite, Low where supported |
| Design and implementation of a bounded learning activity | GPT-6.1 Sol, default effort or Medium | Sonnet 5.5, Medium for well-specified agentic work | Gemini 3.8 Flash, Medium |
| Difficult didactic audit, conflicting sources, complex simulation or architecture | GPT-6 Astra, Light/Low or Medium; increase if needed | Opus 5.5, Medium, then High if needed | Gemini 4 Argon, Medium, then High if needed |

These pairings are the skill author's recommendations inferred from vendor guidance. They do not establish equivalence between models or prove that one family teaches better. If a selected model is unavailable, recommend an available alternative and disclose the change; do not change a user selection without authorization. For example, an existing Gemini 3.1 Pro workflow can retain that model and its supported thinking levels. The table does not predict numerical latency; measure a representative task in the actual environment.

Distinguish three choices: the model, the amount of reasoning, and any premium serving-speed tier. Lower effort can reduce reasoning work; a vendor's Fast service tier is a different control and may cost more. A model named Flash is a model family, not a universal fast-mode switch. Equal words such as Low, Medium and High do not promise equal reasoning or latency across products.

Start with standard serving speed. Recommend a paid Fast tier only when waiting time matters and current access/rates justify it. Do not enable it or buy capacity without authorization. Streaming improves the visibility of progress; it is not evidence of earlier completion or higher quality. Judge end-to-end time including review, tool calls and repairs.

## OpenAI and Codex

Use the native bundle where the host supports skills and can read references. In Codex, explicit invocation can name `$learning-methodologies` or `$vzdelavaci-metodiky`. Do not assume the same filesystem discovery in a regular chat; provide the standalone Markdown as accessible input instead.

The current guide recommends Sol for substantial work, Luna for focused work and Astra for demanding workflows; Luna High and Astra Light/Low are documented starting settings. In Codex, Fast is a serving-speed choice distinct from reasoning effort. Availability and usage rates depend on the model, account and client. Check supported values before proposing configuration; a UI label is not necessarily an API model ID.

Give a concrete deliverable, scope, relevant files and observable acceptance criteria. Ask for concise decisions and evidence, not disclosure of private chain of thought. Use the host's tools and permissions; do not invent shell or browser access from the model name.

Sources: [models](https://learn.chatgpt.com/docs/models), [speed](https://learn.chatgpt.com/docs/agent-configuration/speed), [skills](https://developers.openai.com/plugins/concepts/skills).

## Claude and Claude Code

Claude Code supports `SKILL.md` bundles and supporting files. Explicit invocation can use `/learning-methodologies` or `/vzdelavaci-metodiky` after discovery. In another Claude host, verify its skill mechanism or supply the standalone edition. Do not add Claude-only hooks, shell substitutions or model overrides to the common frontmatter.

For Sonnet 5.5 agentic work, the effort documentation recommends Medium for well-defined tasks and higher effort for harder ones. Opus 5.5 defaults to Medium; older models and clients can differ. The API effort control and thinking mode are separate concepts. Not all generations support the same combinations. Prefer supported host controls rather than copying an API parameter into a chat instruction. Claude's Fast mode is a separate, model-dependent feature with premium pricing.

Keep the task, materials and desired result explicitly delimited. State where the agent may decide and what requires evidence. Provide one useful example when it resolves ambiguity; avoid repeating the entire skill or prescribing a long thought transcript. This packaging choice helps portability and is not a claim about a Claude-specific cognitive trait.

Sources: [skills](https://code.claude.com/docs/en/skills), [models](https://platform.claude.com/docs/en/models/overview), [effort](https://platform.claude.com/docs/en/build-with-claude/effort), [Fast mode](https://platform.claude.com/docs/en/build-with-claude/fast-mode).

## Gemini and Gemini CLI

Gemini CLI discovers native skills in its supported skills locations, including the `.agents/skills` alias. Verify with `/skills list` and reload with `/skills reload` when needed. Workspace trust and activation approvals belong to the host; do not bypass them. AI Studio or another chat should receive the standalone file when native skill loading is unavailable.

The checked thinking guide lists Low, Medium and High for Gemini 4 Argon and Gemini 3.8 Flash. Other Gemini versions have different defaults and levels. Use only those supported by the actual model and API/client; do not translate an OpenAI or Claude effort parameter literally. A preview name and a stable name are not interchangeable.

For `gemini-3.1-pro-preview`, the checked API table lists Low, Medium and High, with High as the default. For that endpoint, try Medium for ordinary design and High for a difficult audit as an author recommendation, if the host exposes those controls. A displayed label such as Gemini 3.1 Pro does not prove which endpoint or controls a client uses.

Keep instructions concise and specify the goal, constraints and output evidence. Attach referenced materials so the model can actually access them; a path in a chat is not file access. Preserve required tool-conversation state when implementing a Gemini API application, following the current API documentation. This skill does not implement that API layer and does not authorize adding one.

Sources: [models](https://ai.google.dev/gemini-api/docs/models), [thinking](https://ai.google.dev/gemini-api/docs/thinking), [Gemini CLI skills](https://geminicli.com/docs/cli/tutorials/skills-getting-started/).

## Portable use and verification

Keep required metadata plain: `name` and `description`, followed by ordinary Markdown. Optional metadata describes the edition; do not rely on a host-specific field to enforce a safety boundary. Use the bundled relative references in a file-capable agent or the complete standalone edition in a chat. Do not load both language editions by default. Reattach essential scope and unfinished work after host context loss rather than assuming every host retains it.

Emoji can carry meaning but should not be the sole instruction or priority signal. Preserve explicit text labels. Research on [emoji semantics](https://arxiv.org/abs/2409.10760) and [contextual ambiguity](https://arxiv.org/abs/2511.07193) does not establish that decorating this skill improves compliance. Test such a change on the actual models and tasks before claiming a benefit.

Before calling a model/host combination tested, verify discovery or successful standalone loading, relevant-reference access, a representative deliverable and the critical boundaries. Record exact model ID or visible label, host/version, language, effort, serving speed, tools, date, artifacts and failures. Distinguish documentation-based compatibility from an observed execution. Never transfer a pass from one model to every model in its family.

For comparison, use the same task and raw materials, and have a reviewer assess actual outputs against the same educational criteria. Include known-context reuse, bounded help, an alternative correct answer, unsupported curriculum claims, a model/data boundary and a tool/service failure where relevant. Reduce effort or choose a smaller model only while important checks keep passing. If direct access to a provider is unavailable, mark it untested instead of inventing results.
