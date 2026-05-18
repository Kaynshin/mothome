# Git workflow — MANDATORY

**Branche principale de ce projet : `refonte`** (pas `main`). `main` reste figé sur l'ancienne version jusqu'au cutover final.

Avant toute opération Git (commit, branche, PR, merge), invoquer le skill `git-workflow-refonte`. Règles dures :

- Jamais de commit direct sur `refonte` — toujours créer une feature branch (`feat/<slug>`, `fix/<slug>`, `chore/<slug>`).
- Toute PR cible `refonte` (`--base refonte`), jamais `main`.
- Intégration via **Rebase and merge** uniquement — pas de merge commit dans `refonte`.

# gstack

Use the `/browse` skill from gstack for all web browsing. Never use `mcp__claude-in-chrome__*` tools directly.

Available gstack skills:
`/office-hours`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/design-consultation`, `/design-shotgun`, `/design-html`, `/review`, `/ship`, `/land-and-deploy`, `/canary`, `/benchmark`, `/browse`, `/connect-chrome`, `/qa`, `/qa-only`, `/design-review`, `/setup-browser-cookies`, `/setup-deploy`, `/setup-gbrain`, `/retro`, `/investigate`, `/document-release`, `/document-generate`, `/codex`, `/cso`, `/autoplan`, `/plan-devex-review`, `/devex-review`, `/careful`, `/freeze`, `/guard`, `/unfreeze`, `/gstack-upgrade`, `/learn`
