/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/main';
import {name as appName} from './app.json';
import {ChromeNetworkInspectConfig} from '@/config/ChromeNetworkInspectConfig';

ChromeNetworkInspectConfig();

AppRegistry.registerComponent(appName, () => App);
