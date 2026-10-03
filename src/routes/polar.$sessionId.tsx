import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EcgCanvas } from "@/components/helia/ecg-canvas";
import { useHeliaStore } from "@/lib/store";
import { bpm, durationMs } from "@/lib/format";

export const Route = createFileRoute("/polar/$sessionId")({
  component: PolarSessionPage,
});

function PolarSessionPage() {
  const { sessionId } = Route.useParams();
  const navigate = useNavigate();
  const sessions = useHeliaStore((s) => s.polarSessions);
  const session = sessions.find((s) => s.id === sessionId);

  if (!session) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center space-y-4">
        <p className="text-subtle">Session nicht gefunden.</p>
        <Button onClick={() => navigate({ to: "/polar" })}>Zurück</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-display font-semibold">ECG Session</h1>
        <Button variant="outline" onClick={() => navigate({ to: "/polar" })}>
          Zurück
        </Button>
      </header>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="py-4">
            <div className="text-xs text-subtle">Avg BPM</div>
            <div className="text-lg font-medium">{bpm(session.avgBpm)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <div className="text-xs text-subtle">Dauer</div>
            <div className="text-lg font-medium">
              {session.endedAt
                ? durationMs(session.endedAt - session.startedAt)
                : "—"}
            </div>
          </CardContent>
        </Card>
      </div>

      <EcgCanvas samples={session.samples.length ? session.samples : demoWave()} />
    </div>
  );
}

function demoWave() {
  const out: number[] = [];
  for (let i = 0; i < 200; i++) {
    const t = i / 20;
    out.push(Math.sin(t) * 0.6 + Math.sin(t * 3) * 0.2 + (Math.random() - 0.5) * 0.05);
  }
  return out;
}
