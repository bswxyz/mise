<script>
	import { onMount } from 'svelte';

	let loaded = $state(false);

	onMount(() => {
		// the settle animation only ever runs under html.js; reduced motion
		// pins every bowl to its final frame via the media block below.
		requestAnimationFrame(() => (loaded = true));
	});
</script>

<figure class="board" class:loaded>
	<svg
		viewBox="0 0 560 372"
		role="img"
		aria-label="Top-down view of a prep board: six small bowls holding portioned cherry tomatoes, sliced garlic, picked basil, rigatoni, parmesan and chilli flakes — this week's mise en place."
	>
		<!-- the board -->
		<rect class="wood" x="16" y="12" width="528" height="348" rx="26" />
		<rect class="wood-rim" x="28" y="24" width="504" height="324" rx="18" />

		<!-- row one -->
		<g class="bowl" style="--i:0">
			<circle class="dish" cx="112" cy="118" r="54" />
			<circle class="rim" cx="112" cy="118" r="43" />
			<circle cx="96" cy="108" r="13" fill="var(--tom)" />
			<circle cx="127" cy="111" r="12" fill="var(--tom)" />
			<circle cx="110" cy="134" r="12" fill="var(--tom)" />
			<circle cx="96" cy="96" r="3" fill="var(--herb)" />
			<circle cx="127" cy="100" r="2.6" fill="var(--herb)" />
			<text class="lbl" x="112" y="196">tomatoes · 300 g</text>
		</g>
		<g class="bowl" style="--i:1">
			<circle class="dish" cx="280" cy="118" r="54" />
			<circle class="rim" cx="280" cy="118" r="43" />
			<ellipse cx="266" cy="108" rx="12" ry="5" fill="var(--grl)" stroke="var(--line)" transform="rotate(-20 266 108)" />
			<ellipse cx="291" cy="103" rx="11" ry="4.6" fill="var(--grl)" stroke="var(--line)" transform="rotate(14 291 103)" />
			<ellipse cx="276" cy="127" rx="12" ry="5" fill="var(--grl)" stroke="var(--line)" transform="rotate(6 276 127)" />
			<ellipse cx="297" cy="126" rx="10" ry="4.4" fill="var(--grl)" stroke="var(--line)" transform="rotate(-14 297 126)" />
			<text class="lbl" x="280" y="196">garlic · 3 cloves</text>
		</g>
		<g class="bowl" style="--i:2">
			<circle class="dish" cx="448" cy="118" r="54" />
			<circle class="rim" cx="448" cy="118" r="43" />
			<path class="leaf" d="M0 -18 C 9 -9, 9 7, 0 18 C -9 7, -9 -9, 0 -18 Z" transform="translate(436 110) rotate(-24)" />
			<path class="vein" d="M0 -14 L0 14" transform="translate(436 110) rotate(-24)" />
			<path class="leaf" d="M0 -18 C 9 -9, 9 7, 0 18 C -9 7, -9 -9, 0 -18 Z" transform="translate(462 112) rotate(18)" />
			<path class="vein" d="M0 -14 L0 14" transform="translate(462 112) rotate(18)" />
			<path class="leaf" d="M0 -18 C 9 -9, 9 7, 0 18 C -9 7, -9 -9, 0 -18 Z" transform="translate(448 138) rotate(74) scale(0.78)" />
			<text class="lbl" x="448" y="196">basil · ½ bunch</text>
		</g>

		<!-- row two -->
		<g class="bowl" style="--i:3">
			<circle class="dish" cx="112" cy="256" r="54" />
			<circle class="rim" cx="112" cy="256" r="43" />
			<g transform="translate(94 243) rotate(-18)"><rect x="-15" y="-8.5" width="30" height="17" rx="8" fill="var(--pst)" /><rect x="-9" y="-3.4" width="18" height="6.8" rx="3.4" fill="var(--bowl)" /></g>
			<g transform="translate(126 247) rotate(12)"><rect x="-15" y="-8.5" width="30" height="17" rx="8" fill="var(--pst)" /><rect x="-9" y="-3.4" width="18" height="6.8" rx="3.4" fill="var(--bowl)" /></g>
			<g transform="translate(103 269) rotate(30)"><rect x="-14" y="-8" width="28" height="16" rx="7.5" fill="var(--pst)" /><rect x="-8.5" y="-3.2" width="17" height="6.4" rx="3.2" fill="var(--bowl)" /></g>
			<g transform="translate(131 271) rotate(-8)"><rect x="-13" y="-7.5" width="26" height="15" rx="7" fill="var(--pst)" /><rect x="-8" y="-3" width="16" height="6" rx="3" fill="var(--bowl)" /></g>
			<text class="lbl" x="112" y="334">rigatoni · 180 g</text>
		</g>
		<g class="bowl" style="--i:4">
			<circle class="dish" cx="280" cy="256" r="54" />
			<circle class="rim" cx="280" cy="256" r="43" />
			<path class="shard" d="M262 244 l26 5 l-8 17 Z" />
			<path class="shard" d="M296 240 l12 20 l-20 3 Z" />
			<path class="shard" d="M266 270 l22 -2 l-6 14 Z" />
			<text class="lbl" x="280" y="334">parmesan · 40 g</text>
		</g>
		<g class="bowl" style="--i:5">
			<circle class="dish" cx="448" cy="256" r="54" />
			<circle class="rim" cx="448" cy="256" r="43" />
			<circle cx="432" cy="242" r="2.4" fill="var(--chl)" /><circle cx="444" cy="236" r="2.2" fill="var(--chl)" />
			<circle cx="458" cy="243" r="2.5" fill="var(--chl)" /><circle cx="468" cy="252" r="2.1" fill="var(--chl)" />
			<circle cx="426" cy="256" r="2.3" fill="var(--chl)" /><circle cx="440" cy="252" r="2.6" fill="var(--chl)" />
			<circle cx="452" cy="258" r="2.2" fill="var(--chl)" /><circle cx="464" cy="266" r="2.4" fill="var(--chl)" />
			<circle cx="432" cy="270" r="2.5" fill="var(--chl)" /><circle cx="446" cy="272" r="2.2" fill="var(--chl)" />
			<circle cx="437" cy="245" r="1.5" fill="var(--amber)" /><circle cx="456" cy="250" r="1.4" fill="var(--amber)" />
			<circle cx="442" cy="263" r="1.5" fill="var(--amber)" /><circle cx="458" cy="270" r="1.4" fill="var(--amber)" />
			<text class="lbl" x="448" y="334">chilli · ½ tsp</text>
		</g>
	</svg>
	<figcaption class="board-cap mono">
		<span>box № 28 — “everything in its place”</span>
		<span>6 bowls · 1 pan · 25 min</span>
	</figcaption>
</figure>

<style>
	.board {
		margin: 0; position: relative;
		--tom: #d84e37;
		--grl: #f0e5c9;
		--pst: #dfa94f;
		--prm: #f2ead0;
		--chl: #c9402c;
	}
	:global([data-theme='dark']) .board {
		--tom: #e2593f;
		--grl: #d9cfb2;
		--pst: #d9a850;
		--prm: #ded3b2;
		--chl: #d5482f;
	}

	svg { display: block; width: 100%; height: auto; filter: drop-shadow(0 26px 30px rgba(0, 0, 0, 0.12)); }

	.wood { fill: var(--board); stroke: var(--line); }
	.wood-rim { fill: none; stroke: var(--line-2); }
	.dish { fill: var(--bowl); stroke: var(--line); }
	.rim { fill: none; stroke: var(--line-2); }
	.leaf { fill: var(--herb); }
	.vein { stroke: color-mix(in oklab, var(--herb) 55%, var(--bowl)); stroke-width: 1.4; fill: none; }
	.shard { fill: var(--prm); stroke: var(--line); }
	.lbl {
		font-family: var(--font-m); font-size: 10px; letter-spacing: 0.14em;
		text-transform: uppercase; fill: var(--faint); text-anchor: middle;
	}

	/* everything settles into its place — staggered, gated behind .js */
	.bowl { transform-box: fill-box; transform-origin: center; }
	:global(html.js) .board .bowl { opacity: 0; transform: translateY(-14px); }
	:global(html.js) .board.loaded .bowl {
		animation: settle 0.7s var(--ease-rise) calc(var(--i) * 95ms) forwards;
	}
	@keyframes settle {
		to { opacity: 1; transform: translateY(0); }
	}

	.board-cap {
		display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
		margin-top: 1rem; font-size: 0.7rem; letter-spacing: 0.1em; color: var(--faint);
	}

	@media (prefers-reduced-motion: reduce) {
		:global(html.js) .board .bowl {
			opacity: 1 !important; transform: none !important; animation: none !important;
		}
	}
</style>
