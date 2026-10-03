import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, HeartPulse, Plus } from "lucide-react";
import { MacrosCard } from "@/components/helia/macros-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { bpm, durationMs, formatDateLong, kg, num, weekdayLabel } from "@/lib/format";
import { routinesForDay } from "@/lib/gym/suggest";
import { sumMacros } from "@/lib/nutrition/macros";
import { useHeliaStore } from "@/lib/store";
import { todayISO, weekdayIndex } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const routines = useHeliaStore((s) => s.routines);
  const workouts = useHeliaStore((s) => s.workouts);
  const nutrition = useHeliaStore((s) => s.nutrition);
  const foods = useHeliaStore((s) => s.foods);
  const targets = useHeliaStore((s) => s.targets);
  const weights = useHeliaStore((s) => s.weights);
  const polar = useHeliaStore((s) => s.polarSessions);
  const name = useHeliaStore((s) => s.settings.displayName);
  const startWorkout = useHeliaStore((s) => s.startWorkout);
  const navigate = useNavigate();

  const today = todayISO();
  const day = weekdayIndex();
  const todayRoutines = routinesForDay(routines, day);
  const todayWorkouts = workouts.filter((w) => w.date === today);
  const lastWeight = weights[weights.length - 1];
  const lastPolar = polar[polar.length - 1];

  return (
    <div className="mx-auto max-w-lg px-4 py-6 space-y-6">
      <header className="space-y-1">
        <p className="text-sm text-subtle">{formatDateLong(today)}</p>
        <h1 className="text-2xl font-display font-semibold tracking-tight">
          Hallo, {name}
        </h1>
      </header>

      <MacrosCard />

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-subtle">Training heute</h2>
          <Button
            size="sm"
            onClick={() => {
              const id = startWorkout(todayRoutines[0]?.id);
              navigate({ to: "/training/session" });
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Start
          </Button>
        </div>
        {todayRoutines.length === 0 && todayWorkouts.length === 0 && (
          <Card>
            <CardContent className="py-6 text-center text-sm text-subtle">
              Kein Plan für heute. Starte ein freies Workout.
            </CardContent>
          </Card>
        )}
        {todayRoutines.map((r) => (
          <Card key={r.id}>
            <CardContent className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{r.name}</div>
                <div className="text-xs text-subtle">{r.exercises.length} Übungen</div>
              </div>
              <Badge variant="outline">{weekdayLabel(r.dayOfWeek)}</Badge>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="py-4">
            <div className="text-xs text-subtle">Gewicht</div>
            <div className="text-lg font-medium">{kg(lastWeight?.kg)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <div className="text-xs text-subtle flex items-center gap-1">
              <HeartPulse className="h-3 w-3" /> Letzte Session
            </div>
            <div className="text-lg font-medium">{bpm(lastPolar?.avgBpm)}</div>
          </CardContent>
        </Card>
      </section>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" asChild>
          <Link to="/nutrition">Nutrition <ArrowRight className="h-4 w-4 ml-1" /></Link>
        </Button>
        <Button variant="outline" className="flex-1" asChild>
          <Link to="/polar">Polar <ArrowRight className="h-4 w-4 ml-1" /></Link>
        </Button>
      </div>
    </div>
  );
}
