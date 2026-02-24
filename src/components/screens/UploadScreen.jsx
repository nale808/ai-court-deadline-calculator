import React, { useState, useRef } from "react";
import { C, S } from "../../theme.js";
import { extractFromDocument } from "../../api/claude.js";

export default function UploadScreen({ onExtracted, onUnsupported, onBack, apiKey }) {
  const [dragging, setDragging] = useState(false);
  const [status,   setStatus]   = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");
  const fileRef = useRef();

  const processFile = async (file) => {
    if (!apiKey) {
      setStatus("error");
      setErrorMsg("API key required — click '🔑 Set key' in the header.");
      return;
    }
    const allowed = ["application/pdf", "image/png", "image/jpeg", "image/jpg", "image/webp", "image/tiff"];
    if (!allowed.includes(file.type)) {
      setStatus("error");
      setErrorMsg("Unsupported file type. Please upload a PDF, PNG, JPG, or WEBP.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setStatus("error");
      setErrorMsg("File is too large. Maximum size is 20MB.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const base64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload  = () => res(r.result.split(",")[1]);
        r.onerror = () => rej(new Error("Failed to read file"));
        r.readAsDataURL(file);
      });

      const result = await extractFromDocument(base64, file.type, apiKey);

      if (!result.supported) {
        onUnsupported({ reason: result.unsupported_reason, courtFound: result.court_name_found, caseFound: result.case_name });
      } else {
        onExtracted({ ...result, fileName: file.name });
      }
    } catch (e) {
      setStatus("error");
      setErrorMsg("Extraction failed: " + (e.message || "Unknown error. Please try again."));
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
  };

  if (status === "loading") {
    return (
      <div>
        <div style={S.stitle}>Analyzing Document</div>
        <div style={S.ssub}>Extracting court, trigger event, and date information…</div>
        <div style={{ background: C.navyL, border: `1px solid ${C.border}`, borderRadius: 6, padding: "3rem 2rem", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1.2rem", animation: "pulse 1.5s infinite" }}>⚖️</div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: "1rem", color: C.gold, marginBottom: "0.5rem" }}>Reading document…</div>
          <div style={{ fontSize: "0.82rem", color: C.creamM }}>Identifying jurisdiction, trigger event, and relevant dates</div>
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={S.stitle}>Upload Court Document</div>
      <div style={S.ssub}>
        Upload a complaint, summons, motion, order, or other court filing. Claude will extract the
        jurisdiction, trigger event, and date automatically.
      </div>

      <div
        style={{
          background: dragging ? C.navyM : C.navyL,
          border: `2px dashed ${dragging ? C.gold : C.border}`,
          borderRadius: 6, padding: "3rem 2rem", textAlign: "center",
          cursor: "pointer", transition: "all 0.2s", marginBottom: "1.2rem"
        }}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => fileRef.current?.click()}
      >
        <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>📄</div>
        <div style={{ fontFamily: "Georgia,serif", fontSize: "1rem", color: dragging ? C.gold : C.cream, marginBottom: "0.4rem" }}>
          {dragging ? "Release to upload" : "Drag & drop your document here"}
        </div>
        <div style={{ fontSize: "0.8rem", color: C.creamM, marginBottom: "1rem" }}>or click to browse</div>
        <div style={{ fontSize: "0.74rem", color: C.creamF, letterSpacing: "0.04em" }}>
          Supports PDF, PNG, JPG, WEBP · Max 20MB
        </div>
        <input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,.tiff" onChange={onFileChange} style={{ display: "none" }} />
      </div>

      {status === "error" && (
        <div style={{ background: C.redD, border: `1px solid ${C.redB}`, borderLeft: `3px solid ${C.red}`, padding: "0.75rem 1rem", borderRadius: 3, marginBottom: "1.2rem", fontSize: "0.82rem", color: C.red }}>
          ⚠ {errorMsg}
        </div>
      )}

      <div style={{ background: C.navyL, border: `1px solid ${C.border}`, borderRadius: 4, padding: "1rem 1.2rem", fontSize: "0.8rem", color: C.creamM, lineHeight: 1.6 }}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: "0.85rem", color: C.creamD, marginBottom: "0.4rem" }}>What documents work best?</div>
        Complaints, summonses, motions, court orders, scheduling orders, notices of appeal, and similar court
        filings from California, Texas, New York, or Florida state/federal courts.
        Currently supports <span style={{ color: C.gold }}>CA · TX · NY · FL</span> federal districts and state courts.
      </div>

      <div style={S.btnRow}>
        <button style={S.btnG} onClick={onBack}>← Back</button>
      </div>
    </div>
  );
}
