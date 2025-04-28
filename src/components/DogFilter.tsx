import { useEffect, useState } from "react";
import { getBreedsAsync } from "../stores/breedSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { AppDispatch, RootState } from "../stores/store";
import {
	Box,
	ComboboxItem,
	Input,
	Loader,
	MultiSelect,
	RangeSlider,
	ScrollArea,
	Select,
	Text,
	Title,
} from "@mantine/core";
import {
	getDogsAsync,
	searchDogsAsync,
	isFilterOn,
	setSearchParams,
} from "../stores/browseSlice";
import { DogSearchParams, DogSortValue } from "../interfaces";
import { readSessionStorageValue, useDebouncedCallback } from "@mantine/hooks";

export default function DogFilter() {
	const isLoggedIn = readSessionStorageValue({ key: "isLoggedIn" });

	const dispatch = useAppDispatch<AppDispatch>();
	const { maxKeyCount, dogSearchParams } = useAppSelector(
		(state: RootState) => state.browse
	);

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
	function getAgeMarks() {
		const marks = [];
		for (let i = dogSearchParams.ageMin; i <= dogSearchParams.ageMax; i++) {
			if (!(i % 2)) marks.push({ value: i, label: `${i}` });
		}
		return marks;
	}

	// setting states
	const [isZipCodeLoading, setIsZipCodeLoading] = useState<boolean>(false);

	const updateSearchedDogs = async (
		updatedParams: Partial<DogSearchParams>
	) => {
		const searchParams = dispatch(
			setSearchParams({ ...dogSearchParams, ...updatedParams })
		);

		dispatch(isFilterOn());
		console.log(dogSearchParams);

		const searchedResult = await dispatch(
			searchDogsAsync(searchParams.payload)
		);

		if (searchDogsAsync.fulfilled.match(searchedResult)) {
			const updatedResultIds = searchedResult.payload.resultIds;
			await dispatch(getDogsAsync(updatedResultIds));
		}
	};

	const handleSort = async (value: ComboboxItem) => {
		updateSearchedDogs({ sort: value.value as DogSortValue });
	};

	const handleBreeds = async (value: string[]) => {
		updateSearchedDogs({ breeds: value });
	};

	const handleZipCodes = useDebouncedCallback(async (value: string) => {
		setIsZipCodeLoading(true);
		updateSearchedDogs({
			zipCodes: value ? value.split(", ") : [],
		});
		setIsZipCodeLoading(false);
	}, 1000);

	const handleZipCodeChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		dispatch(
			setSearchParams({
				...dogSearchParams,
				zipCodeString: event.currentTarget.value,
			})
		);
		handleZipCodes(event.currentTarget.value);
	};

	const hangleAgeRange = useDebouncedCallback(
		async ([ageMin, ageMax]: [number, number]) => {
			updateSearchedDogs({ ageMin, ageMax });
		},
		500
	);

	const handleAgeRangeChange = (value: [number, number]) => {
		hangleAgeRange(value);
	};

	return isLoggedIn ? (
		<ScrollArea className="p-4 pe-2 h-screen" type="hover" scrollbars="y">
			<Title order={4} className="text-amber-600">
				Find dogs
			</Title>

			<Box className="grid gap-4 h-fit mt-0.5">
				<Select
					name="sort"
					label="Sort by"
					placeholder="Breed (A-Z)"
					data={sortOptions}
					value={dogSearchParams.sort}
					onChange={(_value, option) => handleSort(option)}
				/>

				<MultiSelect
					searchable
					name="breeds"
					label="Breeds"
					description={`Allow up to ${maxKeyCount} breeds.`}
					error={dogSearchParams.breeds.length === maxKeyCount}
					placeholder={
						dogSearchParams.breeds.length
							? `${dogSearchParams.breeds.length} breed${
									dogSearchParams.breeds.length > 1 ? "s" : ""
							  } selected`
							: "Search or select"
					}
					data={breeds}
					maxValues={maxKeyCount}
					value={dogSearchParams.breeds}
					onChange={handleBreeds}
				/>

				<Input.Wrapper
					label="Zip codes"
					description={`Allow up to ${maxKeyCount} zip codes. Separate each zip code with a comma as shown.`}
				>
					<Input
						name="zip code"
						placeholder="12345, 67890, 34567, ..."
						value={dogSearchParams.zipCodeString}
						onChange={handleZipCodeChange}
						rightSection={isZipCodeLoading && <Loader size={20} />}
					/>
				</Input.Wrapper>

				<Box className="grid gap-1 mb-5">
					<Text size="sm" fw={500}>
						Ages
					</Text>
					<RangeSlider
						name="age range"
						minRange={0}
						min={dogSearchParams.ageMin}
						max={dogSearchParams.ageMax}
						step={1}
						marks={getAgeMarks()}
						value={[dogSearchParams.ageMin, dogSearchParams.ageMax]}
						onChange={handleAgeRangeChange}
					/>
				</Box>
			</Box>
		</ScrollArea>
	) : (
		<></>
	);
}
