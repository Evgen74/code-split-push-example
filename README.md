# Code Split Push Example

This project demonstrates an implementation of code splitting and dynamic bundle loading in React Native using Code Push. It showcases how to split a React Native application into multiple bundles that can be loaded dynamically at runtime.

## Features

- Code splitting into multiple bundles (Home, Profile, Settings)
- Dynamic bundle loading
- Custom Metro bundler configuration
- MobX for state management
- React Navigation for routing

## Project Structure

```
├── bundles/           # Split bundles (Home, Profile, Settings)
├── modules/          # Core modules including code-push implementation
├── src/             # For unistyles
└── dist/           # Build output directory
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
yarn install
```

3. For iOS, install pods:
```bash
cd ios && pod install && cd ..
```

## Additional Scripts

- `yarn build` - Generate split bundles
- `yarn start:server` - Start the local server for bundle serving

## Bundle Generation

To generate split bundles:
```bash
yarn build
```

This will create separate bundles for different parts of the application in the `dist` directory.

## Technical Details

For building separate bundles (not the main), a custom config is used - metro.bundle.config
The project works in production mode by default. If you want to try the technology without prod build: on iOS you can comment all `#if !DEBUG` block statements and run the iOS build, then modify any bundle (profile or settings or add another one) and make sure to increase the package version. Build the bundles using `yarn build`, then restart the app.

Most of the code push logic is written in JS in the `modules/code-push/src` package. In the native side, only the following is implemented: starting the initial bundle (the home bundle is embedded in the app) and execute other bundles at runtime.
