/**
 * @format
 */

import ChromeNetworkInspectConfig from '@/config/ChromeNetworkInspectConfig';
import {AppRegistry} from 'react-native';
import App from './src/main';
import {name as appName} from './app.json';

ChromeNetworkInspectConfig();
AppRegistry.registerComponent('devapp', () => App);
