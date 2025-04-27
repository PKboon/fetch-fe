import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { store } from "./stores/store.ts";
import { Provider } from "react-redux";
import theme from "./theme.ts";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<MantineProvider theme={theme}>
				<App />
			</MantineProvider>
		</Provider>
	</StrictMode>
);
