# Federal Electric

**Federal Electric** is a browser-based historical industrial, financial, political, and life-management simulation about a fictional American electrical empire beginning in Washington, D.C. in 1938.

## Play

- **Play current build:** https://dereksparks1982.github.io/federalelectric/index.html?v=20261001-stabilize1
- **Georgia Sun:** https://dereksparks1982.github.io/georgiasun/index.html

## Current prototype — v0.3.5-dev: On the Clock

The simulation now runs as a living business day:

- **1 real hour = 1 active in-game business day**
- the clock and market run only while Federal Electric is visible and being played
- closing/hiding the app freezes the simulation; there is **no offline progression**
- exact remaining day time and quotations are autosaved and resume where they stopped
- the day closes automatically at 00:00, with an optional End Day Early control
- the Federal Exchange's 50 fictional securities move continuously during the active day
- daily opening prices carry forward from the previous close
- common market, sector, and company movement components
- personal portfolio, arbitrary share quantities, Buy/Sell/Sell All, commissions, dividends, transaction history, cost basis, and realized/unrealized profit and loss
- Federal Electric remains private at game start; a future IPO is optional
- dedicated **Contracts** department between Factory and Federal Exchange
- Federal Electric starts with one real customer contract and can spend 2 business minutes seeking additional work; a search may return several offers or none
- contracts specify customer, product, required quality, quantity, price and deadline; accepted orders enter a player-controlled production queue
- Factory works against accepted contracts instead of arbitrary instant sales
- small, medium and large orders are designed around roughly 10, 20 and 30 minute production runs; the queue warns when commitments exceed the time remaining
- production consumes materials and operating cash as units are actually made
- Star Club visits consume 30 minutes while the factory continues operating
- unattended factory operation can suffer a semi-uncommon breakdown; Foreman Sullivan may fix it himself or leave the line stopped awaiting the owner's decision
- customer personalities now affect specification tolerance and whether partial deliveries are accepted
- customer history records correct, discounted, rejected, partial, and late/short outcomes and influences future offer pricing
- production grade can be set independently from the contract specification, allowing wrong-grade production and real inspection consequences
- wrong-grade shipments may be rejected for replacement or accepted only at a customer-specific discount
- finished lamp inventory is tracked separately as Economy, Standard, and Long-Life stock
- partial shipments are supported for customers willing to accept them
- switching production grades consumes factory setup time
- production estimates are normalized to the intended 10/20/30-minute contract bands, preventing legacy/corrupt orders from displaying impossible 31+ minute single-order estimates
- important fulfillment outcomes are recorded as customer correspondence in the Journal
- factory materials, machinery, payroll, and daily ledger
- a living **Metropolitan Ledger** newspaper with an edition archive
- personal notebook for recording tips and conversations without guaranteeing their truth
- first Washington social/underworld location: **The Star Club**, operated by Madam Star
- first persistent contacts; meeting Eddie Doyle through Madam Star unlocks the neighborhood backroom poker circuit
- 10 Neighborhood Game wins unlock the Commerce Club; simulated wins count the same as played wins
- Commerce Club sessions can build a connection with Harrison Vale, whose invitation unlocks the Embassy Room
- manual poker shows the authoritative Federal Electric business-day clock; time spent at the table passes on that same live clock and is not deducted again when you leave
- poker simulation time scales by room: Neighborhood 5 minutes, Commerce Club 10 minutes, Embassy Room 25 minutes; insufficient remaining time blocks the simulation
- factory production continues while poker consumes business time
- poker music UI is removed from the current scope
- three playable backroom poker rooms with a browser-native Texas Hold'em engine, AI opponents, distinct class-based interiors, blinds, betting streets, hand evaluation and showdown
- independently scheduled police raids
- red, ivory, and deep-navy Washington/corporate-paperwork UI

## Design principle

Federal Electric remains the center of the game. Markets, Washington society, gambling, corruption, war, personal relationships, newspapers, and eventual politics orbit the electrical company rather than replacing it.

Information is not omniscient. NPCs may be truthful, mistaken, or deceptive. The notebook preserves what the player was told, not objective truth. Events can occur whether the player attends them or not.

A future public Federal Electric will connect the owner's personal reputation to shareholders, the board, stock price, government relationships, and corporate control. Selling ownership can raise capital but may eventually make it possible for the founder to be removed from the company.

## Development documentation

- [ROADMAP.md](ROADMAP.md)
- [MARKET-DESIGN.md](MARKET-DESIGN.md)
- [HISTORICAL-NOTES.md](HISTORICAL-NOTES.md)
- [DECISIONS.md](DECISIONS.md)
