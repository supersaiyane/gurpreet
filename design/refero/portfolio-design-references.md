# Portfolio landing page design study

Designed for Gurpreet Singh: an engineering leader in SRE, Cloud, DevOps, Platform Engineering and AI-assisted operations. The audience should understand the leadership proposition, inspect real engineering work, explore the interactive experiences and start a conversation.

These are visual concepts for selection, not changes to the published website. Refero's live MCP search was unavailable. Research used the Refero design skill and bundled typography/visual-craft references, plus direct visual inspection of the three live websites below on 26 October 2026.

## Visual references

- [Linear](https://linear.app/): near-black canvas, large left-aligned sans-serif display, clear product statement and a wide interactive product surface beneath it. Adapt the hierarchy and proof-first sequencing, not its branding or product content.
- [Vercel](https://vercel.com/): architectural central composition with separated statement and supporting details. Adapt composition and fine structural rules. The user's established black canvas overrides Vercel's currently light canvas; Vercel does not supply the portfolio palette.
- [Resend](https://resend.com/): a high-contrast black canvas, full-serif display headings and a concise introduction paired with distinctive hero media. Adapt type hierarchy and section rhythm. Its image-led hero is deliberately replaced with the owner's existing functional terminal, not a fabricated 3D asset.

## A / Engineering OS - recommended

Primary reference: Linear. Preserve the black canvas, confident sans-serif headline, strong identity and a broad, single interactive workspace. Borrow only structural rules from Vercel. Keep the existing cyan identity for actions and active states; reserve amber for simulation warnings.

Hero: Gurpreet Singh, followed by "Reliability at scale. Leadership with intent." The system map, terminal and incident lab become tabs inside one workspace. This avoids three separate visual elements competing for attention. Follow with company names, selected projects, leadership experience, principles and contact.

Media: code-native interactive portfolio UI. No invented portrait, customer screenshot or production metric. The future implementation should reuse the existing terminal, lab state machine and project links.

Tradeoff: this changes the current serif-led identity and makes the portfolio feel more like a focused engineering product.

## B / Systems Blueprint

Primary structural reference: Vercel. Preserve the precise grid, architectural centerpiece and distinct statement/details zones. The user's existing dark palette supplies color; Refero craft guidance supplies readable type and spacing. Keep a compact terminal strip below the map and clear actions into projects and the lab.

Hero: "Engineering what holds." The architecture becomes the main visual evidence. Each layer reveals the corresponding engineering decisions. Follow with three operating principles and a numbered project index.

Media: editable, accessible architecture diagram with simplified mobile exploration. Avoid a decorative circuit-board backdrop and an unreadably dense mobile diagram.

Tradeoff: strongest for technical peers, but requires more interpretation from a nontechnical hiring audience.

## C / Leadership in Practice

Primary reference: Resend. Preserve the black canvas, confident full-serif display and asymmetric hero. Borrow only Linear's evidence-first sequence. Keep syntax colors inside the terminal and cyan for actions; omit reference-specific cube imagery and corporate graphic logos.

Hero: "Trust is engineered." Lead with the engineering-leadership proposition and use the existing terminal as the main media. Follow with concise company case studies, a clear invitation into the incident simulation, selected projects and contact.

Tradeoff: closest to the current portfolio and strongest for executive positioning; less visibly novel than A or B.

## Decision ledger

| Decision | Source | Role / constraint | Reason |
| --- | --- | --- | --- |
| Keep black canvas | User's approved portfolio | Brand canvas | Preserve the established preference |
| Readable body text, restrained metadata | Refero typography craft | Content hierarchy | Fix the earlier small-type problem |
| One tabbed interactive workspace in A | Linear's broad product surface + existing portfolio features | Product demonstration | Reduce competition between terminal, diagram and lab |
| Architecture as centerpiece in B | Vercel structural composition | Layout only | Let engineering decisions carry the visual identity |
| Full-serif heading system in C | Resend visual reference | Display typography | Retain the owner's existing voice while clarifying leadership |
| Real project destinations | User-provided projects and repository summaries | Evidence and navigation | Keep the experience grounded in delivered work |
| No default insight caption beside terminal | User feedback | Interaction behavior | Show context only after explicit selection |
| No em dashes | User preference | All authored website copy | Preserve the requested punctuation style |
| No invented portrait | User provided no approved portrait | Identity | Use typography until an actual photograph is supplied |

## Production content lock

Any selected direction will use the verified project descriptions below, regardless of text drift in an image mockup:

- Keel: AI SRE platform for incident detection, AI-assisted root-cause analysis, SLO dashboards and coordinated response.
- auto-agent-k8s: Kubernetes remediation with scoped actions, dry-run defaults and approval gates.
- Loop Engineering: role selection, quality gates and memory for AI engineering workflows.
- Smart LLM Gateway: Ollama inference routing with load balancing, circuit breakers, self-healing and adaptive traffic shifting.
- Engineering Blueprints: an engineering learning portal spanning the path from junior engineer to architect.

Preserve the current Senior Staff SRE title and existing portfolio dates. The public LinkedIn view did not expose employment dates. Do not substitute dates from the older resume.

## Visual targets and handoff

A, B and C are independent visual explorations produced with built-in image generation. No production source was changed. Select one direction before implementation. Future QA should compare against the selected concept at desktop and mobile sizes, preserving the selected canvas, display type, density, media role and interaction priorities.

## Generation brief

A: a Linear-informed black, sans-serif portfolio with a clear engineering-leadership statement and one wide system-map / terminal / incident-lab workspace. No portrait; text-only company names; verified project descriptions.

B: a Vercel-informed structural composition on the user's black canvas, with a dominant architecture blueprint, compact terminal and linked project index. Verified project descriptions; no decorative images or fake metrics.

C: a Resend-informed black/serif portfolio with a terminal-led hero, company case studies, incident simulation invitation and verified project footer. No corporate graphic tiles or invented portrait; normal hyphens.
