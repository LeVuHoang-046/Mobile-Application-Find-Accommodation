import {Icons} from '@assets';
import {
  Box,
  HeaderApp,
  InputApp,
  LoadingComponent,
  PageScreen,
  performanceNavigation,
  PerformanceNavigationHOC,
} from '@component';
import {TabPages} from '@component/tabs/TabPages';
import {ColorsStatic, defaultContractValue, EDetailTab} from '@constants';
import {scaler} from '@themes';
import {FormsContract, TabPageType} from '@types';
import React, {useCallback} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {ExpiredContract, ValidContract, WaitConfirm} from './pages';

const ContractsScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const forms = useForm<FormsContract>({
    defaultValues: defaultContractValue,
    mode: 'onChange',
  });

  const listTab: TabPageType[] = [
    {
      title: 'Wait confirm',
      keyTab: EDetailTab.First,
    },
    {
      title: 'Valid',
      keyTab: EDetailTab.Second,
    },
    {
      title: 'Expired',
      keyTab: EDetailTab.Third,
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
            <ValidContract />
          </PageScreen>
        );
      case EDetailTab.Third:
        return (
          <PageScreen>
            <ExpiredContract />
          </PageScreen>
        );
      default:
        return <></>;
    }
  }, []);
  return (
    <Box flex={1}>
      <FormProvider {...forms}>
        <HeaderApp title="Contract" goBack IconRight={<Icons.Calendar/>} />
        {navigateFinish ? (
          <>
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
          </>
        ) : (
          <LoadingComponent />
        )}
      </FormProvider>
    </Box>
  );
};
export const Contracts = performanceNavigation(ContractsScreen);
