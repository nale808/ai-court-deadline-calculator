import React from "react";
import { C, S } from "../theme.js";

export default function Header({ apiKey, showKey, onToggleKey, onSaveKey }) {
  return (
    <>
      <div style={S.header}>
        <div style={S.seal}>⚖</div>
        <div>
          <div style={S.hTitle}>Court Deadline Calculator</div>
          <div style={S.hSub}>Federal &amp; State Civil Litigation · CA · TX · NY · FL</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.7rem" }}>
          <div
            onClick={onToggleKey}
            style={{
              fontSize: "0.74rem", cursor: "pointer", padding: "0.18rem 0.6rem",
              borderRadius: 2, border: `1px solid ${apiKey ? C.green : C.border}`,
              color: apiKey ? C.green : C.creamM, letterSpacing: "0.04em", userSelect: "none"
            }}
          >
            {apiKey ? "🔑 Key set" : "🔑 Set key"}
          </div>
          <div style={{ ...S.badge, marginLeft: 0 }}>MVP v1.2</div>
        </div>
      </div>
      {showKey && (
        <div style={{
          background: C.navyM, borderBottom: `1px solid ${C.border}`,
          padding: "0.6rem 1.5rem", display: "flex", alignItems: "center", gap: "0.7rem"
        }}>
          <span style={{ fontSize: "0.78rem", color: C.creamM, flexShrink: 0, letterSpacing: "0.04em" }}>
            Anthropic API Key
          </span>
          <input
            type="password"
            autoComplete="off"
            placeholder="sk-ant-api03-…"
            value={apiKey}
            onChange={e => onSaveKey(e.target.value)}
            style={{
              flex: 1, background: C.navyL, border: `1px solid ${C.border}`,
              color: C.cream, fontFamily: "monospace", fontSize: "0.82rem",
              padding: "0.38rem 0.75rem", borderRadius: 3, outline: "none"
            }}
          />
          <button onClick={onToggleKey} style={{ ...S.btnG, padding: "0.3rem 0.9rem" }}>Done</button>
        </div>
      )}
    </>
  );
}
