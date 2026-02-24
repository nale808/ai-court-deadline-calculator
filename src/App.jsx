import React, { useState, useMemo } from "react";
import { S } from "./theme.js";
import { generateChain } from "./engine/deadlines.js";
import Header from "./components/Header.jsx";
import StepBar from "./components/StepBar.jsx";
import ModeSelector from "./components/ModeSelector.jsx";
import UploadScreen from "./components/screens/UploadScreen.jsx";
import UnsupportedScreen from "./components/screens/UnsupportedScreen.jsx";
import ReviewScreen from "./components/screens/ReviewScreen.jsx";
import Step1 from "./components/screens/Step1.jsx";
import Step2 from "./components/screens/Step2.jsx";
import Step3 from "./components/screens/Step3.jsx";
import ResultsScreen from "./components/results/ResultsScreen.jsx";

export default function App() {
  const [apiKey,    setApiKey]    = useState(() => localStorage.getItem("anthropic_api_key") || "");
  const [showKey,   setShowKey]   = useState(false);
  const saveKey = k => { setApiKey(k); localStorage.setItem("anthropic_api_key", k); };

  const [mode,      setMode]      = useState("manual"); // manual | upload
  const [screen,    setScreen]    = useState("entry");  // entry | upload | unsupported | review | results
  const [step,      setStep]      = useState(0);

  const [jur,       setJur]       = useState("");
  const [trig,      setTrig]      = useState("");
  const [date,      setDate]      = useState("");
  const [opts,      setOpts]      = useState({ servedByMail: false, exceptions: {} });

  const [extracted, setExtracted] = useState(null);
  const [unsupData, setUnsupData] = useState(null);
  const [fromUpload,setFromUpload]= useState(false);

  const deadlines = useMemo(() => {
    if (!trig || !date || !jur) return [];
    try {
      const [y, m, d] = date.split("-").map(Number);
      return generateChain(trig, new Date(y, m - 1, d), jur, opts);
    } catch {
      return [];
    }
  }, [trig, date, jur, opts]);

  const reset = () => {
    setMode("manual"); setScreen("entry"); setStep(0);
    setJur(""); setTrig(""); setDate(""); setOpts({ servedByMail: false, exceptions: {} });
    setExtracted(null); setUnsupData(null); setFromUpload(false);
  };

  const handleModeChange = m => {
    setMode(m);
    if (m === "upload") setScreen("upload");
    else { setScreen("entry"); setStep(0); }
  };

  const handleExtracted   = data => { setExtracted(data); setScreen("review"); };
  const handleUnsupported = data => { setUnsupData(data); setScreen("unsupported"); };
  const handleConfirm     = ({ jur: j, trig: t, date: d, opts: o }) => {
    setJur(j); setTrig(t); setDate(d); setOpts(o); setFromUpload(true); setScreen("results");
  };

  return (
    <div style={S.app}>
      <Header
        apiKey={apiKey}
        showKey={showKey}
        onToggleKey={() => setShowKey(p => !p)}
        onSaveKey={saveKey}
      />

      <div style={S.body}>
        {/* Step bar — manual flow only */}
        {screen === "entry" && mode === "manual" && <StepBar step={step} />}

        {/* Mode tabs — entry / upload screens at step 0 */}
        {(screen === "entry" || screen === "upload") && step === 0 && (
          <ModeSelector mode={mode} onChange={handleModeChange} />
        )}

        {/* Upload flow */}
        {screen === "upload" && (
          <UploadScreen
            onExtracted={handleExtracted}
            onUnsupported={handleUnsupported}
            onBack={() => { setMode("manual"); setScreen("entry"); }}
            apiKey={apiKey}
          />
        )}

        {screen === "unsupported" && (
          <UnsupportedScreen
            data={unsupData}
            onReset={reset}
            onManual={() => { setMode("manual"); setScreen("entry"); setStep(0); }}
          />
        )}

        {screen === "review" && extracted && (
          <ReviewScreen
            extracted={extracted}
            onConfirm={handleConfirm}
            onReset={reset}
          />
        )}

        {/* Manual flow */}
        {screen === "entry" && step === 0 && <Step1 value={jur}  onChange={setJur}  onNext={() => setStep(1)} />}
        {screen === "entry" && step === 1 && <Step2 value={trig} onChange={setTrig} onNext={() => setStep(2)} onBack={() => setStep(0)} />}
        {screen === "entry" && step === 2 && (
          <Step3
            triggerDate={date} setTriggerDate={setDate}
            opts={opts} setOpts={setOpts}
            triggerEvent={trig}
            onNext={() => setScreen("results")}
            onBack={() => setStep(1)}
          />
        )}

        {/* Results — both flows */}
        {screen === "results" && (
          <ResultsScreen
            deadlines={deadlines}
            jurisdiction={jur}
            triggerEvent={trig}
            triggerDate={date}
            fromUpload={fromUpload}
            onReset={reset}
          />
        )}
      </div>
    </div>
  );
}
