import { browser } from '$app/environment';

/** Synchronous reduced-motion check (safe on the server → false). */
export function prefersReduced() {
	return browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Scroll-reveal action applied to a container (e.g. <main>): finds every
 * `.reveal` / `.reveal-clip` descendant and adds `.is-in` as each scrolls
 * into view. Content is visible without JS (the hidden state only bites
 * under html.js) and reduced motion reveals everything instantly.
 * Scroll-listener based so it stays robust where an embedded viewport
 * reports a transient innerHeight of 0.
 */
export function revealAll(node) {
	if (!browser) return {};
	const pending = new Set(node.querySelectorAll('.reveal, .reveal-clip'));
	const show = (n) => n.classList.add('is-in');
	if (prefersReduced()) {
		pending.forEach(show);
		return {};
	}
	const vh = () => window.innerHeight || document.documentElement.clientHeight || 800;
	const check = () => {
		const h = vh();
		for (const n of [...pending]) {
			const r = n.getBoundingClientRect();
			if (r.top < h * 0.9 && r.bottom > -40) {
				show(n);
				pending.delete(n);
			}
		}
		if (!pending.size) teardown();
	};
	const onScroll = () => check();
	const teardown = () => {
		window.removeEventListener('scroll', onScroll);
		window.removeEventListener('resize', onScroll);
	};
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll, { passive: true });
	check(); // initial pass reveals everything above the fold
	[140, 400, 900].forEach((t) => setTimeout(check, t));
	return { destroy: teardown };
}

/**
 * Count-up action: animates the node's text 0 → `to` the first time it
 * scrolls into view. Reduced motion sets the final value immediately.
 */
export function countUp(node, opts = {}) {
	if (!browser) return {};
	const to = opts.to ?? (parseFloat(node.textContent) || 0);
	const dur = opts.dur ?? 1200;
	const fmt = (v) => Math.round(v).toLocaleString('en-GB');
	if (prefersReduced()) {
		node.textContent = fmt(to);
		return {};
	}
	node.textContent = '0';
	let raf;
	let started = false;
	const vh = () => window.innerHeight || document.documentElement.clientHeight || 800;
	const start = () => {
		started = true;
		teardown();
		const t0 = performance.now();
		const tick = (t) => {
			const p = Math.min(1, (t - t0) / dur);
			node.textContent = fmt(to * (1 - Math.pow(1 - p, 3)));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
	};
	const check = () => {
		if (started) return;
		const r = node.getBoundingClientRect();
		if (r.top < vh() * 0.92 && r.bottom > 0) start();
	};
	const onScroll = () => check();
	const teardown = () => {
		window.removeEventListener('scroll', onScroll);
		window.removeEventListener('resize', onScroll);
	};
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll, { passive: true });
	check();
	[200, 600].forEach((t) => setTimeout(check, t));
	return {
		destroy() {
			teardown();
			if (raf) cancelAnimationFrame(raf);
		}
	};
}
