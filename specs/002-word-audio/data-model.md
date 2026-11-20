# Data Model: Recorded Word Pronunciation

No database changes. Two file-level entities.

## Word (existing, read-only)

- Source: `TOPICS[].words[].word` in `src/{a2,a2plus,b1,b1plus,b2plus,c1}-flashcards/data.ts`.
- Only the `word` text matters here. Other fields are unchanged.

## Recording (new)

| Field | Rule |
|---|---|
| key | `word.normalize("NFC").trim().replace(/\s+/g, " ").toLowerCase()` |
| file name | `<slug>-<hash>.mp3` (see research R4) |
| location | `public/audio/jane/` in the repo → served at `/audio/jane/` |
| spoken text | the word exactly as displayed (trimmed); for case variants, the first one met in level order a2 → c1 |
| voice | `mistralai/voxtral-mini-tts-2603` / `gb_jane_neutral` |

**Relationships**: many Words → one Recording (same key). One Recording per key.

**Lifecycle** (per generator run):

```
word key exists, no file   → CREATE (if within limit or --all)
word key exists, file      → KEEP (never re-voiced)
file, no word key          → DELETE (orphan)
```

**Invariants**
- Every `.mp3` in `public/audio/jane/` matches a current key (after a successful run).
- Two different keys never share a file name (enforced by test over all real words).
