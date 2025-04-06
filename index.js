import {AppRegistry} from 'react-native';
import {App} from '@code-push/home';
import { name as appName } from './app.json';
import './src/ui/unistyles';


AppRegistry.registerComponent(appName, () => App);
