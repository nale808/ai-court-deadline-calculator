import React from "react";
import { S } from "../theme.js";

const STEPS = ["Jurisdiction", "Trigger Event", "Date & Options", "Results"];

export default function StepBar({ step }) {
  return (
    <div style={S.stepBar}>
      {STEPS.map((s, i) => (
        <React.Fragment key={i}>
          {i > 0 && <div style={S.conn} />}
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
            <div style={S.stepNum(i === step, i < step)}>{i < step ? "✓" : i + 1}</div>
            <div style={S.stepLbl(i === step)}>{s}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
