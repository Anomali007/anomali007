<h1 align="center">Mali Franzese</h1>

<p align="center">
  <b>Founder-Engineer at The MASS Lab</b> · <b>Co-Founder &amp; CTO at Beat The Odds</b> · Texas
</p>

<p align="center">
  I ship production multi-tenant SaaS platforms end to end, solo.<br>
  AI-assisted development is the method. Tests, types and a security pass are the gate.
</p>

<p align="center">
  <a href="https://anomali007.com"><img alt="site: anomali007.com" src="https://img.shields.io/badge/site-anomali007.com-F59E0B?style=flat-square&labelColor=1F2328"></a>
  <a href="https://themasslab.com"><img alt="practice: themasslab.com" src="https://img.shields.io/badge/practice-themasslab.com-F59E0B?style=flat-square&labelColor=1F2328"></a>
  <a href="https://www.linkedin.com/in/malifranzese"><img alt="linkedin: malifranzese" src="https://img.shields.io/badge/linkedin-malifranzese-F59E0B?style=flat-square&labelColor=1F2328"></a>
  <a href="https://huggingface.co/anomali"><img alt="hugging face: anomali" src="https://img.shields.io/badge/%F0%9F%A4%97%20hugging%20face-anomali-F59E0B?style=flat-square&labelColor=1F2328"></a>
  <a href="https://x.com/themasslabdev"><img alt="x: @themasslabdev" src="https://img.shields.io/badge/x-%40themasslabdev-F59E0B?style=flat-square&labelColor=1F2328"></a>
</p>

<p align="center">
  <sub>Shipping production software since 2018 · 3,000+ commits across 20+ active repos</sub>
</p>

## In production

| Product | What it is |
|---|---|
| **MASS Lead Connect** | Multi-tenant AI voice receptionist. Answers, routes and books customer calls, with an auditable record of every interaction.<br><sub>Next.js · SST v3 on AWS · DynamoDB · Cognito · Telnyx · Stripe · WebRTC · agent runtime with human-in-the-loop approvals</sub> |
| **[Beat The Odds](https://btofantasy.us)** | Real-time fantasy sports platform. Web and kiosk experiences, merchandise rewards, responsible-gaming controls, admin dashboards. **Co-Founder &amp; CTO.** Architecture and delivery since 2022.<br><sub>Next.js · AWS · Stripe</sub> |
| **[Token Holder](https://tokenholder.io)** | Identity, permissioning and audit fabric for AI agents. Grant-gated access with cryptographically signed audit trails.<br><sub>Rust core · Tauri desktop · Aurora Serverless v2 · ECS Fargate · per-tenant subdomains</sub> |
| **[yachttransport.ai](https://yachttransport.ai)** | Quoting and booking platform for global yacht shipping. Role-based dashboards, booking workflows, Postgres-backed pricing logic. Won the contract off a voice-AI MVP demo.<br><sub>Next.js · PostgreSQL · Vapi</sub> |
| **[Home Team Education](https://hometeameducation.org/)** | 501(c)(3) nonprofit I co-founded. An AI money mentor that teaches teens financial literacy.<br><sub>Next.js · AI coach · interactive quizzes · donation flows</sub> |
| **[Mecca Gateway](https://meccagateway.com)** | Branded auth, tiered RBAC, 22 transactional email templates, investor dashboard.<br><sub>SST v3 · Cognito · React Email</sub> |
| **[Milestorm.io](https://milestorm.io)** | Supply-chain project management app, designed and launched into private beta.<br><sub>Next.js · multi-tenant auth · milestone tracking</sub> |

## How I ship

One command runs the whole gate. `/ship` takes changed files through tests, lint, and a code-reviewer subagent that checks security, multi-tenant isolation and performance, then fix, commit, push, and a structured PR.

Safety hooks sit underneath it. `pre_bash_guard.py` blocks destructive commands, `post_write_secret_scan.py` catches leaked keys before they land, and formatting runs on every write. Eleven slash commands, six specialized subagents and four hooks, portable across every repo.

GitHub's own contribution graph further down this page is the unedited version.

<details>
<summary><b>Tools I built for my own workflow</b></summary>

<br>

| Tool | What it is |
|---|---|
| **Clawnoly** | Claude Code orchestrator and terminal harness. Tauri v2 desktop app for grouped sessions, MCP-bridged agent coordination, a sideline queue for human decisions, YAML-driven dashboards. |
| **KnowMessenger** | Personal-knowledge workspace. Three panes: vault tree, AI conversation, daily questionnaire, plus paired markdown and HTML dashboards. BYO-key freemium. |
| **[Blah³](https://github.com/Anomali007/local-voice-toolkit)** | Native macOS speech-to-text and text-to-speech, 100% offline on Apple Silicon. Rust and Tauri with CoreML-accelerated Whisper models. My first Rust project. |
| **MergeReel** | GitHub app that turns pull requests into video summaries with Remotion. Stripe billing, org-level repo access. |
| **tml-cli** | Org CLI with security hardening, multi-user profile access control and provisioning commands. |
| **[git-tracker](https://github.com/Anomali007/git-tracker)** | Activity dashboard for commits, PRs, issues and language stats across repos. |

</details>

<details>
<summary><b>Client work</b></summary>

<br>

- **AI voice receptionist** for a dental practice. Vapi plus LLM orchestration for inbound calls. The client reported roughly 50% less live call handling and roughly 30% more bookings.
- **Business sites and booking funnels** shipped in days rather than weeks.

</details>

<details>
<summary><b>Stack</b></summary>

<br>

**Frontend** React, Next.js (App Router and Pages), React Native and Expo, Tailwind CSS
**Backend** Node.js, tRPC, REST and GraphQL, Python, FastAPI, serverless
**Desktop** Tauri v2, Rust, native macOS app packaging
**Cloud and DevOps** AWS (Lambda, ECS Fargate, Aurora, API Gateway, RDS, S3, Cognito, SES, ACM, CloudFront), SST v3, Vercel, GitHub Actions, Docker
**Data** PostgreSQL, DynamoDB, Aurora Serverless v2, Prisma and Drizzle
**AI and automation** Claude Code, Cursor, Bedrock, OpenAI APIs, Vapi, ElevenLabs, Deepgram, MCP
**Security** OAuth2 and OIDC, RBAC, IAM Identity Center, secrets management, threat-aware design, CI quality gates

</details>

## Now

- Building **The MASS Lab**, an independent engineering practice and product studio.
- **Co-Founder & CTO at Beat The Odds**, architecture and delivery, since 2022.
- **B.S. Cybersecurity and Information Assurance at Western Governors University**, in progress.
- Going deeper in **Rust**, across the Token Holder and Clawnoly desktop cores.
- Path so far: one year of electrical engineering at Arizona State, Hack Reactor in 2018, The MASS Lab from 2019, Python APIs on AWS at Inter-Con, then Beat The Odds from 2022.

## About

> Mali Franzese is a founder-engineer at The MASS Lab, an independent software practice in Texas, and co-founder and CTO at Beat The Odds. He ships production multi-tenant SaaS platforms end to end, using AI-assisted development as a core method. He is completing a B.S. in Cybersecurity at Western Governors University.

> [!NOTE]
> Available for platform builds and senior engineering work.
> Reach me through **[anomali007.com](https://anomali007.com)** or **[linkedin.com/in/malifranzese](https://www.linkedin.com/in/malifranzese)**.

<sub><b>A note on the name.</b> "Anomali007" is a handle, a play on Mali, and has been mine for years. It has nothing to do with Anomali Incorporated, the cybersecurity company, and I am not affiliated with them. I am also not related to Michael Franzese or Sonny Franzese, who dominate search results for the surname.</sub>
