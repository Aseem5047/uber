import React, { useEffect, useMemo, useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { icons, images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import {
	calculateDriverTimes,
	calculateRegion,
	generateMarkersFromData,
} from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/store";
import { Driver, MarkerData } from "@/types/types";
import Loader from "./Loader";

const directionsAPI = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const Map = () => {
	const {
		userLatitude,
		userLongitude,
		userAddress,
		destinationLatitude,
		destinationLongitude,
		destinationAddress,
	} = useLocationStore((state) => state);

	const { selectedDriver, setDrivers } = useDriverStore();
	const { data: drivers, loading, error } = useFetch<Driver[]>("/driver");

	const [markers, setMarkers] = useState<MarkerData[]>([]);
	const mapRef = useRef<MapView>(null);

	const region = useMemo(() => {
		return calculateRegion({
			userLatitude,
			userLongitude,
			destinationLatitude,
			destinationLongitude,
		});
	}, [userLatitude, userLongitude, destinationLatitude, destinationLongitude]);

	// Animate map to user location
	useEffect(() => {
		if (userLatitude && userLongitude && mapRef.current) {
			mapRef.current.animateToRegion(
				{
					latitude: userLatitude,
					longitude: userLongitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				},
				1000
			);
		}
	}, [userLatitude, userLongitude]);

	// Generate markers when drivers + location are ready
	useEffect(() => {
		if (!drivers || !userLatitude || !userLongitude) return;

		const newMarkers = generateMarkersFromData({
			data: drivers,
			userLatitude,
			userLongitude,
		});

		setMarkers(newMarkers);
	}, [drivers, userLatitude, userLongitude]);

	// Calculate driver times once markers and destination are available
	useEffect(() => {
		if (
			markers.length > 0 &&
			destinationLatitude !== undefined &&
			destinationLongitude !== undefined
		) {
			calculateDriverTimes({
				markers,
				userLatitude,
				userLongitude,
				destinationLatitude,
				destinationLongitude,
			}).then((updatedDrivers) => {
				setDrivers(updatedDrivers as MarkerData[]);
			});
		}
	}, [markers, destinationLatitude, destinationLongitude]);

	if (loading || (!userLatitude && !userLongitude)) {
		return <Loader />;
	}

	if (error) {
		return (
			<View className="flex-1 items-center justify-center">
				<Image
					source={images.noResult}
					className="w-40 h-40"
					resizeMode="contain"
				/>
				<Text className="text-lg font-semibold text-gray-500">{error}</Text>
			</View>
		);
	}

	// Main map rendering
	return (
		<View className="flex-1">
			<MapView
				ref={mapRef}
				style={{ flex: 1 }}
				provider={PROVIDER_GOOGLE}
				initialRegion={region}
				showsUserLocation
				showsMyLocationButton
				showsPointsOfInterest={false}
				tintColor="black"
				mapType="standard"
				userInterfaceStyle="light"
			>
				{/* Driver markers */}
				{markers.map((marker, index) => (
					<Marker
						key={marker.id ?? `marker-${index}`}
						coordinate={{
							latitude: marker.latitude,
							longitude: marker.longitude,
						}}
						title={marker.title}
						image={
							selectedDriver === +(marker.id ?? -1)
								? icons.selectedMarker
								: icons.marker
						}
					/>
				))}

				{/* Destination Path */}
				{destinationLatitude !== null &&
					destinationLongitude !== null &&
					destinationLatitude !== undefined &&
					destinationLongitude !== undefined && (
						<>
							<Marker
								key="destination"
								coordinate={{
									latitude: destinationLatitude,
									longitude: destinationLongitude,
								}}
								title="Destination"
								image={icons.pin}
							/>
							<MapViewDirections
								origin={{
									latitude: userLatitude!,
									longitude: userLongitude!,
								}}
								destination={{
									latitude: destinationLatitude,
									longitude: destinationLongitude,
								}}
								apikey={directionsAPI!}
								strokeColor="#0286FF"
								strokeWidth={4}
							/>
						</>
					)}
			</MapView>
		</View>
	);
};

export default Map;
