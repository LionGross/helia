import type { Routine } from "@/lib/types";

export function routinesForDay(routines: Routine[], dayIndex: number): Routine[] {
  return routines.filter((r) => r.dayOfWeek === dayIndex);
}
