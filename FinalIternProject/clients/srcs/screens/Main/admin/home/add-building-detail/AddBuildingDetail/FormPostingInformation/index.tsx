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
import {memo, useRef} from 'react';
import {useFormContext} from 'react-hook-form';
import {useStyles} from 'react-native-unistyles';
import {Icons} from '@assets';
import {LineApp} from '@component/LineApp';

import {stylesheet} from '../../style';
import { ModalDetail, ModalDetailProps } from './ModalDetail';
import { mapTypeHouse } from '@utils';

export const FormPostingInformation = memo(() => {
  const {styles} = useStyles(stylesheet);
 

  const {watch, getValues, setValue, formState, control} =
    useFormContext<FormsAddBuildingDetail>();
    const modalDetailRef = useRef<ModalDetailProps>(null);

    const roomTypeList = Array(4)
    .fill(0)
    .map((_, i) => ({
      label: mapTypeHouse(i), 
      // value: '', 
    }));
  
  const handleAddressPress = () => {
    modalDetailRef.current?.show(); 
  };

  const handleLocationSelect = (
    city: string,
    district: string,
    ward: string,
    detailAddress: string,
    cityId: number, 
    districtId: number, 
    wardId: number 
  ) => {
    const fullAddress = `${detailAddress}, ${ward}, ${district}, ${city}`; 
    setValue('address', fullAddress);
    setValue('city_id', cityId);       
    setValue('district_id', districtId); 
    setValue('ward_id', wardId);    
    setValue('detail_address',detailAddress); 
  };
  const address = watch('address');
  // console.log('watch:', watch('city_id'))
  return (
    <Box color={ColorsStatic.white} p={scaler(10)} rowGap={scaler(15)}>
      <Box rowGap={scaler(5)}>
        <TextApp weight={700} size={FontSize.Font16} color={ColorsStatic.orange3}>
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
        placeholder={address? address : "Type the address"}
        control={control}
        name="address"
        
        isOnPress
        onPress={handleAddressPress} 
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
          list={roomTypeList}
          style={styles.picker(!!formState.errors.roomType)}
          onChange={item => {
            console.log('Selected Room Type:', item);
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
      
      {/* Modal for selecting city, district, and ward */}
      <ModalDetail
        ref={modalDetailRef}
        onSelectLocation={handleLocationSelect} // Pass the handler to the modal
      />
    </Box>
  );
});
