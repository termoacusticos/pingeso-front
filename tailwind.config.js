const { addIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			gridTemplateColumns: {
				sidebar: '256px auto'
			}
		}
	},
	plugins: [require('tailwindcss-animated'), addIconSelectors(['mdi'])]
};
