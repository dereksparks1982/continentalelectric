# Federal Exchange — Market Design

## Purpose

The stock market is a major personal-wealth system inside Federal Electric, not a replacement for running the company. The owner may become extremely wealthy or lose a fortune through investing while Federal Electric remains the central industrial enterprise.

## Initial universe

v0.2 begins with **50 fictional common-stock issuers** across period-relevant sectors. The list is deliberately smaller than the historical exchange so each company can eventually develop persistent fundamentals, news, dividends, scandals, contracts, and history.

Current sectors:
- Automotive
- Aviation
- Banking
- Chemicals
- Communications
- Consumer
- Electrical
- Food
- Machinery
- Mining
- Petroleum
- Railroads
- Retail
- Shipping
- Steel
- Utilities

Names evoke the language and industrial landscape of the period without asserting that fictional events happened to real corporations.

## Trading model

- Trades use **personal cash**, never Federal Electric's corporate treasury.
- Player can trade 1, 10, or 100 shares.
- Each position tracks shares and average cost.
- Sales create realized gain/loss records.
- Holdings show market value and unrealized gain/loss.
- Brokerage commission is currently a simple gameplay abstraction and is not presented as a historically exact commission schedule.
- A transaction blotter records buys, sells, dividends, and commissions.
- Some companies pay dividends at month end.
- Price movement combines broad market tone, sector movement, company volatility, and company-specific noise.
- A simple market index provides an at-a-glance measure of the fictional exchange.

## Federal Electric

Federal Electric begins **PRIVATE — NOT QUOTED**.

The player is never required to list the company.

A future IPO event chain should let the player choose:
- whether to go public
- percentage of the company offered
- offering valuation
- capital raised into the company
- how much ownership the founder retains

After an IPO, FE becomes a live security affected by actual company performance, contracts, debt, quality, reputation, scandals, dividends, and the historical market.

Going public introduces shareholders, disclosure, dilution, board pressure, market expectations, and the possibility of eventually losing control.

## Historical model

The first v0.2 implementation is scaffolding, not a claim that its generated prices reproduce the actual 1938 tape. Later passes should layer researched historical market regimes beneath the fictional issuers.

Target formula:

**historical market regime + sector conditions + company fundamentals + company events + sentiment = fictional security movement**

This lets the fictional market react believably to the real historical world without assigning invented corporate histories to real companies.

## Planned expansion

- richer quote history and charts
- daily/period high and low
- volume
- earnings and balance-sheet fundamentals
- preferred stock and bonds where useful
- limit orders and execution delay
- broker relationships
- tips, rumors, and imperfect information
- historically appropriate margin
- bankruptcies
- mergers
- stock splits
- trading suspensions
- tender/control battles
- IPOs
- public Federal Electric
