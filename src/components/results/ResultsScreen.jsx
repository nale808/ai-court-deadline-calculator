import React from "react";
import { C, S } from "../../theme.js";
import { JURISDICTIONS } from "../../data/jurisdictions.js";
import { TRIGGER_EVENTS } from "../../data/triggerEvents.js";
import { formatDate } from "../../engine/deadlines.js";
import PartySection from "./PartySection.jsx";

const PARTY_SECTIONS = [
  { key: "plaintiff", label: "Plaintiff / Moving Party",     icon: "⚖️", color: "#1a6095",  bg: "rgba(26,96,149,0.06)",  border: "rgba(26,96,149,0.2)"  },
  { key: "defendant", label: "Defendant / Responding Party", icon: "🛡",  color: "#8b3a2a",  bg: "rgba(139,58,42,0.06)", border: "rgba(139,58,42,0.2)"  },
  { key: "both",      label: "All Parties",                  icon: "⚖",  color: C.gold,     bg: C.goldD,                border: C.goldB                },
  { key: "court",     label: "Court",                        icon: "🏛",  color: C.green,    bg: C.greenD,               border: "rgba(46,125,82,0.2)"  },
];

export default function ResultsScreen({ deadlines, jurisdiction, triggerEvent, triggerDate, fromUpload, onReset }) {
  const jObj   = JURISDICTIONS.find(j => j.id === jurisdiction);
  const tObj   = TRIGGER_EVENTS.find(t => t.id === triggerEvent);
  const urgent = deadlines.filter(d => d.urgency === "urgent").length;
  const warn   = deadlines.filter(d => d.urgency === "warn").length;

  const byParty = {};
  for (const s of PARTY_SECTIONS) {
    byParty[s.key] = deadlines.filter(d => d.party === s.key).sort((a, b) => a.dateObj - b.dateObj);
  }

  return (
    <div>
      <div style={{ ...S.stitle, marginBottom: "0.25rem" }}>
        Deadline Schedule
        {jObj?.court_type === "state" && <span style={S.sBadge}>State Court</span>}
        {fromUpload && (
          <span style={{ ...S.sBadge, background: "rgba(100,200,130,0.1)", border: "1px solid rgba(100,200,130,0.25)", color: "#7ade9a", marginLeft: "0.4rem" }}>
            Auto-extracted
          </span>
        )}
      </div>

      <div style={S.metaGrid}>
        {[
          ["Jurisdiction", jObj?.name],
          ["Trigger",      `${tObj?.icon} ${tObj?.name}`],
          ["Trigger Date", formatDate(triggerDate)],
          ["Total",        `${deadlines.length} deadlines · ${urgent} urgent · ${warn} approaching`],
        ].map(([l, v]) => (
          <div key={l}><div style={S.mLabel}>{l}</div><div style={S.mVal}>{v}</div></div>
        ))}
      </div>

      <div style={{ height: 1, background: C.border, margin: "1.4rem 0" }} />

      <div style={S.legend}>
        {[
          [C.red,    "Urgent (<14 days)"],
          [C.yellow, "Approaching (14–30 days)"],
          [C.green,  "Upcoming (>30 days)"],
          ["#666",   "Past"],
        ].map(([color, label]) => (
          <div key={label} style={S.lgItem}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {deadlines.length === 0
        ? <div style={{ padding: "2rem", color: C.creamF, textAlign: "center", fontStyle: "italic" }}>No deadlines found for this trigger event.</div>
        : PARTY_SECTIONS.map(s => <PartySection key={s.key} section={s} deadlines={byParty[s.key]} />)
      }

      <div style={S.btnRow}>
        <button style={S.btnG} onClick={onReset}>← New Calculation</button>
      </div>
      <div style={{ marginTop: "1.8rem", fontSize: "0.72rem", color: C.creamF, borderTop: `1px solid ${C.border}`, paddingTop: "0.9rem" }}>
        Rules verified as of January 2025 · FRCP, District Local Rules, and State Civil Procedure Rules
      </div>
    </div>
  );
}
