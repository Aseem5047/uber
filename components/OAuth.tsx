import { useSSO } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Alert, Image, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { googleOAuth } from "@/lib/auth";

const OAuth = () => {
	const { startSSOFlow } = useSSO();

	const handleGoogleSignIn = async () => {
		try {
			const result = await googleOAuth(() =>
				startSSOFlow({ strategy: "oauth_google" })
			);

			if (result.code === "session_exists" || result.code === "success") {
				router.replace("/(root)/(tabs)/home");
			}
		} catch (error) {
			console.error("OAuth Error:", error);
			Alert.alert(
				"Authentication Error",
				"Something went wrong with Google Sign-In"
			);
		}
	};

	return (
		<View>
			<View className="flex flex-row justify-center items-center mt-4 gap-x-3">
				<View className="flex-1 h-[1px] bg-general-100" />
				<Text className="text-lg">Or</Text>
				<View className="flex-1 h-[1px] bg-general-100" />
			</View>

			<CustomButton
				title="Log In with Google"
				className="mt-5 w-full shadow-none"
				IconLeft={() => (
					<Image
						source={icons.google}
						resizeMode="contain"
						className="w-5 h-5 mx-2"
					/>
				)}
				bgVariant="outline"
				textVariant="primary"
				onPress={handleGoogleSignIn}
			/>
		</View>
	);
};

export default OAuth;
