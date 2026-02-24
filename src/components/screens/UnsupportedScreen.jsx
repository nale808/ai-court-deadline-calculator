import React from "react";
import { C, S } from "../../theme.js";

const SUPPORTED = [
  "C.D. Cal.", "N.D. Cal.", "S.D. Cal.", "E.D. Cal.", "CA Superior",
  "N.D. Tex.", "S.D. Tex.", "E.D. Tex.", "W.D. Tex.", "TX District",
  "S.D.N.Y.", "E.D.N.Y.", "N.D.N.Y.", "W.D.N.Y.", "NY Supreme",
  "S.D. Fla.", "M.D. Fla.", "N.D. Fla.", "FL Circuit",
];

export default function UnsupportedScreen({ data, onReset, onManual }) {
  return (
    <div>
      <div style={S.stitle}>Jurisdiction Not Supported</div>
      <div style={{ height: 1, background: C.border, margin: "1.2rem 0" }} />

      <div style={{ background: C.navyL, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.yellow}`, borderRadius: 4, padding: "1.4rem 1.5rem", marginBottom: "1.5rem" }}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: "1rem", color: C.yellow, marginBottom: "0.6rem" }}>📋 Document Analyzed</div>
        {data.caseFound  && <div style={{ fontSize: "0.85rem", color: C.creamD, marginBottom: "0.3rem" }}><span style={{ color: C.creamM }}>Case: </span>{data.caseFound}</div>}
        {data.courtFound && <div style={{ fontSize: "0.85rem", color: C.creamD, marginBottom: "0.8rem" }}><span style={{ color: C.creamM }}>Court found: </span>{data.courtFound}</div>}
        <div style={{ fontSize: "0.83rem", color: C.creamM, lineHeight: 1.55, background: C.yellowD, border: `1px solid ${C.yellowB}`, padding: "0.7rem 0.9rem", borderRadius: 3 }}>
          {data.reason || "This court or document type is not currently supported. We support federal and state courts in California, Texas, New York, and Florida."}
        </div>
      </div>

      <div style={{ background: C.navyL, border: `1px solid ${C.border}`, borderRadius: 4, padding: "1rem 1.2rem", fontSize: "0.82rem", color: C.creamM, lineHeight: 1.6, marginBottom: "1.5rem" }}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: "0.88rem", color: C.creamD, marginBottom: "0.4rem" }}>Currently supported jurisdictions</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.4rem" }}>
          {SUPPORTED.map(j => (
            <span key={j} style={{ background: C.goldD, border: `1px solid ${C.goldB}`, color: C.gold, fontSize: "0.7rem", padding: "0.1rem 0.45rem", borderRadius: 2 }}>{j}</span>
          ))}
        </div>
      </div>

      <div style={S.btnRow}>
        <button style={S.btnP(false)} onClick={onManual}>Enter Manually →</button>
        <button style={S.btnG} onClick={onReset}>← Start Over</button>
      </div>
    </div>
  );
}
