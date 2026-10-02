# Federal Electric — Online Systems Design

## Status

**NEXT ACTIVE MILESTONE**

The next development phase is:

1. Accounts and cloud saves
2. Global Chat
3. Global Rankings

The goal is durable long-save continuity first. Social systems come after save integrity.

## Core rule

A new Federal Electric build must not casually destroy or replace valid player progress.

The current browser save remains useful, but an account-backed save becomes the durable copy that can follow the player across devices and front-end deployments.

## Accounts and cloud saves

### Required behavior

- player can create/sign into an account
- signed-in account has a durable Federal Electric save
- the full simulation state is persisted, including company, personal, market, racing, boxing, poker, contacts, newspaper archive, treasury misuse, and later systems
- save records carry an explicit schema/save version
- older save versions are migrated forward
- migrations preserve valid state rather than rebuilding from defaults unless data is actually missing
- autosave remains automatic
- local browser save remains as an emergency fallback
- local and cloud timestamps/version metadata are compared before overwriting
- conflicting copies must be resolved deliberately rather than silently destroying the newer save
- logout must not erase the local safety copy
- account loss/relogin should restore the latest durable cloud state

### Save envelope

The cloud layer should wrap the existing simulation object rather than rewriting every game subsystem.

Expected envelope fields:
- account/player identifier
- save schema version
- game build identifier
- updated timestamp
- device/client identifier where useful
- simulation state payload
- optional checksum/integrity metadata

### Migration policy

Every breaking save-format change must include an explicit migration path.

Example:

`v10 → v11 → v12`

Do not maintain a system where only the newest schema can load.

Migration code should be deterministic and testable against archived save fixtures.

### Local fallback

Local storage remains useful for:
- offline/emergency recovery
- temporary network failures
- protecting against failed cloud writes
- recovery after a bad deployment

A failed cloud save must not delete the last good local copy.

## Backend direction

The current preferred architecture is:

**GitHub Pages**
- static game client

**Cloudflare Worker**
- account/session API
- save/load endpoints
- chat API/realtime gateway
- rankings API

**Durable storage**
- account records
- save records
- chat state/history as needed
- ranking snapshots / derived leaderboard data

Cloudflare D1 and/or Durable Objects are candidates, but the exact split is an implementation decision for the account build rather than a locked historical/gameplay rule.

## Authentication

Authentication method is not yet locked.

Requirements:
- do not store plaintext passwords
- private account credentials are not exposed in Global Chat
- player-facing display name is distinct from private login information
- session expiry/revocation is supported
- account recovery path is considered before launch

Possible approaches include email verification/magic-link style login, OAuth, or a properly implemented password flow.

## Global Chat

### First version

- one shared global chat
- authenticated accounts only
- account display name
- server-generated timestamp
- newest-message retrieval / realtime updates
- basic rate limiting
- block obvious flooding/replay abuse
- moderation hooks
- chat can be hidden/collapsed by the player
- chat failure never blocks the simulation, autosave, or account loading

### Not required in first version

- direct messages
- private rooms
- guilds
- voice
- attachments
- image uploads
- complicated social profiles

Those can be considered later if the global room is useful.

## Global Rankings

Rankings should come from server-held game/save data, not a client request saying “my score is X.”

### Candidate categories

Initial candidates:
- Federal Electric company value
- personal net worth / wealth

Possible later categories:
- company cash
- portfolio value
- reputation
- contracts completed
- racing/boxing/gambling records
- historical longevity / in-game date reached

Final categories are not locked yet.

### Ranking principles

- no opaque single composite score until its formula is explicitly designed
- ranking calculations must be deterministic
- save-version migrations must not wipe or arbitrarily invalidate existing players
- obvious impossible/tampered states should not be blindly published
- rankings are informational competition, not authority over single-player progression
- private account data must not be exposed on leaderboard entries

## Trust boundary

Federal Electric is still a browser game, so the client cannot be treated as fully trustworthy once global rankings matter.

Important ranking-relevant values should be:
- derived server-side where feasible
- sanity checked against save history
- protected against trivial arbitrary client submission

This does not require turning the entire simulation server-authoritative immediately. The first goal is to prevent the leaderboard from being a text box with a crown taped to it.

## Rollout order

### Slice A — Save durability
- define cloud save envelope
- stabilize schema migrations
- add migration fixtures/tests
- preserve local fallback

### Slice B — Account identity
- authentication
- session handling
- account record
- display name

### Slice C — Cloud autosave/load
- sync current save
- conflict detection
- recovery behavior
- cross-device test

### Slice D — Global Chat
- shared room
- timestamps
- rate limiting
- moderation foundation

### Slice E — Global Rankings
- lock categories/formulas
- derive leaderboard values
- publish rankings
- tamper/sanity checks

## Acceptance criteria for accounts

The account milestone is not complete until:
- an existing player save survives a new build
- the same account can load the same progress on another supported device
- a failed cloud write does not destroy the local save
- an older schema can be migrated forward
- logout/login does not reset the game
- the system can distinguish and resolve a newer local save versus an older cloud save

## Non-goals for the first online milestone

- multiplayer simulation of the same Federal Electric company
- shared economy
- player-to-player stock trading
- PvP takeovers
- direct messaging
- public profiles beyond what rankings/chat need

Those require separate design approval.
