import React from "react";
import { SLOTS } from "../utils/dateUtils";

export default function SlotSelector({ value, onChange }) {
  return (
    <select
      aria-label="delivery-slot"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-2 py-1"
    >
      {SLOTS.map((s) => (
        <option key={s.id} value={s.id}>
          {s.id}
        </option>
      ))}
    </select>
  );
}
