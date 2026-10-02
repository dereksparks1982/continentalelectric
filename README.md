# Federal Electric

**Federal Electric** is a browser-based historical industrial, financial, political, and life-management simulation about a fictional American electrical empire beginning in Washington, D.C. in 1938.

## Play

- **Play current build:** https://dereksparks1982.github.io/federalelectric/index.html?v=20261002-treasury1
- **Georgia Sun:** https://dereksparks1982.github.io/georgiasun/index.html

## Current prototype — v0.3.6-dev: Day/Night & Fight World

The simulation now runs as a living business day:

- the active date now has two one-hour phases: **Business Day** followed by **Washington Night**
- the clock and market run only while Federal Electric is visible and being played
- closing/hiding the app freezes the simulation; there is **no offline progression**
- exact remaining day time and quotations are autosaved and resume where they stopped
- the Business Day ends at 00:00 and transitions into Washington Night; the night then ends at a mandatory private Daily Report before the next morning begins
- factory and contract controls close with the Business Day rather than remaining available as free nighttime actions
- the Federal Exchange's 50 fictional securities continue moving internally during the active day, but the player sees the published opening quotation until the closing bell
- the hidden closing quotation is revealed at the close and becomes the next business day's opening basis
- instant time-consuming actions also advance the hidden market for the time they consume, so a 30-minute visit cannot freeze half a trading day
- common market, sector, and company movement components
- personal portfolio, arbitrary share quantities, Buy/Sell/Sell All, commissions, dividends, transaction history, cost basis, and realized/unrealized profit and loss
- Federal Electric remains private at game start; a future IPO is optional
- dedicated **Contracts** department between Factory and Federal Exchange
- Federal Electric starts with one real customer contract and can spend 2 business minutes seeking additional work; a search may return several offers or none
- contracts specify customer, product, required quality, quantity, price and deadline; accepted orders enter a player-controlled production queue
- Factory works against accepted contracts instead of arbitrary instant sales
- small, medium and large orders are designed around roughly 10, 20 and 30 minute production runs; the queue warns when commitments exceed the time remaining
- production consumes materials and operating cash as units are actually made
- Madam Star offers a 15-minute Brief Visit ($5) and a 30-minute Afternoon Visit ($12); the longer visit has a higher encounter opportunity while the factory continues operating
- unattended factory operation can suffer a semi-uncommon breakdown; Foreman Sullivan may fix it himself or leave the line stopped awaiting the owner's decision
- customer personalities now affect specification tolerance and whether partial deliveries are accepted
- customer history records correct, discounted, rejected, partial, and late/short outcomes and influences future offer pricing
- production grade can be set independently from the contract specification, allowing wrong-grade production and real inspection consequences
- wrong-grade shipments may be rejected for replacement or accepted only at a customer-specific discount
- finished light-bulb inventory is tracked separately as Economy, Standard, and Long-Life stock
- partial shipments are supported for customers willing to accept them
- switching production grades consumes factory setup time
- production estimates are normalized to the intended 10/20/30-minute contract bands, preventing legacy/corrupt orders from displaying impossible 31+ minute single-order estimates
- important fulfillment outcomes are recorded as customer correspondence in the Journal
- factory materials, machinery, payroll, and daily ledger
- a living **Metropolitan Ledger** newspaper with an edition archive
- personal notebook for recording tips and conversations without guaranteeing their truth
- first Washington social/underworld location: **The Star Club**, operated by Madam Star
- the Neighborhood Game is open by default; meeting Eddie Doyle through Madam Star unlocks the Commerce Club, while Commerce Club play can lead to Harrison Vale and an Embassy Room invitation
- Commerce Club sessions can build a connection with Harrison Vale, whose invitation unlocks the Embassy Room
- manual poker shows the authoritative Federal Electric business-day clock; time spent at the table passes on that same live clock and is not deducted again when you leave
- poker simulation time scales by room: Neighborhood 5 minutes, Commerce Club 10 minutes, Embassy Room 25 minutes; insufficient remaining time blocks the simulation
- factory production continues while poker consumes business time
- poker music UI is removed from the current scope
- three playable backroom poker rooms with a browser-native Texas Hold'em engine, AI opponents, distinct class-based interiors, blinds, betting streets, hand evaluation and showdown
- independently scheduled police raids
- scheduled **Capital Race Grounds** meeting: four qualifying heats, two semifinals, and a Main Event; races run automatically from 30:00 remaining through 05:00 remaining whether the player attends or not
- persistent horses carry form, fatigue, fitness, injuries, jockeys, preferences, career records, and odds across race meetings
- Win / Place / Show betting uses personal cash with no arbitrary game-imposed wager cap; available cash and future historically justified market constraints are the intended limits
- the player can place tickets in advance on any race whose field is already established; all four heats are available before they run, while semifinals and the Main Event open when qualifiers are known
- races and wagers settle on the shared business clock even while the player is elsewhere; the Race & Wager Ledger records results and running betting profit/loss
- visible tournament progression shows completed results, advancing qualifiers, upcoming fields, and the Main Event path
- licensed boxing runs during Washington Night with a persistent fighter roster, four-bout card, fighter records/styles/condition, automatic scheduled resolution, and uncapped winner betting subject to available personal cash
- the **Commission Fighter Registry** exposes persistent records, styles, ages, condition and medical status across cards
- Legal Sports switches from Capital Race Grounds during the Business Day to licensed boxing during Washington Night
- **Illicit Activities** contains the underworld side of Washington: backroom poker, bookmakers, private prizefights, cockfighting, and related contacts
- Madam Star remains available in both phases with different encounter pools and separate Brief/Afternoon versus Brief Evening/Evening visit controls
- Eddie Doyle now has a recurring **Ask What's Running** role that can reveal underground opportunities
- Capital Race Grounds can also introduce Eddie Doyle naturally while the player is present among the bettors
- private prizefights can occur during either the Business Day or Washington Night; cockfighting is independently discoverable and currently scheduled at night
- private prizefights and cockfighting have separate unlock states, betting, automatic world-clock resolution, multiple discovery routes through underworld contacts, and an Underground Ledger
- major horse-racing and licensed-boxing results carry into the next morning's **Sports** section of the Metropolitan Ledger
- red, ivory, and deep-navy Washington/corporate-paperwork UI
- the persistent header now shows both company cash and personal cash so bankroll and corporate liquidity remain visible while betting or navigating
- Executive Desk treasury controls keep company and personal money separate: a recorded owner distribution is available during the Business Day, while diverting company funds to personal use creates an accumulating unexplained corporate shortfall and accounting exposure
- treasury transfers have no arbitrary amount cap beyond available company cash

## Planned day/night structure

The two-phase time foundation is now implemented.

- **Hour 1 — Business Day:** factory, contracts, suppliers, Federal Exchange, daytime meetings, Capital Race Grounds, daytime contacts, and occasional underground distractions
- **Hour 2 — Washington Night:** the exchange and ordinary daytime business close; licensed boxing, evening social activity, and a broader underground scene become available
- Madam Star remains available in both phases, but her daytime and nighttime encounter pools are different
- planned night-only Star Club options include **Brief Evening Visit** and **Evening Visit**
- the private end-of-day report comes after the night phase; the Metropolitan Ledger is delivered at the beginning of the next day
- daytime and nighttime remain one continuous world: time spent elsewhere can cause scheduled races or other events to occur without the player being present

## Legal Sports and Illicit Activities

The Washington activity layer is being reorganized into two clear player-facing categories.

- **Legal Sports:** Capital Race Grounds by day and licensed boxing cards by night, with betting and persistent competitors
- **Illicit Activities:** backroom poker, private prizefights, cockfighting, bookmakers, and underground contacts
- private prizefights may occur during either phase so an invitation can compete directly with factory work, racing, meetings, or legal evening entertainment
- the bookmaker is a recurring information source rather than a one-time progression key; he may know about private fights, cockfights, betting action, or nothing useful on a given visit
- underground activities can be discovered through more than one contact or venue, including the bookmaker, legal boxing, Madam Star, poker circles, and other social encounters
- unlocks are independent: learning about private prizefights does not automatically reveal cockfighting, and vice versa

## Design principle

Federal Electric remains the center of the game. Markets, Washington society, gambling, corruption, war, personal relationships, newspapers, and eventual politics orbit the electrical company rather than replacing it.

Information is not omniscient. NPCs may be truthful, mistaken, or deceptive. The notebook preserves what the player was told, not objective truth. Events can occur whether the player attends them or not.

A future public Federal Electric will connect the owner's personal reputation to shareholders, the board, stock price, government relationships, and corporate control. Selling ownership can raise capital but may eventually make it possible for the founder to be removed from the company.

## Development documentation

- [ROADMAP.md](ROADMAP.md)
- [MARKET-DESIGN.md](MARKET-DESIGN.md)
- [FIGHT-WORLD-DESIGN.md](FIGHT-WORLD-DESIGN.md)
- [HISTORICAL-NOTES.md](HISTORICAL-NOTES.md)
- [DECISIONS.md](DECISIONS.md)
