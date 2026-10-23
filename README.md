# Singularity DSA

Learn programming, data structures, and algorithms from first principles through interactive challenges.

Part of the Singularity Machines application suite.

## Engineering Principles

**Maximum Control, Minimum Abstraction.**

**Implement only what is demonstrably necessary.**

Every component must address an identified requirement. No speculative architecture.

## Current Implementation

- Native HTML: public/index.html
- Cloudflare Workers static assets: wrangler.jsonc
- Source of truth: GitHub main
- Production: https://dsa.singularitymachines.si
- Fallback: https://singularitydsa.attentionagentauto.workers.dev

No application framework, backend, or database is currently required.

## Deployment

1. Update files through GitHub web or API; no local Git required.
2. Commit to main.
3. Cloudflare automatically deploys using npx wrangler deploy.
4. Confirm successful deployment in the Cloudflare dashboard.
5. Verify production HTTPS using curl -I https://dsa.singularitymachines.si/

## Engineering Governance

Foundation and verification: https://github.com/ThirDecade2020/SingularityDSA/issues/1

Validated practices may contribute to the Singularity Engineering Template (SET).
