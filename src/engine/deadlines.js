import { FEDERAL_HOLIDAYS } from "../data/holidays.js";
import { BASE_RULES }       from "../data/rules.js";
import { RULE_URLS }        from "../data/ruleUrls.js";

export function toISO(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

export function isCourtDay(d) {
  const w = d.getDay();
  return w !== 0 && w !== 6 && !FEDERAL_HOLIDAYS.has(toISO(d));
}

export function rollForward(d) {
  const dt = new Date(d);
  while (!isCourtDay(dt)) dt.setDate(dt.getDate() + 1);
  return dt;
}

export function addCalDays(start, n) {
  const d = new Date(start);
  d.setDate(d.getDate() + n);
  return n > 0 ? rollForward(d) : d;
}

export function addCourtDays(start, n) {
  let d = new Date(start), count = 0;
  while (count < n) { d.setDate(d.getDate() + 1); if (isCourtDay(d)) count++; }
  return d;
}

export function calcDeadline(triggerDate, rule, opts = {}) {
  let days = rule.days;
  if (rule.exceptions) {
    for (const exc of rule.exceptions) {
      if (opts.exceptions?.[exc.cond]) { days = exc.days; break; }
    }
  }
  const abs = Math.abs(days);
  const dir = (rule.direction === "backward" || days < 0) ? -1 : 1;
  let result = rule.type === "court"
    ? addCourtDays(triggerDate, dir * abs)
    : addCalDays(triggerDate, dir * abs);
  if (opts.servedByMail && dir === 1 && rule.type !== "court") result = addCalDays(result, 3);

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const diff    = Math.round((result - today) / 86400000);
  const urgency = diff < 0 ? "past" : diff <= 14 ? "urgent" : diff <= 30 ? "warn" : "ok";

  return {
    id:           rule.id,
    name:         rule.name,
    party:        rule.party || "both",
    date:         toISO(result),
    dateObj:      result,
    cite:         rule.cite,
    url:          RULE_URLS[rule.id] || null,
    notes:        rule.notes,
    tags:         rule.tags  || [],
    spawns:       rule.spawns || [],
    daysFromToday: diff,
    urgency,
  };
}

export function generateChain(triggerEvent, triggerDate, jid, opts = {}) {
  const results = [], visited = new Set(), queue = [[triggerEvent, triggerDate]];
  while (queue.length) {
    const [event, eDate] = queue.shift();
    if (visited.has(event)) continue;
    visited.add(event);
    const local      = BASE_RULES.filter(r => r.jid === jid   && r.trigger === event);
    const base       = jid !== "frcp" ? BASE_RULES.filter(r => r.jid === "frcp" && r.trigger === event) : [];
    const localNames = new Set(local.map(r => r.name));
    const rules      = [...local, ...base.filter(r => !localNames.has(r.name))];
    for (const rule of rules) {
      const dl = calcDeadline(eDate, rule, opts);
      results.push(dl);
      for (const sp of dl.spawns) queue.push([sp, dl.dateObj]);
    }
  }
  return results.sort((a, b) => a.dateObj - b.dateObj);
}

export function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", year: "numeric",
  });
}
