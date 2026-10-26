# Gurpreet Singh — Reliability, by design

A responsive portfolio for SRE, Cloud, DevOps and Platform Engineering leadership. Native HTML, CSS, SVG and JavaScript; no runtime packages or build step.

## Run locally

`npm run dev` serves `dist/` at http://localhost:4173.

`npm test` runs the incident state-machine checks.

## Structure

- `dist/index.html`: portfolio content and semantic interface
- `dist/styles.css`: responsive design and reduced-motion styles
- `dist/app.mjs`: architecture inspector, incident UI, exploration filters
- `dist/incident.mjs`: deterministic simulation state and fictional scenarios
- `.openai/hosting.json`: Sites configuration

Publish `dist/` as a static directory. All asset URLs are relative, including for GitHub Pages project paths. Google Fonts is an optional presentation dependency; system fonts are the fallback.

The incident lab uses fictional signals and deterministic local state. It does not call AI or operate real infrastructure. Career summaries are adapted from https://supersaiyane.github.io/gurpreetsingh/. Project and writing destinations link to existing public profiles rather than inventing project details.
