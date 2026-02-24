import React from "react";
import { C, S } from "../../theme.js";
import { TRIGGER_EVENTS } from "../../data/triggerEvents.js";

export default function Step2({ value, onChange, onNext, onBack }) {
  return (
    <div>
      <div style={S.stitle}>Select Trigger Event</div>
      <div style={S.ssub}>All deadlines calculate forward (or backward) from this event date.</div>
      <div style={S.cardGrid}>
        {TRIGGER_EVENTS.map(ev => (
          <div key={ev.id} style={S.card(value === ev.id)} onClick={() => onChange(ev.id)}>
            {value === ev.id && (
              <span style={{ position: "absolute", top: "0.55rem", right: "0.75rem", color: C.gold, fontSize: "0.78rem" }}>✓</span>
            )}
            <div style={S.cIcon}>{ev.icon}</div>
            <div style={S.cName}>{ev.name}</div>
            <div style={S.cDesc}>{ev.desc}</div>
          </div>
        ))}
      </div>
      <div style={S.btnRow}>
        <button style={S.btnG} onClick={onBack}>← Back</button>
        <button style={S.btnP(!value)} onClick={onNext} disabled={!value}>Continue →</button>
      </div>
    </div>
  );
}
