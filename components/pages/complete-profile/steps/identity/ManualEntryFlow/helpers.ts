export function formatGender(value: string): string {
  switch (value) {
    case "MALE":
      return "Male";
    case "FEMALE":
      return "Female";
    case "OTHER":
      return "Other";
    case "PREFER_NOT_TO_SAY":
      return "Prefer not to say";
    default:
      return value;
  }
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function maskAadhaar(value: string): string {
  const digits = (value || "").replace(/\D/g, "");
  if (digits.length !== 12) return value || "";
  // Show only the last 4 digits for privacy: XXXX XXXX 1234
  return `XXXX XXXX ${digits.slice(8)}`;
}
