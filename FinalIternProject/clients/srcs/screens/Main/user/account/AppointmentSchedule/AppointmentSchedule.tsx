import React, {useCallback, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {FormProvider, useForm} from 'react-hook-form';
import {
  BottomSheetModalAppRef,
  Box,
  HeaderApp,
  InputApp,
  LoadingComponent,
  PageScreen,
  performanceNavigation,
  PerformanceNavigationHOC,
} from '@component';
import {CalenderRangePickerHeader} from '@component/calender';
import {
  ColorsStatic,
  defaultAppointmentScheduleValue,
  EDetailTab,
  EKeySheet,
} from '@constants';
import {scaler} from '@themes';
import {FormsAppointmentSchedule, TabPageType} from '@types';
import {Confirmed, Diposited, Overdue, WaitConfirm} from './pages';
import {TabPages} from '@component/tabs/TabPages';
import {Icons} from '@assets';
import { usePhoneUserStore } from '@stores';
import { useQueryUserInformation } from '@api';

const AppointmentScheduleScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const calendarRef = useRef<BottomSheetModalAppRef>(null);
  const forms = useForm<FormsAppointmentSchedule>({
    defaultValues: defaultAppointmentScheduleValue,
    mode: 'onChange',
  });

  const listTab: TabPageType[] = [
    {title: 'Wait confirm', keyTab: EDetailTab.First},
    {title: 'Confirmed', keyTab: EDetailTab.Second},
    {title: 'Diposited', keyTab: EDetailTab.Third},
    {title: 'Overdue', keyTab: EDetailTab.Fourth},
  ];
  const {phoneNumber} = usePhoneUserStore();
  const { data: users } = useQueryUserInformation(phoneNumber ?? '');

  const renderItem = useCallback(({item}: {item: TabPageType}) => {
    switch (item.keyTab) {
      case EDetailTab.First:
        return (
          <PageScreen contentContainerStyle={{paddingHorizontal: 0}}>
            <WaitConfirm dataUser={users}/>
          </PageScreen>
        );
      case EDetailTab.Second:
        return (
          <PageScreen>
            <Confirmed dataUser={users}/>
          </PageScreen>
        );
      // case EDetailTab.Third:
      //   return (
      //     <PageScreen>
      //       <Diposited />
      //     </PageScreen>
      //   );
      // case EDetailTab.Fourth:
      //   return (
      //     <PageScreen>
      //       <Overdue />
      //     </PageScreen>
      //   );
      default:
        return <></>;
    }
  }, []);

  return (
    <Box flex={1}>
      <FormProvider {...forms}>
        <HeaderApp
          title="Manage schedules"
          goBack
          IconRight={<Icons.Calendar />}
          onPressRight={() => calendarRef.current?.open()}
        />

        {navigateFinish ? (
          <Box flex={1}>
            <Box
              // flex={1}
              color={ColorsStatic.white}
              ph={scaler(10)}
              pt={scaler(16)}
              pb={scaler(6)}
              rowGap={scaler(12)}>
              <InputApp
                name="Search"
                control={forms.control}
                placeholder="Search here..."
                IconLeft={Icons.Search}
                iconSize={20}
              />
            </Box>
            <TabPages
              list={listTab}
              renderItem={renderItem}
              loading={!navigateFinish}
            />
          </Box>
        ) : (
          <LoadingComponent />
        )}
        <CalenderRangePickerHeader
          ref={calendarRef}
          keySheet={EKeySheet.Calender}
          title="Select date range"
          onChange={time => forms.setValue('time', time)}
          style={styles.button}
          valueStart={forms.watch('time').startDate}
          valueEnd={forms.watch('time').endDate}
        />
      </FormProvider>
    </Box>
  );
};

export const AppointmentSchedule = performanceNavigation(
  AppointmentScheduleScreen,
);

const styles = StyleSheet.create({
  button: {
    flex: 1,
    display: 'none',
  },
});
