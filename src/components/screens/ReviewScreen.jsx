import React, { useState } from "react";
import { C, S } from "../../theme.js";
import { JURISDICTION_GROUPS, JURISDICTIONS } from "../../data/jurisdictions.js";
import { TRIGGER_EVENTS } from "../../data/triggerEvents.js";

export default function ReviewScreen({ extracted, onConfirm, onReset }) {
  const [jur,  setJur]  = useState(extracted.jurisdiction_id  || "");
  const [trig, setTrig] = useState(extracted.trigger_event_id || "");
  const [date, setDate] = useState(extracted.trigger_date     || "");
  const [opts, setOpts] = useState({
    servedByMail: extracted.served_by_mail || false,
    exceptions: {
      defendant_usa:         extracted.defendant_is_usa       || false,
      defendant_outside_usa: extracted.defendant_outside_usa  || false,
    },
  });

  const jObj  = JURISDICTIONS.find(j => j.id === jur);
  const tObj  = TRIGGER_EVENTS.find(t => t.id === trig);
  const ready = jur && trig && date;

  const conf      = extracted.confidence;
  const confColor = conf === "high" ? C.green : conf === "medium" ? C.yellow : C.red;
  const confLabel = conf === "high"
    ? "High confidence"
    : conf === "medium"
    ? "Medium confidence — please review"
    : "Low confidence — please verify carefully";

  const toggleExc = k => setOpts(p => ({ ...p, exceptions: { ...p.exceptions, [k]: !p.exceptions[k] } }));

  const CONDITIONS = [
    ["servedByMail",          "Served by mail (+3 calendar days)",               "FRCP 6(d)"],
    ["defendant_usa",         "United States / Federal Agency is a party",        "Extends answer & appeal to 60 days"],
    ["defendant_outside_usa", "Defendant served outside the United States",        "Extends answer to 90 days"],
  ];

  return (
    <div>
      <div style={S.stitle}>Review Extracted Information</div>
      <div style={{ ...S.ssub, marginBottom: "1rem" }}>
        Claude extracted the following from your document. Review and confirm before calculating deadlines.
      </div>

      {/* Confidence + file info */}
      <div style={{ display: "flex", gap: "0.7rem", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <div style={{ background: C.navyL, border: `1px solid ${C.border}`, borderRadius: 3, padding: "0.4rem 0.8rem", fontSize: "0.78rem", color: C.creamM }}>
          📄 {extracted.fileName}
        </div>
        <div style={{ background: C.navyL, border: `1px solid ${conf === "high" ? C.green : conf === "medium" ? C.yellow : C.red}`, borderRadius: 3, padding: "0.4rem 0.8rem", fontSize: "0.78rem", color: confColor }}>
          ◉ {confLabel}
        </div>
      </div>

      {extracted.case_name && (
        <div style={{ fontSize: "0.82rem", color: C.creamM, marginBottom: "1.2rem", padding: "0.5rem 0.8rem", background: C.navyL, border: `1px solid ${C.border}`, borderRadius: 3 }}>
          <span style={{ color: C.creamF, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}>Case: </span>
          {extracted.case_name}
        </div>
      )}

      {extracted.extraction_notes && (
        <div style={S.noteBox}>💬 {extracted.extraction_notes}</div>
      )}

      <div style={{ height: 1, background: C.border, margin: "1.4rem 0" }} />

      {/* Editable fields */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
        <div>
          <label style={S.flabel}>Jurisdiction</label>
          <select style={S.select} value={jur} onChange={e => setJur(e.target.value)}>
            <option value="">— Select —</option>
            {JURISDICTION_GROUPS.map(g => (
              <optgroup key={g.group} label={g.group}>
                {g.courts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </optgroup>
            ))}
          </select>
          {jObj && <div style={{ marginTop: "0.35rem", fontSize: "0.73rem", color: jObj.court_type === "state" ? C.blue : C.gold }}>{jObj.court_type === "state" ? "State Court" : "Federal Court"}</div>}
        </div>
        <div>
          <label style={S.flabel}>Trigger Event</label>
          <select style={S.select} value={trig} onChange={e => setTrig(e.target.value)}>
            <option value="">— Select —</option>
            {TRIGGER_EVENTS.map(t => <option key={t.id} value={t.id}>{t.icon} {t.name}</option>)}
          </select>
          {tObj && <div style={{ marginTop: "0.35rem", fontSize: "0.73rem", color: C.creamM, fontStyle: "italic" }}>{tObj.desc}</div>}
        </div>
      </div>

      <div style={{ marginBottom: "1.2rem" }}>
        <label style={S.flabel}>Trigger Date</label>
        <input type="date" style={{ ...S.select, fontFamily: "Georgia,serif" }} value={date} onChange={e => setDate(e.target.value)} />
      </div>

      {/* Options */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={S.flabel}>Conditions</label>
        {CONDITIONS.map(([key, label, sub]) => {
          const isMain  = key === "servedByMail";
          const checked = isMain ? opts.servedByMail : opts.exceptions[key];
          const toggle  = isMain ? () => setOpts(p => ({ ...p, servedByMail: !p.servedByMail })) : () => toggleExc(key);
          return (
            <div key={key} style={S.chkRow} onClick={toggle}>
              <div style={S.chkBox(checked)}>{checked && <span style={{ color: C.gold, fontSize: "0.68rem" }}>✓</span>}</div>
              <div>
                <div style={{ fontSize: "0.86rem", color: C.creamD }}>{label}</div>
                <div style={{ fontSize: "0.75rem", color: C.creamF, fontStyle: "italic" }}>{sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={S.btnRow}>
        <button style={S.btnP(!ready)} disabled={!ready} onClick={() => onConfirm({ jur, trig, date, opts })}>
          Calculate Deadlines →
        </button>
        <button style={S.btnG} onClick={onReset}>← Start Over</button>
      </div>
    </div>
  );
}
