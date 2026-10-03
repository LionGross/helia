#!/usr/bin/env node
/**
 * Interprets Playwright / smoke results and prints a human verdict.
 */
import { readFileSync, existsSync } from "node:fs";

const resultPath = process.argv[2] || "/tmp/smoke-result.json";

if (!existsSync(resultPath)) {
  console.log("NO_RESULT");
  process.exit(0);
}

try {
  const data = JSON.parse(readFileSync(resultPath, "utf8"));
  if (data.ok) {
    console.log("PASS");
  } else {
    console.log("FAIL");
    if (data.error) console.error(data.error);
    process.exit(1);
  }
} catch (e) {
  console.log("PARSE_ERROR");
  process.exit(1);
}
