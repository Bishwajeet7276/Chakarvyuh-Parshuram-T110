import React, { useEffect, useState } from 'react';
import {
  Activity, ArrowDownRight, ArrowRight, Award, Battery, BookOpen, BrainCircuit,
  Check, CheckCircle2, ChevronDown, ChevronRight, CircleHelp, CircuitBoard,
  Clock3, Cpu, FlaskConical, Gauge, GraduationCap, Lightbulb, LockKeyhole,
  Menu, MessageCircle, Radio, RotateCcw, Send, Sparkles, Target, Trophy,
  Wifi, X, Zap,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Dashboard', icon: CircuitBoard },
  { id: 'learn', label: 'Learn concepts', icon: BookOpen },
  { id: 'simulator', label: 'Circuit simulator', icon: Cpu },
  { id: 'lab', label: 'Virtual laboratory', icon: FlaskConical },
  { id: 'tutor', label: 'AI learning assistant', icon: BrainCircuit },
  { id: 'quizzes', label: 'Quizzes & challenges', icon: Target },
  { id: 'projects', label: 'Innovation hub', icon: Lightbulb },
  { id: 'profile', label: 'My progress', icon: Award },
];

const LESSONS = [
  { id: 'ohm', tag: 'CIRCUIT BASICS', title: 'Voltage, current & resistance', summary: 'Build intuition for the three quantities behind every simple circuit.', time: '8 min', icon: Zap, tint: 'cyan', level: 'Foundation' },
  { id: 'diode', tag: 'ANALOG ELECTRONICS', title: 'How an LED lights up', summary: 'Understand forward bias, current limiting, and why polarity matters.', time: '6 min', icon: Lightbulb, tint: 'violet', level: 'Foundation' },
  { id: 'logic', tag: 'DIGITAL SYSTEMS', title: 'Logic gates from the ground up', summary: 'Turn simple yes/no inputs into the building blocks of computation.', time: '10 min', icon: Cpu, tint: 'blue', level: 'Core' },
  { id: 'signals', tag: 'COMMUNICATIONS', title: 'Reading a signal waveform', summary: 'Connect amplitude, frequency, and phase to real signals.', time: '9 min', icon: Activity, tint: 'green', level: 'Core' },
  { id: 'sampling', tag: 'SIGNAL PROCESSING', title: 'Sampling without the mystery', summary: 'See how continuous signals become discrete measurements.', time: '12 min', icon: Radio, tint: 'amber', level: 'Explore' },
  { id: 'sensors', tag: 'EMBEDDED & IOT', title: 'Sensors, noise & grounding', summary: 'Trace a sensor reading from the physical world to a clean signal.', time: '11 min', icon: Wifi, tint: 'rose', level: 'Explore' },
];

const EXPERIMENTS = {
  ohm: { title: "Ohm's law bench", objective: 'Measure how current changes when you vary voltage or resistance in a simple DC circuit.', parts: 'DC supply · resistor · ammeter', steps: ['Choose a supply voltage and resistor value.', 'Calculate the predicted current using I = V / R.', 'Compare your prediction with the live meter.'], observation: 'At a fixed resistance, current rises in direct proportion to voltage.', conclusion: 'For an ohmic resistor at constant temperature, V = I × R.', question: 'A 6 V supply is connected across 2 kΩ. What current flows?', answer: 0, options: ['3 mA', '12 mA', '0.33 mA'], type: 'ohm' },
  series: { title: 'Series & parallel explorer', objective: 'Compare equivalent resistance and branch current in two common resistor arrangements.', parts: 'DC supply · two resistors · switch', steps: ['Set the two resistor values.', 'Compare total resistance in series and parallel.', 'Observe why parallel branches share voltage.'], observation: 'A series path adds resistance; adding a parallel path lowers the equivalent resistance.', conclusion: 'Series resistances add. Parallel equivalent resistance is below the smallest branch resistance.', question: 'Two 1 kΩ resistors in parallel have an equivalent resistance of:', answer: 0, options: ['500 Ω', '1 kΩ', '2 kΩ'], type: 'series' },
  capacitor: { title: 'Capacitor charge & discharge', objective: 'Explore the time constant that shapes an RC circuit response.', parts: 'DC supply · resistor · capacitor · switch', steps: ['Set resistance and capacitance.', 'Watch the capacitor voltage approach the supply.', 'Use the time constant to estimate the response speed.'], observation: 'After one time constant, an ideal charging capacitor reaches about 63% of its final voltage.', conclusion: 'The time constant is τ = R × C. This ideal model omits leakage and component tolerances.', question: 'After one RC time constant, a charging capacitor reaches approximately:', answer: 1, options: ['37% of final voltage', '63% of final voltage', '100% of final voltage'], type: 'capacitor' },
  digital: { title: 'Digital logic workbench', objective: 'Test how a two-input logic gate responds to binary signals.', parts: 'Logic gate · two switches · indicator LED', steps: ['Choose a gate in the circuit simulator.', 'Toggle inputs A and B.', 'Compare each result with the truth table.'], observation: 'The output is determined by the selected gate rule, not by signal magnitude.', conclusion: 'Boolean logic provides a compact model for digital decision-making.', question: 'An AND gate outputs 1 when:', answer: 2, options: ['Either input is 1', 'Both inputs are 0', 'Both inputs are 1'], type: 'digital' },
  waveform: { title: 'Signal & communications scope', objective: 'See how amplitude and frequency change a simple periodic signal.', parts: 'Signal generator · oscilloscope display', steps: ['Adjust the signal amplitude and frequency.', 'Observe the plotted waveform update.', 'Relate the period to frequency using T = 1 / f.'], observation: 'Higher frequency packs more cycles into the same time window.', conclusion: 'This display is a visual model of an ideal sine wave, not a radio propagation simulator.', question: 'A 2 kHz sine wave has a period of:', answer: 0, options: ['0.5 ms', '2 ms', '2 s'], type: 'waveform' },
};

const PROJECTS = [
  { title: 'Smart irrigation monitor', category: 'IoT & sensors', level: 'Beginner', cost: '₹800–1,500', parts: 'Microcontroller board, soil-moisture sensor, relay, small pump, power supply.', principle: 'A moisture reading is compared with a threshold; the controller switches a low-voltage pump when soil is dry.', steps: ['Calibrate the sensor in dry and damp soil.', 'Read the analog value on the controller.', 'Add threshold logic and test with a small pump.'] },
  { title: 'Indoor air-quality node', category: 'IoT & sensors', level: 'Intermediate', cost: '₹1,200–2,500', parts: 'Wi-Fi microcontroller, particulate or gas sensor, enclosure, USB supply.', principle: 'A sensor samples air conditions and sends readings over Wi-Fi to a simple dashboard.', steps: ['Wire the sensor and verify its data sheet interface.', 'Sample and label readings with timestamps.', 'Publish measurements to a local or hosted dashboard.'] },
  { title: 'Visible-light audio link', category: 'Wireless communication', level: 'Intermediate', cost: '₹500–1,200', parts: 'LED, photodiode, transistor or amplifier, audio source, breadboard.', principle: 'An LED varies its light output with a signal; a photodiode converts received light back to an electrical signal.', steps: ['Build and test the transmitter stage.', 'Align the LED and photodiode across a short distance.', 'Compare received audio with and without ambient-light shielding.'] },
  { title: 'Room automation controller', category: 'Smart home', level: 'Beginner', cost: '₹700–1,800', parts: 'Microcontroller, light sensor, relay module, lamp rated for the demonstration.', principle: 'Sensor readings or a user command drive a controller output. Use isolated, low-voltage demonstrations only.', steps: ['Read a light sensor and set a threshold.', 'Control a low-voltage lamp through a suitable driver.', 'Add a manual override and test failure states.'] },
  { title: 'Wearable fall-alert demo', category: 'Safety systems', level: 'Advanced', cost: '₹1,500–3,000', parts: 'IMU sensor, microcontroller, buzzer, battery module, optional wireless link.', principle: 'Acceleration patterns can flag a possible fall; a local alert provides a demo response.', steps: ['Log baseline motion data.', 'Prototype a conservative threshold detector.', 'Test safely with simulated movement; do not treat as a medical device.'] },
];

const QUIZZES = {
  Circuits: [
    { prompt: 'A 9 V battery is connected to a 3 kΩ resistor. What is the current?', options: ['3 mA', '27 mA', '0.33 mA', '6 mA'], answer: 0, explain: 'I = V / R = 9 / 3000 A = 3 mA.' },
    { prompt: 'What happens to total resistance when another resistor is added in series?', options: ['It decreases', 'It increases', 'It becomes zero', 'It is unchanged'], answer: 1, explain: 'Series resistances add: Rtotal = R1 + R2 + ...' },
  ],
  Digital: [
    { prompt: 'Which gate outputs 1 only when its two inputs differ?', options: ['AND', 'OR', 'XOR', 'NOT'], answer: 2, explain: 'XOR is high when exactly one input is high.' },
    { prompt: 'What is the output of a NOT gate when its input is 1?', options: ['1', '0', 'Undefined', 'It depends on frequency'], answer: 1, explain: 'A NOT gate inverts its single binary input.' },
  ],
  Signals: [
    { prompt: 'If a signal frequency doubles, what happens to its period?', options: ['It doubles', 'It halves', 'It stays the same', 'It becomes zero'], answer: 1, explain: 'Period and frequency are inversely related: T = 1 / f.' },
    { prompt: 'What does signal amplitude describe?', options: ['The peak size of the signal', 'Cycles per second', 'Time for one cycle', 'The cable length'], answer: 0, explain: 'Amplitude describes the signal’s magnitude from its reference level.' },
  ],
};

const DEFAULT_PROGRESS = { name: 'Aarav', points: 240, completed: [], bestScore: 0, quizzesTaken: 0, quizCorrect: 0, experiments: [] };

function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem('entc-studio-progress'));
    return saved ? { ...DEFAULT_PROGRESS, ...saved } : DEFAULT_PROGRESS;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function App() {
  const [page, setPage] = useState('home');
  const [progress, setProgress] = useState(readProgress);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('entc-studio-progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    const handleNavigation = (event) => {
      setPage(event.detail);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('entc-navigate', handleNavigation);
    return () => window.removeEventListener('entc-navigate', handleNavigation);
  }, []);

  const navigate = (next) => {
    setPage(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const awardPoints = (amount) => setProgress((current) => ({ ...current, points: current.points + amount }));
  const completeLesson = (id) => setProgress((current) => current.completed.includes(id) ? current : { ...current, completed: [...current.completed, id], points: current.points + 30 });

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <button className="brand" onClick={() => navigate('home')} aria-label="ENTC Studio dashboard">
          <span className="brand-mark"><CircuitBoard size={20} /></span>
          <span className="brand-copy">ENTC<span>STUDIO</span></span>
        </button>
        <div className="side-caption">LEARNING SPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-item ${page === id ? 'active' : ''}`} onClick={() => navigate(id)} aria-current={page === id ? 'page' : undefined}>
              <Icon size={17} strokeWidth={1.8} /><span>{label}</span>{page === id && <span className="nav-active-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="streak-tile"><span className="streak-icon"><Zap size={16} /></span><span><strong>4 day streak</strong><small>Keep the current flowing</small></span></div>
          <button className="profile-mini" onClick={() => navigate('profile')}>
            <span className="avatar">{progress.name.slice(0, 1).toUpperCase()}</span><span className="profile-mini-copy"><strong>{progress.name}</strong><small>Electronics learner</small></span><ChevronRight size={16} />
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu icon-button" aria-label="Open navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
          <div className="breadcrumb"><span>Learning space</span><ChevronRight size={14} /><strong>{NAV_ITEMS.find((item) => item.id === page)?.label}</strong></div>
          <div className="topbar-right"><span className="top-date"><span className="live-dot" /> Your lab is ready</span><button className="points-chip" onClick={() => navigate('profile')}><Zap size={15} /> {progress.points} <span>XP</span></button></div>
        </header>
        <div className="page-content">
          {page === 'home' && <Dashboard progress={progress} navigate={navigate} awardPoints={awardPoints} />}
          {page === 'learn' && <Learn progress={progress} completeLesson={completeLesson} />}
          {page === 'simulator' && <Simulator />}
          {page === 'lab' && <VirtualLab progress={progress} setProgress={setProgress} />}
          {page === 'tutor' && <Tutor progress={progress} />}
          {page === 'quizzes' && <QuizPage progress={progress} setProgress={setProgress} />}
          {page === 'projects' && <InnovationHub />}
          {page === 'profile' && <Profile progress={progress} setProgress={setProgress} />}
          <footer className="footer"><span>ENTC STUDIO <span className="footer-sep">/</span> LEARN BY DOING</span><span>Educational simulations · No hardware required</span></footer>
        </div>
      </main>
      {menuOpen && <button className="scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
    </div>
  );
}

function PageHeading({ eyebrow, title, copy, action }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{copy && <p>{copy}</p>}</div>{action}</div>;
}

function Dashboard({ progress, navigate, awardPoints }) {
  const percentage = Math.round((progress.completed.length / LESSONS.length) * 100);
  return <>
    <section className="hero-panel">
      <div className="hero-content"><div className="hero-kicker"><span className="hero-kicker-dot" /> YOUR ENGINEERING PLAYGROUND</div><h1>Learn Electronics.<br /><span>Experiment Freely.</span><br />Innovate Fearlessly.</h1><p>Your interactive ENTC learning companion. Explore circuits, perform virtual experiments, master electronics concepts, and turn ideas into real-world innovations.</p><div className="hero-actions"><button className="button button-primary" onClick={() => navigate('learn')}>Start learning <ArrowRight size={16} /></button><button className="button button-quiet" onClick={() => navigate('lab')}><FlaskConical size={16} /> Explore virtual lab</button><button className="button button-quiet" onClick={() => navigate('simulator')}><CircuitBoard size={16} /> Try circuit simulator</button></div><div className="hero-meta"><span><CheckCircle2 size={15} /> No hardware needed</span><span><Clock3 size={15} /> Learn at your pace</span></div></div>
      <CircuitArt />
      <div className="hero-index">01 <span>/</span> 08</div>
    </section>

    <div className="section-title-row"><div><div className="eyebrow">YOUR SNAPSHOT</div><h2>Good to see you, {progress.name}.</h2></div><button className="text-link" onClick={() => navigate('profile')}>View your progress <ArrowRight size={15} /></button></div>
    <section className="metric-grid" aria-label="Learning statistics">
      <Metric icon={Zap} label="Learning points" value={progress.points.toLocaleString()} note="XP earned so far" accent="cyan" />
      <Metric icon={BookOpen} label="Lessons completed" value={`${progress.completed.length} / ${LESSONS.length}`} note={`${percentage}% of learning path`} accent="violet" />
      <Metric icon={Trophy} label="Quiz best score" value={`${progress.bestScore}%`} note={`${progress.quizzesTaken} quiz sessions`} accent="amber" />
      <Metric icon={FlaskConical} label="Lab experiments" value={progress.experiments.length} note="Completed explorations" accent="green" />
    </section>

    <div className="dashboard-grid">
      <section className="surface continue-panel"><div className="surface-head"><div><div className="eyebrow">PICK UP WHERE YOU LEFT OFF</div><h3>Continue exploring</h3></div><button className="square-link" aria-label="Browse all lessons" onClick={() => navigate('learn')}><ArrowRight size={17} /></button></div>
        {LESSONS.slice(0, 3).map((lesson, index) => <button className="lesson-row" key={lesson.id} onClick={() => navigate('learn')}><span className={`lesson-symbol tint-${lesson.tint}`}><lesson.icon size={17} /></span><span className="lesson-row-text"><strong>{lesson.title}</strong><small>{lesson.tag} · {lesson.time}</small></span><span className="lesson-row-progress">{progress.completed.includes(lesson.id) ? <CheckCircle2 size={18} className="done-icon" /> : <span>{index === 0 ? 'NEXT' : 'START'}</span>}</span><ChevronRight size={16} className="row-chevron" /></button>)}
      </section>
      <section className="challenge-panel"><div className="challenge-top"><span className="challenge-icon"><Target size={19} /></span><span className="challenge-tag">DAILY CHALLENGE</span><span className="challenge-day">TODAY · 04</span></div><div className="challenge-lines"><span /><span /><span /></div><h3>One small signal,<br />one big idea.</h3><p>What happens to the current in a fixed resistor when you double the supply voltage?</p><div className="challenge-options"><ChallengeAnswer text="It doubles" correct answerPoints={awardPoints} /><ChallengeAnswer text="It halves" /><ChallengeAnswer text="It stays the same" /></div></section>
    </div>

    <div className="section-title-row compact-title"><div><div className="eyebrow">EXPLORE THE STUDIO</div><h2>Choose your next experiment.</h2></div><span className="section-side-note">Built for curious minds <Sparkles size={14} /></span></div>
    <div className="feature-grid">
      <FeatureCard number="01" title="Circuit simulator" description="Flip logic inputs. Watch a real truth table respond." icon={Cpu} tint="cyan" onClick={() => navigate('simulator')} />
      <FeatureCard number="02" title="Virtual laboratory" description="Measure, compare, and make sense of the numbers." icon={FlaskConical} tint="violet" onClick={() => navigate('lab')} />
      <FeatureCard number="03" title="Innovation hub" description="Turn classroom principles into practical projects." icon={Lightbulb} tint="amber" onClick={() => navigate('projects')} />
    </div>
  </>;
}

function CircuitArt() {
  return <div className="circuit-art" aria-label="Decorative printed circuit board pattern"><div className="art-crosshair crosshair-one" /><div className="art-crosshair crosshair-two" /><div className="art-chip"><span>ENTC</span><CircuitBoard size={37} strokeWidth={1.25} /><small>LEARNING CORE</small></div><span className="art-node node-a" /><span className="art-node node-b" /><span className="art-node node-c" /><span className="art-node node-d" /><div className="art-readout"><span>SYS.STATUS</span><strong><i /> READY</strong></div><div className="art-wave"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div><span className="art-label label-a">VCC +5.0V</span><span className="art-label label-b">CLK 01</span><span className="art-coordinate">18° 31' N<br />73° 51' E</span></div>;
}

function Metric({ icon: Icon, label, value, note, accent }) {
  return <div className={`metric-card metric-${accent}`}><span className="metric-icon"><Icon size={18} /></span><span className="metric-label">{label}</span><strong>{value}</strong><small>{note}</small></div>;
}

function ChallengeAnswer({ text, correct, answerPoints }) {
  const [state, setState] = useState('');
  return <button className={`challenge-answer ${state}`} onClick={() => { if (!state) { setState(correct ? 'correct' : 'incorrect'); if (correct) answerPoints(15); } }} disabled={Boolean(state)}>{state === 'correct' ? <Check size={14} /> : state === 'incorrect' ? <X size={14} /> : <span className="answer-dot" />}{text}{state && <small>{correct ? 'Correct · +15 XP' : correct === false ? 'Try another next time' : ''}</small>}</button>;
}

function FeatureCard({ number, title, description, icon: Icon, tint, onClick }) {
  return <button className="feature-card" onClick={onClick}><span className={`feature-icon tint-${tint}`}><Icon size={20} /></span><span className="feature-number">{number}</span><strong>{title}</strong><small>{description}</small><span className="feature-arrow"><ArrowDownRight size={17} /></span></button>;
}

function Learn({ progress, completeLesson }) {
  const [query, setQuery] = useState('');
  const visible = LESSONS.filter((lesson) => `${lesson.title} ${lesson.tag} ${lesson.summary}`.toLowerCase().includes(query.toLowerCase()));
  return <>
    <PageHeading eyebrow="THE CONCEPT LIBRARY" title="Learn the why." copy="Short, practical lessons connect the equations to what you can actually observe on a bench." action={<span className="heading-count"><BookOpen size={16} /> {LESSONS.length} lessons</span>} />
    <div className="lesson-toolbar"><label className="search-box"><CircleHelp size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search topics, circuits, signals…" aria-label="Search lessons" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}</label><span className="toolbar-note">{progress.completed.length} completed</span></div>
    {visible.length ? <div className="lesson-catalog">{visible.map((lesson) => <article className="catalog-card" key={lesson.id}><div className="catalog-top"><span className={`lesson-symbol tint-${lesson.tint}`}><lesson.icon size={19} /></span><span className="catalog-level">{lesson.level}</span></div><div className="eyebrow">{lesson.tag}</div><h3>{lesson.title}</h3><p>{lesson.summary}</p><div className="catalog-foot"><span><Clock3 size={14} /> {lesson.time}</span><button className={`button ${progress.completed.includes(lesson.id) ? 'button-complete' : 'button-outline'}`} onClick={() => completeLesson(lesson.id)}>{progress.completed.includes(lesson.id) ? <><Check size={15} /> Completed</> : <>Complete lesson <ArrowRight size={15} /></>}</button></div></article>)}</div> : <div className="empty-state"><CircleHelp size={23} /><strong>No lessons found</strong><span>Try a different search term.</span></div>}
    <div className="lesson-note"><Lightbulb size={17} /><span><strong>Learning tip</strong> Try a lesson, then open the simulator or lab to test the idea with your own inputs.</span></div>
  </>;
}

function Simulator() {
  const [gate, setGate] = useState('AND');
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [voltage, setVoltage] = useState(5);
  const [resistance, setResistance] = useState(330);
  const [switchOn, setSwitchOn] = useState(true);
  const output = gate === 'AND' ? a && b : gate === 'OR' ? a || b : gate === 'NOT' ? Number(!a) : Number(a !== b);
  const current = switchOn ? (voltage / resistance) * 1000 : 0;
  const explanation = gate === 'AND' ? 'AND is high only when both inputs are high.' : gate === 'OR' ? 'OR is high when at least one input is high.' : gate === 'NOT' ? 'NOT inverts its single input. Input B is ignored.' : 'XOR is high when the two inputs are different.';
  const reset = () => { setGate('AND'); setA(0); setB(0); setVoltage(5); setResistance(330); setSwitchOn(true); };
  return <>
    <PageHeading eyebrow="INTERACTIVE WORKBENCH" title="Make the circuit answer." copy="Change inputs and component values. The outputs update from simple Boolean logic and Ohm's law." action={<button className="button button-outline" onClick={reset}><RotateCcw size={15} /> Reset bench</button>} />
    <div className="simulator-layout"><section className="surface gate-workbench"><div className="surface-head"><div><div className="eyebrow">DIGITAL LOGIC</div><h3>Two-input logic gate</h3></div><span className="status-chip"><span /> SIMULATION LIVE</span></div>
      <div className="gate-select-row"><span className="control-label">SELECT A GATE</span><div className="segmented" role="group" aria-label="Select logic gate">{['AND', 'OR', 'NOT', 'XOR'].map((name) => <button key={name} className={gate === name ? 'selected' : ''} onClick={() => setGate(name)}>{name}</button>)}</div></div>
      <div className="logic-diagram"><div className="logic-inputs"><button className={`logic-line ${a ? 'line-on' : ''}`} onClick={() => setA((value) => Number(!value))} aria-label={`Toggle input A, currently ${a}`}>A <span>{a}</span></button>{gate !== 'NOT' && <button className={`logic-line ${b ? 'line-on' : ''}`} onClick={() => setB((value) => Number(!value))} aria-label={`Toggle input B, currently ${b}`}>B <span>{b}</span></button>}</div><div className={`gate-shape gate-${gate.toLowerCase()}`}><span>{gate}</span></div><span className={`logic-output ${output ? 'output-on' : ''}`}><i /> Y = {output}</span></div>
      <p className="logic-explanation"><Sparkles size={15} /> {explanation}</p>
      <div className="truth-title"><strong>Truth table</strong><span>Current input row is highlighted</span></div><div className="truth-table"><div className="truth-row truth-head"><span>A</span><span>{gate === 'NOT' ? '—' : 'B'}</span><span>Y</span></div>{(gate === 'NOT' ? [[0, 0], [1, 0]] : [[0, 0], [0, 1], [1, 0], [1, 1]]).map(([rowA, rowB]) => { const result = gate === 'AND' ? rowA && rowB : gate === 'OR' ? rowA || rowB : gate === 'NOT' ? Number(!rowA) : Number(rowA !== rowB); return <div key={`${rowA}-${rowB}`} className={`truth-row ${rowA === a && (gate === 'NOT' || rowB === b) ? 'truth-active' : ''}`}><span>{rowA}</span><span>{gate === 'NOT' ? '—' : rowB}</span><span className={result ? 'truth-one' : ''}>{result}</span></div>; })}</div>
    </section>
    <section className="surface component-panel"><div className="surface-head"><div><div className="eyebrow">ANALOG CIRCUIT</div><h3>LED current check</h3></div><span className={`led-status ${switchOn && current >= 2 ? 'led-status-on' : ''}`}><span /> {switchOn && current >= 2 ? 'LED ON' : 'LED OFF'}</span></div>
      <div className="component-diagram"><div className="wire wire-top" /><div className="component-battery"><Battery size={20} /><span>{voltage.toFixed(1)} V</span></div><span className="wire wire-mid" /><div className="component-resistor"><span>R</span><small>{resistance} Ω</small></div><span className="wire wire-mid" /><div className={`component-led ${switchOn && current >= 2 ? 'glowing' : ''}`}><Lightbulb size={23} /><small>LED</small></div><button className={`switch-toggle ${switchOn ? 'switch-on' : ''}`} onClick={() => setSwitchOn((on) => !on)} aria-label={`Turn circuit ${switchOn ? 'off' : 'on'}`}><span /></button></div>
      <RangeControl label="Supply voltage" value={voltage} min={0} max={12} step={0.5} unit="V" onChange={setVoltage} /><RangeControl label="Series resistor" value={resistance} min={100} max={1000} step={10} unit="Ω" onChange={setResistance} />
      <div className="meter-readings"><div><span>Calculated current</span><strong>{current.toFixed(1)} <small>mA</small></strong></div><div><span>LED forward drop</span><strong>≈ 2.0 <small>V</small></strong></div></div>
      <div className="model-note"><CircleHelp size={15} /><span>Ideal DC estimate only. A real LED needs a current-limiting resistor; forward voltage varies by device and temperature.</span></div>
    </section></div>
    <div className="limitation-strip"><LockKeyhole size={16} /><span><strong>Simulation scope</strong> These are educational logic and DC calculations, not a SPICE engine. Wire behavior, component tolerances, heating, and transient effects are not modeled.</span></div>
  </>;
}

function RangeControl({ label, value, min, max, step = 1, unit, onChange }) {
  return <label className="range-control"><span><span className="control-label">{label}</span><strong>{value}{unit}</strong></span><input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} aria-label={label} /></label>;
}

function VirtualLab({ progress, setProgress }) {
  const [experiment, setExperiment] = useState('ohm');
  const [voltage, setVoltage] = useState(6);
  const [resistance, setResistance] = useState(2000);
  const [capacitance, setCapacitance] = useState(100);
  const [frequency, setFrequency] = useState(2);
  const [amplitude, setAmplitude] = useState(3);
  const [r2, setR2] = useState(1000);
  const [answer, setAnswer] = useState(null);
  const config = EXPERIMENTS[experiment];
  const currentMa = (voltage / resistance) * 1000;
  const parallel = 1 / (1 / resistance + 1 / r2);
  const tau = resistance * capacitance / 1000;
  const completed = progress.experiments.includes(experiment);
  const observation = experiment === 'ohm' ? `Predicted current: ${currentMa.toFixed(2)} mA. Double the voltage and current doubles, as long as resistance stays constant.` : experiment === 'series' ? `Series total: ${(resistance + r2).toFixed(0)} Ω · parallel total: ${parallel.toFixed(0)} Ω. Parallel resistance is lower than either branch.` : experiment === 'capacitor' ? `Time constant τ = ${tau.toFixed(1)} ms. At one τ, the capacitor reaches about 63% of ${voltage} V (${(voltage * 0.63).toFixed(2)} V).` : experiment === 'digital' ? 'Open the Circuit Simulator to change the gate and test every input combination.' : `Period: ${(1000 / frequency).toFixed(2)} ms · Peak amplitude: ${amplitude} V. The display is an ideal sine-wave model.`;
  const markComplete = () => setProgress((current) => current.experiments.includes(experiment) ? current : { ...current, experiments: [...current.experiments, experiment], points: current.points + 25 });
  return <>
    <PageHeading eyebrow="VIRTUAL ELECTRONICS LAB" title="A bench of your own." copy="Choose an experiment, follow the procedure, and use the controls to test your prediction." action={<span className="heading-count"><FlaskConical size={16} /> 5 guided experiments</span>} />
    <div className="lab-tabs" role="tablist" aria-label="Experiments">{Object.entries(EXPERIMENTS).map(([id, item], index) => <button role="tab" aria-selected={experiment === id} className={experiment === id ? 'active' : ''} key={id} onClick={() => { setExperiment(id); setAnswer(null); }}><span>0{index + 1}</span>{item.title.split(' ').slice(0, 2).join(' ')}</button>)}</div>
    <div className="lab-layout"><section className="surface experiment-main"><div className="experiment-banner"><div><div className="eyebrow">GUIDED EXPERIMENT · {experiment.toUpperCase()}</div><h2>{config.title}</h2></div><span className="experiment-number">LAB / 0{Object.keys(EXPERIMENTS).indexOf(experiment) + 1}</span></div>
      <div className="experiment-section"><h3><span>01</span> Objective</h3><p>{config.objective}</p></div><div className="experiment-section"><h3><span>02</span> Required components</h3><div className="parts-list">{config.parts.split(' · ').map((part) => <span key={part}><Check size={13} /> {part}</span>)}</div></div><div className="experiment-section"><h3><span>03</span> Procedure</h3><ol className="step-list">{config.steps.map((step) => <li key={step}>{step}</li>)}</ol></div>
      <div className="experiment-controls"><div className="surface-head"><div><div className="eyebrow">LIVE CONTROLS</div><h3>Adjust your setup</h3></div><span className="status-chip"><span /> READY</span></div>
        {['ohm', 'series', 'capacitor'].includes(experiment) && <RangeControl label="Supply voltage" value={voltage} min={1} max={12} step={0.5} unit=" V" onChange={setVoltage} />}
        {['ohm', 'series', 'capacitor'].includes(experiment) && <RangeControl label="Resistance" value={resistance} min={100} max={10000} step={100} unit=" Ω" onChange={setResistance} />}
        {experiment === 'series' && <RangeControl label="Second resistor" value={r2} min={100} max={10000} step={100} unit=" Ω" onChange={setR2} />}
        {experiment === 'capacitor' && <RangeControl label="Capacitance" value={capacitance} min={10} max={470} step={10} unit=" µF" onChange={setCapacitance} />}
        {experiment === 'waveform' && <><RangeControl label="Frequency" value={frequency} min={1} max={10} unit=" kHz" onChange={setFrequency} /><RangeControl label="Amplitude" value={amplitude} min={1} max={5} unit=" V" onChange={setAmplitude} /><Waveform frequency={frequency} amplitude={amplitude} /></>}
        {experiment === 'digital' && <div className="digital-lab-prompt"><Cpu size={21} /><span>Open the interactive gate bench to switch between AND, OR, NOT, and XOR.</span><a href="#simulator" onClick={(event) => { event.preventDefault(); window.dispatchEvent(new CustomEvent('entc-navigate', { detail: 'simulator' })); }}>Open circuit simulator <ArrowRight size={14} /></a></div>}
        <div className="observation-box"><span className="eyebrow">LIVE OBSERVATION</span><p>{observation}</p></div>
      </div>
      <div className="experiment-section"><h3><span>04</span> Observation & conclusion</h3><p>{config.observation} {config.conclusion}</p></div>
      <div className="experiment-knowledge"><div><div className="eyebrow">CHECK YOUR UNDERSTANDING</div><h3>{config.question}</h3></div><div className="knowledge-options">{config.options.map((option, index) => <button key={option} className={answer === index ? (index === config.answer ? 'correct' : 'incorrect') : ''} onClick={() => { setAnswer(index); if (index === config.answer) markComplete(); }}>{option}{answer === index && <span>{index === config.answer ? 'Correct' : 'Not quite'}</span>}</button>)}</div>{completed && <div className="completed-note"><CheckCircle2 size={15} /> Experiment complete · +25 XP earned</div>}</div>
    </section><aside className="lab-aside"><div className="lab-score surface"><span className="eyebrow">YOUR LAB NOTEBOOK</span><strong>{progress.experiments.length}<small> / 5</small></strong><span>experiments completed</span><div className="lab-progress"><i style={{ width: `${(progress.experiments.length / 5) * 100}%` }} /></div>{Object.entries(EXPERIMENTS).map(([id, item]) => <div className="notebook-row" key={id}><span className={progress.experiments.includes(id) ? 'notebook-check done' : 'notebook-check'}>{progress.experiments.includes(id) ? <Check size={12} /> : null}</span>{item.title}</div>)}</div><div className="safety-note"><LockKeyhole size={16} /><div><strong>Virtual-only bench</strong><p>Values are idealized for learning. Real circuits require rated parts, safe supplies, and instructor guidance.</p></div></div></aside></div>
  </>;
}

function Waveform({ frequency, amplitude }) {
  const points = Array.from({ length: 60 }, (_, index) => `${(index / 59) * 100},${30 - Math.sin((index / 59) * Math.PI * 2 * frequency) * amplitude * 4}`).join(' ');
  return <div className="waveform-box"><div className="waveform-label"><span>OSCILLOSCOPE / CH 1</span><span>{frequency} kHz · {amplitude} V</span></div><svg viewBox="0 0 100 60" preserveAspectRatio="none" role="img" aria-label={`Sine wave at ${frequency} kilohertz and ${amplitude} volts`}><line x1="0" y1="30" x2="100" y2="30" /><polyline points={points} /></svg></div>;
}

function Tutor({ progress }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Hi! I’m the ENTC Studio demo tutor. Ask about a circuit, signal, or electronics concept and I’ll walk through a simple explanation. This prototype uses prepared explanations, not a live AI service.' }]);
  const suggestions = ['Explain Ohm’s law simply', 'Why does an LED need a resistor?', 'Give me a practice question'];
  const replyTo = (question) => {
    const q = question.toLowerCase();
    if (q.includes('ohm') || q.includes('current') || q.includes('voltage')) return 'Let’s take it step by step:\n1. Voltage is the electrical “push” across a component.\n2. Resistance describes how much the component opposes current.\n3. For an ohmic resistor, current = voltage ÷ resistance (I = V/R).\nExample: 6 V across 2 kΩ gives 3 mA. Double the voltage and the current doubles if resistance stays the same.';
    if (q.includes('led') || q.includes('resistor')) return 'An LED is a diode, so it conducts strongly after its forward-voltage threshold. A series resistor limits current and protects it. Estimate R = (Vsupply − Vf) / I. For a 5 V supply, 2 V LED drop, and 10 mA target: R ≈ 300 Ω. Choose a suitable rated resistor and verify the actual LED data sheet.';
    if (q.includes('xor') || q.includes('gate') || q.includes('logic')) return 'A logic gate maps binary inputs to an output. XOR is 1 when its inputs are different: 0 XOR 0 = 0, 0 XOR 1 = 1, 1 XOR 0 = 1, and 1 XOR 1 = 0. Try changing the inputs in the Circuit Simulator to see the truth table update.';
    if (q.includes('capacitor') || q.includes('rc')) return 'A capacitor stores energy in an electric field. In a simple RC circuit, the time constant τ = R × C describes how quickly voltage changes. After one time constant during charging, the capacitor reaches about 63% of its final voltage. After five time constants, it is close to settled.';
    if (q.includes('signal') || q.includes('frequency') || q.includes('wave')) return 'A periodic signal repeats. Frequency (f) is cycles per second, measured in hertz; period (T) is the time for one cycle. They are reciprocals: T = 1/f. So a 1 kHz signal has a 1 ms period. Amplitude describes the signal’s size.';
    if (q.includes('reveal') || q.includes('solution')) return 'For the practice question (5 V across 1 kΩ), use I = V/R. Convert 1 kΩ to 1000 Ω, then calculate 5/1000 A = 0.005 A = 5 mA.';
    if (q.includes('hint') || q.includes('practice') || q.includes('question')) return 'Try this: what current flows through a 1 kΩ resistor connected to 5 V? Hint: use I = V/R and convert kilo-ohms to ohms first. Work it through, then ask me to reveal the solution when you are ready.';
    return 'I don’t have a prepared explanation for that exact topic yet. Try asking about Ohm’s law, LED current limiting, logic gates, capacitors, or signal frequency. A useful troubleshooting start is to check the supply, ground reference, component orientation, and whether your meter is in the correct mode.';
  };
  const send = (text = input) => { const question = text.trim(); if (!question) return; setMessages((current) => [...current, { role: 'user', text: question }, { role: 'assistant', text: replyTo(question) }]); setInput(''); };
  return <>
    <PageHeading eyebrow="ASK, EXPLORE, UNDERSTAND" title="Let’s work it through." copy="A friendly study companion for circuit behavior, plain-English explanations, and practice hints." action={<span className="demo-chip"><span /> PREPARED DEMO RESPONSES</span>} />
    <div className="tutor-layout"><section className="tutor-chat surface"><div className="chat-header"><span className="tutor-avatar"><BrainCircuit size={19} /></span><div><strong>Studio tutor</strong><small><span /> Demo mode · prepared answers</small></div><span className="chat-lock"><LockKeyhole size={14} /> No API connected</span></div><div className="chat-messages" aria-live="polite">{messages.map((message, index) => <div className={`chat-message ${message.role}`} key={`${index}-${message.role}`}><span className="message-avatar">{message.role === 'assistant' ? <Sparkles size={14} /> : progress.name.slice(0, 1).toUpperCase()}</span><p>{message.text}</p></div>)}</div><div className="suggestion-row">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => send(suggestion)}>{suggestion} <ArrowRight size={12} /></button>)}</div><form className="chat-form" onSubmit={(event) => { event.preventDefault(); send(); }}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask an ENTC question…" aria-label="Ask a question" /><button type="submit" disabled={!input.trim()} aria-label="Send question"><Send size={17} /></button></form></section><aside className="tutor-aside"><div className="surface tutor-guide"><div className="eyebrow">A GOOD QUESTION OPENS DOORS</div><h3>Try a topic to get started.</h3><p>The demo tutor recognizes a focused set of ENTC topics and returns prepared, step-by-step explanations.</p>{['Circuit troubleshooting', 'Definitions in simple English', 'Practice questions & hints'].map((item, index) => <div className="guide-row" key={item}><span>0{index + 1}</span>{item}</div>)}</div><div className="tutor-disclaimer"><MessageCircle size={16} /><p><strong>Prototype limitation</strong><br />Responses are local examples. There is no model call, network request, or student data sent to an AI service.</p></div></aside></div>
  </>;
}

function QuizPage({ progress, setProgress }) {
  const [topic, setTopic] = useState('Circuits');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const questions = QUIZZES[topic];
  const question = questions[questionIndex];
  const chooseTopic = (next) => { setTopic(next); setQuestionIndex(0); setSelected(null); setScore(0); setFinished(false); };
  const chooseAnswer = (index) => { if (selected !== null) return; setSelected(index); if (index === question.answer) setScore((value) => value + 1); };
  const next = () => {
    if (questionIndex + 1 < questions.length) { setQuestionIndex((value) => value + 1); setSelected(null); return; }
    const computedScore = Math.round((score / questions.length) * 100);
    setFinished(true);
    setProgress((current) => ({ ...current, bestScore: Math.max(current.bestScore, computedScore), quizzesTaken: current.quizzesTaken + 1, quizCorrect: current.quizCorrect + score, points: current.points + score * 20 }));
  };
  const restart = () => { setQuestionIndex(0); setSelected(null); setScore(0); setFinished(false); };
  return <>
    <PageHeading eyebrow="PRACTICE & PLAY" title="Check what clicked." copy="Quick topic rounds, instant explanations, and points for each correct answer." action={<span className="heading-count"><Trophy size={16} /> Best score {progress.bestScore}%</span>} />
    <div className="quiz-topic-row" role="tablist" aria-label="Quiz topic">{Object.keys(QUIZZES).map((item) => <button key={item} role="tab" aria-selected={topic === item} className={topic === item ? 'active' : ''} onClick={() => chooseTopic(item)}>{item}</button>)}</div>
    <div className="quiz-layout"><section className="quiz-stage"><div className="quiz-stage-top"><span>TOPIC ROUND <b>/ {topic.toUpperCase()}</b></span><span>QUESTION {finished ? questions.length : questionIndex + 1} OF {questions.length}</span></div><div className="quiz-progress-line"><i style={{ width: `${finished ? 100 : ((questionIndex + 1) / questions.length) * 100}%` }} /></div>{finished ? <div className="quiz-result"><span className="result-medal"><Trophy size={25} /></span><div className="eyebrow">ROUND COMPLETE</div><h2>{Math.round((score / questions.length) * 100)}% <span>correct</span></h2><p>{score === questions.length ? 'Excellent work. Your fundamentals are looking sharp.' : 'Good practice. Review the explanations and take another round.'}</p><button className="button button-primary" onClick={restart}>Play again <RotateCcw size={15} /></button></div> : <><div className="quiz-question"><span className="question-number">0{questionIndex + 1}</span><h2>{question.prompt}</h2></div><div className="quiz-choice-list">{question.options.map((option, index) => <button key={option} className={`quiz-choice ${selected === index ? (index === question.answer ? 'correct' : 'incorrect') : selected !== null && index === question.answer ? 'revealed-correct' : ''}`} onClick={() => chooseAnswer(index)} disabled={selected !== null}><span>{String.fromCharCode(65 + index)}</span>{option}{selected === index && index === question.answer && <Check size={17} />}{selected === index && index !== question.answer && <X size={17} />}</button>)}</div>{selected !== null && <div className={`quiz-feedback ${selected === question.answer ? 'feedback-correct' : 'feedback-wrong'}`}><strong>{selected === question.answer ? 'That’s right.' : 'Not quite.'}</strong><span>{question.explain}</span></div>}<div className="quiz-stage-bottom"><span><Zap size={14} /> {score * 20} points this round</span><button className="button button-primary" disabled={selected === null} onClick={next}>{questionIndex + 1 === questions.length ? 'See results' : 'Next question'} <ArrowRight size={15} /></button></div></>}</section><aside className="quiz-aside"><div className="surface quiz-stats"><div className="eyebrow">YOUR PRACTICE</div><div className="quiz-score-big">{progress.bestScore}<small>%</small></div><span>personal best</span><div className="quiz-aside-divider" /><div className="quiz-stat-row"><span>Quiz rounds</span><strong>{progress.quizzesTaken}</strong></div><div className="quiz-stat-row"><span>Correct answers</span><strong>{progress.quizCorrect}</strong></div><div className="quiz-aside-tip"><Lightbulb size={15} /> Read each explanation; understanding the why is worth more than a perfect first try.</div></div></aside></div>
  </>;
}

function InnovationHub() {
  const [category, setCategory] = useState('All projects');
  const [selected, setSelected] = useState(0);
  const categories = ['All projects', ...new Set(PROJECTS.map((project) => project.category))];
  const filtered = category === 'All projects' ? PROJECTS : PROJECTS.filter((project) => project.category === category);
  const active = filtered[Math.min(selected, filtered.length - 1)];
  return <>
    <PageHeading eyebrow="FROM IDEA TO PROTOTYPE" title="Make something matter." copy="Project starters for your next club build, lab demonstration, or hackathon sprint." action={<span className="heading-count"><Lightbulb size={16} /> 5 project briefs</span>} />
    <div className="project-filter" role="tablist" aria-label="Filter projects">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => { setCategory(item); setSelected(0); }}>{item}</button>)}</div>
    <div className="project-layout"><div className="project-list">{filtered.map((project, index) => <button key={project.title} className={`project-row ${active.title === project.title ? 'selected' : ''}`} onClick={() => setSelected(index)}><span className={`project-index project-color-${index % 4}`}>0{index + 1}</span><span><strong>{project.title}</strong><small>{project.category} · {project.level}</small></span><ChevronRight size={17} /></button>)}</div><article className="project-detail surface"><div className="project-detail-top"><span className="eyebrow">PROJECT BRIEF / {String(PROJECTS.indexOf(active) + 1).padStart(2, '0')}</span><span className="project-level">{active.level}</span></div><h2>{active.title}</h2><div className="project-facts"><div><span>ESTIMATED MATERIALS</span><strong>{active.cost}</strong><small>Indicative only; local prices vary.</small></div><div><span>PROJECT AREA</span><strong>{active.category}</strong><small>Budget is a prototype estimate.</small></div></div><div className="project-detail-section"><h3>How it works</h3><p>{active.principle}</p></div><div className="project-detail-section"><h3>Suggested build sequence</h3><ol className="step-list">{active.steps.map((step) => <li key={step}>{step}</li>)}</ol></div><div className="project-parts"><Cpu size={16} /><span><strong>Components</strong>{active.parts}</span></div><div className="project-caveat"><CircleHelp size={15} /> Costs and component combinations are preliminary student-project estimates. Check current supplier pricing, data sheets, and local electrical safety rules before building.</div></article></div>
  </>;
}

function Profile({ progress, setProgress }) {
  const [name, setName] = useState(progress.name);
  const percentage = Math.round((progress.completed.length / LESSONS.length) * 100);
  const saveName = (event) => { event.preventDefault(); const trimmed = name.trim(); if (trimmed) setProgress((current) => ({ ...current, name: trimmed.slice(0, 24) })); };
  return <>
    <PageHeading eyebrow="YOUR LEARNING RECORD" title="Progress, in focus." copy="Your achievements live in this browser. Come back any time to pick up where you left off." />
    <section className="profile-hero surface"><span className="profile-avatar-large">{progress.name.slice(0, 1).toUpperCase()}</span><div className="profile-identity"><div className="eyebrow">ENTC LEARNER · LEVEL {Math.floor(progress.points / 250) + 1}</div><h2>{progress.name}</h2><p>Building fluency, one experiment at a time.</p></div><div className="profile-xp"><span>LEARNING POINTS</span><strong><Zap size={18} /> {progress.points.toLocaleString()} XP</strong></div></section>
    <div className="profile-grid"><section className="surface profile-progress"><div className="surface-head"><div><div className="eyebrow">LEARNING PATH</div><h3>Concept lessons</h3></div><strong>{progress.completed.length}/{LESSONS.length}</strong></div><div className="large-progress"><i style={{ width: `${percentage}%` }} /></div><div className="progress-caption"><span>{percentage}% complete</span><span>{LESSONS.length - progress.completed.length} lessons to explore</span></div>{LESSONS.map((lesson) => <div className="progress-lesson" key={lesson.id}><span className={`progress-check ${progress.completed.includes(lesson.id) ? 'checked' : ''}`}>{progress.completed.includes(lesson.id) ? <Check size={13} /> : null}</span><span>{lesson.title}</span><small>{progress.completed.includes(lesson.id) ? 'COMPLETE' : 'UP NEXT'}</small></div>)}</section><section className="surface achievement-panel"><div className="eyebrow">MILESTONES</div><h3>Small wins add up.</h3><div className="achievement-grid"><Achievement icon={Zap} title="First steps" unlocked={progress.points >= 15} subtitle="Earn 15 learning points" /><Achievement icon={BookOpen} title="Curious mind" unlocked={progress.completed.length >= 1} subtitle="Complete a lesson" /><Achievement icon={FlaskConical} title="Bench ready" unlocked={progress.experiments.length >= 1} subtitle="Complete an experiment" /><Achievement icon={Trophy} title="Quiz spark" unlocked={progress.bestScore >= 50} subtitle="Score 50% in a quiz" /></div></section></div>
    <section className="surface profile-settings"><div><div className="eyebrow">PROFILE SETTINGS</div><h3>What should we call you?</h3></div><form onSubmit={saveName}><input value={name} onChange={(event) => setName(event.target.value)} maxLength={24} aria-label="Student name" /><button className="button button-outline" type="submit">Save name <Check size={15} /></button></form></section>
    <section className="leaderboard surface"><div className="surface-head"><div><div className="eyebrow">THE STUDY GROUP</div><h3>Demo leaderboard</h3></div><span className="demo-chip">SAMPLE DATA</span></div>{[{ name: 'Mira Shah', xp: 860, icon: 'M' }, { name: 'Kabir Joshi', xp: 620, icon: 'K' }, { name: progress.name, xp: progress.points, icon: progress.name.slice(0, 1).toUpperCase(), me: true }, { name: 'Riya Deshmukh', xp: 180, icon: 'R' }].sort((a, b) => b.xp - a.xp).map((student, index) => <div className={`leader-row ${student.me ? 'leader-me' : ''}`} key={`${student.name}-${index}`}><span className="leader-rank">{String(index + 1).padStart(2, '0')}</span><span className="leader-avatar">{student.icon}</span><strong>{student.name}{student.me && <small>YOU</small>}</strong><span>{student.xp} XP</span></div>)}</section>
  </>;
}

function Achievement({ icon: Icon, title, unlocked, subtitle }) {
  return <div className={`achievement ${unlocked ? 'unlocked' : ''}`}><span className="achievement-icon">{unlocked ? <Icon size={18} /> : <LockKeyhole size={16} />}</span><strong>{title}</strong><small>{unlocked ? 'UNLOCKED' : subtitle}</small></div>;
}

export default App;