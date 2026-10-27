# Singularity DSA

Learn programming, data structures, and algorithms from first principles.

**Production:** https://dsa.singularitymachines.si

A Singularity Machines application and a working implementation of the
**Singularity Engineering Template (SET)**.

**Maximum Control. Minimum Abstraction.**

## Mission

Develop exceptional engineers through progressive, interactive learning,
beginning with the smallest meaningful programming challenges.

## Production Architecture

| Component | Implementation |
|---|---|
| Interface | Native HTML, CSS, JavaScript |
| Backend | Cloudflare Worker |
| Hosting | Cloudflare Workers static assets |
| AI Tutor | Cloudflare Workers AI, Qwen3-30B-A3B |
| API | POST /api/tutor |
| Rate limiting | 10 requests per 60 seconds per visitor key |
| Source of truth | GitHub main |
| Deployment | Wrangler CLI |

The application avoids unnecessary frameworks, databases, and infrastructure.

## MVP 001 — Progress

- [x] Five atomic Python programming challenges
- [x] Ten-step DSA Deep Knowledge methodology
- [x] Interactive code editor and basic feedback
- [x] Timed and untimed learning controls
- [x] Challenge navigation
- [x] Singularity Machines visual interface
- [x] AI Tutor integration
- [x] Production deployment
- [x] Live production AI inference verification
- [x] Production security-header verification
- [ ] Complete browser acceptance testing
- [ ] Expanded challenge library
- [ ] Persistent learner progress

Implemented features are not necessarily comprehensively validated.

## Production Security

- Content Security Policy restricting external scripts and connections
- 8,192-byte maximum API request body
- Explanation input validation
- Rate limiting before AI inference
- Same-origin API communication
- Safe text rendering of AI responses

Request-size rejection and rate limiting were tested locally.
The production website, security headers, and AI inference were verified live.

## SET — Singularity Engineering Template

SET is a reusable engineering system developed through real software
construction, testing, deployment, and documentation.

SET transforms practical engineering experience into repeatable workflows
that can be applied across Singularity Machines projects.

Each SET agent represents an engineering discipline with a defined scope,
procedure, checklist, and verification criteria.

An agent is not necessarily an autonomous AI process. Automation is
introduced only when it provides demonstrated value.

### Principles

1. Maximum Control. Minimum Abstraction.
2. Implement only what is demonstrably necessary.
3. Prefer native capabilities and inspectable source.
4. Make small, controlled changes.
5. Verify actual behavior before claiming completion.
6. Keep infrastructure and deployment explicit.
7. Document verified results for reuse.

## SET Engineering Agent Registry

| Issue | Agent |
|---|---|
| [#2](https://github.com/ThirDecade2020/SingularityDSA/issues/2) | Singularity Code Construction |
| [#3](https://github.com/ThirDecade2020/SingularityDSA/issues/3) | Singularity Issue Architect |
| [#4](https://github.com/ThirDecade2020/SingularityDSA/issues/4) | Singularity Audit |
| [#5](https://github.com/ThirDecade2020/SingularityDSA/issues/5) | Singularity Distribution |
| [#6](https://github.com/ThirDecade2020/SingularityDSA/issues/6) | Singularity Domain Registration |
| [#7](https://github.com/ThirDecade2020/SingularityDSA/issues/7) | Singularity Intelligence Integration |
| [#8](https://github.com/ThirDecade2020/SingularityDSA/issues/8) | Singularity Learning Architect |
| [#9](https://github.com/ThirDecade2020/SingularityDSA/issues/9) | Singularity Interview Simulator |
| [#10](https://github.com/ThirDecade2020/SingularityDSA/issues/10) | Singularity Verification |
| [#11](https://github.com/ThirDecade2020/SingularityDSA/issues/11) | Singularity Interface Construction |
| [#12](https://github.com/ThirDecade2020/SingularityDSA/issues/12) | Singularity IP Registry |
| [#13](https://github.com/ThirDecade2020/SingularityDSA/issues/13) | Singularity Tutor |

| [#15](https://github.com/ThirDecade2020/SingularityDSA/issues/15) | Singularity Documentation Implementation |

**Central registry:** [SET Engineering Toolkit #14](https://github.com/ThirDecade2020/SingularityDSA/issues/14)

Registration does not imply that every agent is fully implemented or automated.

## SET in Practice

Singularity DSA is where SET is actively applied, tested, and refined.

**Requirement → Inspection → Minimal Change → Local Verification →
Production Deployment → Production Verification → Documentation**

Our AI Tutor implementation demonstrates this process:

- **Code Construction (#2):** Built the application and Worker backend.
- **Intelligence Integration (#7):** Integrated Qwen3 through Workers AI.
- **Verification (#10):** Tested syntax, inference, input limits, and rate limiting.
- **Distribution (#5):** Deployed and verified the production application.
- **Interface Construction (#11):** Built the interactive learning environment.

This is an operational engineering workflow, not merely a proposed framework.

## Development and Deployment

Development uses Bash, direct source inspection, GitHub web/API, and
Cloudflare Wrangler. Local Git commands are not required.

Local development:

    npx wrangler dev --port 8787

Worker syntax validation:

    node --check src/worker.js

Deployment inspection:

    npx wrangler deploy --dry-run

Intentional production deployment:

    npx wrangler deploy

Production verification:

    curl -sSI https://dsa.singularitymachines.si

Local deployments and GitHub updates are separate operations.
Keeping them synchronized is an explicit engineering responsibility.

## SET Agent Maturity and Selection

**Canonical registry:** [SET Issue #14](https://github.com/ThirDecade2020/SingularityDSA/issues/14)

SET currently registers 13 engineering agents.

- **Concept:** Responsibilities and workflow defined.
- **Implemented:** Workflow applied to a real engineering task.
- **Verified:** Implementation independently validated with evidence.

Each project selects only the agents it requires and references their
canonical definitions rather than duplicating them.

## SET Release Documentation Contract

**Responsible agent:** [Singularity Documentation Implementation — SET (#15)](https://github.com/ThirDecade2020/SingularityDSA/issues/15)

A release is complete only after:

1. Source changes are implemented and verified.
2. Verified source is published to GitHub.
3. Production deployment and functionality are confirmed.
4. Relevant engineering issues and milestones are updated.
5. The README reflects the verified release.
6. Source, production, issues, and README are reconciled.
7. Commit SHAs, deployment evidence, and completion status are recorded.

Preserve recoverable backups, use guarded modifications, verify GitHub
SHAs, and document rollback considerations.

A successful deployment alone does not constitute a completed release.

## Engineering Governance

GitHub Issues document objectives, procedures, acceptance criteria,
limitations, and verified engineering outcomes.

**Singularity DSA provides the implementation.
SET captures the reusable engineering knowledge.**

- [Foundation #1](https://github.com/ThirDecade2020/SingularityDSA/issues/1)
- [SET Registry #14](https://github.com/ThirDecade2020/SingularityDSA/issues/14)
- [Singularity Machines](https://singularitymachines.si)

**Maximum Control. Minimum Abstraction.**
