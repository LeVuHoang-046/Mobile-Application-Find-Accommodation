import {Icons} from '@assets';
import {
  BottomSheetModalApp,
  BottomSheetModalAppRef,
} from '@component/BottomSheetModalApp';
import {ButtonApp, EVariantButton, TouchableApp} from '@component/forms';
import {Box, Row} from '@component/layout';
import {LineApp} from '@component/LineApp';
import {TextApp} from '@component/typography';
import {ColorsStatic, EKeySheet, SnapPointsFilter} from '@constants';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {FontSize, scaler} from '@themes';
import {ForwardRefComponent} from '@types';
import React, {forwardRef, PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import {useStyles} from 'react-native-unistyles';

type BottomSheetFilterProps = {
  onChange: (index: number) => void;
  onClose: () => void;
  onReset: () => void;
  onFind: () => void;
};

export const BottomSheetFilter: ForwardRefComponent<
  BottomSheetModalAppRef,
  PropsWithChildren<BottomSheetFilterProps>
> = forwardRef(({onChange, onClose, onReset, onFind, children}, ref) => {
  const {theme} = useStyles();
  return (
    <>
      <BottomSheetModalApp
        keySheet={EKeySheet.Root}
        snapPoints={SnapPointsFilter}
        handleIndicatorStyle={styles.indicator}
        enablePanDownToClose={false}
        onChange={onChange}
        ref={ref}>
        <Box flex={1} color={ColorsStatic.white}>
          <Row justify="space-between" pv={scaler(5)} mh={scaler(5)}>
            <TouchableApp style={styles.resetButton} onPress={onReset}>
              <TextApp
                size={FontSize.Font14}
                weight={700}
                color={theme.colors.tint}>
                Reset
              </TextApp>
            </TouchableApp>
            <TextApp weight={700} size={FontSize.Font15}>
              Advanced search
            </TextApp>
            <TouchableApp style={styles.buttonClose} onPress={onClose}>
              <Icons.X_Mark />
            </TouchableApp>
          </Row>
          <LineApp />
          <Box flex={1}>
            <BottomSheetScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.scrollView}
              style={styles.list}
              bounces={false}
              children={children}
              //   keyboardDismissMode="on-drag"
            />
            <Row
              columnGap={scaler(4)}
              mt={scaler(12)}
              ph={scaler(10)}
              pb={scaler(30)}>
              <ButtonApp styleButton={styles.applyButton} title="Apply" onPress={onFind} />
            </Row>
          </Box>
        </Box>
      </BottomSheetModalApp>
    </>
  );
});

const styles = StyleSheet.create({
  indicator: {
    opacity: 0,
  },
  container: {
    flex: 1,
  },
  buttonClose: {
    padding: scaler(10),
    // backgroundColor:'pink'
  },
  scrollView: {
    rowGap: scaler(8),
    paddingHorizontal: scaler(10),
  },
  list: {
    flexGrow: 0,
  },
  resetButton: {
    // backgroundColor:'pink',
    padding: scaler(10)
  },
  applyButton:{
    borderRadius: scaler(15),
  },
});
