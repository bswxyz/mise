<script>
	/** Bespoke top-down plate art for the weekly kit cards.
	 *  kind: 'rigatoni' | 'salmon' | 'bowl' | 'chicken'  */
	let { kind = 'rigatoni' } = $props();
</script>

<svg class="plate" viewBox="0 0 200 140" aria-hidden="true" focusable="false">
	<circle class="dish" cx="100" cy="70" r="58" />
	<circle class="rim" cx="100" cy="70" r="46" />

	{#if kind === 'rigatoni'}
		<g transform="translate(84 58) rotate(-16)"><rect x="-13" y="-7" width="26" height="14" rx="7" fill="var(--pst)" /><rect x="-8" y="-2.8" width="16" height="5.6" rx="2.8" fill="var(--dishc)" /></g>
		<g transform="translate(112 54) rotate(22)"><rect x="-13" y="-7" width="26" height="14" rx="7" fill="var(--pst)" /><rect x="-8" y="-2.8" width="16" height="5.6" rx="2.8" fill="var(--dishc)" /></g>
		<g transform="translate(94 82) rotate(40)"><rect x="-12" y="-6.5" width="24" height="13" rx="6.5" fill="var(--pst)" /><rect x="-7.5" y="-2.6" width="15" height="5.2" rx="2.6" fill="var(--dishc)" /></g>
		<g transform="translate(120 80) rotate(-6)"><rect x="-12" y="-6.5" width="24" height="13" rx="6.5" fill="var(--pst)" /><rect x="-7.5" y="-2.6" width="15" height="5.2" rx="2.6" fill="var(--dishc)" /></g>
		<circle cx="74" cy="76" r="8" fill="var(--tom)" />
		<circle cx="126" cy="62" r="7" fill="var(--tom)" />
		<circle cx="106" cy="98" r="6.5" fill="var(--tom)" />
		<path class="leaf" d="M0 -9 C 4.5 -4.5, 4.5 3.5, 0 9 C -4.5 3.5, -4.5 -4.5, 0 -9 Z" transform="translate(88 44) rotate(-20)" />
		<path class="leaf" d="M0 -8 C 4 -4, 4 3, 0 8 C -4 3, -4 -4, 0 -8 Z" transform="translate(118 92) rotate(30)" />
	{:else if kind === 'salmon'}
		<path d="M70 88 Q66 62 84 52 L120 46 Q132 48 130 60 L126 88 Q124 98 112 98 L82 98 Q72 98 70 88 Z" fill="var(--sal)" />
		<path d="M82 58 Q92 66 88 92 M98 54 Q108 64 104 94 M114 50 Q124 60 118 92" fill="none" stroke="var(--salhi)" stroke-width="3" stroke-linecap="round" />
		<circle cx="140" cy="86" r="12" fill="var(--lem)" />
		<circle cx="140" cy="86" r="8.5" fill="var(--lemhi)" />
		<path d="M140 78.5 L140 93.5 M132.9 86 L147.1 86 M135 81 L145 91 M145 81 L135 91" stroke="var(--lem)" stroke-width="1.2" />
		<path d="M58 66 Q66 56 76 60 M56 76 Q64 70 72 74" fill="none" stroke="var(--herb)" stroke-width="3.4" stroke-linecap="round" />
	{:else if kind === 'bowl'}
		<circle cx="86" cy="62" r="5.4" fill="var(--chk)" /><circle cx="98" cy="56" r="5" fill="var(--chk)" />
		<circle cx="110" cy="62" r="5.4" fill="var(--chk)" /><circle cx="92" cy="72" r="5" fill="var(--chk)" />
		<circle cx="104" cy="72" r="5.2" fill="var(--chk)" /><circle cx="116" cy="72" r="4.6" fill="var(--chk)" />
		<path d="M64 78 A 22 22 0 0 1 84 94 L 72 96 A 14 14 0 0 0 64 78 Z" fill="var(--avo)" />
		<path d="M72 68 A 26 26 0 0 1 88 80 L 80 86 A 16 16 0 0 0 68 76 Z" fill="var(--avohi)" />
		<circle cx="128" cy="52" r="4" fill="var(--pick)" /><circle cx="136" cy="60" r="3.6" fill="var(--pick)" />
		<circle cx="130" cy="66" r="3.2" fill="var(--pick)" />
		<path d="M76 52 Q96 44 122 84 M86 46 Q108 42 130 76" fill="none" stroke="var(--driz)" stroke-width="2.6" stroke-linecap="round" opacity="0.9" />
	{:else}
		<g transform="translate(84 58) rotate(-12)"><rect x="-13" y="-9" width="26" height="18" rx="8" fill="var(--chx)" /></g>
		<g transform="translate(114 60) rotate(18)"><rect x="-12" y="-8.5" width="24" height="17" rx="8" fill="var(--chx)" /></g>
		<g transform="translate(96 86) rotate(34)"><rect x="-12" y="-8" width="24" height="16" rx="7.5" fill="var(--chx)" /></g>
		<circle cx="80" cy="54" r="1.4" fill="var(--ses)" /><circle cx="90" cy="60" r="1.4" fill="var(--ses)" />
		<circle cx="112" cy="56" r="1.4" fill="var(--ses)" /><circle cx="120" cy="64" r="1.4" fill="var(--ses)" />
		<circle cx="94" cy="84" r="1.4" fill="var(--ses)" /><circle cx="102" cy="90" r="1.4" fill="var(--ses)" />
		<path d="M70 82 L82 74 M126 78 L138 72 M118 92 L132 88" stroke="var(--herb)" stroke-width="3" stroke-linecap="round" />
		<path d="M124 44 Q136 48 138 58" fill="none" stroke="var(--herb)" stroke-width="3" stroke-linecap="round" />
	{/if}
</svg>

<style>
	.plate {
		width: 74%; height: auto; display: block;
		--dishc: var(--bowl);
		--tom: #d84e37;
		--pst: #dfa94f;
		--sal: #e08a63;
		--salhi: #f2b492;
		--lem: #e5c85a;
		--lemhi: #f4e9b0;
		--chk: #d9b06c;
		--avo: #7fa564;
		--avohi: #a8c489;
		--pick: #c96d94;
		--driz: #e8dfc4;
		--chx: #a86b3c;
		--ses: #f2ead0;
	}
	.dish { fill: var(--bowl); stroke: var(--line); }
	.rim { fill: none; stroke: var(--line-2); }
	.leaf { fill: var(--herb); }
</style>
