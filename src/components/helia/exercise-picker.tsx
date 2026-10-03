import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useHeliaStore } from "@/lib/store";
import type { ExercisePreset } from "@/lib/types";

type Props = {
  onSelect: (ex: ExercisePreset) => void;
  onClose?: () => void;
};

export function ExercisePicker({ onSelect, onClose }: Props) {
  const exercises = useHeliaStore((s) => s.exercises);
  const [q, setQ] = useState("");

  const filtered = exercises.filter(
    (e) =>
      e.name.toLowerCase().includes(q.toLowerCase()) ||
      e.muscle.toLowerCase().includes(q.toLowerCase()) ||
      e.equipment.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Übung suchen…"
          className="pl-9"
          autoFocus
        />
      </div>
      <div className="max-h-72 overflow-y-auto space-y-1">
        {filtered.map((ex) => (
          <button
            key={ex.id}
            type="button"
            onClick={() => {
              onSelect(ex);
              onClose?.();
            }}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-muted transition"
          >
            <div>
              <div className="font-medium text-fg">{ex.name}</div>
              <div className="text-xs text-subtle">{ex.muscle} · {ex.equipment}</div>
            </div>
            <Badge variant="outline">{ex.category}</Badge>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-subtle py-4 text-center">Keine Treffer</p>
        )}
      </div>
    </div>
  );
}
