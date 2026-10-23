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

## Singularity DSA — MVP 001

**Mission:** Develop exceptional engineers through programming, data structures, and algorithms from first principles.

### Initial Features

- [ ] Five atomic Python programming challenges
- [ ] Proprietary ten-step DSA Deep Knowledge methodology
- [ ] Interactive code editor and learning feedback
- [ ] 15-minute Easy timer with untimed option
- [ ] Challenge navigation and progress tracking
- [ ] Responsive Singularity Machines visual design

### Engineering Philosophy

- Maximum Control, Minimum Abstraction.
- Implement only what is demonstrably necessary.
- Native-first development with minimal dependencies.
- Engineering excellence includes exceptional interface design.

### Engineering Knowledge

- **SER:** Singularity Engineering Registry — planned index of engineering initiatives and verified lessons.
- **SET:** Singularity Engineering Template — reusable practices derived from verified engineering work.
- **Singularity DSA:** Applies lessons from previous Singularity Machines products.

### Development Priorities

1. Build the functional MVP.
2. Verify the five learning challenges.
3. Release the public application.
4. Audit and optimize based on actual requirements.
