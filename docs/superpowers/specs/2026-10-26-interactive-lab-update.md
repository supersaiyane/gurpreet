# Portfolio project gallery and incident workbench

User-requested update: add the five supplied projects with direct links, use the supplied resume for stronger company tags, allow only one experience accordion open, remove em dashes, and make the incident lab more interactive.

Implemented approach: retain the approved visual system. Add a deterministic evidence replay (metrics, logs and traces), bounded versus broad recovery strategies, simulated dry-run outcomes, explicit risk acknowledgement, a decision debrief and a next-scenario prompt. Keep all simulation clearly labelled and local. The owner requested LinkedIn as the authority for dates, rather than the older resume. Public LinkedIn search confirms the Senior Staff SRE role but does not expose employment dates; preserve existing portfolio dates rather than claiming unverified LinkedIn dates. Do not publish the resume or private contact fields from it.

Verification: Node tests cover all scenario safety paths, invalidation on strategy change, scenario/reset isolation, acknowledgement revocation and bounded telemetry replay. Browser checks cover blocked and successful recovery, next-scenario progression, exclusive details, multi-category filtering, direct URLs and narrow-screen layout.
