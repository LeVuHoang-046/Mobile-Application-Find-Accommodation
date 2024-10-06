import {
  Absolute,
  Box,
  HeaderApp,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
  TouchableIconApp,
  TouchableIconAppProps,
} from '@component';
import {BoxNotification} from './BoxNotification';
import {useCallback, useState} from 'react';
import {FlatListApp} from '@component/FlatListApp';
import {StyleSheet} from 'react-native';
import {Icons} from '@assets';
import {ColorsStatic} from '@constants';
import {scaler} from '@themes';
import {Shadow} from 'react-native-shadow-2';

const NotificationScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const [show, setShow] = useState<boolean>(false);

  const renderItem = useCallback(({item}: {item: any}) => {
    return <BoxNotification item={item} />;
  }, []);

  const buttons: TouchableIconAppProps[] = [
    {
      title: 'Mark as read',
      IconRight: <Icons.Check color={ColorsStatic.gray10} />,
      onPress: undefined,
    },
    {
      title: 'Delete all',
      IconRight: <Icons.TrashCan color={ColorsStatic.gray10} />,
      onPress: undefined,
    },
  ];

  return (
    <Box flex={1}>
      <HeaderApp
        title="Notification"
        goBack
        IconRight={<Icons.ThreeDots />}
        onPressRight={() => setShow(!show)}
      />
      {navigateFinish ? (
        <FlatListApp
          data={Array(5).fill(0)}
          renderItem={renderItem}
          refreshing={false}
          contentContainerStyle={styles.flatList}
        />
      ) : (
        <LoadingComponent />
      )}
      {show ? (
        <Absolute right={scaler(20)} top={scaler(55)}>
          <Shadow
            distance={6}
            startColor={'#00000019'}
            style={{borderRadius: scaler(10), overflow: 'hidden'}}>
            <Box
              color={ColorsStatic.white}
              width={scaler(120)}
              ph={scaler(5)}
              pv={scaler(5)}
              borderRadius={scaler(5)}>
              {buttons?.map((_, i) => {
                return <TouchableIconApp {..._} key={i} />;
              })}
            </Box>
          </Shadow>
        </Absolute>
      ) : null}
    </Box>
  );
};
const styles = StyleSheet.create({
  flatList: {
    marginTop: 0,
    paddingHorizontal: 0,
    rowGap: 0,
  },
});

export const Notification = performanceNavigation(NotificationScreen);
