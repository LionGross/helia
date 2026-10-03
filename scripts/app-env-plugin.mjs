import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Vite plugin that injects APP_ENV from .grok/app-env.json (or process.env)
 * so the app can detect whether it runs inside Grok Build preview.
 */
export function appEnvPlugin() {
  return {
    name: "app-env",
    config() {
      let appEnv = process.env.APP_ENV || "local";
      const envPath = resolve(process.cwd(), ".grok/app-env.json");
      if (existsSync(envPath)) {
        try {
          const data = JSON.parse(readFileSync(envPath, "utf8"));
          if (data?.env) appEnv = data.env;
        } catch {}
      }
      return {
        define: {
          "import.meta.env.APP_ENV": JSON.stringify(appEnv),
        },
      };
    },
  };
}
