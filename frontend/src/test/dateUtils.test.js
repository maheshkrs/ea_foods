import { describe, it, expect } from "vitest";
import dayjs from "dayjs";
import { isAfterCutoff, computeDeliveryDateForSlot } from "../utils/dateUtils";

describe("dateUtils", () => {
  it("should return true if time is after cutoff", () => {
    const d = dayjs("2025-01-01T19:00:00");
    expect(isAfterCutoff(d, 18)).toBe(true);
  });

  it("should compute next day delivery if before cutoff", () => {
    const d = dayjs("2025-01-01T12:00:00");
    expect(computeDeliveryDateForSlot(d)).toBe("2025-01-02");
  });

  it("should compute +2 days if after cutoff", () => {
    const d = dayjs("2025-01-01T19:00:00");
    expect(computeDeliveryDateForSlot(d)).toBe("2025-01-03");
  });
});
