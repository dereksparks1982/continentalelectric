# Federal Electric — Closed Build Snapshot — 2026-10-02

## Status

This document records the accepted 2026-10-02 baseline. Current development continues in **v0.4 Company Operations**; Accounts, Global Chat, and Global Rankings remain later work.

Frontend:
- GitHub Pages
- main branch only
- autosave
- browser-local persistence
- no offline world progression

## Accepted current structure

### Daily rhythm
- four playable business turns per calendar month; the numbered campaign is 372 turns from January 1938 through September 1945
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
- Factory sub-sections: **Production**, **Warehouse**, **Contracts**
- Markets & News sub-sections: **Federal Exchange**, **Metropolitan Ledger**
- Journal sub-sections: **Journal**, **Contacts**, **Info**, **Help**
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
- **In-game Help:** the Journal group now includes **Help**, opening a detailed **How to Play** manual with Quick Start, time/phase rules, factory/contracts, materials, markets/news, Journal/Contacts/Info, legal and illicit pastimes, Daily Report, saving, and a sample day.

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

## Current active milestone

**v0.4 — Company Operations**

Current work continues to deepen the company and surrounding simulation before the later online milestone. Accounts, Global Chat, and Global Rankings remain planned but are not the immediate active build.

See:
- `ROADMAP.md`
- `DECISIONS.md`
- `ONLINE-SYSTEMS-DESIGN.md`


### Company Operations foundation — current live build

- production, inventory and contract fulfillment are now separate systems: production creates Warehouse stock, contracts create obligations, and only a deliberate shipment fulfills the customer
- finished bulbs enter Warehouse inventory as they are manufactured; nothing auto-ships at the closing bell
- Warehouse shows raw materials, finished-goods totals by grade, and traceable production lots
- contracts track ordered, delivered and remaining quantities separately; shipment quantity and shipment grade are player-controlled
- ordinary contract deadlines now use the contract month / Turn 4 window rather than demanding immediate same-day shipment
- production targets may be below or above contract quantity; surplus remains Federal Electric property in the Warehouse
- switching away from an unfinished production run requires confirmation, preserves manufactured inventory and preserves resumable progress
- production policy supports Quality Priority, Normal Production and Rush Production
- workforce foundation tracks attendance, tardiness, absence, skill, morale, discipline, efficiency and quality without requiring an 80-person micromanagement roster
- occasional individual personnel matters support Ignore, Verbal Warning, Formal Warning, Suspend and Dismiss decisions
- turn conditions include weather effects and utility outages; Federal Electric currently buys outside utility power rather than generating its own
- production conditions can create internal rejects and latent defects; lot-based customer defect claims can later reopen a replacement obligation and cost Federal Electric money
- pacing constants are separated internally; the current configuration is 4 playable turns per month, 60-minute Business Day and 60-minute Washington Night


### Interface and Pastimes expansion — v0.4.0

- visible game version **v0.4.0** appears at the far top-right of the blue Federal Electric masthead; internal save-schema version 12 remains separate
- the persistent date/status line now uses the global numbered campaign counter, such as **TURN 2/372**
- the main workspace uses a consistent green-felt background across every page; the earlier walnut Executive Desk treatment was removed
- Legal Sports uses closable activity panels for Horse Racing, Dog Racing, Midget Car Racing and Boxing
- Illicit Activities uses the same collapsible model for Star Club, Bookmaker & Leads, Backroom Poker, Private Prizefights and Cockfighting
- only the selected activity needs to be expanded; closing a panel never stops the shared world clock, scheduled events, wagers or raids
- Horse Racing now uses a literal oval-track progress display for attended races rather than a straight progress bar
- Dog Racing is implemented with scheduled daytime heats/final, persistent racing state and Win/Place/Show wagering
- Midget Car Racing is implemented with scheduled daytime heats/feature, persistent cars and drivers, mechanical reliability/failure risk and Win/Place/Show wagering
- the same reusable oval-track visualizer is used across horse, dog and midget-car racing


### Green-felt interface pass — v0.4.0

- green felt remains the inset background of the main workspace on every page instead of appearing as separate boxes around selected controls
- the outer left/right margins and the primary navigation strip now use a dark 1930s wood treatment so the full interface reads as a wooden executive desk with a central felt writing surface
- summary cards, forms, tables, contracts, ledgers, newspaper content and activity headers remain paper-based on top of the felt background
- Journal keeps the responsive Note / Source / Write It Down layout so its text fields remain readable instead of clipping
- visible version label remains **v0.4.0**


### Federal Exchange history and sports-timer follow-up — v0.4.0

- Horse Racing now opens automatically when Legal Sports is entered
- Dog Racing and Midget Car Racing post-time displays update every second instead of remaining frozen at the time the panel was rendered; Horse Racing and Boxing countdowns were audited and already use the shared clock
- both stock ticker symbols and company names open a Security Record
- every Federal Exchange security carries 90 seeded business-day quotations from before January 3, 1938, so a graph and meaningful history exist immediately on Turn 1
- existing saves merge seeded pre-game quotations with their saved game history
- Security Record shows published quote, prior close, day move, total record move, record high, record low, visible date range and quoted-session count
- the quotation ledger shows the full stored record in a scrollable table instead of only the most recent 15 entries


### Public offering scaffolding — v0.4.0

- Ownership on the Executive Desk now has a far-right **Explore Public Offering** action
- the action opens an in-place Federal Electric Securities Office planning panel
- the panel shows live company value, reputation, accounting exposure, 100% founder ownership, private exchange status, and offering status
- future IPO systems are visibly scaffolded for offering structure, valuation/pricing/underwriting, governance/control, and an eventual Federal Exchange listing
- **Begin Public Offering** is intentionally disabled; this slice adds the doorway and information architecture only and does not issue shares, alter ownership, or change save schema


### Compact persistent header — v0.4.0

- the status-bar date is shortened to forms such as **THUR, JAN 6, 1938**
- the compact header now shows the global campaign position, such as **TURN 2/372**, rather than a monthly turn fraction
- full written dates and the explanatory monthly turn format remain available elsewhere
- desktop status items no longer wrap into a second row, keeping company cash, personal cash, and PAUSE together


### Four-turn campaign structure — v0.4.0

- pacing is now four playable business turns per calendar month
- the numbered main campaign runs from January 1938 through September 1945 for 372 total turns
- the persistent header shows the global campaign counter rather than the monthly turn number
- existing saves retain their current date and turn serial; the next numbered turn realigns to the four-turn campaign calendar
- after the Turn 372 Daily Report, a campaign-complete summary appears
- **Continue Empire** preserves the current save and enters unlimited free play, where the header continues counting turns and labels the state **FREE PLAY**
- **Start New Game** returns to January 1938
