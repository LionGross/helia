import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useHeliaStore } from "@/lib/store";
import { formatDateLong, durationMs } from "@/lib/format";

export const Route = createFileRoute("/training")({ component: TrainingPage });

function TrainingPage() {
  const workouts = useHeliaStore((s) => s.workouts);
  const startWorkout = useHeliaStore((s) => s.startWorkout);
  const sorted = [...workouts].sort((a, b) => b.startedAt - a.startedAt);

  return (
    <div className="mx-auto max-w-lg px-4 py-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-semibold">Training</h1>
        <Button asChild>
          <Link to="/training/session" onClick={() => startWorkout()}>
            <Plus className="h-4 w-4 mr-1" /> Neu
          </Link>
        </Button>
      </header>

      <div className="space-y-3">
        {sorted.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-sm text-subtle">
              Noch keine Workouts. Starte dein erstes.
            </CardContent>
          </Card>
        )}
        {sorted.map((w) => (
          <Card key={w.id}>
            <CardContent className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{formatDateLong(w.date)}</div>
                <div className="text-xs text-subtle">
                  {w.exercises.length} Übungen
                  {w.endedAt ? ` · ${durationMs(w.endedAt - w.startedAt)}` : " · aktiv"}
                </div>
              </div>
              <Badge variant={w.endedAt ? "outline" : "success"}>
                {w.endedAt ? "fertig" : "läuft"}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
