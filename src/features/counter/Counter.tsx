import { Button } from "@mantine/core";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { decrement, increment } from "./counterSlice";

export function Counter() {
	const count = useAppSelector((state) => state.counter.value);
	const dispatch = useAppDispatch();

	return (
		<div>
			<div>
				<Button
					aria-label="Increment value"
					onClick={() => dispatch(increment())}
				>
					Increment
				</Button>
				<span>{count}</span>
				<Button
					aria-label="Decrement value"
					onClick={() => dispatch(decrement())}
				>
					Decrement
				</Button>
			</div>
		</div>
	);
}
