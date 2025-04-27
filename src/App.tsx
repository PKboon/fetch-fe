import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import BrowsePage from "./pages/BrowsePage";
import { NavBar } from "./components/NavBar";
import { AppShell } from "@mantine/core";
import { useDisclosure, useSessionStorage } from "@mantine/hooks";
import DogFilter from "./components/DogFilter";

export default function App() {
	const [opened, { toggle }] = useDisclosure();
	const [isLoggedIn] = useSessionStorage({
		key: "isLoggedIn",
		defaultValue: false,
	});
	const isLoginPage = window.location.pathname === "/login";

	return (
		<BrowserRouter>
			<AppShell
				withBorder={false}
				header={{ height: "3.5rem" }}
				navbar={{
					width: isLoginPage ? "0" : "18rem",
					breakpoint: "sm",
					collapsed: { desktop: opened, mobile: !opened },
				}}
				padding="md"
			>
				<AppShell.Header className="bg-amber-500 border-0">
					<NavBar opened={opened} toggle={toggle} />
				</AppShell.Header>

				{isLoginPage && isLoggedIn ? (
					<></>
				) : (
					<AppShell.Navbar>
						{window.location.pathname}
						{isLoggedIn}
						<DogFilter />
					</AppShell.Navbar>
				)}

				<AppShell.Main p={isLoginPage ? "0" : ""}>
					<Routes>
						<Route path="/" element={<BrowsePage />} />
						<Route path="/login" element={<LoginPage />} />
					</Routes>
				</AppShell.Main>
			</AppShell>
		</BrowserRouter>
	);
}
