import { createTheme } from "@mantine/core";
import colors from "tailwindcss/colors";

const theme = createTheme({
	primaryColor: 'amber',
	colors: {
		'amber': [
			colors.amber[50],
			colors.amber[100],
			colors.amber[200],
			colors.amber[300],
			colors.amber[400],
			colors.amber[500],
			colors.amber[600],
			colors.amber[700],
			colors.amber[800],
			colors.amber[900],
		],
	},
});

export default theme;