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

### Primary navigation
- top-level sticky buttons: **Executive Desk**, **Factory**, **Markets & News**, **Journal**, **Pastimes**
- Factory sub-sections: **Production**, **Contracts**
- Markets & News sub-sections: **Federal Exchange**, **Metropolitan Ledger**
- Journal sub-sections: **Journal**, **Contacts**
- Pastimes sub-sections: **Legal Sports**, **Illicit Activities**
- active top-level and secondary section buttons are blue with white text
- pause still forces **Executive Desk** and disables/grays out all gameplay navigation and controls

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
- implemented fictional previous-close seeding and daily opening gaps, so the first playable morning and later mornings show non-zero positive/negative Day moves against a prior close
- typed stock quantity persistence through every rerender remains a stabilization item until verified

### Live dev additions after the closed snapshot

- **Hard pause:** pressing PAUSE immediately returns the player to **Executive Desk**. Factory, Markets & News, Journal, Pastimes, their secondary sections, and all other gameplay controls are disabled and visibly grayed out. Only **PLAY** and **New Game** remain usable.
- **Raw-material trading:** copper, glass, and tungsten now support arbitrary quantity **Buy**, **Sell**, and **Sell All** actions rather than fixed purchase lots.
- **Contract negotiation:** customer leads specify what they want, while Federal Electric proposes the quantity, grade, and unit price. Customers may accept, reject, or issue a counteroffer before the agreement becomes an accepted production contract.
- **Federal Exchange prior close:** securities now have a generated prior close before the first playable day and a new opening movement on later business mornings, so the Day column is not universally +0.00%.
- **Security records:** company names on the exchange are clickable. Each record shows approximately 90 pre-game trading sessions in a period-styled quotation graph and ledger, then appends completed in-game trading days.
- **Not yet implemented:** wartime copper restrictions, priority allocation, and government-contract access to scarce materials remain future war-economy systems.

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
