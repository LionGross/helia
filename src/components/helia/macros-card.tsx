import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { sumMacros } from "@/lib/nutrition/macros";
import { useHeliaStore } from "@/lib/store";
import { todayISO } from "@/lib/utils";

export function MacrosCard() {
  const nutrition = useHeliaStore((s) => s.nutrition);
  const foods = useHeliaStore((s) => s.foods);
  const targets = useHeliaStore((s) => s.targets);

  const today = todayISO();
  const entries = nutrition.filter((n) => n.date === today);
  const totals = sumMacros(entries, foods);

  const items = [
    { label: "Kalorien", value: totals.kcal, target: targets.kcal, unit: "kcal" },
    { label: "Protein", value: totals.protein, target: targets.protein, unit: "g" },
    { label: "Carbs", value: totals.carbs, target: targets.carbs, unit: "g" },
    { label: "Fett", value: totals.fat, target: targets.fat, unit: "g" },
  ];

  return (
    <Card>
      <CardContent className="pt-4 space-y-3">
        <div className="text-sm font-medium text-subtle">Heute · Makros</div>
        {items.map((it) => {
          const pct = it.target ? Math.min(100, (it.value / it.target) * 100) : 0;
          return (
            <div key={it.label} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{it.label}</span>
                <span className="text-subtle">
                  {Math.round(it.value)} / {it.target} {it.unit}
                </span>
              </div>
              <Progress value={pct} />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
