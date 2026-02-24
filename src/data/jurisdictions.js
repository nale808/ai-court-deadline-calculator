export const JURISDICTION_GROUPS = [
  { group:"Federal — General", courts:[
    { id:"frcp",        name:"Federal — General (FRCP)",                  court_type:"federal", note:null },
  ]},
  { group:"California — Federal", courts:[
    { id:"cdca",        name:"C.D. Cal. — Central District",              court_type:"federal", note:"Judge standing orders frequently modify motion deadlines." },
    { id:"ndca",        name:"N.D. Cal. — Northern District",             court_type:"federal", note:null },
    { id:"sdca",        name:"S.D. Cal. — Southern District",             court_type:"federal", note:"Opposition deadlines are hearing-based under CivLR 7.1 — dates shown are approximations." },
    { id:"edca",        name:"E.D. Cal. — Eastern District",              court_type:"federal", note:"Motion scheduling is hearing-based under L.R. 230 — dates are approximations." },
  ]},
  { group:"California — State", courts:[
    { id:"ca_superior", name:"California Superior Court",                 court_type:"state",   note:"Motion deadlines are hearing-based (9 court days before). Dates are approximations — always calculate from your actual hearing date." },
  ]},
  { group:"Texas — Federal", courts:[
    { id:"ndtx",        name:"N.D. Tex. — Northern District",             court_type:"federal", note:null },
    { id:"sdtx",        name:"S.D. Tex. — Southern District",             court_type:"federal", note:null },
    { id:"edtx",        name:"E.D. Tex. — Eastern District",              court_type:"federal", note:"E.D. Tex. is known for fast-track scheduling. Verify judge's standing orders." },
    { id:"wdtx",        name:"W.D. Tex. — Western District",              court_type:"federal", note:null },
  ]},
  { group:"Texas — State", courts:[
    { id:"tx_district", name:"Texas District Court (TRCP)",               court_type:"state",   note:"Answer due first Monday after 20 days from service — approximated as 21 days. Verify TRCP 99." },
  ]},
  { group:"New York — Federal", courts:[
    { id:"sdny",        name:"S.D.N.Y. — Southern District",              court_type:"federal", note:null },
    { id:"edny",        name:"E.D.N.Y. — Eastern District",               court_type:"federal", note:null },
    { id:"ndny",        name:"N.D.N.Y. — Northern District",              court_type:"federal", note:null },
    { id:"wdny",        name:"W.D.N.Y. — Western District",               court_type:"federal", note:null },
  ]},
  { group:"New York — State", courts:[
    { id:"ny_supreme",  name:"New York Supreme Court (CPLR)",             court_type:"state",   note:"Motion return dates are set by the court. Opposition/reply deadlines relative to return date — approximated here." },
  ]},
  { group:"Florida — Federal", courts:[
    { id:"sdfl",        name:"S.D. Fla. — Southern District",             court_type:"federal", note:null },
    { id:"mdfl",        name:"M.D. Fla. — Middle District",               court_type:"federal", note:"M.D. Fla. generally does not allow reply briefs without leave of court." },
    { id:"ndfl",        name:"N.D. Fla. — Northern District",             court_type:"federal", note:null },
  ]},
  { group:"Florida — State", courts:[
    { id:"fl_circuit",  name:"Florida Circuit Court (Fla. R. Civ. P.)",  court_type:"state",   note:"Response deadlines vary by county. Verify with local administrative orders." },
  ]},
];

export const JURISDICTIONS = JURISDICTION_GROUPS.flatMap(g => g.courts);
export const VALID_JID     = JURISDICTIONS.map(j => j.id);
export const VALID_TRIG    = ["complaint_filed","complaint_served","answer_filed","motion_filed","order_issued","discovery_opened","trial_date_set","notice_of_appeal"];
