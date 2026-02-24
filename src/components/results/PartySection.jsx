import React from "react";
import { C } from "../../theme.js";
import DeadlineRow from "./DeadlineRow.jsx";

export default function PartySection({ section, deadlines }) {
  if (!deadlines.length) return null;
  const urgent = deadlines.filter(d => d.urgency === "urgent").length;
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "0.6rem",
        padding: "0.55rem 1rem",
        background: section.bg, border: `1px solid ${section.border}`,
        borderBottom: "none", borderRadius: "4px 4px 0 0"
      }}>
        <span style={{ fontSize: "0.95rem" }}>{section.icon}</span>
        <span style={{ fontFamily: "Georgia,serif", fontSize: "0.92rem", color: section.color, letterSpacing: "0.02em" }}>{section.label}</span>
        <span style={{ marginLeft: "auto", fontSize: "0.71rem", color: C.creamF, letterSpacing: "0.04em" }}>
          {deadlines.length} deadline{deadlines.length !== 1 ? "s" : ""}
          {urgent > 0 && <span style={{ color: C.red, marginLeft: "0.45rem" }}>· {urgent} urgent</span>}
        </span>
      </div>
      <div style={{ border: `1px solid ${section.border}`, borderTop: "none", borderRadius: "0 0 4px 4px", overflow: "hidden" }}>
        {deadlines.map((dl, i) => <DeadlineRow key={dl.id + dl.date} dl={dl} i={i} />)}
      </div>
    </div>
  );
}
