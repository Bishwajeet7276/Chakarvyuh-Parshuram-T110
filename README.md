# ENTC Studio

An interactive React prototype for practical Electronics and Telecommunication learning. It runs locally without a backend or API keys.

## Requirements

- Node.js 20+ or 22+
- npm

## Run locally

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite. To create and preview a production build:

```powershell
npm run build
npm run preview
```

The React application entry point is `index.html`; source code lives under `src/`.

## Project structure

```text
.
├── index.html
├── package.json
├── README.md
└── src/
	├── App.jsx       # Navigation, sample content, and interactive views
	├── main.jsx      # React entry point
	└── styles.css    # Responsive dark instrument-panel design
```

## Implemented

- Responsive dashboard with lesson recommendations, learning stats, daily challenge, and shortcuts.
- Concept library with searchable lessons and locally saved completion progress.
- Interactive AND, OR, NOT, and XOR gates with switches, output indicators, explanations, and truth tables.
- LED and resistor DC estimate with adjustable supply, resistance, and switch; calculated current and LED state update live.
- Five guided virtual experiments: Ohm's law, series/parallel circuits, RC charging, digital logic, and signal waveforms. Controls, observations, procedures, conclusions, and knowledge checks are included.
- Oscilloscope-style ideal sine wave with adjustable frequency and amplitude.
- Prepared ENTC tutor answers, worked examples, troubleshooting guidance, and practice hints. It does not connect to an AI API.
- Topic quizzes with immediate explanations, scoring, XP, and persistent best score.
- Innovation project briefs with difficulty, indicative material-cost ranges, components, working principles, and build steps.
- Profile progress, achievements, editable student name, and a clearly labeled sample leaderboard.
- Progress is stored in this browser using localStorage.

## Prototype limitations

- Circuit behavior is a small educational logic/DC calculator, not a SPICE engine. It does not model wiring faults, component tolerances, heating, or transient effects.
- Capacitor results use the ideal first-order RC approximation. The waveform display is an ideal sine-wave visualization, not a communication-channel or RF propagation simulation.
- Tutor responses and leaderboard entries are local demo content; there is no backend, live AI, shared account, or real leaderboard.
- Project costs are preliminary estimates only and vary with component selection and local suppliers. Verify data sheets and electrical safety before building physical projects.
- This prototype has no hardware interface and is not a substitute for supervised lab safety practices.