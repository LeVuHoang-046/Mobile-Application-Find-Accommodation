import {
  Box,
  ButtonChooseCityProps,
  BoxButtonChooseCity,
  Row,
  TextApp,
  BoxFormTitle,
  BoxButtonConfirm,
  TouchableApp,
} from '@component';
import {LineApp} from '@component/LineApp';
import {FontSize, scaler} from '@themes';
import {
  BoardingHouseDetailType,
  BoardingHouseInfoType,
  BookingData,
  FormsAddMoreService,
  FormsMakeAnAppointment,
  ForwardRefComponent,
  TAppNavigation,
  UserMeType,
} from '@types';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {useFormContext} from 'react-hook-form';
import {CalenderPicker} from '@component/calender';
import {EKeySheet, ETypeToastCustom, RouteMain} from '@constants';
import {useStyles} from 'react-native-unistyles';
import {stylesheet} from './style';

import {pushToastCustom, pushToastLoading} from '@utils/toast';
import {useNavigation} from '@react-navigation/native';
import {toast} from '@backpackapp-io/react-native-toast';
import bookingAPI from '@api/user/mainApi';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

export type ModalDetailProps = {
  expand: (item: any) => void;
};

export const ModalDetail: ForwardRefComponent<ModalDetailProps, {dataHouse?: BoardingHouseInfoType, dataUser?:UserMeType}> =
  forwardRef(({dataHouse, dataUser}, ref) => {

    useImperativeHandle(
      ref,
      () => ({
        expand,
      }),
      [],
    );

    const {
      watch,
      setValue,
      formState: {errors},
      trigger,
      handleSubmit,
    } = useFormContext<FormsMakeAnAppointment>();
    const expand = (item: BoardingHouseInfoType ) => {
      bottomSheetRef.current?.present();
    };
    const {styles} = useStyles(stylesheet);
    
    const [pressBackdropClose, setPressBackdropClose] = useState<boolean>(true);
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    
    const [showTimePicker, setShowTimePicker] = useState(false);  // State for time picker
    const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(null);  // Explicit typing with dayjs.Dayjs
    
    const snapPoints = useMemo(() => ['35%'], []);  // Snap points for BottomSheet

    const closeBottomSheet = () => {
      bottomSheetRef.current?.close();
    };

    const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
      setShowTimePicker(false);  // Hide time picker after selection
      if (selectedTime) {
        const newSelectedTime = dayjs(selectedTime);  // Convert to dayjs object
        setSelectedTime(newSelectedTime);  // Set the dayjs object as the selected time
        const timestamp = newSelectedTime.valueOf();  // Get the timestamp
        setValue('time', timestamp, {shouldDirty: true, shouldValidate: true});
      }
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

    const navigation = useNavigation<TAppNavigation<RouteMain.DetailRoom>>();

    const handleOnSuccess = (loading: string, bookingData: BookingData) => {
      setTimeout(() => {
        pushToastCustom('Update successful', ETypeToastCustom.Success);
        toast.dismiss(loading);
        navigation.navigate(RouteMain.ScheduleSuccessfully, {bookingData});
      }, 2000);
    };

    const handleValidationTrigger = async () => {
      const validationResult = await trigger();
      if (!validationResult) {
        pushToastCustom(
          'Save failed, please try again!',
          ETypeToastCustom.Error,
        );
        return false;
      }
      return true;
    };

    const onSubmit = async (values: FormsMakeAnAppointment) => {
      const isValid = await handleValidationTrigger();
      if (!isValid) return;

      const loading = pushToastLoading('Saving...');
      
      try {
        // Combine date and time
        const selectedDate = dayjs(values.time); 
        console.log({selectedDate})
        const bookingTime = selectedTime || dayjs(); // Use selected time or current time

        // Set the combined booking date by merging date and time
        const bookingDate = selectedDate
          .hour(bookingTime.hour())
          .minute(bookingTime.minute())
          .second(0)
          .millisecond(0)
        
  .toISOString(); 

          console.log({bookingDate})

        // Prepare booking data
        const bookingData: BookingData = {
          customer_name: dataUser?.fullName,
          phone_number: dataUser?.phone,
          booking_date: bookingDate,
          boarding_house_title: dataHouse?.title,
          status: 0,  // Set status to 'wait confirm'
          boarding_house_id: dataHouse?.id,
          user_id: dataUser?.user_id,
        };

        await bookingAPI.createBooking(bookingData);
        bottomSheetRef.current?.close();
        handleOnSuccess(loading, bookingData);
      } catch (error) {
        console.error('Error saving booking:', error);
        pushToastCustom('Error saving booking, please try again.', ETypeToastCustom.Error);
        toast.dismiss(loading);
      }
    };

    const onError = (e: any) => {
      console.log('Error: ', e);
      pushToastCustom('Please complete the required information');
    };

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onDismiss={closeBottomSheet}
        backdropComponent={renderBackdrop}>
        <Box width={'100%'}>
          <Box align="center">
            <Row>
              <TextApp size={FontSize.Font16} weight={700}>
                Arrange an appointment
              </TextApp>
            </Row>
          </Box>
          <LineApp />
          <Box ph={scaler(15)} rowGap={scaler(15)}>
            <BoxFormTitle title="Choose date to make an appointment" require>
              <CalenderPicker
                title="Choose date"
                timestamp={watch('time')}
                keySheet={EKeySheet.Calender}
                onChange={(timestamp: number) => {
                  setValue('time', timestamp, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
                style={styles.picker(!!errors.time)}
              />
            </BoxFormTitle>
            <BoxFormTitle title="Choose time" require>
              <Box ph={scaler(15)} rowGap={scaler(10)}>
                <TouchableApp onPress={() => setShowTimePicker(true)}>
                  <TextApp>
                    {selectedTime
                      ? selectedTime.format('HH:mm')  // Display selected time
                      : 'Select a time'}
                  </TextApp>
                </TouchableApp>
              </Box>
            </BoxFormTitle>

            {showTimePicker && (
              <DateTimePicker
                mode="time"
                value={selectedTime ? selectedTime.toDate() : new Date()}  // Use current time if no time selected
                is24Hour={true}
                display="default"
                onChange={handleTimeChange}  // Handle time change
              />
            )}

            <TextApp weight={700}>
              Once the staff confirms your appointment, you and the staff can
              proactively contact to reschedule if there are any changes.
            </TextApp>
          </Box>
        </Box>
        <BoxButtonConfirm
          title={'Confirm'}
          isFormValid
          onPress={handleSubmit(onSubmit, onError)}
        />
      </BottomSheetModal>
    );
  });
