// ─── COLOR TOKENS ────────────────────────────────────────────────────────────
// Earth-tone palette. Update C to retheme the entire app.
export const C = {
  // Backgrounds
  navy:   "#f5eed8",  // page background (warm beige)
  navyL:  "#fdfaf2",  // card / input background (near-white beige)
  navyM:  "#ede3c8",  // header / panel background (mid beige)
  border: "#c8b48a",  // border (tan)

  // Accent
  gold:   "#7a5c14",  // headings, seals, citations (dark amber)
  goldD:  "rgba(122,92,20,0.10)",
  goldB:  "rgba(122,92,20,0.25)",

  // Text (dark on light background)
  cream:  "#1a1008",  // primary text
  creamD: "rgba(26,16,8,0.82)",
  creamM: "rgba(26,16,8,0.55)",
  creamF: "rgba(26,16,8,0.38)",

  // Status
  red:    "#c0392b",
  redD:   "rgba(192,57,43,0.08)",
  redB:   "rgba(192,57,43,0.22)",

  yellow: "#b86e0a",
  yellowD:"rgba(184,110,10,0.08)",
  yellowB:"rgba(184,110,10,0.22)",

  green:  "#2e7d52",
  greenD: "rgba(46,125,82,0.10)",

  blue:   "#1a6095",
  blueD:  "rgba(26,96,149,0.08)",
  blueB:  "rgba(26,96,149,0.22)",
};

// ─── STYLE OBJECTS ───────────────────────────────────────────────────────────
// Shared inline-style objects referenced by multiple components.
export const S = {
  app:      { fontFamily:"'Georgia',serif", background:C.navy, color:C.cream, minHeight:"100vh" },
  header:   { borderBottom:`1px solid ${C.border}`, padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:"1rem", background:C.navyM },
  seal:     { width:40, height:40, border:`2px solid ${C.gold}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color:C.gold, flexShrink:0 },
  hTitle:   { fontSize:"1rem", color:C.cream, letterSpacing:"0.04em" },
  hSub:     { fontSize:"0.72rem", color:C.creamM, letterSpacing:"0.06em", textTransform:"uppercase" },
  badge:    { background:C.goldD, border:`1px solid ${C.goldB}`, color:C.gold, fontSize:"0.68rem", letterSpacing:"0.07em", textTransform:"uppercase", padding:"0.18rem 0.55rem", borderRadius:2 },
  body:     { maxWidth:820, margin:"0 auto", padding:"2.5rem 1.5rem 4rem" },

  // Step bar
  stepBar:  { display:"flex", alignItems:"center", marginBottom:"2.5rem" },
  stepNum:  (a, d) => ({ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.7rem", border:`1px solid ${d?C.green:a?C.gold:C.border}`, color:d?C.green:a?C.gold:C.creamF, background:d?C.greenD:a?C.goldD:"transparent" }),
  stepLbl:  (a)    => ({ fontSize:"0.73rem", letterSpacing:"0.05em", textTransform:"uppercase", color:a?C.creamD:C.creamF }),
  conn:     { flex:1, height:1, background:C.border, margin:"0 0.6rem" },

  // Typography
  stitle:   { fontFamily:"Georgia,serif", fontSize:"1.35rem", color:C.cream, marginBottom:"0.35rem" },
  ssub:     { fontSize:"0.88rem", color:C.creamM, fontStyle:"italic", marginBottom:"1.5rem" },
  flabel:   { display:"block", fontSize:"0.72rem", letterSpacing:"0.07em", textTransform:"uppercase", color:C.creamM, marginBottom:"0.5rem" },

  // Form controls
  select:   { width:"100%", background:C.navyL, border:`1px solid ${C.border}`, color:C.cream, fontFamily:"Georgia,serif", fontSize:"0.93rem", padding:"0.65rem 1rem", borderRadius:3, outline:"none", cursor:"pointer" },

  // Trigger-event cards
  cardGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:"0.75rem", marginBottom:"2rem" },
  card:     (s) => ({ background:s?C.navyM:C.navyL, border:`1px solid ${s?C.gold:C.border}`, borderRadius:4, padding:"0.9rem 1.1rem", cursor:"pointer", transition:"all 0.15s", position:"relative" }),
  cIcon:    { fontSize:"1.25rem", marginBottom:"0.35rem" },
  cName:    { fontFamily:"Georgia,serif", fontSize:"0.86rem", color:C.cream, marginBottom:"0.2rem" },
  cDesc:    { fontSize:"0.76rem", color:C.creamF, lineHeight:1.4 },

  // Checkboxes
  chkRow:   { display:"flex", alignItems:"flex-start", gap:"0.65rem", cursor:"pointer", marginBottom:"0.75rem" },
  chkBox:   (on) => ({ width:18, height:18, border:`1px solid ${on?C.gold:C.border}`, borderRadius:2, flexShrink:0, marginTop:2, display:"flex", alignItems:"center", justifyContent:"center", background:on?C.goldD:C.navyL }),

  // Buttons
  btnRow:   { display:"flex", gap:"0.75rem", marginTop:"1.8rem", alignItems:"center" },
  btnP:     (d) => ({ fontFamily:"Georgia,serif", fontSize:"0.83rem", letterSpacing:"0.05em", padding:"0.6rem 1.7rem", borderRadius:3, cursor:d?"not-allowed":"pointer", border:"none", background:d?"#a8c4b0":C.green, color:"#ffffff", opacity:d?0.5:1 }),
  btnG:     { fontFamily:"Georgia,serif", fontSize:"0.83rem", letterSpacing:"0.05em", padding:"0.6rem 1.7rem", borderRadius:3, cursor:"pointer", border:`1px solid ${C.blue}`, background:"transparent", color:C.blue },

  // Disclaimer / notes
  disc:     { background:C.goldD, border:`1px solid ${C.goldB}`, borderLeft:`3px solid ${C.gold}`, padding:"0.85rem 1.1rem", borderRadius:2, marginBottom:"1.8rem", fontSize:"0.79rem", color:C.creamM, lineHeight:1.5 },
  noteBox:  { marginTop:"0.55rem", fontSize:"0.79rem", color:C.yellow, padding:"0.45rem 0.75rem", background:C.yellowD, border:`1px solid ${C.yellowB}`, borderRadius:2 },

  // Deadline table
  trow:     (i) => ({ display:"grid", gridTemplateColumns:"130px 1fr", borderBottom:`1px solid ${C.border}`, borderTop:i===0?`1px solid ${C.border}`:"none" }),
  dcol:     { padding:"0.9rem 0.9rem 0.9rem 0", borderRight:`1px solid ${C.border}`, display:"flex", flexDirection:"column", justifyContent:"center" },
  icol:     { padding:"0.9rem 0 0.9rem 1.1rem" },
  dlName:   { fontFamily:"Georgia,serif", fontSize:"0.9rem", color:C.cream, marginBottom:"0.18rem" },
  dlCite:   { fontSize:"0.73rem", color:C.gold, marginBottom:"0.12rem" },
  dlNote:   { fontSize:"0.76rem", color:C.creamM, fontStyle:"italic", lineHeight:1.4 },

  // Tags & urgency
  tag:      (t) => {
    const m = { caution:[C.yellowD,C.yellowB,C.yellow], critical:[C.redD,C.redB,C.red] };
    const [bg,bo,co] = m[t] || ["transparent","transparent","inherit"];
    return { display:"inline-block", fontSize:"0.66rem", letterSpacing:"0.05em", textTransform:"uppercase", padding:"0.08rem 0.38rem", borderRadius:2, background:bg, border:`1px solid ${bo}`, color:co, marginRight:"0.35rem", marginTop:"0.3rem" };
  },
  uc:       (u) => u==="past"?"#666":u==="urgent"?C.red:u==="warn"?C.yellow:C.green,

  // Results meta row
  metaGrid: { display:"flex", flexWrap:"wrap", gap:"1.1rem", marginTop:"0.75rem" },
  mLabel:   { fontSize:"0.7rem", color:C.creamF, textTransform:"uppercase", letterSpacing:"0.06em" },
  mVal:     { fontSize:"0.86rem", color:C.cream },
  legend:   { display:"flex", gap:"1.1rem", marginBottom:"1.1rem", flexWrap:"wrap" },
  lgItem:   { display:"flex", alignItems:"center", gap:"0.38rem", fontSize:"0.73rem", color:C.creamM },

  // Badges
  sBadge:   { display:"inline-block", fontSize:"0.64rem", letterSpacing:"0.06em", textTransform:"uppercase", padding:"0.08rem 0.4rem", borderRadius:2, background:C.blueD, border:`1px solid ${C.blueB}`, color:C.blue, marginLeft:"0.5rem", verticalAlign:"middle" },

  // Mode tabs
  modeTabs: { display:"flex", gap:0, marginBottom:"2rem", borderRadius:4, overflow:"hidden", border:`1px solid ${C.border}` },
  modeTab:  (a) => ({ flex:1, padding:"0.65rem 1rem", textAlign:"center", cursor:"pointer", fontSize:"0.82rem", letterSpacing:"0.04em", fontFamily:"Georgia,serif", border:"none", background:a?C.navyM:"transparent", color:a?C.gold:C.creamM, borderRight:`1px solid ${C.border}`, transition:"all 0.15s" }),
};
