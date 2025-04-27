import { Grid } from "@mantine/core";
import { useAppSelector } from "../hooks/hook";
import { RootState } from "../stores/store";
import { DogCard } from "../components/DogCard";

export default function BrowsePage() {
	const { dogs } = useAppSelector((state: RootState) => state.browse);

	const searchDogs = () => {
		
	}
	// function getCityState(zipCode: string) {
	// 	getLocations([zipCode])
	// 		.then((response) => {
	// 			const data = response.data as Location[];
	// 			setDog((dogInfo) => ({
	// 				...dogInfo,
	// 				cityState: `${data[0].city}, ${data[0].state}`,
	// 			}));
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// }

	// useEffect(() => {
	// 	getCityState(dog.zip_code);
	// 	console.log(dog);
	// }, [dog]);

	return (
		<>
			<Grid className="w-full h-screen overflow-auto">
				<Grid.Col span={{ base: 12, xs: 6, lg: 4, xl: 3 }}>
					<DogCard dog={dogs[0]} />
				</Grid.Col>
				<Grid.Col span={{ base: 12, xs: 6, lg: 4, xl: 3 }}>
					<DogCard dog={dogs[0]} />
				</Grid.Col>
				<Grid.Col span={{ base: 12, xs: 6, lg: 4, xl: 3 }}>
					<DogCard dog={dogs[0]} />
				</Grid.Col>
				<Grid.Col span={{ base: 12, xs: 6, lg: 4, xl: 3 }}>
					<DogCard dog={dogs[0]} />
				</Grid.Col>
				<Grid.Col span={{ base: 12, xs: 6, lg: 4, xl: 3 }}>
					<DogCard dog={dogs[0]} />
				</Grid.Col>
				<Grid.Col span={{ base: 12, xs: 6, lg: 4, xl: 3 }}>
					<DogCard dog={dogs[0]} />
				</Grid.Col>
			</Grid>
		</>
	);
}
