import React from "react";
import { C, S } from "../../theme.js";

export default function Step3({ triggerDate, setTriggerDate, opts, setOpts, triggerEvent, onNext, onBack }) {
  const toggleMail = () => setOpts(p => ({ ...p, servedByMail: !p.servedByMail }));
  const toggleExc  = k  => setOpts(p => ({ ...p, exceptions: { ...p.exceptions, [k]: !p.exceptions?.[k] } }));

  const showMail = ["complaint_served", "order_issued", "motion_filed"].includes(triggerEvent);
  const showUSA  = ["complaint_served", "order_issued"].includes(triggerEvent);
  const showOut  = triggerEvent === "complaint_served";

  return (
    <div>
      <div style={S.stitle}>Date & Options</div>
      <div style={S.ssub}>Enter the trigger date and any applicable conditions.</div>
      <label style={S.flabel}>Trigger Date</label>
      <input
        type="date"
        style={{ ...S.select, fontFamily: "Georgia,serif" }}
        value={triggerDate}
        onChange={e => setTriggerDate(e.target.value)}
      />

      {(showMail || showUSA || showOut) && (
        <div style={{ marginTop: "1.4rem" }}>
          <label style={S.flabel}>Applicable Conditions</label>

          {showMail && (
            <div style={S.chkRow} onClick={toggleMail}>
              <div style={S.chkBox(opts.servedByMail)}>{opts.servedByMail && <span style={{ color: C.gold, fontSize: "0.68rem" }}>✓</span>}</div>
              <div>
                <div style={{ fontSize: "0.88rem", color: C.creamD }}>Served by mail (+3 calendar days)</div>
                <div style={{ fontSize: "0.76rem", color: C.creamF, fontStyle: "italic" }}>FRCP 6(d)</div>
              </div>
            </div>
          )}

          {showUSA && (
            <div style={S.chkRow} onClick={() => toggleExc("defendant_usa")}>
              <div style={S.chkBox(opts.exceptions?.defendant_usa)}>{opts.exceptions?.defendant_usa && <span style={{ color: C.gold, fontSize: "0.68rem" }}>✓</span>}</div>
              <div>
                <div style={{ fontSize: "0.88rem", color: C.creamD }}>United States / Federal Agency is a party</div>
                <div style={{ fontSize: "0.76rem", color: C.creamF, fontStyle: "italic" }}>Extends answer to 60 days; appeal to 60 days</div>
              </div>
            </div>
          )}

          {showOut && (
            <div style={S.chkRow} onClick={() => toggleExc("defendant_outside_usa")}>
              <div style={S.chkBox(opts.exceptions?.defendant_outside_usa)}>{opts.exceptions?.defendant_outside_usa && <span style={{ color: C.gold, fontSize: "0.68rem" }}>✓</span>}</div>
              <div>
                <div style={{ fontSize: "0.88rem", color: C.creamD }}>Defendant served outside the United States</div>
                <div style={{ fontSize: "0.76rem", color: C.creamF, fontStyle: "italic" }}>Extends answer to 90 days — FRCP 12(a)(1)(A)(i)</div>
              </div>
            </div>
          )}
        </div>
      )}

      <div style={S.btnRow}>
        <button style={S.btnG} onClick={onBack}>← Back</button>
        <button style={S.btnP(!triggerDate)} onClick={onNext} disabled={!triggerDate}>Calculate Deadlines →</button>
      </div>
    </div>
  );
}
