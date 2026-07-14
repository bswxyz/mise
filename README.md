# Mise

**Live:** https://bswxyz.github.io/mise/ · **Build notes:** https://bswxyz.github.io/mise/guide/

A meal-kit / recipe-box subscription site — a recipe stepper that choreographs a real recipe, and a
servings slider that rescales it the way a cook would — part of the
[Parable design showcase](https://bswxyz.github.io/fable-hub/).

---

## The concept

*Mise en place*: everything prepped, portioned and in its place before the heat goes on. That's the
first rule of every good kitchen, and it's also exactly what a meal-kit sells — so the site doesn't
describe the product, it **is** the product. The hero board shows this week's bowls settling into
place; the stepper walks you through the actual rigatoni card packed in the box (with real, working
timers); the ratio slider rescales the same recipe's ingredient list from one plate to six. The
voice is fresh, encouraging and kitchen-smart — "golden is the goal, brown is bitter."

## Design system

- **Palette:** light (default) is fresh cream `#f5f1e8` under slate ink `#191b1a`; dark flips them.
  Accent is tomato `#e8503a`, secondary is herb green `#4a7c3f`, with an amber `#d9a441` for pasta
  and warm food notes. All tokens live in `:root[data-theme="light|dark"]` and flip together.
- **Type:** `Fraunces` (warm editorial serif, real italics for the accent words) · `Manrope`
  (clean rounded body) · `Space Mono` (the kitchen's metadata — weights, timings, route days).
- **Signature easings:** `--ease` "the fold" `cubic-bezier(.26,.88,.18,1)` — a spatula's turn,
  quick lift and unhurried landing — and `--ease-rise` "the proof" `cubic-bezier(.34,1.28,.44,1)`,
  which overshoots just past the rim before settling. The stepper's lift runs on the proof.
- **Art:** every plate, bowl and board is hand-authored inline SVG — no photos, no image files.

## Stack

- **SvelteKit + `@sveltejs/adapter-static`**, Svelte 5 runes. `$state` holds what's checked and
  what's ticking; `$derived` answers "which step is live?" — the stepper has no step machine at
  all, the active step is simply the first unchecked box.
- Prerendered to plain HTML in `docs/`, so it deploys to GitHub Pages with no server.
- Google Fonts (Fraunces, Manrope, Space Mono). No other runtime dependencies.

## Running it locally

```bash
git clone https://github.com/bswxyz/mise
cd mise
npm install
npm run dev        # dev server (no base path)
npm run build      # prerenders the site into docs/ with base /mise
```

## Structure

```
src/app.html                    shell: fonts, favicon, .js class + theme bootstrap (localStorage "mise-theme")
src/app.css                     design tokens for BOTH themes, reveals, buttons, reduced-motion rules
src/routes/+page.svelte         the page: hero · weekly kit · stepper · ratio slider · plans · footer
src/routes/guide/+page.svelte   "How Mise was built" write-up, styled to the site
src/lib/RecipeStepper.svelte    signature № 1 — choreographed recipe checklist with real timers
src/lib/RatioSlider.svelte      signature № 2 — servings slider with kitchen-honest rescaling
src/lib/scale.js                the rounding brains: quarters, gram steps, tsp→tbsp folding
src/lib/recipes.js              one source of truth: the week, the kit, the rigatoni
src/lib/MiseBoard.svelte        hero art — six bowls that settle into place
src/lib/Plate.svelte            top-down plate art for the kit cards
src/lib/ThemeToggle.svelte      light/dark toggle (persists, no flash on load)
src/lib/motion.js               reduced-motion helpers, scroll reveals, count-up
svelte.config.js                adapter-static → docs/, paths.base = /mise in production
docs/                           the built site GitHub Pages serves
```

## Demo vs. real — what a production version would need

This is an intentionally-scoped design demo. What's **mocked/illustrative** today:

- **The delivery-check form is a demo.** It validates the shape of a postcode and confirms in
  place — nothing is checked against a real coverage map, and nothing is stored or sent. The
  "route day" is derived from a hash of the postcode for charm, not logistics.
- **There is no checkout.** Plan buttons scroll to the delivery check; no payment, accounts,
  or subscription management exists.
- **One recipe is fully real.** The rigatoni (steps, timings, ingredient scaling) is genuinely
  cookable; the other three kit recipes are cards only. A real service needs a full tested
  recipe library, allergen data, and nutrition verified by someone with credentials.
- **Prices and routes are fiction.** Plausible, but invented for the design.

What's **real** and reusable as-is: the stepper interaction model (derived active step, real
timers, aria-live announcements, keyboard-operable checkboxes), the kitchen-honest scaling module
(`scale.js` is pure functions with no DOM), the theme system, the hand-drawn SVG food art, and the
full responsive/reduced-motion layer.

## License

[MIT](LICENSE). Design & build by **Parable** (Anthropic's Claude). All art is hand-authored
inline SVG — no photos, no generated images.
