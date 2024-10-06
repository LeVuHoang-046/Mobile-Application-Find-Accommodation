import {iconProps, Icons} from '@assets';
import {
  BottomSheetPickerService,
  BottomSheetPickerType,
  Box,
  BoxFormTitle,
  Row,
  TextApp,
  TextFormApp,
  TouchableApp,
} from '@component';
import {ColorsStatic, EKeySheet, serviceIconsArray} from '@constants';
import {FontSize, scaler} from '@themes';
import {memo, useRef, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {useStyles} from 'react-native-unistyles';
import {stylesheet} from '../../style';
import BottomSheet from '@gorhom/bottom-sheet';  // Example BottomSheet library
import {FormsAddMoreService} from '@types';

type FormsAddMoreServiceProps = {
  openBottomSheet?: () => void ;
  // selectedIcon?: React.ReactNode;

}
export const FormAddMoreService: React.FC<FormsAddMoreServiceProps> = memo(({openBottomSheet}) => {
  const {styles} = useStyles(stylesheet);
  const init = Array(5)
    .fill(0)
    .map((_, i) => ({label: `label: ${i}`, value: String(i)}));

  const {
    watch,
    getValues,
    setValue,
    formState,
    control,
    formState: {errors},
    clearErrors,
  } = useFormContext<FormsAddMoreService>();

 

  const selectedIconId = watch('iconService'); 
  const selectedIcon = serviceIconsArray.find(item => item.id === selectedIconId)?.icon;
// console.log({selectedIcon})
  // const selectedIcons = [
  //   'fan',
  //   'sofa',
  //   'kitchen_shelf',
  //   'lamp',
  //   'curtain',
  //   'washing_machine',
  //   'bed',
  //   'fridge',
  // ];

  // // Filter the array to get only the selected icons
  // const filteredIconsArray = serviceIconsArray.filter(item =>
  //   selectedIcons.includes(item.id),
  // );


  return (
    <Box
      color={ColorsStatic.white}
      p={scaler(10)}
      rowGap={scaler(15)}
      borderRadius={scaler(15)}>
      <TextFormApp
        title="Service name"
        require
        iconLeft={<Icons.Pencil size={18} />}
        placeholder="Type service name"
        control={control}
        name="nameService"
      />
      <TextFormApp
        title="Service fee"
        require
        iconLeft={<Icons.Pencil size={18} />}
        placeholder="Type service fee"
        control={control}
        name="serviceFee"
        keyboardType='numeric'
        isNumber
        max={10}
      />
      <BoxFormTitle title="Fee base" require>
        <BottomSheetPickerService
          list={init}
          keySheet={EKeySheet.FeeBase}
          itemSelected={watch('feeBase')}
          title="Choose fee base"
          style={styles.picker(!!formState.errors.feeBase)}
          onChange={item => {
            setValue('feeBase', item);
          }}
        />
      </BoxFormTitle>
      <TextFormApp
        title="Measurement unit"
        require
        placeholder="Example Kwh, m3,...."
        control={control}
        name="unit"
      />
      {/* <BoxFormTitle title="Icon service" require>
        <BottomSheetPickerService
          iconList={filteredIconsArray}
          list={init}
          keySheet={EKeySheet.IconService}
          itemSelected={watch('iconService')}
          title="Choose fee base"
          style={styles.picker(!!formState.errors.iconService)}
          onChange={item => {
            setValue('iconService', item);
          }}
        />
      </BoxFormTitle> */}
     
      <TouchableApp
        style={{paddingVertical: scaler(12)}}
        onPress={openBottomSheet}>
        <Row justify="space-between">
          <TextApp weight={900}>Icon service</TextApp>
          <Row columnGap={scaler(10)}>
          {selectedIcon ? (
              selectedIcon({size: 24, color: ColorsStatic.orange3}) // Display the icon if selected
            ) : (
              <>
                <TextApp weight={700} color={ColorsStatic.gray3}>Select icon</TextApp>
                <Icons.ArrowRight size={18} />
              </>
            )}
          </Row>
        </Row>
      </TouchableApp>
        
    
    </Box>
  );
});
