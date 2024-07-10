import { CommonActions, StackActionType } from "@react-navigation/native";

export type typeNavigation = {
    dispatch: (arg0: CommonActions.Action | StackActionType) => void;
    canGoBack: () => boolean;
  } | null;