# Backend Services

## `src/services/gitService.ts`

### Klasse `GitService`

Kapselt Git‑Operationen via `simple-git`.

#### `cloneRepository(repoUrl: string): Promise<string>`

- Klont mit `--depth 50` in temporäres Verzeichnis  
- Cleant bei Fehler automatisch auf  
- **Returns**: Pfad zum lokalen Repo

#### `getCommits(localRepoPath: string, maxCount?: number): Promise<Commit[]>`

- Liest Commit‑History (`git.log`)  
- Transformiert in `Commit`‑Objekte (aus `shared-types`)  
- Default `maxCount = 100`

#### `cleanupRepository(repoPath: string): Promise<void>`

- Löscht rekursiv das temp‑Verzeichnis

### Wichtige Variablen

- `gitOptions`: Basisverzeichnis, maximale Prozesse  
- `interface GitLogEntry` passt `simple-git` Log an

### Abhängigkeiten

- `simple-git`, `fs/promises`, `os`, `path`, `shared-types`
