import { FontSize, scaler } from "@themes";
import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet(theme => ({
    mainImage: {
        width: '100%',
        height: '100%',
      },
      subImage: {
        width: '100%',
        height: '100%',
      },
      boxOverflow: {
        overflow: 'hidden',
      },
      subSlide: {
        width: scaler(80),
        height: scaler(70),
        marginRight: scaler(14),
        alignItems: 'center',
        justifyContent: 'center',
      },
      activeSubSlide: {
        borderWidth: scaler(2.5),
        borderColor: theme.colors.red2,
        borderRadius: scaler(12),
      },
      subTitle: {
        fontSize: FontSize.Font20,
      },
}));