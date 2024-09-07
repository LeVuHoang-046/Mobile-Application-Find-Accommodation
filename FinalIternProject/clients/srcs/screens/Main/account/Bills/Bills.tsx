import {Icons} from '@assets';
import {
  Box,
  HeaderApp,
  LoadingComponent,
  PageScreen,
  performanceNavigation,
  PerformanceNavigationHOC,
} from '@component';
import {defaultBillsValue, EDetailTab} from '@constants';
import {FormsBills, TabPageType} from '@types';
import {useCallback} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {PaymentAwaited, PaymentCompleted} from './pages';
import {TabPages} from '@component/tabs/TabPages';

const BillsScreen: React.FC<PerformanceNavigationHOC> = ({navigateFinish}) => {
  const forms = useForm<FormsBills>({
    defaultValues: defaultBillsValue,
    mode: 'onChange',
  });

  const ListTab: TabPageType[] = [
    {
      title: 'Payment awaited',
      keyTab: EDetailTab.First,
    },
    {
      title: 'Payment completed',
      keyTab: EDetailTab.Second,
    },
  ];

  const renderItem = useCallback(({item}: {item: TabPageType}) => {
    switch (item.keyTab) {
      case EDetailTab.First:
        return (
          <PageScreen>
            <PaymentAwaited />
          </PageScreen>
        );
      case EDetailTab.Second:
        return (
          <PageScreen>
            <PaymentCompleted />
          </PageScreen>
        );
      default:
        return <></>;
    }
  }, []);

  return (
    <Box flex={1}>
      <FormProvider {...forms}>
        <HeaderApp title="Bills" goBack IconRight={<Icons.Calendar/>} />
        {navigateFinish ? (
          <>
            <TabPages
              list={ListTab}
              renderItem={renderItem}
              loading={!navigateFinish}
            />
          </>
        ) : (
          <LoadingComponent />
        )}
      </FormProvider>
    </Box>
  );
};
export const Bills = performanceNavigation(BillsScreen);
