// Calls the Anthropic API directly from the browser.
// Requires the user's API key and the anthropic-dangerous-direct-browser-access header.

const SYSTEM_PROMPT = `You are a legal document analyzer for a court deadline calculator. Analyze the provided court document and extract key scheduling information.

You must respond with ONLY a valid JSON object — no markdown, no explanation, no preamble.

Return this exact structure:
{
  "supported": true or false,
  "unsupported_reason": "string (only if supported=false — explain what you found and why it's not supported)",
  "case_name": "string or null",
  "court_name_found": "string — exact court name as it appears in the document",
  "jurisdiction_id": "string — one of the valid IDs below, or null if not found/not supported",
  "trigger_event_id": "string — one of the valid event IDs below, or null",
  "trigger_date": "YYYY-MM-DD format, or null if not found",
  "served_by_mail": true or false,
  "defendant_is_usa": true or false,
  "defendant_outside_usa": true or false,
  "confidence": "high" | "medium" | "low",
  "extraction_notes": "brief note about what you found or any ambiguity"
}

VALID jurisdiction_id values (pick the closest match or null):
frcp, cdca, ndca, sdca, edca, ca_superior, ndtx, sdtx, edtx, wdtx, tx_district, sdny, edny, ndny, wdny, ny_supreme, sdfl, mdfl, ndfl, fl_circuit

VALID trigger_event_id values (pick the most relevant event this document represents):
- complaint_filed: when a complaint or petition was filed
- complaint_served: when a defendant was served with summons/complaint
- answer_filed: when an answer or responsive pleading was filed
- motion_filed: when a motion was filed
- order_issued: when a court order or judgment was entered
- discovery_opened: when discovery begins or a scheduling order sets discovery start
- trial_date_set: when a trial date is set or confirmed
- notice_of_appeal: when a notice of appeal was filed

Rules for "supported":
- Set supported=false if: the document is from a jurisdiction not in the valid list above, OR the document type cannot be mapped to any trigger event, OR you cannot find a clear date associated with the event.
- Set supported=true only when you can confidently identify a valid jurisdiction_id AND trigger_event_id AND trigger_date.`;

export async function extractFromDocument(base64Data, mimeType, apiKey) {
  const isImage = mimeType.startsWith("image/");
  const isPDF   = mimeType === "application/pdf";

  const content = isImage
    ? [{ type: "image",    source: { type: "base64", media_type: mimeType, data: base64Data } },
       { type: "text",     text: "Analyze this court document image and extract the scheduling information as instructed." }]
    : isPDF
    ? [{ type: "document", source: { type: "base64", media_type: "application/pdf", data: base64Data } },
       { type: "text",     text: "Analyze this court document and extract the scheduling information as instructed." }]
    : null;

  if (!content) throw new Error("Unsupported file type");

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key":    apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model:      "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system:     SYSTEM_PROMPT,
      messages:   [{ role: "user", content }],
    }),
  });

  const data  = await resp.json();
  const text  = data.content?.map(c => c.text || "").join("").trim();
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}
