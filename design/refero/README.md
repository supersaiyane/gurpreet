# Refero portfolio design exploration

This branch preserves the three original visual directions and now includes the owner-selected B + C working implementation in `dist/`. Main retains the previous portfolio.

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

The A/B/C images remain static design explorations. The selected B + C combination is now implemented in `dist/`, preserving the terminal, architecture insights, exclusive experience accordion, incident lab and project gallery. See `combined-b-c.md` for details. Serve `dist/` to review the working version. The published Sites portfolio and main branch retain the previous design.
