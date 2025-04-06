import {UnistylesRegistry} from 'react-native-unistyles';
import { lightTheme } from './light';

type AppThemes = {
  light: typeof lightTheme
}

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addThemes({
  light: lightTheme,
}).addConfig({
  adaptiveThemes: false,
  disableAnimatedInsets: true,
  initialTheme: 'light',
});

