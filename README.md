# AI Application Builder

An end‑to‑end **AI‑powered application builder** that enables users to design, generate, and manage applications using artificial intelligence. The platform is built with modern web technologies, supports **paid subscriptions**, and enforces **secure authentication, authorization, and role‑based access control (RBAC)**.

---

## 🚀 Features

* **AI‑driven application generation** using Google Gemini
* **Paid subscription system** with secure access control
* **Authentication & Authorization** via Supabase Auth
* **Role‑Based Access Control (RBAC)** for fine‑grained permissions
* **Background jobs & workflows** using Inngest
* **Isolated execution environments** with E2B Sandboxes
* **Scalable database layer** with Prisma + PostgreSQL
* **Modern, responsive UI** using Tailwind CSS & shadcn/ui
* **Type‑safe data fetching & caching** with TanStack Query
* **Routing & navigation** using TanStack Router

---

## 🧱 Tech Stack

### Frontend

* **Next.js** – App Router, Server Components
* **Tailwind CSS** – Utility‑first styling
* **shadcn/ui** – Accessible, reusable UI components
* **TanStack Query** – Server state management
* **TanStack Router** – Type‑safe routing

### Backend & Infrastructure

* **Supabase Auth** – Authentication & user management
* **Prisma ORM** – Type‑safe database access
* **PostgreSQL** – Primary relational database
* **Inngest** – Background jobs, workflows, and event‑driven logic
* **Inngest Agent Kit** – AI‑driven agents & orchestration
* **E2B Sandboxes** – Secure, isolated code execution

### AI

* **Google Gemini AI** – Core AI engine for application generation

---

## 🔐 Authentication & Authorization

* Email/password and OAuth authentication via Supabase
* JWT‑based session handling
* Role‑based access control (e.g. `ADMIN`, `USER`, `PRO`)
* Subscription‑aware feature gating

---

## 💳 Subscriptions

* Paid subscription tiers
* Feature access controlled by user role & plan
* Secure server‑side checks for all protected actions

---

## ⚙️ Background Jobs

Powered by **Inngest**, the platform supports:

* Long‑running AI tasks
* Application build pipelines
* Async workflows and retries
* Event‑driven automation

---

