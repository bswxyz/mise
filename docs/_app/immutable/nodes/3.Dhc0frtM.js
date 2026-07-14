import{a as h,f as b}from"../chunks/D2-TBUDO.js";import{_ as T,C as e,x as S,y as _,$ as M,A as s,a0 as $,B as t}from"../chunks/AvylbluU.js";import{h as C,T as P,s as p}from"../chunks/DR50RPwu.js";import{b as v}from"../chunks/WEpgZaek.js";T();var A=b('<meta name="description" content="Build notes for Mise: a recipe stepper that choreographs one recipe, a servings slider that rounds like a cook, Svelte 5 runes for both, and shipping SvelteKit adapter-static to GitHub Pages."/>'),H=b(`<div class="film" aria-hidden="true"></div> <main class="doc svelte-36n0qb"><div class="doc-top svelte-36n0qb"><a class="doc-back svelte-36n0qb">← Back to Mise</a> <!></div> <p class="eyebrow svelte-36n0qb">[ Parable build guide ]</p> <h1 class="svelte-36n0qb">How Mise was built</h1> <p class="lede svelte-36n0qb">A meal-kit brand whose entire pitch is <em>sequence</em> — so the site’s signature moments are
		two working kitchen tools: a <strong class="svelte-36n0qb">recipe stepper</strong> that choreographs a real recipe,
		and a <strong class="svelte-36n0qb">ratio slider</strong> that rescales it the way a cook would, not the way a
		calculator would.</p> <div class="tag-row svelte-36n0qb" role="list"><span role="listitem" class="svelte-36n0qb">SvelteKit + adapter-static</span> <span role="listitem" class="svelte-36n0qb">Svelte 5 runes</span> <span role="listitem" class="svelte-36n0qb">Fraunces / Manrope / Space Mono</span> <span role="listitem" class="svelte-36n0qb">light + dark</span> <span role="listitem" class="svelte-36n0qb">reduced-motion aware</span></div> <h2 class="svelte-36n0qb">The idea</h2> <p class="svelte-36n0qb"><em>Mise en place</em> is the discipline of having everything prepped, portioned and in its
		place before the heat goes on. That’s also exactly what a meal-kit sells. So instead of
		describing the product, the page <strong class="svelte-36n0qb">is</strong> the product: the hero board shows this
		week’s bowls settling into place, the stepper walks you through the actual rigatoni card
		packed in the box, and the slider rescales its actual ingredient list. Nothing on the page is
		decoration pretending to be function — the promise is playable.</p> <h2 class="svelte-36n0qb">The stack</h2> <p class="svelte-36n0qb">SvelteKit with <code class="svelte-36n0qb">adapter-static</code>, prerendered to plain HTML — no server, no runtime
		beyond the component code itself. Svelte 5’s runes are a natural fit for kitchen state: <code class="svelte-36n0qb">$state</code> holds what’s checked and what’s ticking, <code class="svelte-36n0qb">$derived</code> answers
		“which step is live?” — and the DOM follows. Type is Fraunces (a warm, food-editorial serif
		with real italics), Manrope for body, and Space Mono for the metadata that runs through a
		kitchen’s world: weights, timings, route days.</p> <h2 class="svelte-36n0qb">Signature technique № 1 — the recipe stepper</h2> <p class="svelte-36n0qb">Six steps, each a real checkbox. The trick is that there is no step machine — the “active”
		step is <em>derived</em>, not stored. Check any box and the first unchecked step becomes the
		active one, lifts three pixels on the “proof” ease, gets its tomato rail, and everything
		behind it dims:</p> <pre class="svelte-36n0qb"><code class="svelte-36n0qb"></code></pre> <p class="svelte-36n0qb">Timed steps carry a timer chip with an SVG progress ring — the timers are real <code class="svelte-36n0qb">setInterval</code> countdowns, so the page genuinely cooks alongside you. When one
		finishes it flips green, chimes visually, and announces itself through an <code class="svelte-36n0qb">aria-live</code> status region for screen-reader users.</p> <h2 class="svelte-36n0qb">Signature technique № 2 — the ratio slider</h2> <p class="svelte-36n0qb">A servings slider from 1 to 6 that rescales every quantity in the ingredient list — but
		rounding is where the craft lives. Nobody weighs 217 g of pasta or measures 0.83 tsp of
		chilli. Quantities snap to quarters, grams snap to steps a scale can actually show, and three
		teaspoons fold into a tablespoon:</p> <pre class="svelte-36n0qb"><code class="svelte-36n0qb"></code></pre> <p class="svelte-36n0qb">The best detail is the lines that <em>refuse</em> to scale: pasta water stays “one good
		ladleful” and salt stays “to taste — taste it” at any table size, because that’s how kitchens
		actually work. The pan advice under the dial changes with the head-count too — at five plates
		it tells you to blister the tomatoes in two batches, because char needs elbow room.</p> <h2 class="svelte-36n0qb">Details that matter</h2> <ul class="svelte-36n0qb"><li class="svelte-36n0qb"><strong class="svelte-36n0qb">Content is never hidden without JS.</strong> Every reveal and the clipped hero
			lines are gated behind an <code class="svelte-36n0qb">html.js</code> class set synchronously in <code class="svelte-36n0qb">app.html</code> — kill JavaScript and the whole page reads top to bottom.</li> <li class="svelte-36n0qb"><strong class="svelte-36n0qb">Reduced motion is honoured all the way down.</strong> The bowls render pre-settled
			as one static frame, reveals resolve instantly, the stepper swaps states without lifting,
			the counters print their final number — and the slider still rescales, because that’s
			function, not motion.</li> <li class="svelte-36n0qb"><strong class="svelte-36n0qb">The checkboxes are real checkboxes.</strong> Visually-hidden inputs with styled
			labels, so the stepper is keyboard-operable and every state is announced natively. Focus
			rings are drawn with <code class="svelte-36n0qb">:focus-visible</code> on the custom box.</li> <li class="svelte-36n0qb"><strong class="svelte-36n0qb">One source of truth.</strong> The hero bowls, the stepper card and the slider’s
			ingredient list all read the same rigatoni object from <code class="svelte-36n0qb">recipes.js</code> — the site
			practices its own mise en place.</li> <li class="svelte-36n0qb"><strong class="svelte-36n0qb">Light and dark are both first-class.</strong> All tokens flip on <code class="svelte-36n0qb">:root[data-theme]</code>, the toggle persists to <code class="svelte-36n0qb">localStorage</code> (<code class="svelte-36n0qb">mise-theme</code>), and an inline head script applies it before first paint — no
			flash.</li></ul> <div class="callout svelte-36n0qb"><p class="svelte-36n0qb">The delivery-check form is a demo — it validates and confirms in place but checks nothing
			and sends nothing. Wire it to a real coverage lookup before taking orders.</p></div> <h2 class="svelte-36n0qb">Ship it on GitHub Pages</h2> <p class="svelte-36n0qb">The two settings that make a framework site work on project Pages: build into <code class="svelte-36n0qb">/docs</code>, and prefix every path with the repo name (dev keeps it empty so localhost
		still works):</p> <pre class="svelte-36n0qb"><code class="svelte-36n0qb"></code></pre> <p class="svelte-36n0qb">Then build, commit <code class="svelte-36n0qb">docs/</code>, and point Pages at it:</p> <pre class="svelte-36n0qb"><code class="svelte-36n0qb"></code></pre> <p class="svelte-36n0qb">A <code class="svelte-36n0qb">static/.nojekyll</code> file rides along into <code class="svelte-36n0qb">docs/</code> so Pages serves
		SvelteKit’s <code class="svelte-36n0qb">_app/</code> directory untouched. That’s the whole deploy.</p> <a class="doc-back doc-end svelte-36n0qb">← Back to Mise</a></main>`,1);function D(u){var r=H();C("36n0qb",k=>{var x=A();M(()=>{$.title="How Mise was built — Parable build guide"}),h(k,x)});var c=e(S(r),2),a=s(c),d=s(a),g=e(d,2);P(g,{}),t(a);var n=e(a,22),m=s(n);m.textContent=`let done   = $state(steps.map(() => false));
let timers = $state(steps.map((s) =>
  s.timer ? { left: s.timer, running: false, finished: false } : null));

// The whole choreography is one line: the active step is simply
// the first box left unchecked. Check it, and the next one lifts.
const active    = $derived(done.findIndex((d) => !d));
const doneCount = $derived(done.filter(Boolean).length);
const allDone   = $derived(doneCount === steps.length);`,t(n);var o=e(n,8),f=s(o);f.textContent=`const QUARTERS = { 0.25: '¼', 0.5: '½', 0.75: '¾' };

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
}`,t(o);var i=e(o,14),q=s(i);q.textContent=`import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    // prerender straight into /docs for GitHub Pages
    adapter: adapter({ pages: 'docs', assets: 'docs', fallback: null }),
    // every asset + link gets the repo prefix in production
    paths: { base: process.env.NODE_ENV === 'production' ? '/mise' : '' }
  }
};`,t(i);var l=e(i,4),w=s(l);w.textContent=`npm run build              # prerenders → docs/ (index + guide)
git add -A && git commit -m "Mise — recipe-box showcase"
gh repo create bswxyz/mise --public --source . --push
# GitHub → Settings → Pages → Branch: main · Folder: /docs`,t(l);var y=e(l,4);t(c),_(()=>{p(d,"href",`${v??""}/`),p(y,"href",`${v??""}/`)}),h(u,r)}export{D as component};
