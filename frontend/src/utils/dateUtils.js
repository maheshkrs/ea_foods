import dayjs from "dayjs";

export const SLOTS = [
  { id: "Morning", start: 8, end: 11 },
  { id: "Afternoon", start: 12, end: 15 },
  { id: "Evening", start: 16, end: 19 }
];

export function isAfterCutoff(date = dayjs(), cutoffHour = 18) {
  return date.hour() >= cutoffHour;
}

export function computeDeliveryDateForSlot(date = dayjs(), cutoffHour = 18) {
  const afterCutoff = isAfterCutoff(date, cutoffHour);
  const addDays = afterCutoff ? 2 : 1;
  return date.add(addDays, "day").format("YYYY-MM-DD");
}
