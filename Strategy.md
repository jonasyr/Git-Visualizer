## 🔁 **Branching-Strategie**

Vermeidet Chaos mit einer klaren Strategie:

### **Empfohlen: GitHub Flow oder Git Flow light**

- `main`: immer deploybarer (z. B. für die Live-Demo)

- `dev`: Entwicklungsversion, hier wird alles zusammengeführt

- `feature/<name>`: z. B. `feature/auth`, `feature/graph`

- `bugfix/<name>`: z. B. `bugfix/hover-bug`

- `hotfix/<name>`: nur bei Produktionsproblemen (optional)

→ Merge `feature/*` → `dev` → regelmäßig `dev` → `main`

---

## 🗂️ **Ordnerstruktur**

Zweckmäßig, klar getrennt – hier ein Vorschlag:

```
.github/              # GitHub Actions, Issue Templates
public/               # Statische Assets für das Frontend (Favicon, etc.)
src/
  client/             # Frontend (React, Tailwind, etc.)
    components/
    pages/
    styles/
    utils/
  server/             # Backend (Node.js, FastAPI, etc.)
    routes/
    services/
    utils/
    git-parser/       # Git-Analyse-Logik
  shared/             # Gemeinsame Typen, Interfaces, Helper
tests/                # End-to-End / Unit Tests
docs/                 # Projekt-Doku, technische Specs, Ideen

```

---

## 📝 **README.md**

Das Herzstück eures Projekts für Außenstehende & euch selbst. Sollte enthalten:

- 🚀 Projektbeschreibung

- 🖼️ Screenshot/GIF der Visualisierung

- 🛠️ Tech Stack

- 📦 Setup-Anleitung (lokal starten)

- 🔧 Deployment Infos (z. B. Vercel, Render)

- 💡 Features & TODOs

- 🧪 Tests & wie man sie ausführt

- 🧍‍♂️ Wer sind die Entwickler (optional)

---

## ✅ **GitHub Issues & Project Boards**

Einfaches Aufgabenmanagement mit GitHub Issues & Kanban-Board:

- Nutzt **Labels** wie `frontend`, `backend`, `bug`, `enhancement`, `discussion`

- Erstellt **Project Board** mit Spalten: `Todo`, `In Progress`, `Review`, `Done`

- Verlinkt Commits/PRs mit `Fixes #ID` oder `Closes #ID`

---

## 🔄 **Pull Requests**

- Regel: **Keine Commits direkt auf `main` oder `dev`**

- PRs sollten:

  - Review durch den anderen bekommen

  - mit einer kleinen Beschreibung versehen sein

  - GitHub Actions automatisch triggern (Build/Test)

Optional:

```yaml
# .github/PULL_REQUEST_TEMPLATE.md
## 🧾 Beschreibung
Kurze Beschreibung der Änderung.

## ✅ Checkliste
- [ ] Funktion getestet
- [ ] Keine unnötigen Dateien committed
- [ ] Issue referenziert

```

---

## ⚙️ **CI/CD**

- Nutzt GitHub Actions:

  - `npm run test`

  - `eslint .`

  - optional: `build` Check

- Auto-Deploy zu Vercel/Netlify (Frontend) oder Render/Fly.io (Backend)

---

## 👥 **Kommunikationsvereinbarung**

Klarheit über Zusammenarbeit:

- Nutzt Issues für Diskussionen über Features/Bugs

- PRs mit Review-Zwang

- Plant ggf. ein wöchentliches Sync-Treffen (z. B. Discord, Meet)

---

## 📘 **Langfristige Doku in `docs/`**

- `ARCHITECTURE.md`: wie das System aufgebaut ist

- `FEATURES.md`: geplante Features & Ideen

- `ROADMAP.md`: Ziele, Milestones

- `NOTES.md`: Technische Notizen, Links

---

## 🧠 Empfehlungen für euch beide

- Fügt euch gegenseitig als **Collaborator** hinzu

- Aktiviert **Branch Protection** auf `main`

- Verwendet `.env.example` für Umgebungsvariablen

- Macht Commits sprechend, z. B.:

  - `feat: add interactive commit graph`

  - `fix: resolve layout bug on zoom`
