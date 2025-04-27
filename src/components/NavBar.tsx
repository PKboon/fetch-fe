import { Burger, Button, Group, Title } from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services";
import { useSessionStorage } from "@mantine/hooks";
import { forwardRef } from "react";
import { useAppSelector } from "../hooks/hook";

interface Props {
	opened: boolean;
	toggle: () => void;
}

export const NavBar = forwardRef<HTMLDivElement, Props>(
	({ opened, toggle }, ref) => {
		const navigate = useNavigate();
		const location = useLocation();
		const [isLoggedIn, setIsLoggedIn, removeIsLoggedIn] = useSessionStorage(
			{
				key: "isLoggedIn",
				defaultValue: false,
			}
		);

		const { isFilterOn } = useAppSelector((state) => state.browse);

		async function handleLogout(): Promise<void> {
			const response = await logout();
			const data = response.data;

			if (data) {
				setIsLoggedIn(false);
				removeIsLoggedIn();
				navigate("/login");
			}
		}

		return (
			<div
				ref={ref}
				className="flex items-center justify-between px-4 bg-amber-500 h-full"
			>
				<Group>
					{isLoggedIn && location.pathname !== "/login" && (
						<>
							<Burger
								opened={opened}
								onClick={toggle}
								hiddenFrom="sm"
								size="sm"
								color="white"
							/>
							<div
								className={`absolute text-red-600 left-8 top-2 ${
									isFilterOn && !opened ? "visible" : "hidden"
								}`}
							>
								●
							</div>
						</>
					)}
					<Title order={3} className="w-fit text-white">
						PK Fetch's FE
					</Title>
				</Group>
				{isLoggedIn && location.pathname !== "/login" && (
					<Link to="/" className="text-dark text-decoration-none">
						<Button
							variant="subtle"
							color="white"
							onClick={() => handleLogout()}
						>
							Log out
						</Button>
					</Link>
				)}
			</div>
		);
	}
);
