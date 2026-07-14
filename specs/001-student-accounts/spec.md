# Feature Specification: Student Accounts, Progress & Saved Words

**Feature Branch**: `beta` (spec directory: `001-student-accounts`)

**Created**: 2026-07-14

**Status**: Draft

**Input**: User description: "Supabase integration for the Englishpusher hub: optional email+password accounts for students, with progress tracking, saved words, and a personal page. Feature must be testable live by the teacher on a beta environment without touching production."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create an account and sign in (Priority: P1)

A student visits any Englishpusher app, taps the account icon in the header, and creates an account with their email and a password. From then on, signing in once keeps them signed in across every app on the site (hub, trivia, flashcards) until they sign out. Students who never create an account can keep using everything exactly as before.

**Why this priority**: Every other feature (progress, saved words, personal page) depends on identity. Optional login is the foundation and must not disturb existing anonymous users.

**Independent Test**: Create an account, close the tab, reopen any app page — the account icon shows signed-in state everywhere. Play any activity as a guest — nothing differs from today's behavior.

**Acceptance Scenarios**:

1. **Given** a visitor with no account, **When** they open the account page and sign up with email + password, **Then** they are signed in immediately (no email confirmation step) and see their personal page.
2. **Given** a signed-in student, **When** they navigate between the hub, trivia, and flashcards pages, **Then** they remain signed in on every page without re-entering credentials.
3. **Given** a guest (not signed in), **When** they use any existing activity, **Then** the experience is identical to the current production behavior.
4. **Given** a student who forgot their password, **When** they request a reset from the login form, **Then** they receive a reset email and can set a new password.
5. **Given** a signed-in student, **When** they sign out from their personal page, **Then** no personal data is shown on any page until they sign in again.

---

### User Story 2 - Trivia progress is saved and visible (Priority: P2)

A signed-in student finishes a trivia session. Their score, the words they got right, and the words they missed are saved automatically. On their personal page they see their results per topic (best and latest score) and a "weak words" list — words whose most recent answer was wrong.

**Why this priority**: Progress visibility is the core motivation feature and the teacher's main evidence of practice. It builds directly on P1.

**Independent Test**: Sign in, finish one trivia session, open the personal page — the session's score appears under the right topic and missed words appear as weak words.

**Acceptance Scenarios**:

1. **Given** a signed-in student who finishes a trivia session, **When** the end screen appears, **Then** the result (score, correct words, missed words, topic, date) is saved without interrupting or slowing the end screen.
2. **Given** a save that fails (e.g. connection lost), **When** the end screen appears, **Then** the student sees a small non-blocking notice and can continue using the app normally.
3. **Given** a student with several sessions on one topic, **When** they open their personal page, **Then** they see the best and the most recent score for that topic.
4. **Given** a word missed in the latest session but answered correctly before, **When** the personal page computes weak words, **Then** that word IS listed (most recent result counts).
5. **Given** a guest who finishes a trivia session, **When** the end screen appears, **Then** nothing is saved and a subtle "Sign in to save your progress" hint is shown.

---

### User Story 3 - Save words and practice them as "My Words" (Priority: P3)

While studying flashcards, a signed-in student taps a star on any card to save the word for later. On the trivia end screen, they can star words from the results lists. All saved words appear on their personal page, and a special "My Words" topic appears in the flashcards and trivia topic lists for that level, letting them study or quiz themselves on exactly the words they chose.

**Why this priority**: High learner value, but depends on P1 and complements P2. The feature set is meaningful even if this ships after P2.

**Independent Test**: Sign in, star three words in flashcards, star one word on a trivia end screen — all four appear on the personal page and in a "My Words" topic in both apps for that level.

**Acceptance Scenarios**:

1. **Given** a signed-in student viewing a flashcard, **When** they tap the star, **Then** the word is saved (star fills); tapping again unsaves it.
2. **Given** a signed-in student on the trivia end screen, **When** they tap the star next to a word in the results lists, **Then** that word is saved.
3. **Given** a student with at least one saved word at a level, **When** they open that level's flashcards or trivia topic list, **Then** a "My Words" topic appears containing exactly their saved words for that level.
4. **Given** a saved word whose original topic was later removed from the app, **When** "My Words" is opened, **Then** that word is silently omitted (no error).
5. **Given** a guest using flashcards, **When** they view a card, **Then** no star button is shown.
6. **Given** a student who saves the same word twice (e.g. from flashcards and trivia), **When** they view their saved words, **Then** the word appears only once.

---

### User Story 4 - Flashcard study activity is recorded (Priority: P4)

When a signed-in student opens a flashcard topic, that activity is recorded. Their personal page shows recent study activity ("Studied Lesson 19 — Tuesday"), giving them (and later, the teacher) a lightweight practice log.

**Why this priority**: Lowest standalone value — a supporting signal rather than a feature students ask for. Ships last.

**Independent Test**: Sign in, open two flashcard topics, check the personal page — both appear with dates in recent activity.

**Acceptance Scenarios**:

1. **Given** a signed-in student, **When** they open a flashcard topic, **Then** a study event (topic, app, date) is recorded without any visible delay.
2. **Given** recorded study events, **When** the student opens their personal page, **Then** they see a reverse-chronological list of recently studied topics.

---

### User Story 5 - Teacher tests new features live without touching production (Priority: P1)

The teacher opens a stable beta web address on any device and uses the full site with all account features enabled. Meanwhile the production site continues to serve students unchanged, and new lessons keep being published to production independently. Content updates from production flow into the beta regularly so the teacher always tests against current lessons.

**Why this priority**: This is the delivery mechanism for the whole feature — without it, nothing can be validated safely. It is infrastructure, so it is built first alongside P1.

**Independent Test**: Push a change to the feature branch — the beta URL updates; production URL is unaffected. Publish a lesson to production — production updates; beta is unaffected until the next sync.

**Acceptance Scenarios**:

1. **Given** the beta environment is set up, **When** work is pushed to the feature branch, **Then** the beta URL serves the new build automatically and the production URL is byte-for-byte unaffected.
2. **Given** new lesson content published to production, **When** the feature branch is synced with production content, **Then** the beta shows the new lessons alongside the account features.
3. **Given** the teacher on a phone or laptop, **When** they open the beta URL, **Then** they can sign up, sign in, and exercise every account feature.

---

### Edge Cases

- A student plays as a guest, then signs in: activity from before signing in is not retroactively saved (accepted limitation, v1).
- Two students share one device/browser: signing out removes access to personal data; the next student signs in with their own account.
- A student signs up with a typo in their email: email confirmation is off, so the account works, but password reset for that account is impossible — the student creates a new account (accepted limitation, v1).
- The student's connection drops mid-activity: gameplay continues; any failed save shows a non-blocking notice and is not retried in v1.
- A student unsaves every word: the "My Words" topic disappears from topic lists until a word is saved again.
- A saved word's topic id is renamed/deleted in app content: the word no longer resolves and is silently filtered from "My Words" and the personal page list.
- The same account signed in on two devices simultaneously: both work; results merge naturally as separate rows (no conflict resolution needed).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST let visitors create an account with email and password, with no email confirmation step, and sign them in immediately after signup.
- **FR-002**: System MUST keep a signed-in session active across all pages of the site and across browser restarts, until the student signs out.
- **FR-003**: System MUST provide password reset via email.
- **FR-004**: System MUST keep every existing activity fully functional for guests, with behavior identical to current production (login is optional everywhere).
- **FR-005**: System MUST automatically record a signed-in student's finished trivia session: topic, score, correct words, missed words, and date — without blocking or delaying the end screen.
- **FR-006**: System MUST show a small non-blocking notice if saving fails, and never interrupt an activity because of a save failure.
- **FR-007**: System MUST provide a personal page showing, for the signed-in student only: per-topic trivia results (best + latest), weak words (words whose most recent trivia answer was wrong), saved words, and recent flashcard study activity.
- **FR-008**: System MUST let a signed-in student save/unsave a word from any flashcard (star control) and save words from the trivia end-screen result lists.
- **FR-009**: System MUST deduplicate saved words per student per level.
- **FR-010**: System MUST present a "My Words" topic in both flashcards and trivia topic lists for a level whenever the signed-in student has at least one resolvable saved word at that level, containing exactly those words.
- **FR-011**: System MUST resolve saved/weak word references against the app's current word content, silently omitting words that no longer exist.
- **FR-012**: System MUST record a study event (topic, app, date) when a signed-in student opens a flashcard topic.
- **FR-013**: System MUST restrict every student's stored data (results, saved words, study events, profile) so it is readable and writable only by that student's account.
- **FR-014**: System MUST show an account entry point (icon/link) in the shared app header on every app page and on the hub, reflecting signed-in state.
- **FR-015**: The student data model MUST accommodate a future teacher role with read access to student progress without restructuring stored data (no teacher UI in this release).
- **FR-016**: A beta environment MUST serve the feature branch at a stable public URL, updating automatically on every push to that branch, with zero effect on the production site or its deploy pipeline.
- **FR-017**: Production content updates (new lessons) MUST be able to flow into the beta branch without disturbing feature work (regular syncs from the production branch).
- **FR-018**: Word definitions, translations, and topic content MUST remain sourced solely from the apps' existing content files; stored student data references words by identifier only and never duplicates content.

### Key Entities

- **Student profile**: One per account — display name, creation date. The account's email lives in the authentication system, not duplicated here. Extensible with a role for the future teacher dashboard.
- **Trivia session result**: One per finished session — owning student, app, topic, score, list of correct words, list of missed words, date.
- **Saved word**: One per student + word + level — the word reference (word text, topic id, level), where it was saved from, date. Unique per student/word/level.
- **Study event**: One per flashcard-topic open — owning student, app, topic, date.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new student can go from "no account" to signed in and practicing in under 2 minutes on a phone.
- **SC-002**: 100% of trivia sessions finished by a signed-in student (with a working connection) appear on their personal page within 5 seconds of finishing.
- **SC-003**: Guests experience zero behavioral change: every existing flow (topic selection, trivia, flashcards, deep links) works identically to production.
- **SC-004**: Saving a word takes exactly one tap from where the student sees the word; saved words are practicable as a deck in both flashcards and trivia.
- **SC-005**: The teacher can exercise every feature above from a stable beta URL on any device, while production remains unchanged by beta deploys.
- **SC-006**: A student's data is never visible to another account: any attempt to read another student's rows returns nothing.
- **SC-007**: Signing in once suffices for the whole site: navigating between all app pages requires zero re-authentication.

## Assumptions

- Student population is small (well under 1,000 accounts); free-tier backend quotas are ample.
- Students are old enough to have and use their own email addresses; no parental-consent flow is required.
- Stored personal data is minimal (email, chosen display name, practice history); no additional compliance requirements apply.
- Email confirmation is deliberately off in v1 to minimize signup friction; the typo'd-email limitation is accepted.
- Activity performed while signed out is never retroactively attached to an account.
- No offline queueing or save retries in v1; a failed save is lost.
- Teacher dashboard (viewing all students' progress) is explicitly out of scope — deferred to phase 2; the data model must merely not preclude it.
- The backend is the owner's existing Supabase account (free tier); the beta host is Cloudflare Pages free tier serving the `beta` branch. One backend project serves both beta and production.
- UI language is English, consistent with the existing apps.
- The existing production deploy pipeline (GitHub Pages via GitHub Actions on `main`) is not modified by this feature until the final release merge.
