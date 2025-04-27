/** @type {import('tailwindcss').Config} */

module.exports = {
	darkMode: ["class", '[data-mantine-color-scheme="dark"]'],
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	plugins: [],
};
