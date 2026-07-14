<script>
	import { onMount } from 'svelte';

	let dark = $state(false);

	onMount(() => {
		dark = document.documentElement.dataset.theme === 'dark';
	});

	function toggle() {
		dark = !dark;
		const t = dark ? 'dark' : 'light';
		document.documentElement.dataset.theme = t;
		try {
			localStorage.setItem('mise-theme', t);
		} catch (e) {
			/* private mode — theme just won't persist */
		}
		const meta = document.querySelector('meta[name="theme-color"]');
		if (meta) meta.setAttribute('content', dark ? '#191b1a' : '#f5f1e8');
	}
</script>

<button
	class="theme-btn"
	type="button"
	aria-pressed={dark}
	aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
	title="Toggle light / dark"
	onclick={toggle}
>
	<svg class="ico-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" /><g stroke-linecap="round"><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" /></g></svg>
	<svg class="ico-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" /></svg>
</button>

<style>
	.theme-btn {
		display: inline-grid; place-items: center;
		width: 36px; height: 36px; margin-left: 0.2rem;
		border: 1px solid var(--line); border-radius: 999px;
		background: transparent; color: var(--dim); cursor: pointer;
		transition: color 0.25s, border-color 0.25s, transform 0.2s var(--ease);
	}
	.theme-btn:hover { color: var(--ink); border-color: var(--accent); }
	.theme-btn:active { transform: scale(0.9); }
	.theme-btn svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 1.7; }

	:global([data-theme='dark']) .ico-sun { display: block; }
	:global([data-theme='dark']) .ico-moon { display: none; }
	:global([data-theme='light']) .ico-sun { display: none; }
	:global([data-theme='light']) .ico-moon { display: block; }

	@media (prefers-reduced-motion: reduce) {
		.theme-btn:active { transform: none; }
	}
</style>
