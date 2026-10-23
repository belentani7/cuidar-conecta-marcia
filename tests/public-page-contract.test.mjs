import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const root = new URL("../", import.meta.url);
const read = path => readFileSync(new URL(path, root), "utf8");

test("public contact page does not load an unconfigured third-party analytics script", () => {
  const html = read("client/index.html");
  assert.doesNotMatch(html, /VITE_ANALYTICS_ENDPOINT|VITE_ANALYTICS_WEBSITE_ID|\/umami/);
  assert.match(html, /<html lang="es">/);
});

test("keyboard users can bypass the navigation and reach the main landmark", () => {
  const home = read("client/src/pages/Home.tsx");
  const css = read("client/src/index.css");
  assert.match(home, /href="#contenido">Saltar al contenido principal/);
  assert.match(home, /<main id="contenido" tabIndex=\{-1\}>/);
  assert.match(home, /<section id="inicio"/);
  assert.match(css, /\.skip-link:focus-visible/);
  assert.match(css, /:focus-visible/);
});

test("contact form exposes meaningful status and browser autofill semantics", () => {
  const home = read("client/src/pages/Home.tsx");
  assert.match(home, /role="alert"/);
  for (const field of ["organization", "name", "email", "tel"]) {
    assert.match(home, new RegExp('autoComplete="' + field + '"'));
  }
  assert.match(home, /aria-label=\{menuOpen \? "Cerrar navegación" : "Abrir navegación"\}/);
});

test("reduced-motion preference applies to CSS and scripted contact scrolling", () => {
  const home = read("client/src/pages/Home.tsx");
  const css = read("client/src/index.css");
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(home, /prefers-reduced-motion: reduce/);
  assert.match(home, /reducedMotion \? "auto" : "smooth"/);
});
