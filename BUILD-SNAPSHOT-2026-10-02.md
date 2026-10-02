# Federal Electric — Closed Build Snapshot — 2026-10-02

## Status

This document closes the current development build before work begins on Accounts, Global Chat, and Global Rankings.

Frontend:
- GitHub Pages
- main branch only
- autosave
- browser-local persistence
- no offline world progression

## Accepted current structure

### Daily rhythm
- 60-minute Business Day
- Closing Bell
- 60-minute Washington Night
- mandatory private Daily Report
- next business morning
- Metropolitan Ledger appears at the beginning of the new day

### Persistent header
- blue Federal Electric / Confidential masthead scrolls away with page content
- red phase/date/time/exchange/cash status bar stays fixed
- primary navigation stays fixed
- Company Cash and Personal Cash stay visible in the fixed status bar

### Federal Exchange
- 50 fictional securities
- hidden intraday movement
- published opening quotation stays visible through Business Day
- hidden close is revealed at the bell
- exchange remains closed through Washington Night
- arbitrary whole-share quantities
- no arbitrary investment ceiling
- portfolio, cost basis, realized/unrealized P/L, dividends and transaction history
- strategic ownership/takeovers remain future systems

Known market polish:
- first playable day still needs fictional previous-close seeding so every security does not begin at +0.00%
- typed stock quantity persistence through every rerender remains a stabilization item until verified

### Factory and contracts
- contract-driven light-bulb production
- Economy / Standard / Long-Life grades
- production queue
- raw materials and operating costs
- customer personalities/history
- wrong-grade consequences
- partial shipments
- unattended breakdowns
- factory/contract/supplier actions close for Washington Night

### Legal Sports
Business Day:
- Capital Race Grounds
- persistent horses
- four heats, two semifinals, Main Event
- advance Win / Place / Show betting on known fields
- automatic settlement while away
- Race & Wager Ledger

Washington Night:
- licensed boxing
- persistent fighter roster
- Commission Fighter Registry
- scheduled four-bout card
- winner betting
- automatic resolution
- fight/wager ledger
- next-morning newspaper sports result integration

### Illicit Activities
- backroom poker
- Madam Star / Star Club
- daytime and evening Star Club visit choices
- phase-specific encounter pools
- Eddie Doyle recurring bookmaker lead system
- private prizefights
- cockfighting
- multiple discovery paths
- independent underground unlocks
- Underground Ledger
- hidden testing unlocks remain player-invisible

### Treasury / corruption foundation
- Company Cash and Personal Cash are separate
- recorded owner distribution
- company-fund diversion into personal cash
- Unaccounted Company Funds
- Accounting Exposure
- treasury activity included in Daily Report
- no arbitrary transfer cap beyond available company cash
- deeper audit/board/shareholder/blackmail consequences remain future systems

### Newspaper and records
- Metropolitan Ledger
- edition archive
- Sports section
- Journal
- Contacts
- Daily Report with company, stock, wager, treasury and notable-event information

## Known larger open items

- accounts/cloud saves
- Global Chat
- Global Rankings
- exact historical race-betting mechanics
- exact historical boxing-wagering mechanics
- deeper poker correctness, especially side pots/all-in reopening and settlement edge cases
- strategic share ownership, takeovers and merger/control systems
- IPO/board/shareholder systems
- corruption investigations and long-memory consequences
- broader company operations/economy/history systems

## Next active milestone

**Accounts → Global Chat → Global Rankings**

Accounts come first because preserving the long-running save is more important than social features.

See:
- `ONLINE-SYSTEMS-DESIGN.md`
- `ROADMAP.md`
- `DECISIONS.md`
