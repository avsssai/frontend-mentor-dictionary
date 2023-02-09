/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: "'Inter', sans-serif",
				serif: "'Lora', serif",
				mono: "'Inconsolata', monospace",
			},
		},
	},
	safelist: ["font-mono", "font-sans", "font-serif"],
	darkMode: "class",
	plugins: [],
};
