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
import {Finished, Requesting} from './pages';
import {TabPages} from '@component/tabs/TabPages';

const ReportProblemScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const list: TabPageType[] = [
    {
      title: 'Requesting',
      keyTab: EDetailTab.First,
    },
    {
      title: 'Finished',
      keyTab: EDetailTab.Second,
    },
  ];

  const renderItem = useCallback(({item}: {item: TabPageType}) => {
    switch (item.keyTab) {
      case EDetailTab.First:
        return (
          <PageScreen>
            <Requesting />
          </PageScreen>
        );
      case EDetailTab.Second:
        return (
          <PageScreen>
            <Finished />
          </PageScreen>
        );
      default:
        return <></>;
    }
  }, []);

  return (
    <Box flex={1}>
      <HeaderApp title="Report problem" goBack />
      {navigateFinish ? (
        <>
          <TabPages
            list={list}
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
export const ReportProblem = performanceNavigation(ReportProblemScreen);
