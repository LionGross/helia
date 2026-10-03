import type { Food, NutritionEntry } from "@/lib/types";

export type MacroTotals = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

export function sumMacros(
  entries: NutritionEntry[],
  foods: Food[],
): MacroTotals {
  const byId = new Map(foods.map((f) => [f.id, f]));
  let kcal = 0, protein = 0, carbs = 0, fat = 0;
  for (const e of entries) {
    const f = byId.get(e.foodId);
    if (!f) continue;
    const factor = e.amount / (f.per || 1);
    kcal += f.kcal * factor;
    protein += f.protein * factor;
    carbs += f.carbs * factor;
    fat += f.fat * factor;
  }
  return { kcal, protein, carbs, fat };
}

export function volumeOf(entries: NutritionEntry[], foods: Food[]): number {
  return sumMacros(entries, foods).kcal;
}
