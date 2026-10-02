# Federal Electric — Design Decisions

This file records decisions that should not drift silently during development.

## 2026-10-01

- Title: **Federal Electric**. Repository: `dereksparks1982/federalelectric`.
- Work on **main** only unless Derek explicitly authorizes another branch.
- Setting begins in **1938** with Washington, D.C. as the principal headquarters/political setting.
- Federal Electric remains the center of the game.
- UI is a 1930s/1940s corporate spreadsheet/paperwork desk.
- Permanent color direction: **deep navy, aged/ivory white, and restrained patriotic red**, replacing the earlier green.
- Company and personal money remain separate.
- **One real hour equals one active in-game business day.**
- Time advances only while the player is actively in the app. Hidden/closed app time does not count.
- No offline progression. The company, market, events, and timer resume from their saved state.
- The business day automatically closes when the hour expires; End Day Early is permitted.
- Newspaper reading, market activity, gambling, Washington activity, and factory management all compete for the player's limited day.
- Newspaper reading and stock trading are optional. Federal Electric operations remain economically important.
- Federal Exchange prices move continuously during the active day and carry the close into the next day's opening.
- Federal Electric begins privately held. Going public is optional and the player may remain private forever.
- If public, personal scandal can affect Federal Electric's price, shareholders, directors, credit, government relationships, and corporate control.
- Founder ownership, public float, major shareholders, board composition, and voting control are planned systems.
- Losing controlling influence can make removal by the board/shareholders possible; permanent ouster can become a loss condition.
- The game uses its own evolving newspaper rather than depending on verbatim historical newspaper copy.
- Real historical facts/dates are researched; original in-game reporting combines history with simulation events.
- Newspaper editions form a permanent save-specific archive.
- Information has sources. Sources may be truthful, mistaken, incomplete, or deliberately deceptive.
- The Personal Notebook is now the **Journal**: it records meaningful meetings, conversations, rumors, poker sessions, and other player-known events in an Ultima-style running history. It records what the player experienced or was told, not guaranteed objective truth.
- **Contacts** is a separate top-level section using a period-appropriate executive card-index concept. A person is added only after the player legitimately meets them or obtains their contact information.
- Contacts can later support calls, letters, secretaries, requested meetings, invitations, and unanswered attempts.
- The former Washington tab is renamed **After Hours** for nightlife, gambling, bookmaking, the Star Club, and other off-the-clock social activity.
- Main navigation is centered and ordered: Executive Desk, Factory, Contracts, Federal Exchange, Metropolitan Ledger, Journal, Contacts, After Hours.
- **Contracts** is a first-class department. Customers, not the player, specify required product, quality standard, quantity, price, and deadline.
- Federal Electric begins with one existing customer contract and grows its contract book through successful performance.
- Factory production advances continuously against the shared one-hour business-day clock and displays a large live progress bar.
- The player can leave the factory while production continues, but unattended operation carries semi-uncommon breakdown risk.
- A works manager/foreman may resolve unattended problems independently or may need executive authorization, leaving production stopped until the player returns.
- A Star Club visit consumes 30 minutes of the business day; production continues during that absence if the line remains operational.
- Customer history remembers correct, late, short, rejected, and eventually wrong-specification deliveries.
- NPCs should remember meaningful interactions and may develop loyalty, resentment, jealousy, rivalry, fear, affection, or indebtedness without exposing videogame meters.
- **The Star Club**, operated by fictional Madam Star, is the first Washington nightlife/underworld location.
- Bookmakers, private gambling, and backroom poker can exist as optional activities.
- Backroom poker is not one generic venue. Washington has at least three social strata of games: neighborhood/working-class, commercial/professional, and elite private-society games.
- Each poker circle has different stakes, access requirements, patrons, information opportunities, and police exposure.
- Poker opens as a separate dedicated game window, not an in-page modal.
- Daily poker availability is capped at 5 neighborhood games, 3 commercial games, and 1 elite private game.
- The elite game is not automatically available. It requires the correct introductions, invitations, or information from the player's social network.
- Poker raids should be uncommon. Playing poker must not routinely result in arrest.
- The Star Club/brothel is assumed to have protection and connections; direct raids there are rare, approximately twice per in-game year on average, with irregular timing.
- Rare Star Club raids should imply a meaningful change such as political pressure, failed protection, a new enforcement figure, betrayal, or a deliberately public crackdown.
- Production and shipment fulfillment consume active business-day time rather than resolving instantly.
- Ending the day early can cause an incomplete shipment.
- Where permitted, the player may make a partial shipment, but customers remember shortages and late deliveries.
- Customer contract history affects later order size, terms, willingness to renew, and access to valuable future contracts.
- Police raids are independent world events rather than punishment triggered by choosing to gamble.
- A player may attend a raid, avoid it knowingly, or skip gambling for unrelated reasons and discover the raid in the next newspaper.
- Police/political contacts may provide advance information, but information can be wrong or intentionally false.
- No universal morality meter. Consequences emerge through money, relationships, press, law, shareholders, boards, government, and history.
- Historical specifics are researched rather than guessed.
- Core gameplay additions remain updates to the same game rather than paid gameplay DLC.

- Contract hunting is an explicit player action. Seeking new business consumes 2 active business minutes and may return multiple offers or no suitable work.
- Contract acceptance is not artificially capped. The player may overcommit the factory and suffer deadline/customer consequences.
- Small, medium, and large lamp orders target roughly 10, 20, and 30 minutes of production time at the starting factory, leaving room for multiple orders during a one-hour business day.
- Accepted contracts enter a player-controlled production queue. The player may reprioritize waiting work; completed orders automatically hand the line to the next queued order.
- The Factory warns when estimated queued production exceeds remaining business-day time but does not block the decision.
- Federal Exchange orders use arbitrary positive whole-share quantities rather than fixed 1/10/100 lots, with Buy, Sell, and Sell All actions.
- The Federal Exchange keeps personal cash available visible and reports realized profit/loss on each stock sale and cumulatively by security.

- Poker access progression is explicit: meet Eddie Doyle through Madam Star to unlock the Neighborhood Game; win 10 Neighborhood sessions to unlock the Commerce Club; the Embassy Room requires a separate elite social introduction/invitation path rather than another win counter.
- Simulated poker is a first-class alternative to manually playing a session. Each simulation consumes exactly 5 active business minutes, advances unattended factory production, consumes one daily room session, changes personal cash, records the result in the Journal, and can trigger the same progression/events as a played session.
- A positive poker session counts as a win whether manually played or simulated.
- Admin/test override: seven clicks on the locked Embassy Room within five seconds unlock and open it immediately on click seven.
- Poker music and its UI are out of current scope and removed until explicitly revisited.

- Contract customers now have persistent buying personalities that affect specification tolerance and partial-shipment acceptance.
- Finished lamp inventory is separated by Economy, Standard, and Long-Life grade.
- Production grade is a deliberate factory setting and may differ from the customer's specification; customers can reject a wrong-grade shipment for replacement or accept it only at a discount according to their buying personality.
- Customer history records correct, discounted, rejected, partial, and late/short outcomes and feeds future commercial terms.
- Switching lamp grades costs factory setup time.
- Important customer fulfillment outcomes are recorded as correspondence in the Journal.

- All meaningful activities consume the same one-hour active business day; there are no free-time pockets.
- Manual poker displays the remaining Federal Electric business-day clock and deducts actual elapsed table time when the player leaves.
- Poker simulation costs are tiered by room: Neighborhood Game 5 business minutes, Commerce Club 10 business minutes, Embassy Room 25 business minutes.
- A simulation cannot begin unless enough business-day time remains to pay its full time cost.
- Contract production runs are normalized to the established 10/20/30-minute bands. Legacy or malformed productionSeconds values above 30 minutes are repaired during migration and before starting queued work.


## 2026-10-01 — Autosave, stabilization, and poker clock

- Federal Electric is an autosave game. Manual Save and Load controls are removed.
- The destructive reset control is named **New Game** and must warn that all previous progress will be lost before resetting.
- The business-day clock is authoritative across activities. Poker must display the same remaining day time and must not charge elapsed time twice.
- Development proceeds one verified slice at a time on `main` until the stabilization list and roadmap are cleared.
- Horse racing remains the next major gameplay system after stabilization: the meeting begins automatically halfway through the business day, missed races resolve without the player, qualifiers advance through a visible bracket, and the player may arrive late solely for later races or the Main Event.

## 2026-10-01 — Star Club visit lengths

- Madam Star will offer two adult, non-explicit visit lengths rather than a single fixed 30-minute visit.
- **Brief Visit:** 15 business minutes, lower price, lower opportunity for useful conversations/introductions.
- **Afternoon Visit:** 30 business minutes, higher price, stronger opportunity for conversations, introductions, rumors, and encounters.
- Both consume the same authoritative Federal Electric business-day clock and advance unattended factory production while the owner is away.
- The shorter option exists so late-day visits remain possible without creating a free-time pocket.

## 2026-10-01 — Blackmail and leverage

- Federal Electric will support blackmail/leverage in both directions: NPCs may blackmail the player, and the player may acquire compromising information about NPCs.
- A Star Club encounter may expose compromising conduct involving a fictional public figure or fictional presidential candidate, creating leverage rather than an automatic scripted outcome.
- Information has provenance and strength; rumor is not equivalent to documented proof.
- Leverage outcomes are systemic: compliance, refusal, favors, money, retaliation, counter-leverage, police/reporting risk, relationship damage, and consequences for Federal Electric.
- Generated compromising conduct should attach to fictional political characters. Historical figures are handled only with sourced historical facts and clearly separated simulation consequences.

## 2026-10-01 — Federal Exchange quantity control

- The share quantity field sits immediately above Buy/Sell/Sell All so the player can change quantity and execute a trade without moving across the row.
- Intraday market rerenders preserve the player's in-progress quantity entry instead of resetting it to 10.
