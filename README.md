# CodeFlowChart HEFAISTOS

[Česky](README.cs.md)

An offline flowchart editor and simulator for introductory algorithms. Build blocks and connections, run or step through a program, inspect variables in Visual RAM and verify missions with test cases.

The service ship HEFAISTOS and robot ŠROUB guide 14 missions: eight for the Czech H vocational profile and six for the E/J support profile. Five SPACE workspaces support free experimentation. These curriculum profiles retain their Czech meanings in the English interface.

## Run

Open `index.html` directly, or serve the project folder:

```sh
python3 -m http.server 8139 --bind 127.0.0.1
```

Open [localhost:8139](http://localhost:8139/). No build, backend or dependencies are required. Installation and service-worker caching require HTTPS or localhost. Fonts are embedded in the HTML, so no Google Fonts request is needed. An isolated HTML copy has inline icon and manifest fallbacks.

## Languages

A Czech primary browser language selects Czech; other browser languages select English. This does not use location. CS/EN saves a manual preference locally. Switching preserves blocks, connections, variables, workspace, progress and camera.

Interface labels, mission briefs, hints, diagnostics and certificate captions are translated. Built-in start/end captions, descriptive action labels and explanatory notes also have translated display labels. Their original source text remains in the saved program. User-authored block text, variable names, string literals and program output retain their exact content. Editing a built-in caption disables its automatic display translation. Existing Czech sample programs and their code comments are kept so execution and JSON compatibility remain stable. English missions use the same original test vectors and thresholds.

## Install and use offline

Choose **Add to home screen** in the menu. Supported browsers provide a native installation prompt. Other browsers receive manual instructions.

- iPhone/iPad: Safari → Share → Add to Home Screen; keep Open as Web App enabled when offered
- Android: browser menu → Install app / Add to Home Screen
- macOS Safari: File → Add to Dock

Wait for **Ready offline** before disconnecting. Browsers may evict cached files. Icons include a 180 px Apple touch icon, 192/512 px PNGs, an Android maskable variant and editable SVG sources. Physical-device installation remains a manual check.

## Data and exports

Workspaces, progress and the optional student name are stored locally in the browser. Desktop data expires after 90 minutes of inactivity; mobile/tablet data is cleared manually using RESET. Save a JSON export to keep a portable copy. Browser storage is not a substitute for a backup.

JSON exports preserve all missions, SPACE workspaces, active context, optional name and save time. Import restores the snapshot. SVG diagram export preserves the program's text; certificate captions follow the interface language. Certificates with a supplied name contain that name. The local game is inspectable and is not a secured examination system.

There is no telemetry or remote API. The service worker caches only a fixed list of application files, not browser-storage data or generated exports. Author links open only when selected. Fictional CNC/production tasks illustrate algorithms, not machine-operation instructions.

## Documentation

- [Verification and limitations](docs/VERIFICATION.md)
- [Changelog](CHANGELOG.md)
- `PLAN.md` and `codeflowchart.pdf`: original Czech project documents, retained for reference

## License and author

MIT, copyright © 2026 Luděk Sušický. See [LICENSE](LICENSE). Embedded JetBrains Mono and Syne fonts retain their SIL Open Font License notices in [licenses/](licenses/).

Luděk Sušický: biologist and secondary-school and university teacher of computing subjects

Generative AI tools were used during development. The educational content, its revisions and responsibility for the final application lie with the author.

[GitHub repository](https://github.com/siberius/code-flowchart)
