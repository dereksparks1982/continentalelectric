# Continental Electric Roadmap

Continental Electric is a browser-based historical industrial, financial, social, and life-management simulation. The player runs a fictional American electrical manufacturer beginning in the late 1930s and lives the parallel life of its owner: industrialist, investor, employer, gambler, social climber, and potentially spectacular failure.

## Design rules

1. Work directly on `main` unless explicitly instructed otherwise.
2. The factory and company are the core game. Personal life, gambling, society, and vice orbit that core.
3. The interface should resemble a living 1930s-1940s corporate spreadsheet: ledgers, accounting sheets, production reports, purchase orders, memoranda, stock quotations, contracts, telegrams, and newspaper clippings.
4. Time moves slowly enough for long saves and meaningful personal history.
5. Important outcomes emerge from interacting systems rather than a single morality meter.
6. Company money and the owner's personal money are separate.
7. Information may be incomplete, delayed, biased, or wrong.
8. Real historical events and economic conditions anchor the timeline. Fictional companies and characters provide player freedom without pretending the player rewrote a real corporation's history.
9. Period-appropriate terminology, products, prices, institutions, technology, and social conditions should be researched rather than guessed.
10. Wealth creates opportunities and increasingly expensive ways to ruin yourself.

## First playable build

The first build should establish the game's identity rather than attempt the whole simulation:

- corporate-spreadsheet desktop/mobile UI
- late-1930s starting date and turn clock
- company cash and separate personal cash
- factory overview
- first civilian products, beginning with electrical goods such as light bulbs
- production quantity, unit cost, quality/durability, selling price, inventory, demand, and profit
- product-quality decision: durable premium construction versus cheaper short-life construction, with reputation and failure consequences
- employees, payroll, basic capacity, machinery condition, and maintenance
- raw-material purchasing and inventory
- basic ledger with revenue, expenses, debt, and net worth
- newspaper front page tied to the game date
- event/decision framework
- first functional period stock exchange
- save/load
- responsive browser play

## Company simulation

Planned civilian lines include lighting, electric motors, radios, household appliances, industrial electrical equipment, components, and other historically appropriate goods.

Each product can eventually track material cost, labor, machine time, quality, durability, defect rate, warranty/returns, wholesale price, retail demand, inventory, brand reputation, patents/R&D, competitors, and production-line conversion cost.

Factories should track machinery, maintenance, power, floor space, shifts, worker skill, safety, productivity, defects, bottlenecks, expansion, warehouses, freight access, insurance, fire risk, and shutdowns.

## Wartime conversion

The world changes independently of the player. European war news begins before direct U.S. entry. As American mobilization expands, Continental Electric can bid for government work and convert civilian capacity toward historically plausible electrical, aviation, communications, vehicle, industrial, and military components.

Government contracts should include specifications, inspections, deadlines, penalties, material priorities, quality requirements, political relationships, audits, and enormous upside.

Cutting corners can create short-term profit but also equipment failures, rejected lots, canceled contracts, lawsuits, investigations, blacklisting, fines, and criminal prosecution. Serious crimes can ultimately send the player to prison.

## Functional stock market

The market should function as a game system rather than a decorative price ticker.

- period-appropriate listed industries and securities
- fictional company names inspired by the industrial landscape rather than direct GTA-style copies of modern companies
- buy/sell orders, portfolio, cash balance, cost basis, gains/losses, dividends, splits where appropriate, and transaction history
- price movement driven by company fundamentals, economic cycles, historical events, war news, commodity shortages, contracts, rumors, and market sentiment
- brokers, fees, delayed information, newspaper quotations, tips, and rumors
- margin/leverage only when historically appropriate to the selected year and rules
- bankruptcies, mergers, scandals, panics, rallies, and sector rotations
- the player's own Continental Electric may eventually be privately held, publicly listed, or otherwise financed depending on design progression
- no modern companies or products appearing before their time

Historical market dates and broad conditions should be researched. Fictional issuers allow gameplay consequences without falsifying the records of real corporations.

## Newspaper and historical timeline

A newspaper is generated for game dates and becomes one of the player's main information systems.

It should mix:
- researched historical national/international headlines appropriate to the date
- war developments
- economic and market reporting
- local fictional reporting
- Continental Electric coverage when newsworthy
- advertisements
- stock quotations
- business failures and openings
- society pages
- court/legal notices
- obituaries, marriages, scandals, and gossip
- government procurement announcements
- archived issues

Major historical events remain fixed anchors. Their economic consequences propagate through materials, demand, markets, contracts, labor, and public mood.

## Personal life and mogul simulation

The player is not merely a corporation.

Planned systems include a named character, aging, home/property, spouse/family, children/inheritance, friends, rivals, bankers, brokers, executives, politicians, lawyers, journalists, club acquaintances, romantic relationships/affairs, reputation by audience, favors, grudges, scandals, drinking, parties, luxury purchases, travel, legal trouble, and personal debt.

The game should permit both disciplined and self-destructive lives. A successful industrialist can build a dynasty or squander the fortune through gambling, leverage, bad deals, excess, scandal, divorce, lawsuits, criminal conduct, or simple incompetence.

## Poker and private clubs

Carry forward and improve the Georgia Sun poker architecture:
- Texas Hold'em
- player-funded buy-ins
- named persistent AI opponents
- opponent personalities and aggression
- blinds and complete betting rounds
- proper raise reopening
- all-ins and side pots
- hand evaluation and split pots
- tells, bluff tendencies, memory, and player notes
- different table stakes and venues
- private invitations and high-stakes games
- gambling debts and creditor pressure
- hand histories and career statistics
- cheating accusations, drunken play, unpaid debts, grudges, and social consequences

Poker opponents can also be industrialists, bankers, brokers, lawyers, officials, journalists, and other useful or dangerous contacts.

## Horse racing

Carry forward and improve the Georgia Sun live-racing system:
- animated/progress-based races
- multiple race lengths
- Win / Place / Show and historically appropriate additional wagers
- odds and betting limits
- horse form/history
- jockeys
- condition
- track surface
- distance
- stamina/fatigue
- late kicks
- bad starts, bursts, stumbles, and upsets
- betting history
- persistent horses and records
- race meetings, purses, ownership, breeding/training, and jockey contracts later

Race tracks are also social spaces where the player can meet business contacts, hear rumors, create scandals, gamble away personal wealth, or cultivate relationships.

## Reputation, law, corruption, and downfall

There is no single morality bar. Different groups remember different things: workers, executives, consumers, bankers, investors, government officials, inspectors, politicians, journalists, club society, family, and the general public.

Potential consequences include strikes, resignations, whistleblowers, hostile press, lawsuits, investigations, audits, fines, rejected contracts, blacklisting, divorce, creditor action, foreclosure, bankruptcy, criminal charges, prison, loss of control of the company, and family collapse.

## Later systems

- deeper R&D and patents
- competitors with persistent corporate histories
- banking and bonds
- public share offering and corporate control
- acquisitions and mergers
- boards of directors and shareholders
- unions and labor negotiations
- advertising and brand wars
- dealerships/distributors
- rail and trucking logistics
- wartime rationing and allocation
- espionage/sabotage events treated as historical-management risks
- postwar reconversion
- housing and consumer boom
- succession, heirs, trusts, and dynasty play
- long-run company history, character biography, statistics, and newspaper archive

## Shared DNA with Georgia Sun

Systems should be shared conceptually when useful, but Continental Electric remains its own game. Reusable ideas include turn/time architecture, ledgers, newspaper generation, event decisions, audience-specific reputation, persistent NPC memory, poker, horse racing, investments, debt, legal disputes, family/legacy, save architecture, and long-form emergent history.
