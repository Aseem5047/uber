import { useAuth, useUser } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { Ride } from "@/types/types";

const Home = () => {
	const { user } = useUser();
	const { signOut } = useAuth();

	const { setUserLocation, setDestinationLocation } = useLocationStore();

	const handleSignOut = () => {
		signOut();
		router.replace("/(auth)/sign-in");
	};

	const [hasPermission, setHasPermission] = useState<boolean>(false);

	const {
		data: recentRides,
		loading,
		error,
	} = useFetch<Ride[]>(`/ride/${user?.id}`);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setHasPermission(false);
				return;
			}

			let location = await Location.getCurrentPositionAsync({});

			const address = await Location.reverseGeocodeAsync({
				latitude: location.coords?.latitude!,
				longitude: location.coords?.longitude!,
			});

			setUserLocation({
				latitude: location.coords?.latitude,
				longitude: location.coords?.longitude,
				address: `${address[0].name}, ${address[0].region}`,
			});
		})();
	}, []);

	const handleDestinationPress = (location: {
		latitude: number;
		longitude: number;
		address: string;
	}) => {
		setDestinationLocation(location);

		router.push("/(root)/find-ride");
	};

	return (
		<SafeAreaView className="flex-1 bg-general-500">
			<FlatList
				data={recentRides?.slice(0, 5)}
				renderItem={({ item }) => <RideCard ride={item} />}
				keyExtractor={(item, index) => index.toString()}
				className="px-5"
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{
					paddingBottom: 100,
				}}
				ListEmptyComponent={() => (
					<View className="flex flex-col items-center justify-center">
						{error ? (
							<>
								<Image
									source={images.noResult}
									className="w-40 h-40"
									alt="No recent rides found"
									resizeMode="contain"
								/>
								<Text className="text-lg font-semibold text-gray-500">
									{error}{" "}
								</Text>
							</>
						) : !loading ? (
							<>
								<Image
									source={images.noResult}
									className="w-40 h-40"
									alt="No recent rides found"
									resizeMode="contain"
								/>
								<Text className="text-lg font-semibold">
									No recent rides found
								</Text>
							</>
						) : (
							<ActivityIndicator size="large" color="#3b82f6" />
						)}
					</View>
				)}
				ListHeaderComponent={
					<>
						<View className="flex flex-row items-center justify-between my-5">
							<View className="flex flex-col">
								<Text className="text-base text-zinc-400 font-JakartaMedium">
									Welcome back
								</Text>
								<Text className="text-lg font-bold text-black capitalize">
									{user?.firstName || user?.lastName
										? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()
										: user?.emailAddresses?.[0]?.emailAddress.split(
												"@"
										  )[0]}{" "}
									👋
								</Text>
							</View>
							<TouchableOpacity
								onPress={handleSignOut}
								className="justify-center items-center w-12 h-12 rounded-full bg-gray-100"
							>
								<Image source={icons.out} className="w-5 h-5" />
							</TouchableOpacity>
						</View>

						<GoogleTextInput
							icon={icons.search}
							containerStyle="bg-white shadow-md shadow-neutral-300"
							handlePress={handleDestinationPress}
						/>

						<>
							<Text className="text-xl font-bold mt-5 mb-3">
								Your current location
							</Text>
							<View className="flex flex-row items-center bg-transparent h-[300px]">
								<Map />
							</View>
						</>

						<Text className="text-xl font-bold mt-5 mb-3">Recent Rides</Text>
					</>
				}
			/>
		</SafeAreaView>
	);
};

export default Home;
