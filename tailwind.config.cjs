/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		extend: {
			height: {
				910: '90vh',
			}
		},
	},
	plugins: [
		require('flowbite/plugin')
	],
	safelist:[]

}
