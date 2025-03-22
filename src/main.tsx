import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { store } from "./app/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<MantineProvider>
				<App />
			</MantineProvider>
		</Provider>
	</StrictMode>
);
