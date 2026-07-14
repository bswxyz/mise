<script>
	import { base } from '$app/paths';
	import ThemeToggle from '$lib/ThemeToggle.svelte';

	const snipScale = `const QUARTERS = { 0.25: '¼', 0.5: '½', 0.75: '¾' };

export function grams(g) {
  const step = g < 100 ? 5 : g < 500 ? 10 : 25;  // kitchen-honest rounding
  return \`\${Math.max(step, Math.round(g / step) * step)} g\`;
}

export function spoons(tsp) {
  if (tsp >= 3) return \`\${frac(tsp / 3)} tbsp\`;  // 3 tsp fold into 1 tbsp
  return \`\${frac(tsp)} tsp\`;
}

/* Fixed lines never scale — salt is "to taste" at any table size. */
export function scaleLine(ing, servings) {
  if (ing.fixed) return ing.fixed;
  const raw = (ing.qty * servings) / ing.per;
  switch (ing.unit) {
    case 'g':     return grams(raw);
    case 'tsp':   return spoons(raw);
    case 'clove': return count(raw, 'clove');
    case 'bunch': return bunches(raw);
  }
}`;

	const snipStepper = `let done   = $state(steps.map(() => false));
let timers = $state(steps.map((s) =>
  s.timer ? { left: s.timer, running: false, finished: false } : null));

// The whole choreography is one line: the active step is simply
// the first box left unchecked. Check it, and the next one lifts.
const active    = $derived(done.findIndex((d) => !d));
const doneCount = $derived(done.filter(Boolean).length);
const allDone   = $derived(doneCount === steps.length);`;

	const snipConfig = `import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    // prerender straight into /docs for GitHub Pages
    adapter: adapter({ pages: 'docs', assets: 'docs', fallback: null }),
    // every asset + link gets the repo prefix in production
    paths: { base: process.env.NODE_ENV === 'production' ? '/mise' : '' }
  }
};`;

	const snipDeploy = `npm run build              # prerenders → docs/ (index + guide)
git add -A && git commit -m "Mise — recipe-box showcase"
gh repo create bswxyz/mise --public --source . --push
# GitHub → Settings → Pages → Branch: main · Folder: /docs`;
</script>

<svelte:head>
	<title>How Mise was built — Parable build guide</title>
	<meta
		name="description"
		content="Build notes for Mise: a recipe stepper that choreographs one recipe, a servings slider that rounds like a cook, Svelte 5 runes for both, and shipping SvelteKit adapter-static to GitHub Pages."
	/>
</svelte:head>

<div class="film" aria-hidden="true"></div>

<main class="doc">
	<div class="doc-top">
		<a class="doc-back" href="{base}/">← Back to Mise</a>
		<ThemeToggle />
	</div>

	<p class="eyebrow">[ Parable build guide ]</p>
	<h1>How Mise was built</h1>
	<p class="lede">
		A meal-kit brand whose entire pitch is <em>sequence</em> — so the site’s signature moments are
		two working kitchen tools: a <strong>recipe stepper</strong> that choreographs a real recipe,
		and a <strong>ratio slider</strong> that rescales it the way a cook would, not the way a
		calculator would.
	</p>

	<div class="tag-row" role="list">
		<span role="listitem">SvelteKit + adapter-static</span>
		<span role="listitem">Svelte 5 runes</span>
		<span role="listitem">Fraunces / Manrope / Space Mono</span>
		<span role="listitem">light + dark</span>
		<span role="listitem">reduced-motion aware</span>
	</div>

	<h2>The idea</h2>
	<p>
		<em>Mise en place</em> is the discipline of having everything prepped, portioned and in its
		place before the heat goes on. That’s also exactly what a meal-kit sells. So instead of
		describing the product, the page <strong>is</strong> the product: the hero board shows this
		week’s bowls settling into place, the stepper walks you through the actual rigatoni card
		packed in the box, and the slider rescales its actual ingredient list. Nothing on the page is
		decoration pretending to be function — the promise is playable.
	</p>

	<h2>The stack</h2>
	<p>
		SvelteKit with <code>adapter-static</code>, prerendered to plain HTML — no server, no runtime
		beyond the component code itself. Svelte 5’s runes are a natural fit for kitchen state:
		<code>$state</code> holds what’s checked and what’s ticking, <code>$derived</code> answers
		“which step is live?” — and the DOM follows. Type is Fraunces (a warm, food-editorial serif
		with real italics), Manrope for body, and Space Mono for the metadata that runs through a
		kitchen’s world: weights, timings, route days.
	</p>

	<h2>Signature technique № 1 — the recipe stepper</h2>
	<p>
		Six steps, each a real checkbox. The trick is that there is no step machine — the “active”
		step is <em>derived</em>, not stored. Check any box and the first unchecked step becomes the
		active one, lifts three pixels on the “proof” ease, gets its tomato rail, and everything
		behind it dims:
	</p>
	<pre><code>{snipStepper}</code></pre>
	<p>
		Timed steps carry a timer chip with an SVG progress ring — the timers are real
		<code>setInterval</code> countdowns, so the page genuinely cooks alongside you. When one
		finishes it flips green, chimes visually, and announces itself through an
		<code>aria-live</code> status region for screen-reader users.
	</p>

	<h2>Signature technique № 2 — the ratio slider</h2>
	<p>
		A servings slider from 1 to 6 that rescales every quantity in the ingredient list — but
		rounding is where the craft lives. Nobody weighs 217 g of pasta or measures 0.83 tsp of
		chilli. Quantities snap to quarters, grams snap to steps a scale can actually show, and three
		teaspoons fold into a tablespoon:
	</p>
	<pre><code>{snipScale}</code></pre>
	<p>
		The best detail is the lines that <em>refuse</em> to scale: pasta water stays “one good
		ladleful” and salt stays “to taste — taste it” at any table size, because that’s how kitchens
		actually work. The pan advice under the dial changes with the head-count too — at five plates
		it tells you to blister the tomatoes in two batches, because char needs elbow room.
	</p>

	<h2>Details that matter</h2>
	<ul>
		<li>
			<strong>Content is never hidden without JS.</strong> Every reveal and the clipped hero
			lines are gated behind an <code>html.js</code> class set synchronously in
			<code>app.html</code> — kill JavaScript and the whole page reads top to bottom.
		</li>
		<li>
			<strong>Reduced motion is honoured all the way down.</strong> The bowls render pre-settled
			as one static frame, reveals resolve instantly, the stepper swaps states without lifting,
			the counters print their final number — and the slider still rescales, because that’s
			function, not motion.
		</li>
		<li>
			<strong>The checkboxes are real checkboxes.</strong> Visually-hidden inputs with styled
			labels, so the stepper is keyboard-operable and every state is announced natively. Focus
			rings are drawn with <code>:focus-visible</code> on the custom box.
		</li>
		<li>
			<strong>One source of truth.</strong> The hero bowls, the stepper card and the slider’s
			ingredient list all read the same rigatoni object from <code>recipes.js</code> — the site
			practices its own mise en place.
		</li>
		<li>
			<strong>Light and dark are both first-class.</strong> All tokens flip on
			<code>:root[data-theme]</code>, the toggle persists to <code>localStorage</code>
			(<code>mise-theme</code>), and an inline head script applies it before first paint — no
			flash.
		</li>
	</ul>

	<div class="callout">
		<p>
			The delivery-check form is a demo — it validates and confirms in place but checks nothing
			and sends nothing. Wire it to a real coverage lookup before taking orders.
		</p>
	</div>

	<h2>Ship it on GitHub Pages</h2>
	<p>
		The two settings that make a framework site work on project Pages: build into
		<code>/docs</code>, and prefix every path with the repo name (dev keeps it empty so localhost
		still works):
	</p>
	<pre><code>{snipConfig}</code></pre>
	<p>Then build, commit <code>docs/</code>, and point Pages at it:</p>
	<pre><code>{snipDeploy}</code></pre>
	<p>
		A <code>static/.nojekyll</code> file rides along into <code>docs/</code> so Pages serves
		SvelteKit’s <code>_app/</code> directory untouched. That’s the whole deploy.
	</p>

	<a class="doc-back doc-end" href="{base}/">← Back to Mise</a>
</main>

<style>
	.doc { position: relative; z-index: 1; width: min(100% - 2.6rem, 800px); margin: 1.6rem auto 5rem; }
	.doc-top { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 2.2rem; }
	.doc-back {
		display: inline-flex; align-items: center; gap: 0.4rem;
		color: var(--dim); text-decoration: none; font-size: 0.88rem; font-weight: 600;
	}
	.doc-back:hover { color: var(--accent); }
	.doc-end { margin-top: 2.8rem; }

	h1 { font-size: clamp(2.2rem, 5vw, 3.3rem); margin: 0.3rem 0 0.4rem; }
	.lede { margin-bottom: 2rem; }
	.lede strong { color: var(--ink); font-weight: 700; }
	h2 { font-size: clamp(1.4rem, 3vw, 1.9rem); margin: 2.6rem 0 0.6rem; }
	p { color: var(--dim); margin: 0.7rem 0; }
	p strong { color: var(--ink); font-weight: 700; }
	ul { color: var(--dim); padding-left: 1.15rem; margin: 0.7rem 0; }
	li { margin: 0.45rem 0; }
	li strong { color: var(--ink); }

	.tag-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1.4rem 0 0.4rem; }
	.tag-row span {
		font-family: var(--font-m); font-size: 0.7rem; padding: 0.3rem 0.65rem;
		border: 1px solid var(--line); border-radius: 999px; color: var(--dim);
	}

	pre {
		background: var(--panel); border: 1px solid var(--line); border-radius: var(--r);
		padding: 1rem 1.15rem; overflow-x: auto; margin: 1rem 0; box-shadow: var(--shadow);
	}
	code { font-family: var(--font-m); font-size: 0.82rem; color: var(--accent-text); }
	pre code { color: var(--ink); line-height: 1.65; font-size: 0.8rem; }

	.callout {
		border-left: 3px solid var(--accent);
		background: color-mix(in oklab, var(--accent) 7%, transparent);
		padding: 0.9rem 1.1rem; border-radius: 0 var(--r) var(--r) 0; margin: 1.6rem 0;
	}
	.callout p { margin: 0; color: var(--ink); }
</style>
