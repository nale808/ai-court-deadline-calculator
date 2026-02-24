import React from "react";
import { C, S } from "../theme.js";

export default function ModeSelector({ mode, onChange }) {
  return (
    <div style={S.modeTabs}>
      <div
        style={{ ...S.modeTab(mode === "manual"), borderRight: `1px solid ${C.border}` }}
        onClick={() => onChange("manual")}
      >
        ✏ Manual Entry
      </div>
      <div
        style={{ ...S.modeTab(mode === "upload"), borderRight: "none" }}
        onClick={() => onChange("upload")}
      >
        📎 Upload Document
      </div>
    </div>
  );
}
