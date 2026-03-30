import { useUser } from "@clerk/clerk-expo";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Image,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RideCard from "@/components/RideCard";
import { images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/types";

const Rides = () => {
	const { user } = useUser();

	const {
		data: recentRides,
		loading,
		error,
	} = useFetch<Ride[]>(`/ride/${user?.id}`);

	const screenHeight = Dimensions.get("window").height;
	const offset = screenHeight * 0.25;

	return (
		<SafeAreaView className="flex-1 bg-white">
			<FlatList
				data={recentRides}
				renderItem={({ item }) => <RideCard ride={item} />}
				keyExtractor={(item, index) => index.toString()}
				className="px-5"
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{
					paddingBottom: 100,
				}}
				ListEmptyComponent={() => (
					<View
						className="h-full flex flex-col items-center justify-center"
						style={{ minHeight: screenHeight * 0.75 }}
					>
						{!loading ? (
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
							<ActivityIndicator size="small" color="#000" />
						)}
					</View>
				)}
				ListHeaderComponent={
					<>
						<Text className="text-2xl font-bold my-5">All Rides</Text>
					</>
				}
			/>
		</SafeAreaView>
	);
};

export default Rides;
