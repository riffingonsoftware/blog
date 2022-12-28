/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						code: {
							fontFamily: "Fira Code, monospace",
							// span: {
							//   fontFamily: "Fira Code, monospace",
							// },
						},
					},
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
