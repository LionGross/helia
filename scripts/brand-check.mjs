#!/usr/bin/env node
/**
 * Simple brand-check: ensure key CSS tokens and component names exist.
 * Used in CI / Grok Build verification.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");

const REQUIRED_TOKENS = [
  "--color-bg",
  "--color-surface",
  "--color-accent",
  "--font-display",
  "--font-sans",
];

const REQUIRED_COMPONENTS = [
  "app-shell",
  "macros-card",
  "exercise-picker",
  "ecg-canvas",
];

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (/\.(tsx?|css)$/.test(name)) acc.push(p);
  }
  return acc;
}

function main() {
  const files = walk(SRC);
  const all = files.map((f) => readFileSync(f, "utf8")).join("\n");

  const missingTokens = REQUIRED_TOKENS.filter((t) => !all.includes(t));
  const missingComponents = REQUIRED_COMPONENTS.filter(
    (c) => !all.toLowerCase().includes(c.replace(/-/g, "")) && !all.includes(c),
  );

  if (missingTokens.length || missingComponents.length) {
    console.error("Brand check failed:");
    if (missingTokens.length) console.error("  missing tokens:", missingTokens);
    if (missingComponents.length) console.error("  missing components:", missingComponents);
    process.exit(1);
  }
  console.log("Brand check OK");
}

main();
