import {Icons} from '@assets';
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
import {TabPages} from '@component/tabs/TabPages';
import {ColorsStatic, defaultAppointmentScheduleValue, EDetailTab} from '@constants';
import {scaler} from '@themes';
import {FormsAppointmentSchedule, TabPageType} from '@types';
import React, {useCallback, useRef} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Confirmed, Diposited, Overdue, WaitConfirm} from './pages';

const AppointmentScheduleScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const modalSheetBottomApp = useRef<BottomSheetModalAppRef>(null);
  const forms = useForm<FormsAppointmentSchedule>({
    defaultValues: defaultAppointmentScheduleValue,
    mode: 'onChange',
  });

  const listTab: TabPageType[] = [
    {
      title: 'Wait confirm',
      keyTab: EDetailTab.First,
    },
    {
      title: 'Confirmed',
      keyTab: EDetailTab.Second,
    },
    {
      title: 'Diposited',
      keyTab: EDetailTab.Third,
    },
    {
      title: 'Overdue',
      keyTab: EDetailTab.Fourth,
    },
  ];

  const renderItem = useCallback(({item}: {item: TabPageType}) => {
    switch (item.keyTab) {
      case EDetailTab.First:
        return (
          <PageScreen>
            <WaitConfirm />
          </PageScreen>
        );
      case EDetailTab.Second:
        return (
          <PageScreen>
            <Confirmed />
          </PageScreen>
        );
      case EDetailTab.Third:
        return (
          <PageScreen>
            <Diposited />
          </PageScreen>
        );
      case EDetailTab.Fourth:
        return (
          <PageScreen>
            <Overdue />
          </PageScreen>
        );
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
          IconRight={Icons.Calendar}
          onPressRight={() => modalSheetBottomApp.current?.open()}
        />
        {navigateFinish ? (
          <Box
            flex={1}
            color={ColorsStatic.white}
            ph={scaler(10)}
            pt={scaler(16)}
            pb={scaler(6)}
            rowGap={scaler(12)}>
            <InputApp
              name="Search"
              control={forms.control}
              placeholder="Search here..."
              IconRight={Icons.Search}
            />
            <TabPages
              list={listTab}
              renderItem={renderItem}
              loading={!navigateFinish}
            />
          </Box>
        ) : (
          <LoadingComponent />
        )}
      </FormProvider>
    </Box>
  );
};

export const AppointmentSchedule = performanceNavigation(
  AppointmentScheduleScreen,
);
