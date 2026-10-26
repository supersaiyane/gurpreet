# Gurpreet Singh - Trust is engineered

A responsive portfolio for SRE, Cloud, DevOps and Platform Engineering leadership. Native HTML, CSS, SVG and JavaScript; no runtime packages or build step.

## Run locally

`npm run dev` serves `dist/` at http://localhost:4173.

`npm test` runs the incident state-machine and telemetry replay checks.

## Structure

- `dist/index.html`: portfolio content and semantic interface
- `dist/styles.css`: responsive design and reduced-motion styles
- `dist/app.mjs`: architecture inspector, incident UI, exploration filters
- `dist/incident.mjs`: deterministic simulation state and fictional scenarios
- `.openai/hosting.json`: Sites configuration

Publish `dist/` as a static directory. All asset URLs are relative, including for GitHub Pages project paths. Google Fonts is an optional presentation dependency; system fonts are the fallback.

The incident lab uses fictional signals and deterministic local state. It does not call AI or operate real infrastructure. Career summaries are adapted from https://supersaiyane.github.io/gurpreetsingh/. Project and writing destinations link to existing public profiles rather than inventing project details.


## Interactive experiences

- Selected experience uses a shared native details group, with a toggle fallback: at most one company is open.
- The incident lab offers three fictional scenarios, deterministic replayable metrics/logs/traces, two recovery strategies, and scenario-specific safety feedback.
- Recovery requires a passing simulated dry run and an explicit risk acknowledgement. Changing strategies invalidates earlier checks. Resetting or changing scenarios clears the current decision.
- Completion counts remain in browser memory for this visit only. No visitor analytics or remote AI calls are used.
- The project gallery links to the five owner-supplied projects. Descriptions follow their repository summaries; experience tags follow the supplied resume. The resume itself is not published.

## Hero terminal

The hero includes a local portfolio terminal inspired by the original website. Type `help` for identity, skills, projects, biography and navigation commands. Arrow keys browse a bounded session history; Tab completes a unique prefix and then lets focus move normally. `clear` clears the transcript. Commands never execute shell code or send input to a server; output is rendered as plain text.


## Selected B + C version

This design branch implements the approved combination: C's leadership narrative and serif display with B's interactive architecture flow. `dist/hybrid.css` carries the reference-locked visual system. The diagram becomes a vertical flow on mobile, with dismissible insights. The existing terminal, incident workbench, project links and accordion continue to work.

`main` and the existing Sites publication preserve the previous portfolio. To preview this branch separately, run `python3 -m http.server 4175 --directory dist` and open http://localhost:4175/.
