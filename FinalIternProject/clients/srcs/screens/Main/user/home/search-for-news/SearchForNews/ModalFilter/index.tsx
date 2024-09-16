import {Icons} from '@assets';
import {
  BottomSheetFilter,
  BottomSheetModalAppRef,
  BottomSheetPickerApp,
  Box,
  ButtonApp,
  EVariantButton,
  Row,
  TextApp,
  TouchableApp,
} from '@component';
import {BottomSheetPickerMultilineApp} from '@component/bottom-sheet/BottomSheetPickerMultilineApp';
import {CalenderRangePicker} from '@component/calender';
import {ColorsStatic, defaultSearchForNewsValue, EKeySheet} from '@constants';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {scaler} from '@themes';
import {FormsSearchForNews, ForwardRefComponent} from '@types';
import React, {forwardRef, useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {useImmer} from 'use-immer';

type ModalFilterProps = {
  close: () => void;
  find?: () => void;
};

const init = Array(10)
  .fill(0)
  .map((_, i) => ({label: `label: ${i}`, value: String(i)}));

export const ModalFilter: ForwardRefComponent<
  BottomSheetModalAppRef,
  ModalFilterProps
> = forwardRef(({close, find}, ref) => {
  const {getValues, reset, control,watch} = useFormContext<FormsSearchForNews>();

  const [forms, setForms] = useImmer<FormsSearchForNews>(getValues());

  const handleChangeModal = (index: number) => {
    if (index === 0) {
      setForms(getValues());
    }
  };

  const handleReset = () => {
    reset(defaultSearchForNewsValue);
    setForms(defaultSearchForNewsValue);
  };

  const handleClose = () => {
    close();
  };

  const handleFind = () => {
    reset(forms);
    close();
  };

  return (
    <BottomSheetFilter
      ref={ref}
      onChange={handleChangeModal}
      onClose={handleClose}
      onFind={handleFind}
      onReset={handleReset}>
      <Box flex={1} color={ColorsStatic.white} pl={scaler(10)} pr={scaler(10)}>
        <Box rowGap={scaler(10)}>
          <BottomSheetPickerApp
            list={init}
            style={styles.bottomSheetContainer}
            isAlwaysSelectedWhenOnlyOne={init.length == 1}
            keySheet={EKeySheet.Price}
            itemSelected={forms.price}
            title="Sort by"
            hideIcon
            onChange={item =>
              setForms(daft => {
                daft.price = item;
              })
            }
          />
          {/* <CalenderRangePicker
              keySheet={EKeySheet.Calender}
              onChange={item => {
                setForms(daft => {
                  daft.time = item;
                });
              }}
              valueStart={forms.time.startDate}
              valueEnd={forms.time.endDate}
              placeholder={'Thời gian công tác'}
            /> */}
          <BottomSheetPickerMultilineApp
            list={init}
            keySheet={EKeySheet.RoomType}
            listSelected={forms.roomType}
            title="Room type1"
            onChange={item => {
              setForms(daft => {
             
                daft.roomType = item;
              });
            }}
          />
          {/* <BottomSheetPickerMultilineApp
            list={init}
            keySheet={EKeySheet.PostType}
            listSelected={forms.postType}
            title="Post type"
            onChange={item => {
              setForms(daft => {
                daft.postType = [...item];
              });
            }}
          />
          <BottomSheetPickerMultilineApp
            list={init}
            keySheet={EKeySheet.AmentitiesType}
            listSelected={forms.amentitiesType}
            title="Amentities type"
            onChange={item => {
              setForms(daft => {
                daft.amentitiesType = item;
              });
            }}
          />
          <BottomSheetPickerMultilineApp
            list={init}
            keySheet={EKeySheet.Interior}
            listSelected={forms.interior}
            title="Interior"
            onChange={item => {
              setForms(daft => {
                daft.interior = item;
              });
            }}
          /> */}
        </Box>
      </Box>
    </BottomSheetFilter>
  );
});

const styles = StyleSheet.create({
  bottomSheetContainer: {
    backgroundColor: ColorsStatic.white,
  },
});
