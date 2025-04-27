import { Card, Image, Group, Box } from "@mantine/core";
import { IoLocationSharp } from "react-icons/io5";
import { BiSolidDog } from "react-icons/bi";
import { PiHeartStraightFill } from "react-icons/pi";
import { PiHeartStraight } from "react-icons/pi";
import { forwardRef, useState } from "react";
import { Dog } from "../interfaces";
import { useAppDispatch } from "../hooks/hook";
import { toggleFavorite } from "../stores/browseSlice";

type Props = {
	dog: Dog;
};

export const DogCard = forwardRef<HTMLDivElement, Props>(({ dog }, ref) => {
	const dispatch = useAppDispatch();

	const handleToggleFavorite = () => {
		dispatch(toggleFavorite(dog.id));
		handleHeartPing();
	};

	const [heartPing, setHeartPing] = useState(false);
	const handleHeartPing = () => {
		setHeartPing(true);
		setTimeout(() => setHeartPing(false), 500);
	};

	return (
		<Card ref={ref} shadow="sm" padding="lg" radius="md" withBorder>
			<Card.Section className="relative">
				<div
					className="absolute right-0 m-2.5 text-3xl text-amber-500 cursor-pointer bg-white rounded-full p-1.5"
					title="Toggle favorite"
					onClick={handleToggleFavorite}
				>
					{dog.favorite ? (
						<>
							<PiHeartStraightFill
								className={`relative z-[1] ${
									heartPing ? "animate-ping" : ""
								}`}
							/>
							<PiHeartStraightFill className="absolute top-[6px]" />
						</>
					) : (
						<>
							<PiHeartStraight />
						</>
					)}
				</div>
				<Image src={dog.img} alt={`${dog.name}`} />
			</Card.Section>

			<Card.Section className="px-3 py-2">
				<Box>
					<Group justify="space-between">
						<span className="text-2xl font-bold text-amber-600">
							{dog.name}
						</span>
					</Group>

					<Group
						gap={8}
						className="text-blue-400 text-md font-semibold"
					>
						<BiSolidDog className="text-lg" title="Breed and age" />
						<span>
							{dog.breed}, {dog.age} years old
						</span>
					</Group>

					<Group>
						<Group
							gap={8}
							className="text-blue-400 text-md font-semibold"
							title="Location"
						>
							<IoLocationSharp className="text-lg" />
							<span>{dog.cityState || dog.zip_code}</span>
						</Group>
					</Group>
				</Box>
			</Card.Section>
		</Card>
	);
});
