# Refero portfolio design exploration

This branch preserves three proposed visual directions alongside the current working portfolio. The production files in `dist/` are unchanged from `main`.

## Compare the concepts

Open `portfolio-designs.html` in a browser. It includes a tabbed comparison of:

- A: Engineering OS (recommended)
- B: Systems Blueprint
- C: Leadership in Practice

Alternatively, serve this directory from the repository root:

```sh
python3 -m http.server 4174 --directory design/refero
```

Then open http://localhost:4174/portfolio-designs.html.

Read `portfolio-design-references.md` for the references, design decisions, content constraints and proposed implementation direction.

These are static design mockups with an interactive comparison interface. They are not three implemented portfolio versions. Choose a visual direction before changing production source. Main and the published Sites portfolio retain the working terminal, architecture explorer, projects and incident lab.
