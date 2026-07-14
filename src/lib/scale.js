/* Kitchen-honest scaling. Quantities round to measures a cook
   would actually use — never "217 g" or "0.83 tsp". Fractions
   snap to quarters, grams snap to the pack, and three teaspoons
   fold into a tablespoon. */

const QUARTERS = { 0.25: '¼', 0.5: '½', 0.75: '¾' };

function quarter(x) {
	return Math.round(x * 4) / 4;
}

/* 1.5 → "1½" · 0.25 → "¼" · 3 → "3" */
export function frac(x) {
	const q = Math.max(0.25, quarter(x));
	const whole = Math.floor(q);
	const rem = +(q - whole).toFixed(2);
	if (!whole) return QUARTERS[rem];
	return rem ? `${whole}${QUARTERS[rem]}` : String(whole);
}

export function grams(g) {
	const step = g < 100 ? 5 : g < 500 ? 10 : 25; // kitchen-honest rounding
	return `${Math.max(step, Math.round(g / step) * step)} g`;
}

export function spoons(tsp) {
	if (tsp >= 3) return `${frac(tsp / 3)} tbsp`; // 3 tsp fold into 1 tbsp
	return `${frac(tsp)} tsp`;
}

export function count(n, word) {
	const c = Math.max(1, Math.round(n));
	return `${c} ${word}${c > 1 ? 's' : ''}`;
}

export function bunches(b) {
	const q = Math.max(0.25, quarter(b));
	return `${frac(q)} bunch${q > 1 ? 'es' : ''}`;
}

/* One ingredient line at N servings. Fixed lines never scale —
   salt is to taste at any table size. */
export function scaleLine(ing, servings) {
	if (ing.fixed) return ing.fixed;
	const raw = (ing.qty * servings) / ing.per;
	switch (ing.unit) {
		case 'g': return grams(raw);
		case 'tsp': return spoons(raw);
		case 'clove': return count(raw, 'clove');
		case 'bunch': return bunches(raw);
		default: return String(raw);
	}
}
