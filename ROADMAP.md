# Federal Electric Roadmap

Federal Electric is a long-save historical industrial, financial, social, and political life simulation beginning in Washington, D.C. in 1938.

## Locked rules

1. Main branch only unless Derek authorizes otherwise.
2. Federal Electric is always the core company.
3. Corporate spreadsheet/paperwork presentation in deep navy, ivory, and restrained red.
4. Company money and personal money stay separate.
5. Federal Electric starts private; IPO is optional.
6. One real hour is one active business day.
7. No offline progression.
8. No universal morality meter.
9. Historical specifics are researched.
10. Information can be incomplete or wrong depending on its source.

## v0.3.5-dev — On the Clock — CURRENT BUILD

Implemented foundation:
- 60-minute active business-day clock
- automatic day close and End Day Early
- freeze on hidden/closed app and exact resume from autosave
- 50-security live Federal Exchange with frequent intraday quotation movement
- closing quotations become next-day opening basis
- shared market tone + sector + company movement components
- red/white/blue Washington corporate UI
- daily Federal Electric payroll/ledger
- living Metropolitan Ledger framework
- newspaper edition archive
- personal journal that automatically records important meetings, conversations and poker sessions
- separate executive contact-card file for people actually met
- persistent contact data foundation
- The Star Club and Madam Star
- bookmaker introduction now gates entry to the Neighborhood Game
- poker auto-resolution uses tiered time costs: Neighborhood 5 min, Commerce Club 10 min, Embassy Room 25 min; cash, progression, factory-away, Journal and raid consequences are preserved — IMPLEMENTED
- manual poker displays remaining business-day time and charges actual elapsed table time on exit — IMPLEMENTED
- production-time migration/normalization prevents impossible legacy estimates beyond the intended 10/20/30-minute order bands — IMPLEMENTED
- 10 Neighborhood Game wins unlock the Commerce Club — IMPLEMENTED
- Embassy Room unlock uses a separate Harrison Vale social/invitation path — IMPLEMENTED FOUNDATION
- poker music UI removed from current scope
- three Washington poker circles: neighborhood/working-class, commercial/professional, and elite private-society games
- poker launches in a separate dedicated game window rather than an in-page modal
- daily game supply: up to 5 neighborhood, 3 commercial, and 1 elite game available to the player
- elite game remains hidden/locked behind introductions and connections
- different stakes, access, patrons, information value, and police risk by poker circle
- poker raids are rare events rather than an every-visit trap
- independently scheduled Star Club raids
- Star Club/brothel raids are deliberately much rarer, targeted around an average of roughly twice per year
- newspaper consequences for attended or missed raids
- v0.1/v0.2 save migration

Implemented Working Factory foundation:
- top-level Contracts department
- one starting Capital Hardware & Supply Co. contract
- contract-defined quality, quantity, price and deadline
- continuous live production tied to the business-day clock
- large visible production progress bar and unit counter
- materials and operating cost consumed as units are produced
- 30-minute Star Club visits advance the factory while consuming the owner's time
- semi-uncommon unattended breakdowns; foreman may repair them or require executive authorization
- customer record tracks correct completions and late/short work

Next v0.3 passes:
- multiple simultaneous customer contracts and player-controlled production queue priority — IMPLEMENTED FOUNDATION
- seek-new-contracts action with variable availability and a 2-minute business-time cost — IMPLEMENTED FOUNDATION
- roughly 10/20/30-minute small, medium and large production runs — IMPLEMENTED FOUNDATION
- overcommitment warning without preventing risky contract acceptance — IMPLEMENTED FOUNDATION
- arbitrary stock order quantities, Buy/Sell/Sell All, visible buying cash, and realized P/L — IMPLEMENTED
- contract offers increasingly shaped by reputation and customer history — IMPLEMENTED FOUNDATION
- customer-specific buyer personalities and specification tolerance — IMPLEMENTED
- wrong-quality shipment rejection, discounted acceptance and replacement obligations — IMPLEMENTED FOUNDATION
- partial delivery where the contract/customer permits it — IMPLEMENTED
- grade-specific finished inventory and production-grade selection — IMPLEMENTED
- production-grade changeover time — IMPLEMENTED FOUNDATION
- contract reliability affects future terms and customer relationships — IMPLEMENTED FOUNDATION
- richer daily factory demand and sales
- historically researched 1938 market regimes and dated historical news
- richer company fundamentals and market-moving news
- broker tips, rumors, limit orders, and delayed execution where appropriate
- deeper newspaper sections and multi-day story chains
- automatic notebook entries for selected conversations
- NPC truth/mistake/betrayal logic
- Commissioner Hayes and police-information system
- bookmaker wagers and horse-racing integration
- playable browser-native Texas Hold'em table with AI opponents — IMPLEMENTED FOUNDATION
- distinct visual rooms: shady Boiler Room, respectable Commerce Club, and elite Embassy Room — IMPLEMENTED
- full hand dealing, blinds, flop/turn/river, fold/check/call/raise, hand evaluation and showdown — IMPLEMENTED
- improve AI from personality-weighted heuristic play toward Monte Carlo/opponent-model behavior
- add correct multi-way side pots/all-in reopening rules before calling poker rules-complete
- persistent named opponents, table history and social networks in each poker circle
- legal exposure/arrest/court consequence chain
- society invitations and recurring Washington locations

## v0.4 — Company Operations

- inventory and sales over time
- durability, defects, failures, returns, warranty expense
- workforce, wages, morale, skill and labor trouble
- machinery breakdowns, maintenance and upgrades
- suppliers/materials
- debt, loans, interest, assets, liabilities and net worth
- additional electrical product lines
- plants and warehouses
- delegation/management so a larger company can buy back some of the owner's time

## v0.5 — Living America

- researched historical timeline
- original period-style reporting of researched real events
- fictional local/economic stories driven by simulation
- continuing stories across newspaper editions
- source/provenance records for historical facts
- economy affecting markets, materials, demand and credit

## v0.6 — Washington Network

- bankers, lawyers, journalists, politicians, police, lobbyists and industrialists
- persistent NPC memory and hidden motives
- clubs, hotels, dinners, affairs, favors, grudges and rivalries
- bribery/corruption choices represented as game decisions and consequences
- unreliable tips and deliberately false information
- raids, investigations and scandals
- government procurement and influence

## v0.7 — The Gathering Storm / Arsenal

- European war and rearmament
- exports, shipping and commodity pressure
- government contracts and factory conversion
- researched aircraft/electrical/communications components
- inspections, deadlines, shortages and rejected lots
- legitimate profit and optional corner-cutting with long-memory consequences

## v0.8 — Public Federal Electric

- optional IPO
- valuation and percentage offered
- founder ownership and public float
- major shareholders
- board composition and voting control
- dividends, dilution, additional offerings and buybacks
- FE stock responding to actual company results and scandals
- shareholder and board confidence
- founder removal when control has genuinely been lost
- permanent ouster as a possible loss/legacy ending

## v0.9 — The Man Behind the Company

- property, family, affairs, friends and rivals
- luxury spending and personal debt
- clubs, travel, poker, horse racing and bookmakers
- personal scandals interacting with Federal Electric
- investigations, lawsuits, reporters, whistleblowers and prison exposure

## v1.0 — Federal Electric

Unify industrial operations, the living business day, markets, history, Washington, personal life, law, public-company control, newspapers and long-term legacy into one continuous simulation.

## Post-1.0

Postwar reconversion, consumer boom, Cold War industry/electronics, acquisitions, unions, R&D, patents, advertising, family succession, deeper politics, and a save-specific biography/newspaper archive.


## Stabilization queue — v0.3.6-dev

Work is performed one slice at a time on `main`, with each slice verified before moving to the next.

- [x] Remove manual Save/Load controls; autosave is authoritative; rename New Company to New Game with destructive-progress confirmation.
- [x] Poker clock initialization uses the current Federal Electric business-day time rather than resetting to 60:00.
- [x] Poker elapsed time is no longer deducted a second time when the main business clock has already been running.
- [x] Pre-flop folding no longer sends an incomplete board into the seven-card evaluator.
- [ ] Correct poker betting-round action closure and all-in/side-pot behavior.
- [ ] Make poker window-close/quit settlement unavoidable and consistent.
- [ ] Audit and rebalance lamp unit economics, payroll, contract prices, and 1938-scale costs.
- [ ] Correct selected production-grade material/cost consumption.
- [ ] Audit partial shipments, wrong-grade settlement, replacement inventory, deadlines, and repeated late penalties.
- [ ] Add two Star Club visit lengths: Brief Visit (15 business minutes, lower price/opportunity) and Afternoon Visit (30 business minutes, higher price/opportunity); both advance the same authoritative business clock and unattended factory production.
- [ ] Reset/schedule Star Club raids correctly across dates and weekdays.
- [ ] Preserve typed Federal Exchange quantities across five-second market rerenders.
- [ ] Historical/name verification pass for 1938 Washington titles, wages, and fictional entities.
- [ ] Bring MARKET-DESIGN and other documentation into sync with implemented behavior.
- [ ] Add Codex/lore documentation structure.
- [ ] Port Georgia Sun horse racing as Federal Electric scheduled race meetings: persistent horses, qualifying heats, semifinals, Main Event, visible progression, and automatic mid-day schedule.
