import { forwardRef } from "react";
import { readSessionStorageValue } from "@mantine/hooks";
import { Navigate } from "react-router-dom";

interface Props {
	children: React.ReactNode;
}

export const ProtectedRoute = forwardRef<HTMLDivElement, Props>(
	({ children }, ref) => {
		const isLoggedIn = readSessionStorageValue({ key: "isLoggedIn" });

		return isLoggedIn ? children : <Navigate to="/login" />;
	}
);
