# ⚖️ AI Court Deadline Calculator

A browser-based tool that calculates civil litigation deadlines for federal and state courts across California, Texas, New York, and Florida. Supports both manual entry and AI-powered document extraction via the Anthropic Claude API.

![Main Screen](screenshots/Main%20Screen%201.png)

---

## Features

- **Manual flow** — select jurisdiction, trigger event, and date to instantly generate a full deadline schedule
- **Document upload** — drag and drop a court filing (PDF, PNG, JPG, WEBP) and Claude automatically extracts the jurisdiction, trigger event, and date
- **~90 deadline rules** covering FRCP, district local rules, and state civil procedure rules
- **Holiday-aware** — rolls deadlines forward past federal holidays and weekends
- **Court day support** — S.D.N.Y. and E.D.N.Y. business-day rules handled separately
- **Chained deadlines** — opposition triggers reply, complaint served triggers answer, answer triggers Rule 26(f), etc.
- **Verify links** — every deadline links to its primary source (Cornell LII, court local rules, state legislature)

---

## Supported Jurisdictions

| State | Federal Districts | State Court |
|-------|------------------|-------------|
| California | C.D. Cal., N.D. Cal., S.D. Cal., E.D. Cal. | CA Superior Court |
| Texas | N.D. Tex., S.D. Tex., E.D. Tex., W.D. Tex. | TX District Court (TRCP) |
| New York | S.D.N.Y., E.D.N.Y., N.D.N.Y., W.D.N.Y. | NY Supreme Court (CPLR) |
| Florida | S.D. Fla., M.D. Fla., N.D. Fla. | FL Circuit Court |

---

## Screenshots

| | |
|---|---|
| ![Main Screen](screenshots/Main%20Screen%201.png) | ![Trigger Events](screenshots/Manual%20Triggers%203.png) |
| ![Manual Entry](screenshots/Main%20Screen%202.png) | ![Results](screenshots/Deadline%20Schedule%204.png) |

---

## Tech Stack

- **React 18** + **Vite 5**
- Inline styles only — no CSS files (all tokens in `src/theme.js`)
- Direct browser-to-Anthropic API calls (`anthropic-dangerous-direct-browser-access`)
- No backend required

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 3. Set your API key

Click **🔑 Set key** in the top-right header and paste your [Anthropic API key](https://console.anthropic.com/). It is stored in `localStorage` only — never sent anywhere except directly to the Anthropic API.

> **Note:** The API key is only required for the **Upload Document** feature. Manual entry works without one.

---

## Project Structure

```
src/
├── App.jsx                          # Root component — all state & screen routing
├── main.jsx                         # ReactDOM entry point
├── theme.js                         # Color tokens (C) and shared style objects (S)
├── api/
│   └── claude.js                    # Anthropic API call — document extraction
├── engine/
│   └── deadlines.js                 # generateChain(), calcDeadline(), formatDate()
├── data/
│   ├── jurisdictions.js             # Court list and jurisdiction groups
│   ├── triggerEvents.js             # Trigger event definitions
│   ├── rules.js                     # ~90 deadline rules
│   ├── holidays.js                  # Federal holidays 2024–2027
│   └── ruleUrls.js                  # Primary source URLs per rule
└── components/
    ├── Header.jsx                   # App header + API key panel
    ├── StepBar.jsx                  # 4-step progress indicator
    ├── ModeSelector.jsx             # Manual / Upload tabs
    ├── screens/
    │   ├── Step1.jsx                # Jurisdiction selection
    │   ├── Step2.jsx                # Trigger event selection
    │   ├── Step3.jsx                # Date + conditions
    │   ├── UploadScreen.jsx         # Drag-and-drop file upload
    │   ├── ReviewScreen.jsx         # Review AI-extracted data
    │   └── UnsupportedScreen.jsx    # Unsupported jurisdiction fallback
    └── results/
        ├── ResultsScreen.jsx        # Full deadline schedule view
        ├── PartySection.jsx         # Deadlines grouped by party
        └── DeadlineRow.jsx          # Single deadline row
```

---

## Build for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy to any static host (Netlify, Vercel, GitHub Pages, etc.).

---

## Disclaimer

This tool is for **informational purposes only** and does not constitute legal advice. Always verify deadlines with the actual court rules and consult a licensed attorney. Rules verified as of January 2025.
