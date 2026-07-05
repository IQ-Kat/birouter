import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_BIROUTER_BASE_URL,
  resolveBirouterBaseUrl,
} from "../../src/shared/utils/resolveBirouterBaseUrl.ts";

test("resolveBirouterBaseUrl prefers BIROUTER_BASE_URL", () => {
  assert.equal(
    resolveBirouterBaseUrl({
      BIROUTER_BASE_URL: "https://internal.example.com/",
      BASE_URL: "https://base.example.com",
      NEXT_PUBLIC_BASE_URL: "https://public.example.com",
    }),
    "https://internal.example.com"
  );
});

test("resolveBirouterBaseUrl falls back to BASE_URL", () => {
  assert.equal(
    resolveBirouterBaseUrl({
      BASE_URL: "https://base.example.com/",
      NEXT_PUBLIC_BASE_URL: "https://public.example.com",
    }),
    "https://base.example.com"
  );
});

test("resolveBirouterBaseUrl falls back to NEXT_PUBLIC_BASE_URL", () => {
  assert.equal(
    resolveBirouterBaseUrl({
      NEXT_PUBLIC_BASE_URL: "https://public.example.com/",
    }),
    "https://public.example.com"
  );
});

test("resolveBirouterBaseUrl ignores blank values", () => {
  assert.equal(
    resolveBirouterBaseUrl({
      BIROUTER_BASE_URL: "   ",
      BASE_URL: "",
      NEXT_PUBLIC_BASE_URL: " https://public.example.com/ ",
    }),
    "https://public.example.com"
  );
});

test("resolveBirouterBaseUrl uses the default localhost fallback", () => {
  assert.equal(resolveBirouterBaseUrl({}), DEFAULT_BIROUTER_BASE_URL);
});
