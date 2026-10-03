#!/usr/bin/env node
/**
 * Lightweight guard that fails if the app is not reachable on :8080.
 * Used by Grok Build smoke checks.
 */
import { setTimeout as sleep } from "node:timers/promises";

const URL = process.env.SMOKE_URL || "http://127.0.0.1:8080/";
const TIMEOUT_MS = Number(process.env.SMOKE_TIMEOUT || 8000);

async function check() {
  const start = Date.now();
  while (Date.now() - start < TIMEOUT_MS) {
    try {
      const res = await fetch(URL, { signal: AbortSignal.timeout(2000) });
      if (res.ok || res.status === 404) {
        console.log(`browser-guard: OK (${res.status})`);
        return;
      }
    } catch {}
    await sleep(400);
  }
  console.error(`browser-guard: app not reachable at ${URL}`);
  process.exit(1);
}

check();
