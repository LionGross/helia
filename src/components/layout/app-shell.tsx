import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Dumbbell, Utensils, HeartPulse, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/training", label: "Training", icon: Dumbbell },
  { to: "/nutrition", label: "Nutrition", icon: Utensils },
  { to: "/polar", label: "Polar", icon: HeartPulse },
  { to: "/more", label: "More", icon: MoreHorizontal },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh flex flex-col bg-bg">
      <main className="flex-1 overflow-y-auto pb-20">{children}</main>
      <nav className="fixed bottom-0 inset-x-0 border-t border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto max-w-lg flex justify-around py-2">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || (to !== "/" && pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1 text-xs",
                  active ? "text-primary" : "text-subtle",
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
