import { useBottomSheetBackHandler } from '@component';
import { ColorsStatic, EKeySheet } from '@constants';
import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModal,
  } from '@gorhom/bottom-sheet';
import { scaler } from '@themes';
import { ForwardRefComponent } from '@types';
  import React, {
    PropsWithChildren,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
  } from 'react';
  import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
  import {SharedValue} from 'react-native-reanimated';
  
  export type ISnapPointsApp =
    | (string | number)[]
    | SharedValue<(string | number)[]>;
  
  type BottomSheetModalAppProps = {
    keySheet: EKeySheet;
    snapPoints: ISnapPointsApp;
    pressBackdropClose?: boolean;
    enablePanDownToClose?: boolean;
    onChange?: (index: number) => void;
    handleIndicatorStyle?: StyleProp<ViewStyle>;
  };
  
  export type BottomSheetModalAppRef = {
    open: () => void;
    close: () => void;
  };
  
  export const BottomSheetModalApp: ForwardRefComponent<
    BottomSheetModalAppRef,
    PropsWithChildren<BottomSheetModalAppProps>
  > = forwardRef(
    (
      {
        children,
        snapPoints,
        pressBackdropClose = false,
        enablePanDownToClose = false,
        onChange,
        keySheet,
        handleIndicatorStyle,
      },
      ref,
    ) => {
      const bottomSheetRef = useRef<BottomSheetModal>(null);
  
      const {handleSheetPositionChange} =
        useBottomSheetBackHandler(bottomSheetRef);
  
      useImperativeHandle(
        ref,
        () => ({
          open,
          close,
        }),
        [],
      );
  
      const open = () => {
        bottomSheetRef.current?.present();
      };
  
      const close = () => {
        bottomSheetRef.current?.close();
      };
  
      const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior={pressBackdropClose ? 'close' : 'none'}
            opacity={0.2}
          />
        ),
        [pressBackdropClose],
      );
  
      const handleChange = (index: number) => {
        handleSheetPositionChange(index);
        onChange?.(index);
      };
      return (
        <BottomSheetModal
          ref={bottomSheetRef}
          key={keySheet}
          name={keySheet}
          snapPoints={snapPoints}
          children={children}
          stackBehavior="push"
          backdropComponent={renderBackdrop}
          enablePanDownToClose={enablePanDownToClose}
          handleIndicatorStyle={[styles.indicator, handleIndicatorStyle]}
          onChange={handleChange}
        />
      );
    },
  );
  
  const styles = StyleSheet.create({
    indicator: {
      width: scaler(50),
      backgroundColor: ColorsStatic.gray7,
    },
  });
  