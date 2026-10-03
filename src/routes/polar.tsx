import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartPulse } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useHeliaStore } from "@/lib/store";
import { bpm, durationMs } from "@/lib/format";

export const Route = createFileRoute("/polar")({ component: PolarPage });

function PolarPage() {
  const sessions = useHeliaStore((s) => s.polarSessions);
  const sorted = [...sessions].sort((a, b) => b.startedAt - a.startedAt);

  return (
    <div className="mx-auto max-w-lg px-4 py-6 space-y-6">
      <header className="flex items-center gap-2">
        <HeartPulse className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-display font-semibold">Polar</h1>
      </header>

      <p className="text-sm text-subtle">
        Herzfrequenz- und ECG-Sessions. BLE-Verbindung zu Polar-Geräten wird
        unterstützt, sobald die Hardware-API verfügbar ist.
      </p>

      <div className="space-y-3">
        {sorted.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-sm text-subtle">
              Noch keine Sessions.
            </CardContent>
          </Card>
        )}
        {sorted.map((s) => (
          <Link key={s.id} to="/polar/$sessionId" params={{ sessionId: s.id }}>
            <Card className="hover:bg-muted/50 transition">
              <CardContent className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{bpm(s.avgBpm)}</div>
                  <div className="text-xs text-subtle">
                    {s.endedAt
                      ? durationMs(s.endedAt - s.startedAt)
                      : "läuft"}
                  </div>
                </div>
                <Badge variant="outline">ECG</Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
