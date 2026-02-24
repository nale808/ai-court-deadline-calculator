import React from "react";
import { C, S } from "../../theme.js";
import { JURISDICTION_GROUPS, JURISDICTIONS } from "../../data/jurisdictions.js";

export default function Step1({ value, onChange, onNext }) {
  const jObj = JURISDICTIONS.find(j => j.id === value);
  return (
    <div>
      <div style={S.stitle}>Select Jurisdiction</div>
      <div style={S.ssub}>Local rules automatically override FRCP baseline deadlines. State courts shown separately.</div>
      <label style={S.flabel}>Court / Jurisdiction</label>
      <select style={S.select} value={value} onChange={e => onChange(e.target.value)}>
        <option value="">— Select a jurisdiction —</option>
        {JURISDICTION_GROUPS.map(g => (
          <optgroup key={g.group} label={g.group}>
            {g.courts.map(c => (
              <option key={c.id} value={c.id}>{c.name}{c.court_type === "state" ? " (State)" : ""}</option>
            ))}
          </optgroup>
        ))}
      </select>
      {jObj?.note && <div style={S.noteBox}>⚠ {jObj.note}</div>}
      {jObj && (
        <div style={{ marginTop: "0.5rem", fontSize: "0.76rem", color: jObj.court_type === "state" ? C.blue : C.gold }}>
          {jObj.court_type === "state" ? "State Court" : "Federal Court"}
        </div>
      )}
      <div style={S.btnRow}>
        <button style={S.btnP(!value)} onClick={onNext} disabled={!value}>Continue →</button>
      </div>
    </div>
  );
}
