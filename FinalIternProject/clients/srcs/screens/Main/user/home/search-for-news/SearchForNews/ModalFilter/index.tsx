
import { useQuerInteriorsFilter, useQueryFacilitiesFilter } from '@api';
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
import {ColorsStatic, defaultSearchForNewsValue, EKeySheet, serviceIconsArray} from '@constants';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {scaler} from '@themes';
import {FormsSearchForNews, ForwardRefComponent} from '@types';
import { getIconById } from '@utils';
import React, {forwardRef, useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {useImmer} from 'use-immer';

type ModalFilterProps = {
  close: () => void;
  find?: (item: any) => void;
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

  const {data: facilities} = useQueryFacilitiesFilter();
 
  const {data: interiors} = useQuerInteriorsFilter();

  const facilitiesList = facilities?.map(facility => ({
    icon: ({ size, color }: any) => getIconById(facility.icon) || <Icons.Person size={size} color={color} />, // Provide a default icon if null
    label: facility.name,
  })) || [];

  const interiorsList = interiors?.map(interior => ({
    icon: ({ size, color }: any) => getIconById(interior.icon) || <Icons.Person size={size} color={color} />, // Provide a default icon if null
    label: interior.name,
  })) || [];

 
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
    if (find) {
      find(forms); // Pass the selected filters back to the parent component
    }
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
            title="Room type"
            onChange={item => {
              setForms(daft => {
             
                daft.roomType = item;
              });
            }}
          />
          <BottomSheetPickerMultilineApp
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
            list={facilitiesList}
            keySheet={EKeySheet.AmentitiesType}
            listSelected={forms.amentitiesType}
            title="Facilities type"
            onChange={item => {
              setForms(daft => {
                daft.amentitiesType = item;
              });
            }}
          />
          <BottomSheetPickerMultilineApp
            list={interiorsList}
            keySheet={EKeySheet.Interior}
            listSelected={forms.interior}
            title="Interior"
            onChange={item => {
              setForms(daft => {
                daft.interior = item;
              });
            }}
          />
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
