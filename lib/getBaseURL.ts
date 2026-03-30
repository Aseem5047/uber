// lib/getBaseUrl.ts
import Constants from "expo-constants";

export const getBaseUrl = () => {
	if (!__DEV__) return "https://api.production.com";

	const host = Constants.expoConfig?.hostUri?.split(":")[0];

	if (host) {
		return `http://${host}:8081`;
	}

	// fallback
	return "http://localhost:8081";
};
