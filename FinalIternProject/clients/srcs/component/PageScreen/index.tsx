import { Box } from '@component';
import { dimensions } from '@constants';
import { scaler } from '@themes';
import React from 'react';
import {ScrollView, StyleProp, ViewStyle} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

type PageScreenProps = {
  HeaderSticky?: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export const PageScreen: React.FC<React.PropsWithChildren<PageScreenProps>> = ({
  HeaderSticky,
  children,
  contentContainerStyle,
}) => {
  const {styles} = useStyles(stylesheet);
  return (
    <Box flex={1} width={dimensions.width}>
      {!!HeaderSticky ? HeaderSticky : null}
      <ScrollView
        bounces={false}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainerStyle,
          contentContainerStyle,
        ]}>
        {children}
      </ScrollView>
    </Box>
  );
};

const stylesheet = createStyleSheet({
  scroll: {
    flex: 1,
    // marginTop: scaler(10),
  },
  contentContainerStyle: {
    paddingHorizontal: scaler(10),
    rowGap: scaler(6),
    paddingBottom: scaler(40),
  },
});
