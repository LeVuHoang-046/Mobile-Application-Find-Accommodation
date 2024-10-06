import {
  Box,
  HeaderApp,
  LoadingComponent,
  PageScreen,
  performanceNavigation,
  PerformanceNavigationHOC,
} from '@component';
import {EDetailTab} from '@constants';
import {TabPageType} from '@types';
import {useCallback} from 'react';
import {AwaitingApproval, CurrentlyActive, HasBeenHidden} from './pages';
import {TabPages} from '@component/tabs/TabPages';
import { Icons } from '@assets';

const RoomSearchPostScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const ListTab: TabPageType[] = [
    {
      title: 'Awaiting approval',
      keyTab: EDetailTab.First,
    },
    {
      title: 'Current active',
      keyTab: EDetailTab.Second,
    },
    {
      title: 'Has been hidden',
      keyTab: EDetailTab.Third,
    },
  ];

  const renderItem = useCallback(({item}: {item: TabPageType}) => {
    switch (item.keyTab) {
      case EDetailTab.First:
        return (
          <PageScreen>
            <AwaitingApproval />
          </PageScreen>
        );
      case EDetailTab.Second:
        return (
          <PageScreen>
            <CurrentlyActive />
          </PageScreen>
        );
      case EDetailTab.Third:
        return (
          <PageScreen>
            <HasBeenHidden />
          </PageScreen>
        );
      default:
        return <></>;
    }
  }, []);
  return (
    <Box flex={1}>
      <HeaderApp title="Room search post" goBack IconRight={<Icons.Plus/>} />
      {navigateFinish ? (
        <TabPages
          list={ListTab}
          renderItem={renderItem}
          loading={!navigateFinish}
        />
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};

export const RoomSearchPost = performanceNavigation(RoomSearchPostScreen);
