import React from "react";
import { C, S } from "../../theme.js";
import { formatDate } from "../../engine/deadlines.js";

export default function DeadlineRow({ dl, i }) {
  const uc = S.uc(dl.urgency);
  return (
    <div style={S.trow(i)}>
      <div style={S.dcol}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: "0.82rem", color: uc }}>{formatDate(dl.date)}</div>
        <div style={{ fontSize: "0.7rem", color: uc, opacity: 0.65, marginTop: "0.1rem" }}>
          {dl.urgency === "past" ? `${Math.abs(dl.daysFromToday)}d ago` : `in ${dl.daysFromToday}d`}
        </div>
      </div>
      <div style={S.icol}>
        <div style={S.dlName}>{dl.name}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.12rem" }}>
          <span style={S.dlCite}>{dl.cite}</span>
          {dl.url && (
            <a
              href={dl.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.7rem", color: C.gold, textDecoration: "none", letterSpacing: "0.04em", opacity: 0.75, whiteSpace: "nowrap", borderBottom: `1px dotted ${C.gold}` }}
            >
              Verify ↗
            </a>
          )}
        </div>
        {dl.notes && <div style={S.dlNote}>{dl.notes}</div>}
        {dl.tags.includes("critical") && <span style={S.tag("critical")}>Critical — no extension</span>}
      </div>
    </div>
  );
}
