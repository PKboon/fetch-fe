import { useEffect, useState } from "react";
import { getBreedsAsync } from "../stores/breedSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { AppDispatch, RootState } from "../stores/store";
import {
	Box,
	ComboboxItem,
	Input,
	MultiSelect,
	RangeSlider,
	Select,
	Text,
	Title,
} from "@mantine/core";

export default function DogFilter() {
	const dispatch = useAppDispatch<AppDispatch>();

	// setting sorting config
	const sortOptions = [
		{ value: "age:asc", label: "Age (Young to Senior)" },
		{ value: "age:desc", label: "Age (Senior to young)" },
		{ value: "breed:asc", label: "Breed (A-Z)" },
		{ value: "breed:desc", label: "Breed (Z-A)" },
		{ value: "name:asc", label: "Name (A-Z)" },
		{ value: "name:desc", label: "Name (Z-A)" },
	];

	// setting breeds config
	const { breeds } = useAppSelector((state: RootState) => state.breed);
	useEffect(() => {
		dispatch(getBreedsAsync());
	}, []);

	// setting age config
	const minAge = 0;
	const maxAge = 14;
	function getAgeMarks() {
		const marks = [];
		for (let i = minAge; i <= maxAge; i++) {
			if (!(i % 2)) marks.push({ value: i, label: `${i}` });
		}
		return marks;
	}

	// setting states
	const [selectedSort, setSelectedSort] = useState<ComboboxItem>({
		value: "breed:asc",
		label: "Breed (A-Z)",
	});
	const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
	const [selectedZipCodes, setSelectedZipCodes] = useState<string>("");
	const [selectedAgeRange, setSelectedAgeRange] = useState<[number, number]>([
		minAge,
		maxAge,
	]);

	return (
		<div className="p-4 pe-0">
			<Title order={4} className="text-amber-600">
				Find dogs
			</Title>
			<Box className="grid gap-4 h-fit mt-0.5">
				<Select
					label="Sort by"
					placeholder="Breed (A-Z)"
					data={sortOptions}
					value={selectedSort.value}
					onChange={(_value, option) => setSelectedSort(option)}
				/>

				<MultiSelect
					searchable
					label="Breeds"
					description="Allow up to 100 breeds."
					placeholder="Search or select"
					data={breeds}
					maxValues={100}
					value={selectedBreeds}
					onChange={setSelectedBreeds}
				/>

				<Input.Wrapper
					label="Zip codes"
					description="Allow up to 100 zip codes. Separate each zip code with a comma as shown."
				>
					<Input
						placeholder="12345, 67890, 34567, ..."
						value={selectedZipCodes}
						onChange={(e) =>
							setSelectedZipCodes(e.currentTarget.value)
						}
					/>
				</Input.Wrapper>

				<Box className="grid gap-1 mb-5">
					<Text size="sm" fw={500}>
						Ages
					</Text>
					<RangeSlider
						minRange={0}
						min={minAge}
						max={maxAge}
						step={1}
						marks={getAgeMarks()}
						value={selectedAgeRange}
						onChange={setSelectedAgeRange}
					/>
				</Box>
			</Box>
		</div>
	);
}
