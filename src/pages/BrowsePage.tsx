import { Grid } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { RootState } from "../stores/store";
import { DogCard } from "../components/DogCard";
import { getDogsAsync, searchDogsAsync } from "../stores/browseSlice";
import { useEffect } from "react";

export default function BrowsePage() {
	const dispatch = useAppDispatch();
	const { dogs, dogSearchedResult, dogSearchParams, isFilterOn } =
		useAppSelector((state: RootState) => state.browse);

	useEffect(() => {
		const fetchData = async () => {
			if (dogs.length > 0) return;

			if (!isFilterOn) await dispatch(searchDogsAsync(dogSearchParams));

			if (dogSearchedResult.resultIds.length === 0) return;
			await dispatch(getDogsAsync(dogSearchedResult.resultIds));
		};

		fetchData();
	}, [dispatch, dogSearchParams, dogSearchedResult.resultIds, dogs.length]);

	return (
		<>
			<Grid className="w-full h-screen overflow-auto">
				{dogs.map((dog) => (
					<Grid.Col
						key={dog.id}
						span={{ base: 12, xs: 6, lg: 4, xl: 3 }}
					>
						<DogCard dog={dog} />
					</Grid.Col>
				))}
			</Grid>
		</>
	);
}
