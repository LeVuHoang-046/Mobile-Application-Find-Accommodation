import {
  BottomSheetPickerSingleApp,
  Box,
  BoxFormTitle,
  TextApp,
  TextareaApp,
  TextFormApp,
} from '@component';
import {ColorsStatic, EKeySheet} from '@constants';
import {FontSize, scaler} from '@themes';
import {FormsAddBuildingDetail} from '@types';
import {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import {useStyles} from 'react-native-unistyles';
import {Icons} from '@assets';
import {LineApp} from '@component/LineApp';
import { stylesheet } from '../../style';

export const FormPostingInformation = memo(() => {
  const {styles} = useStyles(stylesheet);

  const init = Array(5)
    .fill(0)
    .map((_, i) => ({label: `label: ${i}`, value: String(i)}));
  const {watch, getValues, setValue, formState, control} =
    useFormContext<FormsAddBuildingDetail>();
  return (
    <Box color={ColorsStatic.white} p={scaler(10)}  rowGap={scaler(15)}>
      <Box rowGap={scaler(5)}>
        <TextApp
          weight={700}
          size={FontSize.Font16}
          color={ColorsStatic.orange3}>
          Posting Information
        </TextApp>
        <TextApp weight={600} color={ColorsStatic.gray3}>
          The information below is required
        </TextApp>
      </Box>
      <TextFormApp
        title="Post title"
        require
        iconLeft={<Icons.Pencil size={18} />}
        placeholder="Type the title"
        control={control}
        name="title"
      />

      <TextFormApp
        title="Address"
        iconLeft={<Icons.LocationHome color={ColorsStatic.orange3} size={18} />}
        require
        placeholder="Type the adress"
        control={control}
        name="address"
      />
       <TextFormApp
        title="Name building"
        iconLeft={<Icons.Tower color={ColorsStatic.orange3} size={18} />}
        placeholder="Type name"
        control={control}
        name="nameBuilding"
      />
      <BoxFormTitle title="Room type" require>
        <BottomSheetPickerSingleApp
          itemSelected={watch('roomType')}
          keySheet={EKeySheet.RoomType}
          list={init}
          style={styles.picker(!!formState.errors.roomType)}
          onChange={item => {
            setValue('roomType', item);
          }}
        />
      </BoxFormTitle>
      <LineApp />
      <TextFormApp
      title='Phone number'
      iconLeft={<Icons.Phone color={ColorsStatic.orange3} size={18}/>}
      require
      placeholder='+84123456789'
      control={control}
      name='phoneNumber'
      />
      <TextFormApp
      title='Parking spaces'
      iconLeft={<Icons.Parking color={ColorsStatic.orange3} size={18}/>}
      placeholder='Number of parking spaces'
      control={control}
      name='parkingSpaces'
      keyboardType='numeric'
      />
    
       <TextareaApp
      title='Describe'
      iconLeft={<Icons.Pencil color={ColorsStatic.orange3} size={18}/>}
      placeholder='Type describe'
      control={control}
      name='Describe'
      max={1000}
      />
    </Box>
  );
});
