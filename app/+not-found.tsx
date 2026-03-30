// app/+not-found.tsx
import Loader from "@/components/Loader";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function NotFound() {
	const router = useRouter();

	useEffect(() => {
		const timeout = setTimeout(() => {
			router.replace("/(root)/(tabs)/home");
		}, 2000);

		return () => clearTimeout(timeout);
	}, []);

	return <Loader styles="px-4" />;
}
