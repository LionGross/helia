import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MacrosCard } from "@/components/helia/macros-card";
import { useHeliaStore } from "@/lib/store";
import { todayISO } from "@/lib/utils";

export const Route = createFileRoute("/nutrition")({ component: NutritionPage });

function NutritionPage() {
  const foods = useHeliaStore((s) => s.foods);
  const nutrition = useHeliaStore((s) => s.nutrition);
  const addNutrition = useHeliaStore((s) => s.addNutrition);
  const [q, setQ] = useState("");

  const today = todayISO();
  const todayEntries = nutrition.filter((n) => n.date === today);
  const filtered = foods.filter((f) =>
    f.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-lg px-4 py-6 space-y-6">
      <h1 className="text-2xl font-display font-semibold">Nutrition</h1>
      <MacrosCard />

      <section className="space-y-2">
        <h2 className="text-sm font-medium text-subtle">Heute geloggt</h2>
        {todayEntries.length === 0 && (
          <p className="text-sm text-subtle">Noch nichts eingetragen.</p>
        )}
        {todayEntries.map((e) => {
          const food = foods.find((f) => f.id === e.foodId);
          return (
            <Card key={e.id}>
              <CardContent className="py-2 flex justify-between text-sm">
                <span>{food?.name ?? e.foodId}</span>
                <span className="text-subtle">{e.amount} {food?.unit}</span>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="space-y-2">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Lebensmittel suchen…"
        />
        <div className="max-h-60 overflow-y-auto space-y-1">
          {filtered.slice(0, 20).map((f) => (
            <button
              key={f.id}
              type="button"
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-muted text-sm"
              onClick={() =>
                addNutrition({ date: today, foodId: f.id, amount: f.per })
              }
            >
              <span>{f.name}</span>
              <span className="text-subtle">{f.kcal} kcal</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
