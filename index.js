/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { typography } from "./utils/typography";

typography();
AppRegistry.registerComponent(appName, () => App);
