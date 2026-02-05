# Navigation App

This is a React Native application built with [Expo](https://expo.dev) and [Expo Router](https://docs.expo.dev/router/introduction).

## Project Overview

This project serves as a navigation application, leveraging various Expo modules and libraries for enhanced functionality, including:

- **Expo Router**: For file-based routing and navigation.
- **Expo Camera & AV**: For media handling capabilities.
- **Speech Recognition**: Integegrating speech services (via `expo-speech` and `microsoft-cognitiveservices-speech-sdk`).
- **Zustand**: For state management.
- **Expo Location/Sensors**: (Implied by the nature of a navigation app and installed dependencies like `@react-native-community/geolocation`).

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Expo Go](https://expo.dev/go) app on your mobile device (iOS/Android) for testing, or an Android Emulator/iOS Simulator setup.

## Installation

1.  **Clone the repository** (if you haven't already):

    ```bash
    git clone <repository-url>
    cd Navigation
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

## Running the Project

To start the development server, run:

```bash
npm start
```
or
```bash
npx expo start
```

### Running on Device/Emulator

-   **Android**:
    ```bash
    npm run android
    ```
    Or press `a` in the terminal after starting the server.

-   **iOS**:
    ```bash
    npm run ios
    ```
    Or press `i` in the terminal after starting the server. (Requires macOS and Xcode).

-   **Web**:
    ```bash
    npm run web
    ```
    Or press `w` in the terminal after starting the server.

-   **Physical Device**:
    Scan the QR code displayed in the terminal with the **Expo Go** app (Android) or the Camera app (iOS).

## Project Structure

-   **`app/`**: Contains the routes and screens for the application (file-based routing).
-   **`assets/`**: Images, fonts, and other static assets.
-   **`components/`**: Reusable React components.
-   **`constants/`**: application configuration and constants.
-   **`hooks/`**: Custom React hooks.
-   **`scripts/`**: Helper scripts for the project.

## Scripts

-   `npm start`: Starts the Expo development server.
-   `npm run android`: Builds and runs the app on an Android emulator or device.
-   `npm run ios`: Builds and runs the app on an iOS simulator or device.
-   `npm run web`: Runs the app in the browser.
-   `npm run lint`: Runs ESLint to check for code quality issues.
-   `npm run reset-project`: Resets the project to a clean state (use with caution).
