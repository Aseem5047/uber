import { useAuth } from "@clerk/clerk-expo";
import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { PaymentProps } from "@/types/types";

const Payment = ({
	fullName,
	email,
	amount,
	driverId,
	rideTime,
}: PaymentProps) => {
	const { initPaymentSheet, presentPaymentSheet } = useStripe();
	const {
		userAddress,
		userLongitude,
		userLatitude,
		destinationLatitude,
		destinationAddress,
		destinationLongitude,
	} = useLocationStore();
	const { userId } = useAuth();
	const [success, setSuccess] = useState(false);

	// Create intent before initPaymentSheet
	const preparePayment = async () => {
		try {
			const res = await fetchAPI("/stripe/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: fullName || email.split("@")[0],
					email,
					amount,
				}),
			});

			const { paymentIntent, ephemeralKey, customer } = res;

			if (!paymentIntent?.client_secret || !ephemeralKey?.secret || !customer) {
				throw new Error("Stripe setup failed: Missing required fields");
			}

			const initRes = await initPaymentSheet({
				customerId: customer,
				customerEphemeralKeySecret: ephemeralKey.secret,
				paymentIntentClientSecret: paymentIntent.client_secret,
				merchantDisplayName: "Chingu, Inc.",
				returnURL: "uber://book-ride",
			});

			if (initRes.error) {
				console.error("initPaymentSheet error:", initRes.error);
				Alert.alert("Stripe Init Error", initRes.error.message);
				return;
			}
		} catch (err) {
			console.error("Payment preparation error:", err);
			Alert.alert("Payment Error", (err as Error).message);
		}
	};

	// Call preparePayment on mount
	useEffect(() => {
		preparePayment();
	}, []);

	const openPaymentSheet = async () => {
		const { error } = await presentPaymentSheet();

		if (error) {
			console.error("presentPaymentSheet error:", error);
			Alert.alert("Payment Error", error.message);
		} else {
			await saveRide();
			setSuccess(true);
		}
	};

	const saveRide = async () => {
		try {
			await fetchAPI("/ride/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					origin_address: userAddress,
					destination_address: destinationAddress,
					origin_latitude: userLatitude,
					origin_longitude: userLongitude,
					destination_latitude: destinationLatitude,
					destination_longitude: destinationLongitude,
					ride_time: rideTime.toFixed(0),
					fare_price: parseInt(amount) * 100,
					payment_status: "paid",
					driver_id: driverId,
					user_id: userId,
				}),
			});
		} catch (err) {
			console.error("Ride creation failed:", err);
			Alert.alert("Ride Error", "Could not save ride info.");
		}
	};

	return (
		<>
			<CustomButton
				title="Confirm Ride"
				className="my-10"
				onPress={openPaymentSheet}
			/>

			<ReactNativeModal
				isVisible={success}
				onBackdropPress={() => setSuccess(false)}
			>
				<View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
					<Image source={images.check} className="w-28 h-28 mt-5" />
					<Text className="text-2xl text-center font-JakartaBold mt-5">
						Booking placed successfully
					</Text>
					<Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
						Thank you for your booking. Your reservation has been successfully
						placed. Please proceed with your trip.
					</Text>
					<CustomButton
						title="Back Home"
						onPress={() => {
							setSuccess(false);
							router.push("/(root)/(tabs)/home");
						}}
						className="mt-5"
					/>
				</View>
			</ReactNativeModal>
		</>
	);
};

export default Payment;
