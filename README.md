# AssistIQ — AICTE Approval Portal

**Runner-up, Smart India Hackathon 2023 (national level)**  
Team FusionX · Problem statement by AICTE

Live: [assistiq-blush.vercel.app](https://assistiq-blush.vercel.app)

---

## What it does

Engineering colleges in India apply for new course approvals through AICTE's Approval Process Handbook — a dense, frequently-updated document that most institutes struggle to interpret correctly. Mistakes mean rejection, delays, and rework.

AssistIQ is a web portal that makes the approval process navigable:

- **Chanakya** — an AI chatbot (Botpress) trained on the AICTE APH. Answers questions about eligibility criteria, fee structures, required documents, and timelines in plain language.
- **Application form** — dynamic form that generates the correct documentation checklist based on course type and intake size.
- **Statement generator** — produces compliant supporting statements from structured inputs.
- **Dashboard** — tracks application state and outstanding items.

The goal: reduce rejections caused by misunderstood requirements and cut the time institutes spend parsing 200-page government handbooks.

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React, Vite |
| Backend / BaaS | Firebase |
| Chatbot | Botpress Cloud (v1 webchat) |
| 3D visuals | Three.js |
| Deployment | Vercel |

---

## Team

- Abhishek Sharma
- Sankalp Srivastava
- Anshu Kumar
- Arham Hayat
- Priyanka Lashkari
- Mst Shahria Jerin Sinthia

---

## Run locally

```bash
npm install
npm run dev
```

Requires a Firebase project config in `src/firebase.js`. The Botpress chatbot is hosted externally and works without any local config.

---

## Context

Built for SIH 2023 under problem statement PS1583 (AICTE). The hackathon ran over 36 hours; we placed runner-up at the national finals.
