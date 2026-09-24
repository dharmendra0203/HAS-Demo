# Project Plan

**Status**: Approved
**Created**: 2026-09-24
**Mode**: NEW

---

## 1. Project Overview

**Goal**: Build a small, independently testable follow-relationship demo with a Node.js Express API, in-memory state, and a vanilla browser UI for discovering people and changing follow relationships. The project is designed so that every module is independently testable.

**App Type**: Static + API

**API Login**: No

**Mode**: NEW

**Deployment Plan**: No deployment plan found

---

## 2. Backend — Express API

| Component | Technology |
|-----------|-----------|
| **Language** | JavaScript |
| **Runtime** | Node |
| **Package Manager** | npm |
| **Test Runner** | jest |
| **Mocking Library** | jest.mock |
| **Test Command** | npm test |
| **Orchestration** | docker-compose |

The backend owns the in-memory user and follow-relationship model, validates route input, returns JSON responses, and serves the static browser assets from the same Express process.

## 3. Frontend — Web App

| Component | Technology |
|-----------|-----------|
| **Language** | JavaScript |
| **Framework** | Vanilla HTML, CSS, and JavaScript |
| **Package Manager** | npm |
| **Test Runner** | jest |
| **Mocking Library** | jest.mock |
| **Test Command** | npm test |

The frontend provides a compact people directory and relationship activity view. It calls the API through a small client module and updates visible follow state without a build step.

## 4. Services Required

| Azure Service | Role in App | Environment Variable | Default Value (Local) | Classification |
|---------------|------------|---------------------|----------------------|----------------|
| None | The demo keeps users and relationships in process memory | — | — | None |

## 5. Prerequisites

### Run

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| Node.js | * | ✅ | v22.23.2 |
| npm | * | ✅ | 10.9.8 |

### Debug

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| Docker | backend, frontend | ✅ | 29.8.1 |
| Docker Compose | backend, frontend | ❓ | unknown |
| JavaScript Debugger for VS Code | backend, frontend | ❓ | unknown |

Double-check all tools marked ❓ before proceeding.

## 6. Design System & UI

**Component Library**: Pico.css
**Style Direction**: A crisp editorial social graph console: warm paper surfaces, ink-dark type, and coral action accents make relationship changes feel immediate without turning the demo into a generic dashboard. Use compact 8px-radius controls, thin rules, and generous whitespace around the primary people list.
**Typography**: IBM Plex Sans

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#D94F45` | Follow and unfollow actions, active navigation, and relationship emphasis |
| `accent`  | `#1D6F73` | Activity markers, secondary actions, and selected person details |
| `surface` | `#F7F3EA` | App canvas and list background |
| `text`    | `#172121` | Person names, headings, and readable body copy |
| `muted`   | `#6B7470` | Handle text, timestamps, and supporting descriptions |
| `border`  | `#D9D5C9` | Directory dividers, controls, and panel boundaries |

### Pages

| Page | Route | Purpose | Layout |
|------|-------|---------|--------|
| People | `/` | Browse the seeded people directory and change who the current user follows. | header, nav, main, card-list, actions, footer |
| Activity | `/activity` | Review the current user's follow relationships and recent changes. | header, nav, main, list, table, action-bar, footer |

### Sample Content

People — person:
| Name | Handle | Role | Follow state |
|------|--------|------|--------------|
| Amara Okafor | @amara | Product designer | Following |
| Mateo Ruiz | @mateo | API engineer | Not following |
| Linh Tran | @linh | Research lead | Following |
| Jonah Williams | @jonah | Technical writer | Not following |

Activity — follow relationship:
| Person | Handle | Relationship | Last changed |
|--------|--------|--------------|--------------|
| Amara Okafor | @amara | Following | Today, 09:14 |
| Linh Tran | @linh | Following | Yesterday, 16:42 |
| Mateo Ruiz | @mateo | Not following | Never |

## 7. Project Structure

```
HAS-Demo/
├── package.json
├── server.js
├── src/
│   ├── app.js
│   ├── data/store.js
│   ├── routes/follows.js
│   └── routes/health.js
├── public/
│   ├── index.html
│   ├── activity.html
│   ├── styles.css
│   └── js/
│       ├── api.js
│       ├── people.js
│       └── activity.js
└── tests/
    ├── health.test.js
    └── follows.test.js
```

## 8. Route Definitions

| # | Method | Path | Description | Request Body | Response Body | Status Codes |
|---|--------|------|-------------|--------------|---------------|--------------|
| 1 | GET | `/api/health` | Report API availability and in-memory service status. | — | `{ status, services }` | 200 |
| 2 | GET | `/api/people` | Return the directory with each person's current follow state. | — | `{ people: [{ id, name, handle, role, following }] }` | 200 |
| 3 | GET | `/api/follows` | Return the current user's follow relationships and change timestamps. | — | `{ follows: [{ personId, following, changedAt }] }` | 200 |
| 4 | POST | `/api/follows/:personId` | Follow a person and return the updated relationship. | `{}` | `{ personId, following: true, changedAt }` | 200, 404 |
| 5 | DELETE | `/api/follows/:personId` | Stop following a person and return the updated relationship. | — | `{ personId, following: false, changedAt }` | 200, 404 |

## 9. Next Steps

1. Run **azure-project-scaffold** to execute this plan
2. Run **azure-project-integrate** to wire the frontend to live data, smoke-test the backend, and create the migrations
3. Run **azure-debug-plan** → **azure-debug-generate** for Docker emulators and VS Code debugging
4. Run the **azure-deploy** agent when ready; it uses **azure-app-onboard** for architecture, cost estimation, IaC generation, provisioning, and health verification