import {useQuerInteriorsFilter, useQueryFacilitiesFilter} from '@api';
import {Icons} from '@assets';
import {
  BottomSheetFilter,
  BottomSheetModalAppRef,
  BottomSheetPickerApp,
  Box,
  ButtonApp,
  EVariantButton,
  InputApp,
  Row,
  TextApp,
  TouchableApp,
} from '@component';
import {BottomSheetPickerMultilineApp} from '@component/bottom-sheet/BottomSheetPickerMultilineApp';
import {CalenderRangePicker} from '@component/calender';
import {
  ColorsStatic,
  defaultSearchForNewsValue,
  EKeySheet,
  serviceIconsArray,
} from '@constants';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {FontSize, scaler} from '@themes';
import {FormsManageBuilding, FormsSearchForNews, ForwardRefComponent} from '@types';
import {formatNumberWithCommas, getIconById, mapTypeHouse} from '@utils';
import React, {forwardRef, useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {useImmer} from 'use-immer';

type ModalFilterProps = {
  close: () => void;
  find?: (item: any) => void;
};

const init = [
  {label: 'Price: Low to High', value: 'Low to High'},
  {label: 'Price: High to Low', value: 'High to Low'},
];

const roomTypeList = Array(4)
  .fill(0)
  .map((_, i) => ({
    label: mapTypeHouse(i),
    // value: String(i),
  }));

export const ModalFilter: ForwardRefComponent<
  BottomSheetModalAppRef,
  ModalFilterProps
> = forwardRef(({close, find}, ref) => {
  const {getValues, reset, control, watch, setValue} =
    useFormContext<FormsManageBuilding>();

  const [forms, setForms] = useImmer<FormsManageBuilding>(getValues());

  const {data: facilities} = useQueryFacilitiesFilter();

  const {data: interiors} = useQuerInteriorsFilter();

  const facilitiesList =
    facilities?.map(facility => ({
      icon: ({size, color}: any) =>
        getIconById(facility.icon) || (
          <Icons.Person size={size} color={color} />
        ), // Provide a default icon if null
      label: facility.name,
    })) || [];

  const interiorsList =
    interiors?.map(interior => ({
      icon: ({size, color}: any) =>
        getIconById(interior.icon) || (
          <Icons.Person size={size} color={color} />
        ), // Provide a default icon if null
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
      find(forms);
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
          <TextApp size={FontSize.Font16} weight={700}>
            Sort from
          </TextApp>
          <Row columnGap={scaler(10)}>
            <InputApp
              customStyle={{flex: 1}}
              name="minPrice"
              control={control}
              placeholder="Min Price"
              keyboardType="numeric" // Numeric input
              valueText={forms.minPrice}
              onChangeText={text => {
                setForms(daft => {
                  daft.minPrice = text;
                });
              }}
            />
            <InputApp
              customStyle={{flex: 1}}
              name="maxPrice"
              control={control}
              placeholder="Max Price"
              keyboardType="numeric" // Numeric input
              valueText={forms.maxPrice}
              onChangeText={text => {
                setForms(daft => {
                  daft.maxPrice = text;
                });
              }}
            />
          </Row>
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
            list={roomTypeList}
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
            list={facilitiesList}
            keySheet={EKeySheet.AmentitiesType}
            listSelected={forms.amentitiesType}
            title="Facilities"
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
