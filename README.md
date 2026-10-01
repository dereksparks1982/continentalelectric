# Federal Electric

**Federal Electric** is a browser-based historical industrial, financial, political, and life-management simulation about a fictional American electrical empire beginning in Washington, D.C. in 1938.

## Play

- **Play current build:** https://dereksparks1982.github.io/federalelectric/index.html?v=20261001-1800
- **Georgia Sun:** https://dereksparks1982.github.io/georgiasun/index.html

## Current prototype — v0.3-dev: The Working Day

The simulation now runs as a living business day:

- **1 real hour = 1 active in-game business day**
- the clock and market run only while Federal Electric is visible and being played
- closing/hiding the app freezes the simulation; there is **no offline progression**
- exact remaining day time and quotations are autosaved and resume where they stopped
- the day closes automatically at 00:00, with an optional End Day Early control
- the Federal Exchange's 50 fictional securities move continuously during the active day
- daily opening prices carry forward from the previous close
- common market, sector, and company movement components
- personal portfolio, commissions, dividends, transaction history, and cost basis
- Federal Electric remains private at game start; a future IPO is optional
- factory production, materials, machinery, payroll, and daily ledger
- a living **Metropolitan Ledger** newspaper with an edition archive
- personal notebook for recording tips and conversations without guaranteeing their truth
- first Washington social/underworld location: **The Star Club**, operated by Madam Star
- first persistent contacts and bookmaker introduction
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
