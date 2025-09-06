import JSON5 from "json5";

function safeParseAIResponse(rawtext) {
  // If it's already an object/array, just return it
  if (typeof rawtext === "object") {
    return rawtext;
  }

  // If it's a string, clean and parse
  let cleanedText = rawtext
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```$/, "")
    .trim();

  try {
    return JSON.parse(cleanedText); // strict JSON
  } catch {
    try {
      return JSON5.parse(cleanedText); // loose parsing (single quotes etc.)
    } catch (err) {
      console.error("Parse failed:", err.message);
      throw new Error("Failed to parse AI response");
    }
  }
}

export {safeParseAIResponse}
