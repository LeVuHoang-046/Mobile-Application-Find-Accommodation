import {
  Box,
  HeaderApp,
  LoadingComponent,
  PageScreen,
  performanceNavigation,
  PerformanceNavigationHOC,
} from '@component';
import {TabPages} from '@component/tabs/TabPages';
import {EDetailTab, EManaServiceOrderTab} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {TabPageType} from '@types';
import React, {useCallback} from 'react';
import {Cancelled, Delivered, Delivering, WaitConfirm} from './pages';

const ManaServiceOrderScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const navigation = useNavigation();

  const ListTab: TabPageType[] = [
    {
      title: EManaServiceOrderTab.WaitConfirm,
      keyTab: EDetailTab.First,
    },
    {
      title: EManaServiceOrderTab.Delivering,
      keyTab: EDetailTab.Second,
    },
    {
      title: EManaServiceOrderTab.Delivered,
      keyTab: EDetailTab.Third,
    },
    {
      title: EManaServiceOrderTab.Cancelled,
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
            <Delivering />
          </PageScreen>
        );
      case EDetailTab.Third:
        return (
          <PageScreen>
            <Delivered />
          </PageScreen>
        );
      case EDetailTab.Fourth:
        return (
          <PageScreen>
            <Cancelled />
          </PageScreen>
        );
      default:
        return <></>;
    }
  }, []);
  return (
    <Box flex={1}>
      <HeaderApp title="Order List" goBack />
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
    </Box>
  );
};

export const ManaServiceOrder = performanceNavigation(ManaServiceOrderScreen);
