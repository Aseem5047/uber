import { icons } from "@/constants";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useMemo, useRef } from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Map from "./Map";

const RideLayout = ({
	title,
	snapPoints,
	children,
}: {
	title: string;
	snapPoints?: string[];
	children: React.ReactNode;
}) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPointsMemo = useMemo(
		() => snapPoints || ["45%", "85%"],
		[snapPoints]
	);

	return (
		<GestureHandlerRootView className="flex-1">
			<StatusBar hidden />
			<View className="flex-1 flex-col bg-transparent">
				<View className="flex flex-row absolute z-10 top-12 items-center justify-start px-5">
					<TouchableOpacity onPress={() => router.back()}>
						<View className="w-10 h-10 bg-white rounded-full items-center justify-center">
							<Image
								source={icons.backArrow}
								resizeMode="contain"
								className="w-6 h-6"
							/>
						</View>
					</TouchableOpacity>
					<Text className="text-xl font-semibold ml-5">
						{title || "Go Back"}
					</Text>
				</View>
				<Map />
			</View>

			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={snapPointsMemo}
				index={0}
				enablePanDownToClose={false}
				keyboardBehavior="interactive"
			>
				<BottomSheetView
					style={{
						padding: 20,
					}}
				>
					{children}
				</BottomSheetView>
			</BottomSheet>
		</GestureHandlerRootView>
	);
};

export default RideLayout;
