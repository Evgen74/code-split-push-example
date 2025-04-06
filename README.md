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

- Uses custom Metro configuration for bundle splitting
- Integrates with Code Push for remote updates
- Change profile or settings bundle files, up package version and run yarn build
- Restart the app
