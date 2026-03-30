# RideFlow — Full-Stack Mobile Ride-Hailing App

A production-grade mobile ride-hailing application built with React Native, designed to mirror the core experience of modern transportation platforms. RideFlow integrates real-time mapping, secure authentication, and live payment processing into a cohesive and scalable mobile product.

<p align="center">
  <img width="300" alt="Screen 1" src="https://github.com/user-attachments/assets/2c2834b7-9abe-4bf1-a77d-e7f9d500469c" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="300" alt="Screen 2" src="https://github.com/user-attachments/assets/2ec65826-95a9-4ef7-acc1-0d3b1b63500a" />
</p>

---

## Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## Introduction

RideFlow serves as a comprehensive demonstration of full-stack mobile development — from database design to a polished, cross-platform UI. The app covers everything from onboarding and OAuth login to real-time ride booking and Stripe-powered payments, built for developers who want to understand how real-world apps are architected and shipped.

<p align="center">
  <img width="300" alt="Screen 3" src="https://github.com/user-attachments/assets/501df07d-0273-4ab4-aa47-530aa39b5265" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="300" alt="Screen 4" src="https://github.com/user-attachments/assets/b05c340e-d60d-457e-8a90-c4ac0e63455f" />
</p>

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React Native | Cross-platform mobile UI |
| Expo | Development and build tooling |
| PostgreSQL (Neon) | Serverless database |
| Google Maps & Places API | Maps, directions, and location search |
| Stripe | Payment processing |
| Clerk | Authentication and authorization |
| Zustand | Global state management |
| NativeWind (Tailwind CSS) | Utility-first styling |

---

## Features

- **Onboarding Flow** — Guided registration and initial setup experience for new users.
- **Email Authentication with Verification** — Secure login backed by email-based OTP verification.
- **Google OAuth** — One-tap sign-in via Google credentials.
- **Live Location & Map View** — Home screen powered by real-time GPS tracking with interactive map markers.
- **Recent Rides** — Quick overview of a user's most recent trips on the home screen.
- **Google Places Autocomplete** — Intelligent, global location search with live suggestions.
- **Ride Search** — Set origin and destination to browse available rides instantly.
- **Driver Selection via Map** — Pick from nearby available drivers displayed directly on the map.
- **Ride Confirmation Screen** — Full ride summary including estimated duration and fare before booking.
- **Stripe Payment Integration** — Supports card payments and other methods via Stripe.
- **Ride Booking Post-Payment** — Rides are confirmed and created only after a successful payment.
- **Ride History** — Complete log of all past rides accessible from the user's profile.
- **Profile Management** — Edit and manage personal account details in-app.
- **Cross-Platform** — Fully optimized for both Android and iOS.

<p align="center">
  <img width="300" alt="Screen 5" src="https://github.com/user-attachments/assets/647c299c-9739-4a3d-93b3-124509b20f33" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="300" alt="Screen 6" src="https://github.com/user-attachments/assets/5c098c02-4131-4cf7-8217-efcf4b7a9348" />
</p>

---

## Quick Start

### Prerequisites

Make sure the following are installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

<p align="center">
  <img width="300" alt="Screen 7" src="https://github.com/user-attachments/assets/6f05add2-7286-4e6d-9612-7e49c17d234b" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="300" alt="Screen 8" src="https://github.com/user-attachments/assets/2ab07e1f-501a-4b41-b492-ca994ea3e764" />
</p>

### Clone the Repository

```bash
git clone https://github.com/your-username/rideflow.git
cd rideflow
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root of the project and add the following:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
EXPO_PUBLIC_PLACES_API_KEY=
EXPO_PUBLIC_DIRECTIONS_API_KEY=
DATABASE_URL=
EXPO_PUBLIC_SERVER_URL=
EXPO_PUBLIC_GEOAPIFY_API_KEY=
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

> Obtain credentials by signing up at [Clerk](https://clerk.com), [Stripe](https://stripe.com), [Neon](https://neon.tech), [Google Cloud Console](https://console.cloud.google.com), and [Geoapify](https://www.geoapify.com).

<p align="center">
  <img width="300" alt="Screen 9" src="https://github.com/user-attachments/assets/5b6a5b0a-f3d8-41a1-b628-18b77fd2401a" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="300" alt="Screen 10" src="https://github.com/user-attachments/assets/7dea590d-f886-4be9-9028-0c0905093103" />
</p>

### Run the App

```bash
npx expo start
```

Download the [Expo Go](https://expo.dev/client) app on your Android or iOS device and scan the QR code to launch the project.

---

## License

This project is open source and available under the [MIT License](LICENSE).
