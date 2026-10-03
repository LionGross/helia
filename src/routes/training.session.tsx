import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExercisePicker } from "@/components/helia/exercise-picker";
import { useHeliaStore } from "@/lib/store";
import type { ExercisePreset } from "@/lib/types";

export const Route = createFileRoute("/training/session")({
  component: SessionPage,
});

function SessionPage() {
  const navigate = useNavigate();
  const activeId = useHeliaStore((s) => s.activeWorkoutId);
  const workouts = useHeliaStore((s) => s.workouts);
  const endWorkout = useHeliaStore((s) => s.endWorkout);
  const exercises = useHeliaStore((s) => s.exercises);
  const [pickerOpen, setPickerOpen] = useState(false);

  const workout = workouts.find((w) => w.id === activeId);

  if (!workout) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center space-y-4">
        <p className="text-subtle">Kein aktives Workout.</p>
        <Button onClick={() => navigate({ to: "/training" })}>Zurück</Button>
      </div>
    );
  }

  const byId = new Map(exercises.map((e) => [e.id, e]));

  return (
    <div className="mx-auto max-w-lg px-4 py-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-display font-semibold">Session</h1>
        <Button
          variant="outline"
          onClick={() => {
            endWorkout(workout.id);
            navigate({ to: "/training" });
          }}
        >
          Beenden
        </Button>
      </header>

      <div className="space-y-3">
        {workout.exercises.map((ex, i) => {
          const preset = byId.get(ex.exerciseId);
          return (
            <Card key={i}>
              <CardContent className="py-3">
                <div className="font-medium">{preset?.name ?? ex.exerciseId}</div>
                <div className="text-xs text-subtle mt-1">
                  {ex.sets.length} Sätze
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Button className="w-full" onClick={() => setPickerOpen(true)}>
        Übung hinzufügen
      </Button>

      {pickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end">
          <div className="w-full max-w-lg mx-auto bg-surface rounded-t-2xl p-4 max-h-[70vh] overflow-y-auto">
            <ExercisePicker
              onSelect={(_ex: ExercisePreset) => {
                // simplified: just close for now
                setPickerOpen(false);
              }}
              onClose={() => setPickerOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
