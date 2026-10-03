import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

describe("brand-check", () => {
  it("script exists", () => {
    assert.ok(existsSync(join(ROOT, "scripts/brand-check.mjs")));
  });

  it("styles.css contains core tokens", () => {
    const css = readFileSync(join(ROOT, "src/styles.css"), "utf8");
    assert.ok(css.includes("--color-bg"));
    assert.ok(css.includes("--font-display"));
  });
});
