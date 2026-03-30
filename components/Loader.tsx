import React from "react";
import { View } from "react-native";

const Loader = ({ styles }: { styles?: string }) => {
	return (
		<View
			className={`${styles} flex-1 items-center justify-center bg-transparent`}
		>
			<View className="w-full max-w-md flex flex-col items-start justify-start gap-4 ">
				<View className="w-full flex-row gap-4 items-center justify-between">
					<View className="rounded-full w-16 h-16 bg-gray-200 animate-pulse" />
					<View className="w-full flex-col items-start justify-start gap-4">
						<View className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
						<View className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
					</View>
				</View>
				<View className="h-4 w-full bg-gray-200 rounded animate-pulse" />
				<View className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
				<View className="h-4 w-full bg-gray-200 rounded animate-pulse" />
				<View className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
				<View className="h-4 w-full bg-gray-200 rounded animate-pulse" />
			</View>
		</View>
	);
};

export default Loader;
