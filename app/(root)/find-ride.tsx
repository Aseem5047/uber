import { router } from "expo-router";
import { Image, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons, images } from "@/constants";
import { useLocationStore } from "@/store";
import { useUser } from "@clerk/clerk-expo";

const FindRide = () => {
	const {
		userAddress,
		destinationAddress,
		setDestinationLocation,
		setUserLocation,
	} = useLocationStore();

	const { user } = useUser();

	return (
		<RideLayout title="Ride">
			<View className="mb-3">
				<Text className="text-lg font-semibold mb-3">From</Text>

				<GoogleTextInput
					icon={icons.target}
					initialLocation={userAddress!}
					containerStyle="bg-white"
					textInputBackgroundColor="transparent"
					handlePress={(location) => setUserLocation(location)}
				/>
			</View>

			<View className="my-3">
				<Text className="text-lg font-semibold mb-3">To</Text>

				<GoogleTextInput
					icon={icons.map}
					initialLocation={destinationAddress!}
					containerStyle="bg-white"
					textInputBackgroundColor="transparent"
					handlePress={(location) => setDestinationLocation(location)}
				/>
			</View>

			<CustomButton
				title="Find Now"
				onPress={() => router.push(`/(root)/confirm-ride`)}
				className="my-5"
			/>

			<View className="flex flex-col items-center justify-center w-full mt-7">
				<Image
					source={images.signUpCar}
					className="z-0 w-full h-[250px] rounded-xl"
				/>

				<View className="mb-4 flex flex-row items-center justify-end gap-2 w-full">
					<Text className="text-base text-zinc-400 font-JakartaMedium">
						Plan Your Ride
					</Text>
					<Text className="text-lg font-JakartaBold text-black capitalize">
						{user?.firstName ||
							user?.emailAddresses[0].emailAddress.split("@")[0]}{" "}
						👋
					</Text>
				</View>
			</View>
		</RideLayout>
	);
};

export default FindRide;
