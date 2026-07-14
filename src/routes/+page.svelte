<script>
	import { base } from '$app/paths';
	import { revealAll, countUp } from '$lib/motion.js';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import MiseBoard from '$lib/MiseBoard.svelte';
	import Plate from '$lib/Plate.svelte';
	import RecipeStepper from '$lib/RecipeStepper.svelte';
	import RatioSlider from '$lib/RatioSlider.svelte';
	import { recipes, week } from '$lib/recipes.js';

	/* ---- delivery-check demo form (validates + confirms in place, sends nothing) ---- */
	let postcode = $state('');
	let pcResult = $state(null);
	let pcError = $state('');

	function checkPostcode(e) {
		e.preventDefault();
		const code = postcode.trim().toUpperCase();
		if (code.length < 3 || !/^[A-Z0-9][A-Z0-9 -]{1,9}$/.test(code)) {
			pcError = 'That doesn’t look like a postcode — give it another go.';
			pcResult = null;
			return;
		}
		let h = 0;
		for (const c of code) h = (h * 31 + c.charCodeAt(0)) % 997;
		pcError = '';
		pcResult = { code, day: ['Tuesday', 'Wednesday', 'Thursday'][h % 3] };
	}
</script>

<svelte:head>
	<title>Mise — the recipe box that does the mise en place</title>
	<meta
		name="description"
		content="Mise is a recipe-box subscription built on the first rule of every good kitchen: everything in its place, then the heat. Portioned, labelled, sequenced — you just cook."
	/>
	<meta property="og:title" content="Mise — everything in its place, then the heat" />
	<meta property="og:description" content="A recipe box that arrives portioned, labelled and sequenced. Try the recipe stepper and the ratio slider — the box, in your browser." />
	<meta property="og:type" content="website" />
</svelte:head>

<a class="skip" href="#main">Skip to content</a>
<div class="film" aria-hidden="true"></div>

<header class="nav">
	<a class="brand" href="{base}/" aria-label="Mise home">
		<svg class="brand-mark" viewBox="0 0 28 28" aria-hidden="true" focusable="false">
			<path d="M4 14.5 h20 a1.6 1.6 0 0 1 1.5 2 C23.8 22.6 19.7 26 14 26 S4.2 22.6 2.5 16.5 a1.6 1.6 0 0 1 1.5 -2 Z" fill="currentColor" />
			<circle cx="9" cy="8.5" r="2.6" fill="var(--herb)" />
			<circle cx="15.5" cy="5" r="2.2" fill="currentColor" />
			<circle cx="21" cy="9" r="1.9" fill="var(--amber)" />
		</svg>
		<span class="brand-word">Mise</span>
	</a>
	<nav class="nav-links" aria-label="Primary">
		<a href="#kit">The kit</a>
		<a href="#stepper">The stepper</a>
		<a href="#ratio">The ratio</a>
		<a href="{base}/guide/">Guide</a>
		<a class="nav-cta" href="#plans">Get a box</a>
		<ThemeToggle />
	</nav>
</header>

<main id="main" use:revealAll>
	<!-- ============ hero — this week's box ============ -->
	<section class="hero" aria-labelledby="hero-title">
		<div class="hero-grid">
			<div class="hero-copy">
				<p class="eyebrow">[ box № {week.number} · {week.label} ]</p>
				<h1 id="hero-title" class="hero-title">
					<span class="reveal-clip"><span>Everything</span></span>
					<span class="reveal-clip"><span style="transition-delay:.1s">in <em>its place.</em></span></span>
					<span class="reveal-clip"><span style="transition-delay:.2s">Then, the heat.</span></span>
				</h1>
				<p class="hero-sub reveal">
					Mise is a recipe box built on the first rule of every good kitchen: prep before fire.
					Every box arrives portioned, labelled and sequenced — so the cooking part is the
					<em>good</em> part.
				</p>
				<div class="hero-actions reveal">
					<a class="btn btn-primary" href="#kit">See this week’s kit</a>
					<a class="btn btn-ghost" href="#stepper">Cook one now →</a>
				</div>
				<dl class="hero-facts reveal">
					<div><dt class="mono">avg active prep</dt><dd><span use:countUp={{ to: 15 }}>15</span> min</dd></div>
					<div><dt class="mono">recipes a season</dt><dd><span use:countUp={{ to: 120 }}>120</span></dd></div>
					<div><dt class="mono">decisions required</dt><dd>0</dd></div>
				</dl>
			</div>
			<div class="hero-art reveal">
				<MiseBoard />
			</div>
		</div>
		<p class="hero-scroll mono" aria-hidden="true">scroll — dinner’s already sorted</p>
	</section>

	<!-- ============ this week's kit ============ -->
	<section id="kit" class="kit">
		<span class="wm" aria-hidden="true">Mise</span>
		<div class="wrap">
			<div class="sec-head">
				<p class="kicker reveal">[ This week’s kit ]</p>
				<h2 class="reveal">Four dinners, zero drift.</h2>
				<p class="lede reveal">
					The menu turns over every Thursday. Pick three of the four — or take the lot and skip
					the supermarket entirely. Every recipe is one pan, under forty minutes, and tested until
					the timings are honest.
				</p>
			</div>
			<div class="kit-grid">
				{#each recipes as r, i}
					<article class="card reveal" style="transition-delay:{i * 70}ms">
						<div class="card-art"><Plate kind={r.id} /></div>
						<div class="card-info">
							<h3>{r.name}</h3>
							<p class="card-spec mono">{r.mins} min · {r.diet} · {r.kcal} kcal</p>
							<p class="card-note">{r.note}</p>
							<span class="card-tag mono tag--{r.tagKind}">{r.tag}</span>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- ============ the recipe stepper — signature № 1 ============ -->
	<section id="stepper" class="stepper-sec">
		<div class="wrap">
			<div class="sec-head">
				<p class="kicker reveal">[ The stepper ]</p>
				<h2 class="reveal">One recipe, <em>choreographed.</em></h2>
				<p class="lede reveal">
					Cooking is mostly timing. Check a step off and the next one steps forward; the timed
					ones bring their own clocks. This is the exact card packed in every box — cook the
					rigatoni along with it, right here.
				</p>
			</div>
			<div class="reveal">
				<RecipeStepper />
			</div>
		</div>
	</section>

	<!-- ============ the ratio slider — signature № 2 ============ -->
	<section id="ratio" class="ratio-sec">
		<div class="wrap">
			<div class="sec-head">
				<p class="kicker reveal">[ The ratio ]</p>
				<h2 class="reveal">Scales like a cook,<br />not a calculator.</h2>
				<p class="lede reveal">
					Drag the servings and watch every quantity re-balance. Grams round to real measures,
					three teaspoons fold into a tablespoon — and the things that never scale (salt, a ladle
					of pasta water) stay exactly where they are.
				</p>
			</div>
			<div class="reveal">
				<RatioSlider />
			</div>
		</div>
	</section>

	<!-- ============ plans ============ -->
	<section id="plans" class="plans">
		<div class="wrap">
			<div class="sec-head">
				<p class="kicker reveal">[ Plans ]</p>
				<h2 class="reveal">Pick a rhythm.</h2>
				<p class="lede reveal">
					Boxes land once a week, on your route’s day. Skip a week from your phone, swap any
					recipe until Sunday night, cancel whenever — no meetings with a retention team.
				</p>
			</div>

			<div class="plan-grid">
				<article class="plan reveal">
					<h3>The Pair</h3>
					<p class="plan-spec mono">2 plates × 3 recipes</p>
					<p class="plan-price"><span class="mono plan-cur">£</span>39<span class="plan-per mono">/week</span></p>
					<p class="plan-math mono">£6.50 a plate</p>
					<ul class="plan-list">
						<li>For two humans — or one great week of lunches</li>
						<li>Skip any week, swap any recipe</li>
						<li>Recyclable box, returnable ice packs</li>
					</ul>
					<a class="btn btn-ghost btn-block" href="#delivery">Start with a Pair</a>
				</article>

				<article class="plan plan--featured reveal" style="transition-delay:70ms">
					<span class="plan-badge mono">most kitchens</span>
					<h3>The Table</h3>
					<p class="plan-spec mono">4 plates × 3 recipes</p>
					<p class="plan-price"><span class="mono plan-cur">£</span>64<span class="plan-per mono">/week</span></p>
					<p class="plan-math mono">£5.35 a plate</p>
					<ul class="plan-list">
						<li>Everything in the Pair</li>
						<li>Kid-swap on any recipe (milder, chopped smaller)</li>
						<li>Priority delivery window</li>
					</ul>
					<a class="btn btn-primary btn-block" href="#delivery">Set the Table</a>
				</article>

				<article class="plan reveal" style="transition-delay:140ms">
					<h3>The Feast</h3>
					<p class="plan-spec mono">4 plates × 5 recipes</p>
					<p class="plan-price"><span class="mono plan-cur">£</span>92<span class="plan-per mono">/week</span></p>
					<p class="plan-math mono">£4.60 a plate</p>
					<ul class="plan-list">
						<li>The full weekly rotation — weeknights, handled</li>
						<li>First pick of new recipes</li>
						<li>A pantry item on us, most weeks</li>
					</ul>
					<a class="btn btn-ghost btn-block" href="#delivery">Go the whole hog</a>
				</article>
			</div>

			<!-- delivery-check demo form -->
			<div id="delivery" class="delivery reveal">
				<div class="del-copy">
					<h3>Where’s dinner going?</h3>
					<p>We run three routes a week. Drop your postcode in and we’ll tell you which one is yours.</p>
				</div>
				<form class="del-form" onsubmit={checkPostcode} novalidate>
					<label class="mono" for="pc">Postcode</label>
					<div class="del-row">
						<input
							id="pc"
							name="postcode"
							type="text"
							autocomplete="postal-code"
							placeholder="e.g. KT4 7NL"
							bind:value={postcode}
							aria-describedby="pc-note"
							aria-invalid={pcError ? 'true' : undefined}
						/>
						<button class="btn btn-primary" type="submit">Check</button>
					</div>
					<div class="del-out" aria-live="polite">
						{#if pcError}
							<p class="del-err">{pcError}</p>
						{:else if pcResult}
							<p class="del-ok">
								<strong>{pcResult.code}</strong> is on the <strong>{pcResult.day}</strong> route —
								your first box could land next week.
							</p>
						{/if}
					</div>
					<p id="pc-note" class="del-fine mono">Demo — nothing is checked, stored or sent. See the README.</p>
				</form>
			</div>
		</div>
	</section>
</main>

<footer class="footer">
	<div class="wrap foot-top">
		<span class="foot-brand">Mise</span>
		<nav class="foot-links" aria-label="Footer">
			<a href="#kit">The kit</a><a href="#stepper">The stepper</a><a href="#ratio">The ratio</a><a href="#plans">Plans</a><a href="{base}/guide/">Guide</a>
		</nav>
	</div>
	<div class="wrap foot-bottom mono">
		<span>© 2026 Mise — a design-showcase concept, not a real meal-kit. The rigatoni is real enough to cook; the prices and routes are fiction.</span>
		<span>Designed &amp; built by Parable · <a href="{base}/guide/">How this was built →</a></span>
	</div>
</footer>

<style>
	/* ---------- nav ---------- */
	.nav {
		position: sticky; top: 0; z-index: 30;
		display: flex; align-items: center; justify-content: space-between; gap: 1rem;
		padding: 0.7rem clamp(1rem, 4vw, 2.2rem);
		background: color-mix(in oklab, var(--bg) 78%, transparent);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--line);
	}
	.brand { display: inline-flex; align-items: center; gap: 0.55rem; text-decoration: none; }
	.brand-mark { width: 27px; height: 27px; color: var(--accent); }
	.brand-word { font-family: var(--font-d); font-weight: 550; font-size: 1.35rem; letter-spacing: -0.01em; }
	.nav-links { display: flex; align-items: center; gap: 0.25rem; }
	.nav-links a {
		text-decoration: none; color: var(--dim); font-size: 0.87rem; font-weight: 600;
		padding: 0.45rem 0.7rem; border-radius: 999px; transition: color 0.25s, background 0.25s;
	}
	.nav-links a:hover { color: var(--ink); background: var(--line-2); }
	.nav-cta { color: var(--ink) !important; border: 1px solid var(--line); }
	.nav-cta:hover { background: var(--accent) !important; color: var(--on-accent) !important; border-color: transparent; }
	@media (max-width: 780px) {
		.nav-links a:not(.nav-cta) { display: none; }
	}

	/* ---------- hero ---------- */
	.hero { padding: clamp(3rem, 7vw, 5.5rem) 0 clamp(2.5rem, 5vw, 4rem); width: min(100% - 2.6rem, var(--max)); margin-inline: auto; }
	.hero-grid { display: grid; grid-template-columns: 1.02fr 0.98fr; gap: clamp(1.6rem, 4.5vw, 4rem); align-items: center; }
	@media (max-width: 900px) { .hero-grid { grid-template-columns: 1fr; } }

	.hero-title { font-size: clamp(2.7rem, 7.2vw, 5.1rem); margin: 0.2rem 0 0; }
	.hero-sub { color: var(--dim); max-width: 46ch; margin: 1.5rem 0 0; font-size: clamp(1rem, 1.5vw, 1.12rem); }
	.hero-sub em { font-style: italic; color: var(--ink); }
	.hero-actions { display: flex; flex-wrap: wrap; gap: 0.7rem; margin: 1.9rem 0 0; }
	.hero-facts { display: flex; flex-wrap: wrap; gap: 1.8rem 2.4rem; margin: 2.4rem 0 0; padding-top: 1.4rem; border-top: 1px solid var(--line); }
	.hero-facts div { display: flex; flex-direction: column; gap: 0.15rem; }
	.hero-facts dt { font-size: 0.66rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--faint); }
	.hero-facts dd { margin: 0; font-family: var(--font-d); font-size: 1.55rem; font-variant-numeric: tabular-nums; }
	.hero-scroll { margin: clamp(2rem, 5vw, 3rem) 0 0; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--faint); }

	/* ---------- kit ---------- */
	.kit { padding: clamp(4rem, 9vw, 7rem) 0; background: var(--bg-2); border-block: 1px solid var(--line); overflow: hidden; }
	.wm {
		position: absolute; top: 2%; right: -1%; z-index: 0; pointer-events: none; user-select: none;
		font-family: var(--font-d); font-style: italic; font-size: clamp(6rem, 20vw, 16rem);
		color: var(--ink); opacity: 0.04; letter-spacing: 0.02em; line-height: 1;
	}
	.kit-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; position: relative; z-index: 1; }
	@media (max-width: 1020px) { .kit-grid { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 540px) { .kit-grid { grid-template-columns: 1fr; } }
	.card {
		border: 1px solid var(--line); border-radius: var(--r-lg); background: var(--panel); overflow: hidden;
		transition: transform 0.35s var(--ease-rise), border-color 0.3s, box-shadow 0.35s var(--ease);
	}
	.card:hover {
		transform: translateY(-5px);
		border-color: color-mix(in oklab, var(--accent) 40%, var(--line));
		box-shadow: var(--shadow);
	}
	.card-art {
		display: grid; place-items: center; aspect-ratio: 16 / 10;
		background: linear-gradient(165deg, var(--bg), var(--bg-2)); border-bottom: 1px solid var(--line);
	}
	.card-info { padding: 1.05rem 1.15rem 1.25rem; }
	.card-info h3 { font-size: 1.22rem; line-height: 1.12; }
	.card-spec { margin: 0.5rem 0 0.15rem; font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--herb); }
	.card-note { color: var(--dim); font-size: 0.88rem; margin: 0.5rem 0 0.9rem; }
	.card-tag {
		display: inline-block; font-size: 0.66rem; letter-spacing: 0.08em; text-transform: uppercase;
		padding: 0.2rem 0.6rem; border-radius: 999px; border: 1px solid var(--line); color: var(--dim);
	}
	.tag--accent { color: var(--accent); border-color: color-mix(in oklab, var(--accent) 45%, var(--line)); }
	.tag--herb { color: var(--herb); border-color: color-mix(in oklab, var(--herb) 45%, var(--line)); }
	.tag--amber { color: var(--amber-text); border-color: color-mix(in oklab, var(--amber) 45%, var(--line)); }

	/* ---------- stepper + ratio sections ---------- */
	.stepper-sec { padding: clamp(4rem, 9vw, 7rem) 0; }
	.ratio-sec { padding: clamp(1rem, 3vw, 2rem) 0 clamp(4rem, 9vw, 7rem); }

	/* ---------- plans ---------- */
	.plans { padding: clamp(4rem, 9vw, 7rem) 0; background: var(--bg-2); border-top: 1px solid var(--line); }
	.plan-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; align-items: stretch; }
	@media (max-width: 900px) { .plan-grid { grid-template-columns: 1fr; max-width: 460px; } }
	.plan {
		position: relative; display: flex; flex-direction: column;
		border: 1px solid var(--line); border-radius: var(--r-lg); background: var(--panel);
		padding: 1.6rem 1.5rem 1.5rem;
	}
	.plan--featured { border-color: color-mix(in oklab, var(--accent) 55%, var(--line)); box-shadow: var(--shadow); }
	.plan-badge {
		position: absolute; top: -0.75rem; left: 1.4rem;
		background: var(--cta); color: var(--on-accent);
		font-size: 0.64rem; letter-spacing: 0.14em; text-transform: uppercase;
		padding: 0.28rem 0.7rem; border-radius: 999px;
	}
	.plan h3 { font-size: 1.5rem; }
	.plan-spec { margin: 0.45rem 0 1rem; font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--faint); }
	.plan-price { font-family: var(--font-d); font-size: 3rem; line-height: 1; margin: 0; }
	.plan-cur { font-size: 1.2rem; vertical-align: super; color: var(--dim); }
	.plan-per { font-size: 0.72rem; color: var(--faint); margin-left: 0.2rem; }
	.plan-math { margin: 0.5rem 0 0; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--herb); }
	.plan-list { list-style: none; margin: 1.1rem 0 1.4rem; padding: 1.1rem 0 0; border-top: 1px solid var(--line-2); display: grid; gap: 0.5rem; flex: 1; }
	.plan-list li { position: relative; padding-left: 1.25rem; color: var(--dim); font-size: 0.88rem; }
	.plan-list li::before { content: '—'; position: absolute; left: 0; color: var(--accent); }

	/* ---------- delivery demo ---------- */
	.delivery {
		display: grid; grid-template-columns: 1fr 1.2fr; gap: clamp(1.4rem, 4vw, 3rem); align-items: center;
		margin-top: clamp(2rem, 5vw, 3.4rem); border: 1px solid var(--line); border-radius: var(--r-lg);
		background: var(--panel); padding: clamp(1.3rem, 3vw, 2.2rem);
	}
	@media (max-width: 760px) { .delivery { grid-template-columns: 1fr; } }
	.del-copy h3 { font-size: clamp(1.4rem, 2.6vw, 1.9rem); }
	.del-copy p { color: var(--dim); margin: 0.6rem 0 0; max-width: 38ch; }
	.del-form label { display: block; font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--faint); margin-bottom: 0.45rem; }
	.del-row { display: flex; gap: 0.6rem; flex-wrap: wrap; }
	.del-row input {
		flex: 1; min-width: 180px; padding: 0.72rem 0.95rem;
		border: 1px solid var(--line); border-radius: 999px;
		background: var(--bg); color: var(--ink); font: inherit; font-size: 0.95rem;
	}
	.del-row input::placeholder { color: var(--faint); }
	.del-row input[aria-invalid='true'] { border-color: var(--accent-deep); }
	.del-out { min-height: 1.6rem; margin-top: 0.7rem; }
	.del-out p { margin: 0; font-size: 0.92rem; }
	.del-err { color: var(--accent-text); }
	.del-ok { color: var(--dim); }
	.del-ok strong { color: var(--herb); font-weight: 700; }
	.del-fine { margin: 0.7rem 0 0; font-size: 0.66rem; letter-spacing: 0.08em; color: var(--faint); }

	/* ---------- footer ---------- */
	.footer { position: relative; z-index: 1; padding: 2.8rem 0 2.4rem; border-top: 1px solid var(--line); background: var(--bg); }
	.foot-top { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; padding-bottom: 1.3rem; }
	.foot-brand { font-family: var(--font-d); font-size: 1.5rem; }
	.foot-links { display: flex; flex-wrap: wrap; gap: 0.25rem; }
	.foot-links a { text-decoration: none; color: var(--dim); font-size: 0.85rem; padding: 0.35rem 0.6rem; border-radius: 999px; }
	.foot-links a:hover { color: var(--ink); background: var(--line-2); }
	.foot-bottom { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; font-size: 0.7rem; color: var(--faint); }
	.foot-bottom a { color: var(--accent-text); text-decoration: none; }
	.foot-bottom a:hover { text-decoration: underline; }

	@media (prefers-reduced-motion: reduce) {
		.card, .card:hover { transform: none !important; transition: border-color 0.3s; }
	}
</style>
