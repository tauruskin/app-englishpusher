# Feature Specification: Recorded Word Pronunciation

**Feature Branch**: `feat/word-audio`

**Created**: 2026-11-20

**Status**: Draft

**Input**: User description: "Replace the device voice used by the word speaker buttons in flashcards and trivia with pre-recorded audio in one professional voice (Jane), generated automatically for new topics. Words only."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Students hear every word in the same professional voice (Priority: P1)

A student studying flashcards (A2, A2+, B1, B1+, B2+, C1) or playing level trivia taps the speaker button next to a word and hears it pronounced by the same clear British voice, whatever phone or computer they use. Today the voice depends on the device and some devices read words badly.

**Why this priority**: This is the whole point of the feature: consistent, correct pronunciation for every student.

**Independent Test**: Open any flashcard topic on two different devices, tap the speaker button on the same word, and confirm both play the same recorded voice.

**Acceptance Scenarios**:

1. **Given** a word that has a recording, **When** the student taps its speaker button in flashcards, **Then** the recording plays.
2. **Given** a word that has a recording, **When** the student taps its speaker button in trivia, or trivia speaks it automatically after the student has interacted with the page, **Then** the recording plays.
3. **Given** trivia is muted, **When** a word would be spoken, **Then** nothing plays (unchanged behaviour).
4. **Given** the student taps a second speaker button while a word is still playing, **Then** the first word stops and the second one plays.

---

### User Story 2 - Nothing breaks when a word has no recording (Priority: P1)

If a word has no recording yet (a topic added minutes ago, or a recording failed), the speaker button still works using the device voice, as it does today.

**Why this priority**: Pronunciation must never be worse than today, even for a short moment.

**Independent Test**: Tap the speaker button for a word with no recording and confirm the device voice reads it.

**Acceptance Scenarios**:

1. **Given** a word with no recording, **When** the student taps its speaker button, **Then** the device voice reads the word.
2. **Given** the recording cannot be loaded (offline, network error), **When** the student taps the speaker button, **Then** the device voice reads the word.

---

### User Story 3 - New topics get recordings without anyone doing anything (Priority: P2)

When the teacher adds a new topic (through Claude Code, the Telegram bot, or a manual edit) and it is published, recordings for its new words are created and published automatically.

**Why this priority**: Without this the library slowly falls back to the device voice as topics are added.

**Independent Test**: Publish a topic with one new word and confirm that, after the site deploys, that word plays the recorded voice.

**Acceptance Scenarios**:

1. **Given** a newly published topic with words that have no recording, **When** the site deploys, **Then** recordings are created for exactly those words and published with the site.
2. **Given** a word's text is corrected (e.g. a typo fix), **When** the site deploys, **Then** the corrected text gets its own recording and the old one is removed.
3. **Given** a word is removed from every topic, **When** the site deploys, **Then** its recording is removed.
4. **Given** the voice service is unavailable or the account has no balance, **When** the site deploys, **Then** the deploy still succeeds and the affected words use the device voice.

---

### User Story 4 - Spending stays small and predictable (Priority: P2)

The owner pays once for the existing library and a few cents per new topic, never by surprise.

**Why this priority**: The service is paid per character; a bug must not be able to spend a lot.

**Independent Test**: Run the generator against a word list change larger than the safety limit and confirm it stops without creating any recordings.

**Acceptance Scenarios**:

1. **Given** an automatic run would voice more than 5,000 characters, **When** it starts, **Then** it voices nothing and reports why.
2. **Given** the owner explicitly asks for a full run, **When** it starts, **Then** it voices all missing words regardless of the limit.
3. **Given** a word already has a recording, **When** any run happens, **Then** it is not voiced again.

### Edge Cases

- The same word appears in several levels or topics (e.g. "comfortable"): one recording serves all of them.
- Two words differ only in capitalisation or punctuation (e.g. "Wednesday" / "wednesday"): they share one recording.
- Words containing apostrophes, slashes or brackets (e.g. "can't", "sb/sth"): they get a valid recording name and play correctly.
- The "My Words" virtual topic: its words come from the real topics, so they use the same recordings.
- A student taps the button many times quickly: only one word plays at a time.
- Grammar and C1 trivia have no word speaker buttons today: they are unchanged.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Every word speaker button in flashcards (A2, A2+, B1, B1+, B2+, C1) and level trivia (A2, A2+, B1, B1+, B2+) MUST play the word's recording when one exists.
- **FR-002**: When a recording is missing or fails to play, the app MUST read the word with the device voice, as today.
- **FR-003**: Trivia's mute switch and its rule of speaking automatically only after the student has interacted with the page MUST keep working.
- **FR-004**: Starting a new word MUST stop any word still playing.
- **FR-005**: Buttons, layout and screens MUST look exactly as they do today.
- **FR-006**: All recordings MUST use one voice: Mistral Voxtral "Jane" (British, neutral).
- **FR-007**: There MUST be exactly one recording per unique word text across all six word lists; words that read the same apart from capitalisation share one.
- **FR-008**: The generator MUST voice only words without a recording and MUST remove recordings for words that no longer exist.
- **FR-009**: An automatic run MUST NOT voice more than 5,000 characters; a full run MUST be possible only when explicitly requested.
- **FR-010**: If the voice service fails, the generator MUST report a warning and MUST NOT fail the deploy.
- **FR-011**: Every deploy of the live site MUST run the generator first and publish any new recordings together with the site, and the new recordings MUST be kept in the repository so they are never paid for twice and the beta site gets them through its normal merge.
- **FR-012**: The voice service key MUST be stored only as a repository secret, never in code or in the published site.
- **FR-013**: The existing deploy safeguard for the custom domain MUST stay in place.

### Key Entities

- **Word**: the text shown on a card (from the level word lists). Its recording name is derived from its text.
- **Recording**: one audio file per unique word text, in Jane's voice, published with the site.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: After the first full run, 100% of words in the six word lists play the recorded voice.
- **SC-002**: Pressing a speaker button starts the sound in under 1 second on a normal mobile connection.
- **SC-003**: A newly published topic's words play the recorded voice after the next deploy, with no manual step.
- **SC-004**: The first full run costs under $1 and a typical new topic costs under $0.05.
- **SC-005**: No deploy fails because of the voice service.

## Assumptions

- Words only: example sentences are not voiced (agreed with the owner, 2026-11-20).
- The existing library is about 2,270 unique words (~25,000 characters); at the Jane voice price (~$0.000016 per character) the full run costs about $0.40.
- The owner creates a separate OpenRouter key with a small spending limit and adds it as a repository secret.
- The first full run is started once by hand (locally or from GitHub); after that everything is automatic.
- Total recordings stay well within GitHub Pages size limits (roughly 25 MB).
- Grammar pages and C1 trivia are out of scope because they don't speak words today.
- Recordings are not re-made when only the voice service changes its model; switching voice is a separate decision.
