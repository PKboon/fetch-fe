import { Button, Center, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { User } from "../interfaces";
import { login } from "../services";
import { useSessionStorage } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useSessionStorage({
		key: "isLoggedIn",
		defaultValue: false,
	});

	const [errorLogin, setErrorLogin] = useState(false);

	const form = useForm({
		mode: "uncontrolled",
		initialValues: { name: "", email: "" },
		validate: {
			name: (value) => (value ? null : "Invalid name."),
			email: (value) =>
				/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
					? null
					: "Invalid email.",
		},
	});

	async function handleLogin(user: User): Promise<void> {
		const response = await login(user);
		const data = response.data;

		if (data) {
			setIsLoggedIn(true);
			navigate("/");
		} else {
			setErrorLogin(true);
		}
	}

	function renderedError() {
		return errorLogin ? (
			<span className="text-red-500 font-bold px-3 text-center">
				Something went wrong. Please try again later.
			</span>
		) : (
			<></>
		);
	}

	return (
		<Center className="flex-col gap-3 h-screen bg-radial from-white from-35% to-amber-400">
			<Center className="flex-col">
				<Title order={2} className="text-center px-3">
					Welcome to{" "}
					<span className="text-amber-600">PK's Fetch FE</span>
				</Title>
				<Title order={4} className="text-center px-3">
					Please log in to continue
				</Title>
			</Center>
			<form
				onSubmit={form.onSubmit(handleLogin)}
				className="grid gap-3 w-2/3 sm:w-1/3 lg:w-3/12"
			>
				<TextInput
					label="Name"
					placeholder="John Doe"
					key={form.key("name")}
					{...form.getInputProps("name")}
				/>
				<TextInput
					label="Email"
					placeholder="john.doe@email.com"
					key={form.key("email")}
					{...form.getInputProps("email")}
				/>
				<Button fullWidth type="submit">
					Submit
				</Button>
			</form>

			{renderedError()}
		</Center>
	);
}
