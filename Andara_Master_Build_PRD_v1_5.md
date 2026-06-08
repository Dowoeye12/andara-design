# ANDARA SYSTEMS — Master Build PRD

**THREE-MILESTONE WORK PLAN**

Client portal · Super admin · Product surfaces · Version 1.0

> *Every feature exists to ship a verdict, a surveillance report, or an intelligence issue — securely, repeatably, with the Scoring Committee in the loop.*

---

| Field | Value |
|---|---|
| Document | Andara Master Build PRD |
| Version | 1.0 |
| Classification | **INTERNAL — RESTRICTED** |
| Issued | May 2026 |
| Timeline | 3 months |
| Owner | Dikko Nwachukwu — CEO · Ben Diagi — CTO |
| Companion | Platform Build Plan v1.0 · Execution Roadmap v1.0 · Financial Model v1.0 |
| Audience | Engineering, Product, Design, CS, Operations, Scoring Committee |
| Phasing | Feature-driven — Milestone 1 (MVP) · Milestone 2 (Scale) · Milestone 3 (Open Platform) |

---

## How This Document Is Structured

- **Section 2** describes the surfaces — Client Portal, Super Admin Console, Andara Internal Workspace — and the role of each.
- **Sections 3, 4, 5** are the three milestones. Each milestone covers every surface end-to-end at its appropriate maturity level.
- **Section 6** maps features to user roles for easy reference.
- **Section 7** lists the cross-milestone build dependencies.

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Surfaces and Product Structure](#2-surfaces-and-product-structure)
3. [Milestone 1 — MVP](#3-milestone-1--mvp)
4. [Milestone 2 — Scale](#4-milestone-2--scale)
5. [Milestone 3 — Open Platform](#5-milestone-3--open-platform)
6. [Feature × Role Reference Matrix](#6-feature--role-reference-matrix)
7. [Cross-Milestone Dependencies](#7-cross-milestone-dependencies)

---

## 1. Introduction

### 1.1 What This Document Is

This document is the master build PRD for the Andara platform, expressed as three feature-driven milestones. It covers every screen, dashboard, and admin surface the team will build — from the institutional client's first login through to the Andara super-admin managing analysts, clients, billing, and the scoring engine itself.

### 1.2 The Three Milestones

| Milestone | Codename | Theme | Definition of Done |
|---|---|---|---|
| Milestone 1 | MVP | Ship the first paid verdict and the first paid surveillance report | Fidelity Bank uses FleetWatch on a single aircraft. First Arbiter verdict shipped to an institutional client. AIR paid tier live. |
| Milestone 2 | Scale | Multi-institution, multi-product, multi-region operating capacity | 10+ institutional clients live across products. Pan-African coverage. AI agent fleet productive. SOC 2 audit underway. |
| Milestone 3 | Open Platform | Andara as live data platform — Enterprise API, Watch Index, Bizjet | Enterprise API consumed by 3+ clients. Watch Index licensed. Bizjet v1.0 shipping on the platform spine. |

### 1.3 Core Surfaces

Three surfaces span the platform. Every feature in this document belongs to one of them.

- **Client Portal** — What institutional clients see: banks, lessors, DFIs. Their fleet, their deliverables, their alerts, their billing.
- **Super Admin Console** — What Andara owners use to run the business: client management, billing oversight, user provisioning, methodology governance, audit, system health.
- **Andara Internal Workspace** — What the Andara team uses to do the work: analysts scoring carriers, field agents capturing visits, editors publishing AIR issues, CS leads managing accounts.

---

## 2. Surfaces and Product Structure

### 2.1 Client Portal — Overview

Single sign-on for institutional clients. Branded subdomain available per client at scale. Each client sees only their commissioned deliverables and subscribed intelligence, never other clients' data.

| Product Surface | What the Client Sees |
|---|---|
| FleetWatch dashboard | Their fleet under surveillance — aircraft list, surveillance status, last visit, next visit, anomalies, alerts, audit trail. |
| Arbiter / Credit Intelligence | Their commissioned verdicts — carrier list, verdict letters, scoring packs, Watch Notes, validity dates, refresh schedule. |
| AIR — Andara Intelligence Report | Their subscription — issue archive, latest issue, seat management, briefing schedule for Expanded and Enterprise tiers. |
| Reports & Downloads | All deliverables Andara has shipped to them — every watermarked PDF, organised and searchable. |
| Alerts & Notifications | AOG-class alerts, verdict changes, Watch Notes, AIR issues, account events. |
| Account & Users | Seat management within their authorised scope, notification preferences, audit access. |

### 2.2 Super Admin Console — Overview

Reserved to Andara owners (CEO, CTO, VP roles, Operations Lead). Controls every Andara client, every Andara user, every deliverable, every billing event, every scoring decision audit. The control plane of the business.

| Super Admin Area | Purpose |
|---|---|
| Client Management | Onboard, configure, suspend, off-board institutional clients. Manage contract scope, SSO, tier. |
| User Management | Andara internal staff and institutional client users. Role assignment, MFA, access review. |
| Product Management — FleetWatch | Operational view across all aircraft under surveillance across all clients. |
| Product Management — Arbiter | Operational view across all scoring files, verdicts, committee submissions. |
| Product Management — AIR | Issue pipeline, subscriber base, distribution health. |
| Billing & Finance | Contract values, invoices, payment status, dunning, revenue attribution. |
| Methodology & Governance | Scoring weights, hard floor settings, threshold management — gated by Scoring Committee. |
| Audit & Compliance | Audit trail across the platform. Security events, access events, deliverable downloads. |
| System Health | Service health, agent invocation metrics, model performance, alerting. |
| AI Agent Console | Per-agent observability — invocations, acceptance rates, cost, drift, version pinning. |

### 2.3 Andara Internal Workspace — Overview

The everyday workspace for Andara employees doing the work. Distinct from Super Admin Console — this is where analysts, agents, editors, and CS leads operate.

| Internal Workspace Area | Primary User |
|---|---|
| Scoring Workspace | Credit Analyst, Senior Aviation Credit Analyst — scores carriers, assembles evidence, submits to committee. |
| Scoring Committee Surface | Committee Chair and members — reviews submissions, records decisions. |
| Field Agent App | Field Intelligence Agent — captures visits offline, syncs documents and photos. |
| Supervisor Review | Senior analyst — reviews field captures, approves visits, escalates anomalies. |
| FleetWatch Operations | VP Operations — oversees surveillance cycle across portfolio. |
| AIR Editorial Workspace | Editor + Analysts — drafts issues through Signal / Capital Read / Andara Analytical View. |
| Pipeline & CRM | BD Lead, VP Commercial — institutional pipeline management. |
| Customer Success Workspace | CS Director, CS Lead — institutional account ownership and QBR management. |

---

## 3. Milestone 1 — MVP

### 3.1 Theme

Ship the first paid verdict and the first paid surveillance report. Build the minimum platform that lets Andara deliver to a real institutional client — with watermarks, audit trail, and the Scoring Committee in the loop. Nothing more. Nothing less.

### 3.2 Milestone 1 — Client Portal

#### 3.2.1 Authentication & Onboarding

| Feature | Description |
|---|---|
| Login screen | Email + password + MFA. SSO available for the first named institutional client (SAML or OIDC). |
| MFA enrolment | TOTP authenticator app enrolment on first login. |
| Password reset | Self-serve reset via email magic link. |
| First-login onboarding tour | Three-screen orientation showing where deliverables live, how alerts work, how to invite seats. |
| Terms acceptance | First-login acceptance of platform terms and confidentiality acknowledgement. |
| Welcome email & getting-started PDF | Issued at provisioning with named CS lead contact. |

#### 3.2.2 Client Portal — Global

| Feature | Description |
|---|---|
| Top navigation | Products (FleetWatch, Arbiter, AIR depending on subscription), Reports, Alerts, Account. |
| Client home / dashboard | Snapshot — recent deliverables, open alerts, upcoming visits or refreshes, AIR issue if subscribed. |
| Profile menu | User profile, notification preferences, sign out. |
| Support entry point | Single 'Contact CS Lead' surface with named contact and SLA reference. |

#### 3.2.3 Client Portal — FleetWatch Dashboard

| Feature | Description |
|---|---|
| Fleet list | Aircraft under surveillance — MSN, type, operator, surveillance state, last visit date, next visit date. |
| Aircraft detail page | Single aircraft view — surveillance contract, latest report, open anomalies, alert history, document index. |
| Latest quarterly report viewer | Watermarked PDF inline preview with download button. |
| Open anomalies list | Anomalies with severity, capture date, source visit, current status. |
| Alert history | All AOG-class alerts on this aircraft with dispatch time and acknowledgement. |
| Document index per aircraft | All FleetWatch deliverables for this aircraft in one place. |

#### 3.2.4 Client Portal — Arbiter / Credit Intelligence

| Feature | Description |
|---|---|
| Verdict list | Carriers the client has commissioned scoring on. Verdict class, validity-until, last refresh date. |
| Carrier verdict page | Single carrier — current verdict letter (watermarked PDF), scoring pack (watermarked), validity, refresh schedule. |
| Watch Note feed | Off-cycle Watch Notes issued against this carrier. |
| Refresh request | Client can request a refresh ahead of expiry — routed to CS lead. |

#### 3.2.5 Client Portal — AIR

| Feature | Description |
|---|---|
| Issue list | All AIR issues available to the subscriber's tier — date, headline, download. |
| Latest issue viewer | Inline PDF preview with tokenised watermark unique to current user. |
| Issue archive (subscriber tier) | Past issues per subscription tier rules. |
| Seat management (subscriber admin) | Standard tier: 5 seats; Expanded: 15 seats; Enterprise: unlimited. Subscriber admin adds and removes named users. |

#### 3.2.6 Client Portal — Reports & Downloads

| Feature | Description |
|---|---|
| Unified deliverables list | Every artefact Andara has shipped to this client across products. |
| Filter and search | By product, by carrier, by aircraft, by date. |
| Watermarked download | Every PDF download is regenerated with the downloading user's token and logged. |
| Audit export | Client security can request a CSV of every access event on their account — routed to CS. |

#### 3.2.7 Client Portal — Alerts & Notifications

| Feature | Description |
|---|---|
| Alerts inbox | AOG alerts, verdict changes, Watch Notes, AIR issues, account events. |
| Email notifications | Per-user email preferences across alert classes. |
| Acknowledgement | AOG alerts require user acknowledgement; acknowledgement logged. |

---

### 3.3 Milestone 1 — Super Admin Console

#### 3.3.1 Super Admin — Authentication

| Feature | Description |
|---|---|
| Super admin login | Restricted login URL. Email + FIDO2 hardware key mandatory. No password-only access. |
| Role-gated entry | Only Andara users with super_admin role can see this surface. |
| Session timeout | Aggressive session timeout (60 min idle); re-auth on sensitive actions. |

#### 3.3.2 Super Admin — Client Management

| Feature | Description |
|---|---|
| Client list | All institutional clients — name, tier, status, products commissioned, primary contact, contract value. |
| Onboard new client | Wizard to provision a new institutional client — entity details, tier, products, contract metadata. |
| Client detail page | Full client record — contracts, users, deliverables shipped, billing, audit access events. |
| Suspend / off-board client | Suspend access pending payment or off-board with audit-trail preservation. |
| Configure subscription scope | What carriers Arbiter covers, which aircraft FleetWatch covers, which AIR tier. |

#### 3.3.3 Super Admin — User Management

| Feature | Description |
|---|---|
| Andara user list | Internal users — name, role, last login, MFA status. |
| Client user list | Per-client institutional users — name, role at client, last login, status. |
| Provision new user | Create user, assign role, set initial password, trigger MFA enrolment. |
| Role assignment matrix | Roles: super_admin, analyst, senior_analyst, committee_member, field_agent, editor, cs_lead, bd_lead, finance, client_admin, client_user. |
| Access review | Quarterly access review surface — confirm every user's role is still appropriate. |
| Suspend / terminate user | Immediate access revocation with audit log. |

#### 3.3.4 Super Admin — Product Management

| Feature | Description |
|---|---|
| FleetWatch — portfolio view | Every aircraft under surveillance across every client — schedule, anomaly state, alert state. |
| FleetWatch — assign field agent | Assign field agent to a scheduled visit; track completion. |
| Arbiter — scoring file list | Every scoring file in progress or completed — carrier, analyst, state (draft / submitted / approved / shipped), validity. |
| Arbiter — committee submission queue | Submissions pending Scoring Committee review. |
| AIR — issue pipeline | Current issue state (drafting / review / publication / delivered) plus past issues. |
| AIR — subscriber list | Every AIR subscriber with tier, seats, expiry. |

#### 3.3.5 Super Admin — Billing & Finance

| Feature | Description |
|---|---|
| Contract register | Every active contract with party, value, term, products, classification. |
| Invoice list | Every invoice — issued, paid, overdue. Manual issue capability. |
| Payment status | Per-invoice payment state with Stripe / Paystack reconciliation. |
| Dunning timeline | Day 1 / 15 / 30 / 60 / 90 escalation per failed payment. |
| Revenue summary | ARR, monthly recognised revenue, by product, by client tier. |

#### 3.3.6 Super Admin — Methodology & Governance *(read-only at M1)*

| Feature | Description |
|---|---|
| Methodology display | Read-only view of current weights (SVS 15, PPS 25, APS 20, RCS 25, RAS 15), hard floor rule, verdict thresholds. |
| Methodology change request | Read-only at M1. Future change request workflow placeholder. |
| Scoring Committee minutes index | Index of recorded committee decisions tied to scoring files. |

#### 3.3.7 Super Admin — Audit & Compliance

| Feature | Description |
|---|---|
| Platform-wide audit log | Every state-changing action — user, action, target, timestamp. Filterable, searchable, exportable. |
| Deliverable download log | Every download with user, IP, watermark token, deliverable ID. |
| Authentication events | Login, MFA, failed attempts, password reset events. |
| Access change events | Role changes, user provision and termination. |

#### 3.3.8 Super Admin — System Health

| Feature | Description |
|---|---|
| Service health board | Each platform service — green/amber/red with last incident timestamp. |
| Background job queues | Document ingestion queue, FleetWatch report generation, AIR delivery, alert dispatch. |
| Incident log | SEV-1 / SEV-2 / SEV-3 incidents with status. |

---

### 3.4 Milestone 1 — Andara Internal Workspace

#### 3.4.1 Internal — Scoring Workspace (Arbiter v1)

| Feature | Description |
|---|---|
| Carrier list | All carriers in scope (Nigerian commercial AOCs at M1) with current verdict state. |
| Carrier detail | Per-carrier history — prior verdicts, evidence corpus, ongoing scoring files. |
| Open scoring file | Create or continue a scoring file for a carrier. |
| Score input panels — SVS | Strategic Value Score — sub-inputs with evidence references. |
| Score input panels — PPS | Payment Priority Score — counterparty intelligence inputs. |
| Score input panels — APS | Airline Performance Score — operational performance inputs. |
| Score input panels — RCS | Risk Containment Score — risk-management posture inputs. |
| Score input panels — RAS | Redeployment Suitability Score — asset and market mobility inputs. |
| Evidence attachment | Per sub-score evidence files, source links, analyst notes. |
| Composite preview | Live composite calculation with hard floor enforcement and verdict class preview. |
| Submit to committee | Package scoring file for committee submission with full audit trail. |
| Watch Note creator | Off-cycle Watch Note tied to a parent scoring file. |

#### 3.4.2 Internal — Scoring Committee Surface

| Feature | Description |
|---|---|
| Committee inbox | Submissions awaiting committee review. |
| Submission viewer | Full scoring file with all sub-scores, evidence, draft verdict, analyst commentary. |
| Decision capture | Approve, return for revision, or reject with rationale. Decision logged with chair signature. |
| Decisions log | Every committee decision recorded immutably. |

#### 3.4.3 Internal — Field Agent App (FleetWatch Capture)

| Feature | Description |
|---|---|
| Agent login | Offline-first authentication via cached credentials. |
| Visit list | Scheduled visits for this agent — aircraft, location, due date. |
| Visit capture flow | Per visit type structured form — record review, ramp inspection, MRO observation. |
| Photo capture | In-app photo capture with auto-orientation. |
| Document scan | Document capture with auto-deskew. |
| Offline persistence | Full visit captured offline; queued for sync. |
| Sync on reconnection | Bundle submitted to FleetWatch intake when device reconnects. |
| Visit history | Past visits this agent has captured. |

#### 3.4.4 Internal — Supervisor Review

| Feature | Description |
|---|---|
| Pending visits queue | Submitted visits awaiting senior analyst review. |
| Visit review surface | Per-visit drill-down — structured form, photos, scans, extracted fields, draft anomalies. |
| Accept / amend / return | Approve and close visit, amend extracted fields, or return to agent with notes. |
| Anomaly classification | Promote a flagged observation to a formal anomaly with severity. |

#### 3.4.5 Internal — FleetWatch Operations

| Feature | Description |
|---|---|
| Surveillance schedule view | All aircraft, all visits, all due dates. |
| Assign visit | Assign or reassign a visit to a field agent. |
| Quarterly report generator | Compose quarterly report from accumulated visits and anomalies; preview before issue. |
| Alert engine console | AOG-class trigger queue; analyst confirms before dispatch. |
| Dispatch alert | Push alert to client portal and email. |

#### 3.4.6 Internal — AIR Editorial Workspace

| Feature | Description |
|---|---|
| Issue list | Past, current, planned issues. |
| Issue draft surface | Section-by-section drafting — Signal / Financial Translation / Capital Action. |
| Signal capture | Add Signals tied to carriers and aircraft. |
| Andara Analytical View labels | Explicit distinction between reported fact and Andara analysis. |
| Review workflow | Analyst → Editor → CEO → Legal sign-off chain. |
| Publish | Generate watermarked PDF and trigger delivery to subscriber list. |

#### 3.4.7 Internal — Pipeline & CRM

| Feature | Description |
|---|---|
| Pipeline list | All institutional accounts with stage (00 Identified → 90 Expanded). |
| Account detail | Notes, contacts, next actions, attached proposals. |
| Proposal upload | Attach commercial documents to an account. |
| Stage transition | Move account between stages with reason. |

#### 3.4.8 Internal — Customer Success Workspace

| Feature | Description |
|---|---|
| My institutional clients | CS lead's portfolio. |
| Client health snapshot | Per-client engagement, payment, deliverables, last QBR. |
| QBR scheduler | Schedule and document QBR meetings. |
| Account note capture | Capture conversation notes against an account. |

---

### 3.5 Milestone 1 — Work Plan

#### 3.5.1 Engineering Tracks

- **Foundation** — Auth, RBAC, canonical entities, audit event store, billing baseline, CI/CD, observability.
- **Client Portal v1** — Login, onboarding, dashboards for FleetWatch / Arbiter / AIR, downloads, alerts.
- **Super Admin v1** — Client management, user management, product operations, billing, audit, system health.
- **Internal Workspace v1** — Scoring Workspace, Committee Surface, Field Agent App, Supervisor Review, FleetWatch Operations, AIR Editorial, Pipeline, CS.
- **Data Infrastructure v1** — Canonical entity model, document ingestion (OCR + classifier + structurer), search baseline, backup.

#### 3.5.2 Sprint Plan

| Sprint | Focus |
|---|---|
| Sprints 1–2 | Foundation — auth, RBAC, canonical entities, audit, CI/CD, observability baseline. |
| Sprints 3–4 | Internal Scoring Workspace; hard floor logic; first analyst can score a carrier. |
| Sprints 5–6 | Field Agent App; document ingestion v1; first field visit captured and ingested. |
| Sprints 7–8 | Client Portal v1 — login, dashboards, watermarking, scoping. First institutional user logs in. |
| Sprints 9–10 | Super Admin v1 — client management, user management, billing. AOG alert engine. First quarterly report shipped. |
| Sprints 11–12 | AIR delivery system, Scoring Committee Surface, hardening. AIR paid tier launched. |

### 3.6 Milestone 1 — Exit Gate

- First commissioned Arbiter verdict issued to an institutional client outside the POC.
- First FleetWatch quarterly report shipped to Fidelity Bank.
- AIR paid tier launched with at least 5 subscribing institutions.
- At least 1 institutional client authenticated through SSO.
- Document ingestion meeting accuracy thresholds (≥95% typed, ≥85% handwritten).
- All Milestone 1 features have a named owner and operational runbook.
- CI/CD operational; SEV-1 runbook rehearsed; restore drill complete.

---

## 4. Milestone 2 — Scale

### 4.1 Theme

Make the platform run reliably and productively across 10+ institutional clients and pan-African coverage. AI Agent Fleet becomes operational. Multi-tenant scoping hardened. SOC 2 audit underway. Surfaces mature from MVP to multi-institution operating capacity.

### 4.2 Milestone 2 — Client Portal Upgrades

#### 4.2.1 Portal Global

| Feature | Description |
|---|---|
| Branded subdomain per client | client.andarasystems.com pattern. Opt-in per client. |
| Full SSO support | SAML 2.0 and OIDC for every institutional client. SCIM provisioning for those who require. |
| Accessibility WCAG 2.1 AA | Full accessibility compliance across the portal. |
| Internationalisation hooks | English and French language scaffold for francophone West Africa. |
| Dark mode option | Per-user preference. |

#### 4.2.2 FleetWatch Dashboard v2

| Feature | Description |
|---|---|
| Portfolio dashboard | Aggregate health across the client's fleet with comparative views. |
| Fleet map | Geographic map of aircraft locations and surveillance status. |
| Anomaly trend view | Trend analysis of anomalies across portfolio. |
| Remote signal feed | ADS-B utilisation, fuel data, regulatory filings, integrated into aircraft view. |
| Counterparty triangulation view | Counterparty-corroborated intelligence on the client's aircraft. |
| Surveillance schedule | Client-side view of upcoming visit cadence. |

#### 4.2.3 Arbiter Dashboard v2

| Feature | Description |
|---|---|
| Carrier portfolio view | Aggregate verdict distribution across the client's commissioned carriers. |
| Refresh schedule view | All upcoming validity expirations and refreshes. |
| Carrier comparison | Side-by-side comparison of carriers in the client's scope. |
| Historical verdict trail | Per-carrier verdict history with reason for change. |

#### 4.2.4 AIR Dashboard v2

| Feature | Description |
|---|---|
| Pan-African content surface | Regional tagging — West, East, Southern, North Africa. |
| French-language issues | Francophone West Africa coverage for Expanded and Enterprise. |
| Subscriber-side seat manager | Standard and Expanded tier subscribers manage seats directly. |
| Briefing scheduler | Quarterly briefing for Expanded; semi-annual for Enterprise. |

#### 4.2.5 Reports & Downloads v2

| Feature | Description |
|---|---|
| Full-text search | Search across the client's deliverable archive. |
| Saved searches | Save queries for reuse. |
| Client security audit self-serve | Client security team self-serves access logs and watermark verification. |
| Bulk download | Bulk download of a filtered set with full watermark trail. |

#### 4.2.6 Alerts v2

| Feature | Description |
|---|---|
| Per-user notification preferences | Granular email/in-portal toggles per alert class. |
| Mobile push notifications | Client portal mobile companion with push for AOG alerts. |
| Webhook subscriptions (preview) | Preview of webhook delivery for Enterprise — preparation for Milestone 3. |

---

### 4.3 Milestone 2 — Super Admin Console Upgrades

#### 4.3.1 Client Management v2

| Feature | Description |
|---|---|
| Multi-region client routing | Route client data to primary region per residency requirements. |
| Custom branding configuration | Per-client portal branding controls. |
| Contract amendment workflow | Mid-term scope changes with approval chain. |
| SCIM provisioning configuration | SCIM endpoint configuration per institutional client. |

#### 4.3.2 User Management v2

| Feature | Description |
|---|---|
| Bulk user operations | CSV import, bulk role updates. |
| FIDO2 enforcement per role | Hard requirement for engineering, finance, super_admin roles. |
| Just-in-time elevation | Time-bound production access elevation with reason and logging. |
| External auditor read-only | Read-only access surface for external compliance auditors. |

#### 4.3.3 Product Management v2

| Feature | Description |
|---|---|
| FleetWatch — pan-portfolio dashboard | Aggregate metrics across all clients and aircraft. |
| Arbiter — committee throughput board | Committee submission velocity, decision latency, backlog. |
| AIR — paid funnel dashboard | Free Volume → paid conversion, paid → Arbiter / FleetWatch conversion. |
| Refresh queue management | Verdicts approaching validity expiry; bulk refresh scheduling. |

#### 4.3.4 Billing v2

| Feature | Description |
|---|---|
| Multi-entity invoicing | Issue from BAC Intelligence LLC or Andara Systems Ltd. based on contract. |
| Multi-currency | USD primary; NGN secondary for relevant invoices. |
| Revenue recognition view | Period-aligned revenue recognition by contract and product. |
| Forecast view | ARR forecast based on contract base plus pipeline. |

#### 4.3.5 Methodology & Governance v2

| Feature | Description |
|---|---|
| Methodology change workflow | Propose-review-approve workflow gated by Scoring Committee. |
| Hard floor configuration | Configure hard floor parameters with committee sign-off audit. |
| Threshold configuration | Verdict class thresholds — committee sign-off required. |
| Methodology version history | Every methodology change versioned and tied to verdicts under that version. |

#### 4.3.6 Audit & Compliance v2

| Feature | Description |
|---|---|
| SOC 2 control evidence collection | Per-control evidence dashboard for audit engagement. |
| DPA addendum register | Per-client DPA addendum tracking. |
| Vendor questionnaire response library | SIG, CAIQ responses on file; per-client custom questionnaires tracked. |
| Quarterly access review surface | Bulk access review with sign-off capture. |

#### 4.3.7 System Health v2

| Feature | Description |
|---|---|
| SLO dashboards | Per-service SLO tracking with error budget. |
| Distributed tracing console | Critical-path tracing — scoring submission, field upload, report generation, AIR delivery. |
| Incident response board | Active incidents, runbook links, comms templates. |
| DR drill scheduler | Restore drill scheduling and history. |

#### 4.3.8 AI Agent Console *(new at M2)*

| Feature | Description |
|---|---|
| Agent inventory | Every production AI agent — owner, model version pin, prompt version pin. |
| Invocation dashboard | Per-agent invocations, latency p50/p95, cost per invocation. |
| Acceptance rate dashboard | Human-acceptance rate per agent over time. |
| Hallucination flag review | Flagged invocations with reviewer note — root-cause workflow. |
| Drift detection | Feature distribution drift and model output drift alerts. |
| Prompt version controls | View versioned prompts and current production pin. |
| Model version controls | View current pinned model versions; rollback button. |
| Quarterly bias review pack | Auto-generated pack for Scoring Committee bias review. |

---

### 4.4 Milestone 2 — Andara Internal Workspace Upgrades

#### 4.4.1 Scoring Workspace v2

| Feature | Description |
|---|---|
| Multi-jurisdiction support | Currency normalisation, jurisdiction-specific evidence categories. |
| AI-drafted commentary | Credit Report Drafting Agent proposes prose; analyst authors. |
| RAG-assisted research | Retrieval-augmented context retrieval inside scoring file. |
| Refresh workflow | Structured workflow for verdicts approaching validity expiry. |
| Counterparty vault access | Restricted vault for counterparty-sourced intelligence. |

#### 4.4.2 Scoring Committee Surface v2

| Feature | Description |
|---|---|
| Batch submission view | Bulk committee review for cohort scoring runs. |
| Throughput metrics | Submissions in flight, average decision latency. |
| Verdict-affecting code change ledger | Engineering changes requiring committee sign-off. |

#### 4.4.3 Field Agent App v2

| Feature | Description |
|---|---|
| Per-visit-type structured forms | Forms per visit type, versioned and field-controlled. |
| AI-assisted visit draft | Field Intelligence Agent drafts visit report after upload. |
| Geolocation tagging | Where permitted, capture geotag with chain-of-custody hash. |
| Field agent training surface | In-app reference, training modules for new agents. |
| Multi-language UI | English + French for francophone agents. |

#### 4.4.4 FleetWatch Operations v2

| Feature | Description |
|---|---|
| Pan-African operations dashboard | Visit completion, agent productivity, geographic coverage. |
| Anomaly classifier review | ML-proposed anomaly severity; analyst confirms. |
| AOG alert v2 | ML-enhanced trigger with analyst confirmation in the loop. |
| Quarterly report generator v2 | Multi-aircraft portfolio reports for institutional clients. |

#### 4.4.5 Market Monitoring Surface *(new at M2)*

| Feature | Description |
|---|---|
| Signal triage queue | Market Monitoring Agent–tagged signals awaiting analyst triage. |
| Per-source ingestion health | Each source adapter — fetch health, signal volume. |
| Severity classifier view | Predicted severity with analyst override. |
| Signal-to-scoring escalation | Promote a signal to verdict-affecting status with committee notification. |

#### 4.4.6 AIR Editorial Workspace v2

| Feature | Description |
|---|---|
| Pan-African issue planning | Region-tagged drafting workflow. |
| French-language pipeline | Translation workflow and francophone editor handoff. |
| Editorial review chain v2 | Analyst → Editor → CEO → Legal with version control. |
| Issue delivery dashboard | Per-subscriber delivery state, tokenisation, access events. |

#### 4.4.7 Commercial Workspace v2

| Feature | Description |
|---|---|
| Pipeline CRM v2 | Full pipeline stages 00 → 90 with conversion analytics. |
| AI-assisted proposal drafting | Commercial Document Drafting Agent drafts; VP Commercial reviews. |
| Pricing modeller surface | Indicative pricing per scope with rationale; CEO approval. |
| Win/loss capture | Structured win/loss reasons feeding back into ICP and methodology. |

#### 4.4.8 Customer Success Workspace v2

| Feature | Description |
|---|---|
| Account health scoring | Per-account engagement, payment, deliverable, expansion, references. |
| QBR pack generator | Auto-assembled QBR pre-read. |
| Renewal pipeline | Pre-renewal scope conversations with status. |
| Churn intervention runbook | Structured intervention workflow for at-risk accounts. |

---

### 4.5 Milestone 2 — Work Plan

| Track | Focus |
|---|---|
| Engineering — Foundation | Multi-tenant scoping hardening, SSO and SCIM, SOC 2 readiness controls, multi-region readiness, observability v2. |
| Engineering — AI Agent Fleet | Field Intelligence Agent, Credit Report Drafting Agent, Market Monitoring Agent, Commercial Drafting Agent, Pricing Modeller; agent observability surface. |
| Engineering — Data | Document ingestion v2 with per-doc-type specialists, embedding index, RAG pipeline, counterparty vault, analytical data warehouse. |
| Client Portal v2 | Branded subdomains, full SSO, accessibility, portfolio dashboards, geographic map, full-text search. |
| Super Admin v2 | Methodology change workflow, AI Agent Console, SOC 2 evidence dashboard, multi-currency billing, SLO dashboards. |
| Internal Workspace v2 | Multi-jurisdiction scoring, AI-assisted drafting across surfaces, market monitoring surface, French-language pipeline. |
| Compliance | SOC 2 Type II audit engagement and evidence collection; vendor questionnaire library; access review automation. |

### 4.6 Milestone 2 — Exit Gate

- Platform serving 10+ institutional clients with no SEV-1 incidents in prior 90 days.
- Pan-African geographic coverage live across all three products.
- AI Agent Fleet operational with measured productivity uplift across all five agents.
- SOC 2 Type II audit underway with report targeted within Milestone 3.
- Document ingestion v2 deployed with per-document-type accuracy metrics.
- Client portal serving institutional clients without daily CS intervention.
- Super Admin Console capable of running the operation entirely from dashboards.

---

## 5. Milestone 3 — Open Platform

### 5.1 Theme

Open Andara as a live data platform. Launch the Enterprise API. Publish the Watch Index. Ship the bizjet vertical on the platform spine. Move core agent fleet onto proprietary Andara LLM stack. Reach the point where Andara is not just delivering reports — it is a continental aviation intelligence platform that institutional capital plugs into.

### 5.2 Milestone 3 — Client Portal Upgrades

#### 5.2.1 Portal Global

| Feature | Description |
|---|---|
| Multi-region active | Production-active secondary region for institutional surfaces. |
| BYOK encryption (Enterprise) | Customer-managed encryption keys for Enterprise tier clients who require. |
| Cryptographically-verifiable audit | Per-client audit export with cryptographic chain verifiable independently. |

#### 5.2.2 Enterprise API Surface (Client-Facing)

| Feature | Description |
|---|---|
| API key & token management | Client generates, rotates, scopes API keys with per-endpoint permissions. |
| API usage dashboard | Real-time API consumption, rate limit headroom, error rate. |
| Webhook configuration | Configure webhook endpoints for AOG alerts, verdict changes, Watch Notes, AIR issues. |
| API documentation viewer | Interactive OpenAPI docs embedded in portal. |
| Signed-payload verification key | Get and rotate webhook signing keys. |

#### 5.2.3 Watch Index Surface (Subscribers)

| Feature | Description |
|---|---|
| Watch Index value display | Current continental index plus regional and segment sub-indices. |
| Historical chart | Time-series view of index with methodology version markers. |
| Methodology paper viewer | Read-only methodology disclosure at appropriate level. |
| Licence management | Watch Index licence terms and permitted use scope. |

#### 5.2.4 Bizjet Surface

| Feature | Description |
|---|---|
| Bizjet operator list | Bizjet operators in scope with current verdict state. |
| Bizjet verdict viewer | Bizjet-tailored verdict letter and scoring pack format. |
| Bizjet FleetWatch | Bizjet surveillance dashboard with bizjet-specific entities. |

#### 5.2.5 FleetWatch v3

| Feature | Description |
|---|---|
| Predictive maintenance signals | ML-derived early warnings on aircraft trajectory. |
| Lease structure overlay | Operating lease, finance lease, sale-leaseback metadata aligned to aircraft. |
| Capital-stack view | For lenders — collateral and lien overlay on aircraft. |

---

### 5.3 Milestone 3 — Super Admin Console Upgrades

#### 5.3.1 Enterprise API Management

| Feature | Description |
|---|---|
| Per-tenant API quota | Set and adjust API rate limits per Enterprise client. |
| Endpoint-level access control | Granular permissions per endpoint per client. |
| API consumption analytics | Per-client API usage; abuse detection. |
| Webhook delivery monitor | Webhook delivery health per client subscription. |
| API version lifecycle | Manage API version deprecation and migration windows. |

#### 5.3.2 Watch Index Management

| Feature | Description |
|---|---|
| Index calculation runs | Per-period calculation history with reproducibility hash. |
| Methodology version control | Bump methodology version with full audit and publication artefacts. |
| Subscriber licence registry | Watch Index licence subscribers and permitted-use scope. |
| Coverage breadth monitor | Ensure index coverage meets publication threshold. |

#### 5.3.3 Bizjet Vertical Management

| Feature | Description |
|---|---|
| Bizjet operator registry | Bizjet operator records distinct from commercial AOCs. |
| Bizjet methodology view | v1.0 weights and thresholds for bizjet operator class. |
| Bizjet committee submission queue | Scoring Committee submissions specific to bizjet. |

#### 5.3.4 Carrier Deployment Network Console

| Feature | Description |
|---|---|
| CDN pilot dashboard | Active matches with status. Pilot scope only. |
| Independence safeguard view | Explicit separation between scoring and matching surfaces. Audit log. |
| Capital provider register | Participating capital providers, their stated mandates. |

#### 5.3.5 AI Agent Console v2

| Feature | Description |
|---|---|
| Proprietary LLM stack health | GPU pool utilisation, inference latency, model version pin. |
| A/B comparison surface | Compare candidate fine-tunes against incumbent before promotion. |
| Per-task quality tracking | Per-agent, per-task quality vs baseline trended over time. |
| Fine-tune pipeline status | Training runs, eval gate status, promotion readiness. |
| Self-evaluation harness view | Per-output confidence signals, citation density, claim support scores. |

#### 5.3.6 Compliance v3

| Feature | Description |
|---|---|
| SOC 2 Type II report distribution | Distribute audit report under NDA to vetted prospects and clients. |
| ISO 27001 readiness tracking | Gap and roadmap dashboard. |
| Bug bounty programme console | Researcher submissions, triage, payout tracking. |
| Bias review pack — comprehensive | Quarterly Scoring Committee bias review pack covering every AI agent. |

#### 5.3.7 Multi-Region Operations

| Feature | Description |
|---|---|
| Failover console | Promote secondary region; observe failover state. |
| Region-level health board | Per-region service health and replication lag. |
| Data residency configuration | Per-client residency posture with audit. |

---

### 5.4 Milestone 3 — Andara Internal Workspace Upgrades

#### 5.4.1 Scoring Workspace v3

| Feature | Description |
|---|---|
| Multi-step research agent | Analyst-driven open research questions answered with planned multi-step retrieval and synthesis. |
| Bizjet scoring extension | Bizjet-tailored sub-score panels and evidence categories. |
| Cross-carrier comparison | Side-by-side composition of carriers across regions. |
| Self-evaluation signal display | Per-paragraph confidence and citation signals on AI-drafted content. |

#### 5.4.2 FleetWatch Operations v3

| Feature | Description |
|---|---|
| Predictive surveillance signals | ML-derived signals proactively suggesting visit cadence adjustments. |
| Bizjet FleetWatch operations | Bizjet aircraft surveillance with bizjet-specific anomaly classes. |
| Capital-stack-aware reporting | Reports tailored for lenders, lessors, equity holders separately. |

#### 5.4.3 AIR Editorial Workspace v3

| Feature | Description |
|---|---|
| Multi-vertical content | AIR coverage extends into bizjet, MRO, ground handling. |
| Watch Index commentary surface | Editorial workspace to author index commentary alongside data. |
| Adjacent-vertical contributors | Bizjet specialist contributors and review. |

#### 5.4.4 Continental Operations

| Feature | Description |
|---|---|
| Regional BD lead consoles | Per-region pipeline and account views. |
| Field network capacity dashboard | Pan-African field network — agent utilisation, training pipeline. |
| Multi-region operations centre | Single pane for active operations across the continent. |

---

### 5.5 Milestone 3 — Work Plan

| Track | Focus |
|---|---|
| Engineering — Platform | Multi-region active, selective service decomposition, BYOK, audit v3, bug bounty programme. |
| Engineering — Enterprise API | API gateway, signal feed, scoring panel, FleetWatch asset endpoints, webhook delivery. |
| Engineering — Watch Index | Composite index engine, sub-indices, methodology publication, subscriber portal. |
| Engineering — Bizjet | Bizjet data model, bizjet anomaly classifier, bizjet methodology instrument, client surface. |
| Engineering — AI v3 | Proprietary Andara LLM stack, domain fine-tunes, multi-step research agent, self-evaluation harness. |
| Compliance | SOC 2 Type II report completion, ISO 27001 readiness, bug bounty programme. |
| Carrier Deployment Network | Controlled pilot with structural independence preserved. |

### 5.6 Milestone 3 — Exit Gate

- Enterprise API live with 3+ paying clients consuming signal and scoring panel endpoints.
- Watch Index published with at least 1 licensing subscriber.
- Bizjet v1.0 shipping with first commissioned verdicts.
- AI agent fleet running on proprietary Andara LLM stack for core data generation.
- SOC 2 Type II report available; ISO 27001 readiness roadmap published.
- Carrier Deployment Network pilot operational with independence preserved.
- Multi-region active with failover tested under load.

---

## 6. Feature × Role Reference Matrix

### 6.1 Role Definitions

| Role | Scope |
|---|---|
| super_admin | Andara owners (CEO, CTO, key VPs). Full platform access including methodology configuration. |
| senior_analyst | Senior Aviation Credit Analyst — owns scoring file quality and committee submission. |
| analyst | Credit Analyst — drafts scoring files. |
| committee_member | Scoring Committee member — reviews submissions, records decisions. |
| field_agent | Field Intelligence Agent — captures visits via field app. |
| editor | AIR Editor — owns editorial pipeline and publication. |
| bd_lead | BD / VP Commercial — pipeline, proposals, contracts. |
| cs_lead | Customer Success Lead / Director — institutional account ownership. |
| operations_lead | VP Operations — surveillance schedule, field network. |
| finance | Finance Lead — billing, invoicing, revenue. |
| client_admin | Institutional client admin — seat management within their scope. |
| client_user | Institutional client named user — consumes deliverables. |
| auditor_readonly | External compliance auditor — read-only audit access during SOC 2 etc. |

### 6.2 Who Sees What (Summary)

| Surface | Roles with Access |
|---|---|
| Client Portal — FleetWatch / Arbiter / AIR / Reports / Alerts / Account | client_admin, client_user |
| Super Admin — Client Management | super_admin, cs_lead (read) |
| Super Admin — User Management | super_admin |
| Super Admin — Product Management | super_admin, operations_lead, editor (AIR sections) |
| Super Admin — Billing & Finance | super_admin, finance |
| Super Admin — Methodology & Governance | super_admin, committee_member (read of methodology versions) |
| Super Admin — Audit & Compliance | super_admin, auditor_readonly |
| Super Admin — System Health | super_admin |
| Super Admin — AI Agent Console | super_admin |
| Internal — Scoring Workspace | analyst, senior_analyst, super_admin |
| Internal — Scoring Committee Surface | committee_member, super_admin |
| Internal — Field Agent App | field_agent |
| Internal — Supervisor Review | senior_analyst, operations_lead |
| Internal — FleetWatch Operations | operations_lead, super_admin |
| Internal — Market Monitoring | senior_analyst, editor, super_admin |
| Internal — AIR Editorial | editor, analyst, senior_analyst, super_admin |
| Internal — Commercial / Pipeline | bd_lead, super_admin |
| Internal — Customer Success Workspace | cs_lead, super_admin |

---

## 7. Cross-Milestone Dependencies

### 7.1 Foundational Components — Built Once, Extended Later

Some features are foundational and must be correct at Milestone 1 because the rest of the platform depends on them. They do not get rebuilt later; they get extended.

- **Authentication, RBAC, and audit event store** — Milestone 1 design carries through all later milestones.
- **Canonical entity model** (Carrier, Aircraft, Lease, ScoringFile, FieldVisit, AIRIssue, Deliverable, Audit, User) — defined Milestone 1; extended in Milestone 3 for bizjet.
- **Hard floor logic and verdict thresholds** — exact same rule across all milestones.
- **Scoring Committee governance pattern** — exact same process across milestones; only throughput tooling scales.
- **Watermarked PDF generation and tokenised delivery** — exact same security model across all milestones.

### 7.2 Sequenced Dependencies

| Dependent Feature | Milestone | Depends On |
|---|---|---|
| AI-assisted commentary in Scoring Workspace | M2 | Embedding index + RAG pipeline (M2 build) |
| AOG alert v2 (ML-enhanced) | M2 | Anomaly classifier model (M2 build) |
| Branded subdomain per client | M2 | Multi-tenant scoping hardening (M2 build) |
| AI Agent Console | M2 | Agent invocation logging contract (M1 build) |
| Methodology change workflow | M2 | Methodology versioning model (M1 build) |
| Enterprise API surface (super admin) | M3 | Multi-tenant scoping hardening (M2) |
| Watch Index publication | M3 | Multi-jurisdiction Arbiter coverage (M2) |
| Bizjet vertical | M3 | Modular scoring engine + canonical data model (M1) |
| BYOK encryption (Enterprise) | M3 | Secrets infrastructure v1 (M1) + multi-region (M3) |
| Carrier Deployment Network | M3 | Independence safeguards documented and enforced (across) |

### 7.3 What Ships First When M1 Is Staged

Within Milestone 1, the order in which features ship is itself sequenced. The internal workspace ships before the client portal because the client portal cannot have content to show until analysts have produced verdicts and field agents have captured visits. The order:

1. Foundation — auth, RBAC, canonical entities, audit, observability.
2. Internal Scoring Workspace + Scoring Committee Surface — analysts can produce verdicts.
3. Field Agent App + Supervisor Review + document ingestion — field captures flow in.
4. FleetWatch Operations + quarterly report generator — deliverables can be produced.
5. Client Portal v1 — login, dashboards, downloads. First institutional user logs in.
6. Super Admin v1 — client management, user management, billing, audit.
7. AIR delivery system — paid tier launched.
8. Hardening, runbooks, restore drill, SEV-1 rehearsal.

### 7.4 Things Deliberately Deferred

To keep Milestone 1 focused, several features are deliberately deferred to later milestones. They are not oversights — they are sequencing decisions.

- **Branded subdomain per client** — deferred to M2 once multi-tenant scoping is hardened.
- **AI agents in production workflows** — deferred to M2 once invocation logging and observability exist.
- **Multi-jurisdiction support** — deferred to M2 once Nigeria coverage is proven.
- **Public API surface for clients** — deferred to M3 once tenant isolation is bulletproof.
- **Watch Index** — deferred to M3 once enough carrier breadth exists to compute.
- **Bizjet vertical** — deferred to M3 once platform spine is stable for transfer-learning.

---

*End of Master Build PRD v1.0 · INTERNAL — RESTRICTED · © Andara Systems*
