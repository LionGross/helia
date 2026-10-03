import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useHeliaStore } from "@/lib/store";

export const Route = createFileRoute("/more")({ component: MorePage });

function MorePage() {
  const settings = useHeliaStore((s) => s.settings);
  const targets = useHeliaStore((s) => s.targets);
  const setDisplayName = useHeliaStore((s) => s.setDisplayName);
  const setTargets = useHeliaStore((s) => s.setTargets);

  return (
    <div className="mx-auto max-w-lg px-4 py-6 space-y-6">
      <h1 className="text-2xl font-display font-semibold">More</h1>

      <Card>
        <CardContent className="pt-4 space-y-3">
          <div className="space-y-1">
            <Label>Anzeigename</Label>
            <Input
              value={settings.displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4 space-y-3">
          <div className="text-sm font-medium text-subtle">Makro-Ziele</div>
          {(["kcal", "protein", "carbs", "fat"] as const).map((key) => (
            <div key={key} className="flex items-center gap-3">
              <Label className="w-20 capitalize">{key}</Label>
              <Input
                type="number"
                value={targets[key]}
                onChange={(e) =>
                  setTargets({ [key]: Number(e.target.value) || 0 })
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <p className="text-xs text-subtle text-center">
        Helia · calm clinical fitness OS
      </p>
    </div>
  );
}
