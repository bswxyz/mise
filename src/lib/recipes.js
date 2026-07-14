/* One source of truth for everything edible on the page.
   The stepper, the ratio slider and the hero board all read
   from the same rigatoni — the site practices mise en place. */

export const week = {
	number: 28,
	label: 'week of 13 july'
};

export const recipes = [
	{
		id: 'rigatoni',
		name: 'Charred Tomato Rigatoni',
		mins: 25,
		kcal: 640,
		diet: 'veg',
		note: 'Blistered cherries, garlic gone golden, a fistful of basil. The exact recipe the stepper below walks you through.',
		tag: 'on the stepper ↓',
		tagKind: 'accent'
	},
	{
		id: 'salmon',
		name: 'Miso-Butter Salmon',
		mins: 20,
		kcal: 590,
		diet: 'pescatarian',
		note: 'One pan, one glaze — miso, butter, a little honey. Spoon it over rice and accept the compliments.',
		tag: 'back by demand',
		tagKind: 'amber'
	},
	{
		id: 'bowl',
		name: 'Crispy Chickpea Bowl',
		mins: 30,
		kcal: 540,
		diet: 'vegan',
		note: 'Chickpeas roasted to a rattle, quick-pickled onion, green tahini. Meal-prep energy, dinner-party looks.',
		tag: 'new this week',
		tagKind: 'herb'
	},
	{
		id: 'chicken',
		name: 'Sticky Ginger Chicken',
		mins: 35,
		kcal: 680,
		diet: 'gluten-free',
		note: 'Glossy, gingery, gone in minutes. Sesame and scallion over the top; greens steam while it sticks.',
		tag: 'family favourite',
		tagKind: 'herb'
	}
];

export const stepper = {
	recipe: 'Charred Tomato Rigatoni',
	steps: [
		{
			title: 'Mise en place',
			body: 'Bowls out, board clear. Tomatoes halved, garlic sliced thin, basil picked, pasta water salted like the sea.',
			meta: 'knife + board · no heat yet'
		},
		{
			title: 'Blister the tomatoes',
			body: 'Hot pan, a slick of oil, tomatoes cut-side down. Now leave them alone — the char is the flavour, and fiddling steals it.',
			meta: 'pan: high',
			timer: 240
		},
		{
			title: 'Drop the rigatoni',
			body: 'Into the rolling boil. Two minutes shy of the packet — it finishes cooking in the pan, not the pot.',
			meta: 'pot: rolling boil',
			timer: 660
		},
		{
			title: 'Garlic, gently',
			body: 'Push the tomatoes aside, drop the heat, add garlic and chilli. Golden is the goal. Brown is bitter.',
			meta: 'pan: medium-low',
			timer: 120
		},
		{
			title: 'Marry it',
			body: 'Rigatoni into the pan with a ladle of its own water. Toss until the sauce turns glossy and clings to the ridges.',
			meta: 'tongs · one good ladleful'
		},
		{
			title: 'Finish',
			body: 'Off the heat: basil, parmesan, one more crack of pepper. Plate up warm bowls — you did that.',
			meta: 'heat: off'
		}
	]
};

/* Quantities written per 2 servings — the recipe as printed. */
export const ingredients = [
	{ name: 'rigatoni', qty: 180, per: 2, unit: 'g' },
	{ name: 'cherry tomatoes', qty: 300, per: 2, unit: 'g' },
	{ name: 'garlic', qty: 3, per: 2, unit: 'clove' },
	{ name: 'basil', qty: 0.5, per: 2, unit: 'bunch' },
	{ name: 'parmesan', qty: 40, per: 2, unit: 'g' },
	{ name: 'olive oil', qty: 6, per: 2, unit: 'tsp' },
	{ name: 'chilli flakes', qty: 0.5, per: 2, unit: 'tsp' },
	{ name: 'pasta water', fixed: 'one good ladleful' },
	{ name: 'sea salt', fixed: 'to taste — taste it' }
];

/* Pan advice changes with the head-count. Kitchens scale in
   technique, not just grams. */
export const advice = [
	'',
	'Cooking for one is self-respect. Same ritual, smaller pan.',
	'The recipe as written — one wide pan, no compromises.',
	'Reach for your widest pan. Crowded tomatoes steam instead of char.',
	'Widest pan, and warm the bowls — four plates cool fast.',
	'Blister the tomatoes in two batches. Char needs elbow room.',
	'Two batches, big pot on first. Feeding six rewards patience.'
];
