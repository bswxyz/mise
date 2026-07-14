<script>
	import { onMount, onDestroy } from 'svelte';
	import { stepper } from '$lib/recipes.js';
	import { prefersReduced } from '$lib/motion.js';

	const steps = stepper.steps;
	const RING = 50.27; // 2πr for the r=8 timer ring

	let done = $state(steps.map(() => false));
	let timers = $state(steps.map((s) => (s.timer ? { left: s.timer, running: false, finished: false, deadline: null } : null)));
	let announce = $state('');
	let reduce = $state(false);
	let tick;

	const active = $derived(done.findIndex((d) => !d)); // first unchecked step; -1 = service
	const doneCount = $derived(done.filter(Boolean).length);
	const allDone = $derived(doneCount === steps.length);

	onMount(() => {
		reduce = prefersReduced();
		// hidden tabs throttle intervals — re-sync to the wall clock on return
		const onVis = () => {
			if (document.visibilityState === 'visible') sync();
		};
		document.addEventListener('visibilitychange', onVis);
		return () => document.removeEventListener('visibilitychange', onVis);
	});

	const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

	// remaining seconds derived from a wall-clock deadline, not tick counting,
	// so throttled background tabs can't slow the cook down
	const remaining = (t) => Math.max(0, Math.ceil((t.deadline - Date.now()) / 1000));

	function toggleTimer(i) {
		const t = timers[i];
		if (!t) return;
		if (t.finished) {
			t.left = steps[i].timer;
			t.finished = false;
		}
		if (t.running) {
			t.left = remaining(t);
			t.deadline = null;
			t.running = false;
		} else {
			t.deadline = Date.now() + t.left * 1000;
			t.running = true;
			ensureTick();
		}
	}

	function sync() {
		let stillRunning = 0;
		timers.forEach((t, i) => {
			if (!t || !t.running) return;
			t.left = remaining(t);
			if (t.left <= 0) {
				t.running = false;
				t.finished = true;
				t.deadline = null;
				announce = `Timer done — step ${i + 1}, ${steps[i].title}.`;
			} else {
				stillRunning += 1;
			}
		});
		if (!stillRunning && tick) {
			clearInterval(tick);
			tick = undefined;
		}
	}

	function ensureTick() {
		if (tick) return;
		tick = setInterval(sync, 1000);
	}

	function reset() {
		done = steps.map(() => false);
		timers = steps.map((s) => (s.timer ? { left: s.timer, running: false, finished: false, deadline: null } : null));
		announce = '';
		if (tick) {
			clearInterval(tick);
			tick = undefined;
		}
	}

	onDestroy(() => {
		if (tick) clearInterval(tick);
	});
</script>

<div class="stepper" class:reduce>
	<header class="st-head">
		<div>
			<h3 class="st-title">{stepper.recipe}</h3>
			<p class="st-sub mono">serves 2 as written · 25 min · one pan, one pot</p>
		</div>
		<div class="st-progress">
			<span class="st-count mono" aria-live="polite">
				{allDone ? 'service!' : `step ${active + 1} of ${steps.length}`}
			</span>
			<span class="st-bar" aria-hidden="true"><i style="width:{(doneCount / steps.length) * 100}%"></i></span>
		</div>
	</header>

	<ol class="st-steps">
		{#each steps as s, i}
			<li
				class="st-step"
				class:is-done={done[i]}
				class:is-active={i === active}
				class:is-next={active !== -1 && i > active && !done[i]}
			>
				<input class="st-check sr-only" id="mise-step-{i}" type="checkbox" bind:checked={done[i]} />
				<label class="st-label" for="mise-step-{i}">
					<span class="st-no mono" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
					<span class="st-box" aria-hidden="true">
						<svg viewBox="0 0 12 12"><path d="M2 6.5 5 9l5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
					</span>
					<span class="st-body">
						<span class="st-name">{s.title}</span>
						<span class="st-text">{s.body}</span>
						<span class="st-meta mono">{s.meta}</span>
					</span>
				</label>
				{#if s.timer}
					{@const t = timers[i]}
					<button
						class="st-timer mono"
						class:running={t.running}
						class:finished={t.finished}
						type="button"
						onclick={() => toggleTimer(i)}
						aria-label={t.finished
							? `Timer finished for ${s.title}. Restart the ${fmt(steps[i].timer)} timer`
							: t.running
								? `Pause timer — ${fmt(t.left)} remaining`
								: `Start ${fmt(t.left)} timer for ${s.title}`}
					>
						<svg class="st-ring" viewBox="0 0 20 20" aria-hidden="true">
							<circle class="rr" cx="10" cy="10" r="8" />
							<circle class="rp" cx="10" cy="10" r="8" style="stroke-dashoffset:{RING * (t.left / steps[i].timer)}" />
						</svg>
						<span>{t.finished ? 'done' : fmt(t.left)}</span>
					</button>
				{/if}
			</li>
		{/each}
	</ol>

	<footer class="st-foot">
		<p class="st-note mono">
			{allDone ? 'plates up. that’s service — you did that.' : 'the timers are real — this page will cook with you.'}
		</p>
		<button class="st-reset mono" type="button" onclick={reset}>↺ start over</button>
	</footer>

	<p class="sr-only" role="status" aria-live="polite">{announce}</p>
</div>

<style>
	.stepper {
		border: 1px solid var(--line); border-radius: var(--r-lg);
		background: var(--panel); box-shadow: var(--shadow);
		padding: clamp(1.1rem, 3vw, 2rem);
	}

	.st-head {
		display: flex; align-items: flex-end; justify-content: space-between;
		gap: 1rem; flex-wrap: wrap; padding-bottom: 1.1rem; border-bottom: 1px solid var(--line);
	}
	.st-title { font-size: clamp(1.35rem, 2.6vw, 1.8rem); }
	.st-sub { margin: 0.45rem 0 0; font-size: 0.7rem; letter-spacing: 0.12em; color: var(--faint); }
	.st-progress { display: grid; gap: 0.4rem; justify-items: end; min-width: 150px; }
	.st-count { font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent-text); }
	.st-bar {
		width: 150px; height: 5px; border-radius: 4px; overflow: hidden;
		background: var(--line-2); border: 1px solid var(--line);
	}
	.st-bar i { display: block; height: 100%; background: linear-gradient(90deg, var(--herb), var(--accent)); transition: width 0.5s var(--ease); }

	.st-steps { list-style: none; margin: 0; padding: 0; }
	.st-step {
		position: relative; display: flex; align-items: flex-start; gap: 0.6rem;
		padding: 1.05rem 0.9rem; margin-inline: -0.9rem; border-radius: var(--r);
		border-bottom: 1px solid var(--line-2);
		transition: transform 0.55s var(--ease-rise), opacity 0.4s var(--ease), background 0.4s var(--ease);
	}
	.st-step:last-child { border-bottom: 0; }
	.st-step::before {
		content: ''; position: absolute; left: 0; top: 14%; bottom: 14%; width: 3px;
		border-radius: 3px; background: var(--accent); opacity: 0;
		transition: opacity 0.4s var(--ease);
	}

	/* the choreography: the active step lifts, the rest fall back */
	.st-step.is-active {
		background: color-mix(in oklab, var(--accent) 6%, transparent);
		transform: translateY(-3px);
	}
	.st-step.is-active::before { opacity: 1; }
	.st-step.is-next { opacity: 0.55; }
	.st-step.is-done { opacity: 0.45; }
	.st-step.is-done .st-name { text-decoration: line-through; text-decoration-color: var(--faint); text-decoration-thickness: 1.5px; }

	.st-label { display: flex; align-items: flex-start; gap: 0.9rem; flex: 1; cursor: pointer; }
	.st-no { font-size: 0.72rem; color: var(--faint); padding-top: 0.42rem; min-width: 1.6em; }
	.st-box {
		flex: none; display: grid; place-items: center; width: 26px; height: 26px; margin-top: 0.2rem;
		border: 1.5px solid var(--line); border-radius: 9px; background: var(--bg);
		color: var(--on-accent); transition: background 0.3s var(--ease), border-color 0.3s;
	}
	.st-box svg { width: 13px; height: 13px; opacity: 0; transform: scale(0.5); transition: opacity 0.25s, transform 0.3s var(--ease-rise); }
	.st-step.is-active .st-box { border-color: var(--accent); }
	.st-check:checked + .st-label .st-box { background: var(--accent); border-color: var(--accent); }
	.st-check:checked + .st-label .st-box svg { opacity: 1; transform: scale(1); }
	.st-check:focus-visible + .st-label .st-box { outline: 2px solid var(--accent); outline-offset: 3px; }

	.st-body { display: grid; gap: 0.25rem; }
	.st-name { font-family: var(--font-d); font-size: clamp(1.08rem, 2vw, 1.3rem); line-height: 1.15; transition: color 0.3s; }
	.st-step.is-active .st-name { color: var(--accent-text); }
	.st-text { color: var(--dim); font-size: 0.92rem; max-width: 52ch; }
	.st-meta { font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--herb); margin-top: 0.15rem; }

	.st-timer {
		flex: none; display: inline-flex; align-items: center; gap: 0.45rem; align-self: center;
		padding: 0.42rem 0.75rem; border-radius: 999px; font-size: 0.78rem;
		border: 1px solid var(--line); background: var(--bg); color: var(--ink); cursor: pointer;
		transition: border-color 0.25s, color 0.25s, background 0.25s;
		font-variant-numeric: tabular-nums;
	}
	.st-timer:hover { border-color: var(--accent); }
	.st-timer.running { border-color: var(--accent); color: var(--accent-text); }
	.st-timer.finished { background: color-mix(in oklab, var(--herb) 14%, var(--bg)); border-color: var(--herb); color: var(--herb); animation: chime 0.5s var(--ease-rise); }
	@keyframes chime {
		40% { transform: scale(1.08); }
		100% { transform: scale(1); }
	}
	.st-ring { width: 18px; height: 18px; transform: rotate(-90deg); }
	.st-ring circle { fill: none; stroke-width: 2.4; }
	.st-ring .rr { stroke: var(--line); }
	.st-ring .rp { stroke: currentColor; stroke-dasharray: 50.27; stroke-linecap: round; transition: stroke-dashoffset 1s linear; }

	.st-foot {
		display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
		margin-top: 1.2rem; padding-top: 1.1rem; border-top: 1px solid var(--line);
	}
	.st-note { margin: 0; font-size: 0.7rem; letter-spacing: 0.1em; color: var(--faint); }
	.st-reset {
		border: 1px solid var(--line); background: transparent; color: var(--dim);
		font-size: 0.72rem; letter-spacing: 0.1em; padding: 0.4rem 0.8rem; border-radius: 999px; cursor: pointer;
		transition: color 0.25s, border-color 0.25s;
	}
	.st-reset:hover { color: var(--accent); border-color: var(--accent); }

	@media (max-width: 620px) {
		.st-step { flex-wrap: wrap; }
		.st-no { display: none; }
		.st-label { flex: 1 1 100%; }
		.st-timer { margin-left: calc(26px + 0.9rem); align-self: flex-start; }
	}

	/* reduced motion: no lifts, no sweeps — states still change instantly */
	.stepper.reduce .st-step,
	.stepper.reduce .st-bar i,
	.stepper.reduce .st-ring .rp { transition: none; }
	@media (prefers-reduced-motion: reduce) {
		.st-step, .st-step.is-active { transform: none !important; transition: none !important; }
		.st-bar i, .st-ring .rp { transition: none !important; }
		.st-timer.finished { animation: none !important; }
		.st-box svg { transition: none !important; }
	}
</style>
