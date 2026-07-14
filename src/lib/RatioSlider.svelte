<script>
	import { ingredients, advice } from '$lib/recipes.js';
	import { scaleLine } from '$lib/scale.js';

	let servings = $state(2);
	const pct = $derived(((servings - 1) / 5) * 100);
</script>

<div class="ratio">
	<div class="r-dial">
		<p class="r-serves mono">serves</p>
		<p class="r-num" aria-hidden="true">{servings}</p>
		<label class="sr-only" for="servings">Servings</label>
		<input
			id="servings"
			class="r-range"
			type="range"
			min="1"
			max="6"
			step="1"
			bind:value={servings}
			style="--p:{pct}%"
			aria-valuetext="{servings} {servings === 1 ? 'serving' : 'servings'}"
		/>
		<div class="r-ticks mono" aria-hidden="true">
			{#each [1, 2, 3, 4, 5, 6] as n}
				<span class:on={n === servings}>{n}</span>
			{/each}
		</div>
		<p class="r-advice">{advice[servings]}</p>
		<p class="r-kcal mono">≈ 640 kcal a plate, at any size</p>
	</div>

	<ul class="r-list">
		{#each ingredients as ing (ing.name)}
			<li class="r-row" class:is-fixed={!!ing.fixed}>
				<span class="r-name">{ing.name}</span>
				<span class="r-dots" aria-hidden="true"></span>
				{#if ing.fixed}
					<span class="r-qty r-fixed mono">{ing.fixed}</span>
				{:else}
					{#key servings}
						<span class="r-qty mono">{scaleLine(ing, servings)}</span>
					{/key}
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style>
	.ratio {
		display: grid; grid-template-columns: 0.9fr 1.1fr; gap: clamp(1.4rem, 4vw, 3rem);
		border: 1px solid var(--line); border-radius: var(--r-lg);
		background: var(--panel); box-shadow: var(--shadow);
		padding: clamp(1.2rem, 3vw, 2.2rem);
	}
	@media (max-width: 760px) {
		.ratio { grid-template-columns: 1fr; }
	}

	.r-serves { margin: 0; font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--faint); }
	.r-num {
		font-family: var(--font-d); font-size: clamp(4.6rem, 9vw, 7rem); line-height: 0.95;
		margin: 0.1rem 0 0.8rem; color: var(--accent);
		font-variant-numeric: tabular-nums;
	}

	.r-range {
		-webkit-appearance: none; appearance: none;
		width: 100%; height: 6px; border-radius: 4px; margin: 0.4rem 0 0.3rem;
		background: linear-gradient(90deg, var(--accent) var(--p), var(--line) var(--p));
		outline-offset: 6px; cursor: pointer;
	}
	.r-range::-webkit-slider-thumb {
		-webkit-appearance: none; appearance: none;
		width: 26px; height: 26px; border-radius: 50%;
		background: var(--accent); border: 3px solid var(--panel);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
		transition: transform 0.2s var(--ease-rise);
	}
	.r-range::-webkit-slider-thumb:hover { transform: scale(1.12); }
	.r-range::-moz-range-thumb {
		width: 22px; height: 22px; border-radius: 50%;
		background: var(--accent); border: 3px solid var(--panel);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
	}

	.r-ticks { display: flex; justify-content: space-between; padding-inline: 6px; font-size: 0.72rem; color: var(--faint); }
	.r-ticks span { transition: color 0.25s; }
	.r-ticks span.on { color: var(--accent-text); font-weight: 700; }

	.r-advice { color: var(--dim); font-size: 0.95rem; margin: 1.2rem 0 0; max-width: 30ch; }
	.r-kcal { font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--herb); margin: 1rem 0 0; }

	.r-list { list-style: none; margin: 0; padding: 0; align-self: center; }
	.r-row {
		display: flex; align-items: baseline; gap: 0.7rem;
		padding: 0.62rem 0; border-bottom: 1px dashed var(--line);
	}
	.r-row:last-child { border-bottom: 0; }
	.r-name { white-space: nowrap; }
	.r-dots { flex: 1; border-bottom: 1px dotted var(--line); transform: translateY(-4px); }
	.r-qty { font-size: 0.85rem; white-space: nowrap; font-variant-numeric: tabular-nums; animation: pop 0.35s var(--ease); }
	.r-fixed { color: var(--faint); font-style: italic; animation: none; }
	.is-fixed .r-name { color: var(--dim); }
	@keyframes pop {
		from { opacity: 0; transform: translateY(5px); }
	}

	@media (prefers-reduced-motion: reduce) {
		.r-qty { animation: none !important; }
		.r-range::-webkit-slider-thumb { transition: none; transform: none !important; }
	}
</style>
