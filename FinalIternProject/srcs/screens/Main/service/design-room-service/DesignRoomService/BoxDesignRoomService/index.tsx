import {Images} from '@assets';
import {Box, ButtonBuyService, ButtonBuyServiceProps, Row} from '@component';
import {RouteMain} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {scaler} from '@themes';
import {TAppNavigation} from '@types';
import {memo} from 'react';

type BoxDesignRoomServiceProps = {
  item: any;
};

export const BoxDesignRoomService: React.NamedExoticComponent<BoxDesignRoomServiceProps> =
  memo(({}) => {
    const navigation =
      useNavigation<TAppNavigation<RouteMain.DesignRoomService>>();

    const handleNavigate = () => {
      navigation.navigate(RouteMain.ProductDetails);
    };

    const list: ButtonBuyServiceProps[] = [
      {
        image: Images.DesginRoom1,
        title: 'Design room',
        price: '2.400.000 VND',
      },
      {
        image: Images.DesginRoom2,
        title: 'Design room',
        price: '2.400.000 VND',
      },
      {
        image: Images.DesginRoom3,
        title: 'Design room',
        price: '2.400.000 VND',
      },
    ];

    return (
      <Box flex={1}>
        <Row
          ph={scaler(10)}
          rowGap={scaler(10)}
          flexWrap="wrap"
          justify="space-between"
          mt={scaler(10)}>
          {list.map((_, index) => (
            <ButtonBuyService
              onPress={handleNavigate}
              {..._}
              key={`ButtonBuyService ${index}`}
            />
          ))}
        </Row>
      </Box>
    );
  });
