# Usage and installation

## Select the right entry point

Use the skill for a new educational application, a substantive change to its learning design or a review of that design. A cosmetic edit or ordinary bug fix does not require a teaching redesign.

Provide the learners, goal, context and practical constraints you know. The agent should use existing information and ask only for material gaps. It should not repeat a fixed audience-and-tone interview or request approval for routine design choices already covered by your brief.

## Installation via skills.sh CLI

The recommended way to install and manage the skill across 20+ coding agents (including Claude Code, Cursor, Codex, Antigravity, OpenCode, Cline, Windsurf) is using the `skills` CLI:

```bash
# Install to current project
npx skills add siberius/learning-methodologies

# Install globally across all projects
npx skills add siberius/learning-methodologies -g

# Target a specific assistant (e.g. Claude Code or Cursor)
npx skills add siberius/learning-methodologies -a claude-code
```

## Native skill bundle

Keep `SKILL.md`, `LICENSE` and `references/` in the same skill directory, normally named `learning-methodologies`. Use your client's supported skill installation mechanism. The presence of a Markdown file somewhere on disk does not itself guarantee automatic discovery.

For clients using `~/.agents/skills`, one possible destination is:

```text
~/.agents/skills/learning-methodologies/
  SKILL.md
  references/
  LICENSE
```

For Claude Code, the equivalent directory is commonly `~/.claude/skills/learning-methodologies/`. Preserve existing user files; inspect conflicts before installing. Confirm discovery in the actual client. Do not treat installation as proof that an agent used the skill.

## Standalone Markdown

Give an instruction-capable agent the generated `learning-methodologies.md` and explicitly ask it to use that file for the task. It includes the conditional references as embedded sections and has no relative-file dependencies. This route loads more text up front but needs only one instruction file.

Model names are not installation mechanisms. Compatibility depends on the host application's ability to load and follow Markdown instructions, its tools and its permissions.

## Work according to need

| Need | Relevant guidance |
|---|---|
| Tutor modes, resumable learning and checkpoints | `references/tutor-state.md` |
| Why a method fits and how it changes app behavior | `references/didactic-rationale.md` |
| Overall design, review or scope | Core in `SKILL.md` |
| Ambiguous help, alternative answers or curriculum claims | `references/decision-examples.md` |
| Method selection, help or progression | `references/methods.md` |
| Scoring, rubrics, adaptivity or learning evidence | `references/assessment.md` |
| Scientific model, experiment or role-play | `references/simulations.md` |
| AI service in the finished app | `references/runtime-ai.md` |
| Model, reasoning effort, speed or client adaptation | `references/model-profiles.md` |

Do not load every reference automatically in native mode. An offline quiz can provide feedback and hints without runtime AI. A teacher demonstration may need discussion prompts rather than individual records. Use one or several perspectives according to the task, without automatically launching multiple agents.

## Maintain the editions

The authoring sources are `SKILL.md` and its conditional references. The standalone file is a generated distribution artifact. In the maintainer checkout, rebuild it with:

```sh
python3 testing/build_portable.py
python3 testing/build_portable.py --check
python3 testing/build_portable.py --edition all --check
```

The builder lives in local, ignored development tooling. Distributed users can use either finished edition without running it. It embeds references with unique anchors so repeated headings remain unambiguous.

Keep README and teacher examples consistent with the core. Preserve author, version, provenance and MIT licensing. For another agent, register the maintained bundle instead of creating a separate editable copy. The [Czech edition](../cs/README.md) preserves the shared principles and adds conditional local guidance. Build it with `--edition cs`, or build all four editions with `--edition all`. Check the implications for all four editions when changing a shared principle; do not automatically impose Czech curriculum requirements on international projects.

## Review a result

Check the intended learner action and evidence, subject correctness, feedback, help, accessibility and operating constraints relevant to your app. Distinguish technical behavior, didactic suitability and actual learning outcomes. State what was checked and what remains unknown.

The published [eight-task model evaluation protocol](MODEL-EVALUATION.md) provides comparable tasks and evaluator criteria. Keep those criteria out of the tested model's input. The suite is prepared, not executed; earlier exploratory runs do not establish cross-provider reliability. Report only evaluations actually run, separating initial outputs from repairs.

Choose by task complexity before a model name. If a meaningful criterion still fails after a focused repair, follow the escalation and stopping rules in the model reference. Missing sources or tools are not repaired by raising effort. Standard serving speed is the starting point; paid acceleration is a separate authorized choice.

The Russian package is `ru/` (ID `metodiki-obucheniya`); the Spanish package is `es/` (ID `metodologias-de-aprendizaje`). Use `--edition ru` or `--edition es` for a single export. Choose the relevant language rather than loading parallel translations together. Translation is not country-specific curriculum adaptation.
