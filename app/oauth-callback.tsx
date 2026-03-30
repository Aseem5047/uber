// app/oauth-callback.tsx
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function OAuthCallback() {
	const { isLoaded, isSignedIn } = useAuth();

	useEffect(() => {
		if (!isLoaded) return;
		if (isSignedIn) {
			router.replace("/(root)/(tabs)/home");
		} else {
			router.replace("/(auth)/welcome");
		}
	}, [isLoaded, isSignedIn]);

	if (!isLoaded) {
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator size="large" color="#3b82f6" />
			</View>
		);
	}

	return null;
}
