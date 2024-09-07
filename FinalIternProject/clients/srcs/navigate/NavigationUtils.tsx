import { typeNavigation } from "./types";

let _navigator: typeNavigation;

export function setTopLevelNavigator(navigatorRef: typeNavigation) {
  _navigator = navigatorRef;
}

export const NavigationUtils = {
    setTopLevelNavigator,
};
  