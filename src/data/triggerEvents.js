export const TRIGGER_EVENTS = [
  { id:"complaint_filed",  icon:"📄", name:"Complaint Filed",               desc:"Date the complaint was filed with the court" },
  { id:"complaint_served", icon:"📬", name:"Complaint Served on Defendant", desc:"Date defendant was served with summons & complaint" },
  { id:"answer_filed",     icon:"📝", name:"Answer Filed",                  desc:"Date defendant filed their answer" },
  { id:"motion_filed",     icon:"⚖️", name:"Motion Filed",                  desc:"Date a motion was filed" },
  { id:"order_issued",     icon:"🔨", name:"Court Order Issued",            desc:"Date the court entered an order or judgment" },
  { id:"discovery_opened", icon:"🔍", name:"Discovery Opens",               desc:"Date discovery period officially begins" },
  { id:"trial_date_set",   icon:"📅", name:"Trial Date Set",                desc:"The scheduled trial date (back-calculates pretrial deadlines)" },
  { id:"notice_of_appeal", icon:"📤", name:"Notice of Appeal Filed",        desc:"Date notice of appeal was filed" },
];
