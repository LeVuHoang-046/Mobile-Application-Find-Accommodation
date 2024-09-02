import {Icons} from '@assets';
import {
  Absolute,
  Box,
  ImageApp,
  PageScreen,
  Row,
  TextApp,
  TouchableApp,
} from '@component';
import {LineApp} from '@component/LineApp';
import {ColorsStatic, RouteMain} from '@constants';
import {RouteProp, useRoute} from '@react-navigation/native';
import {FontSize, scaler} from '@themes';
import {AppStackParamList} from '@types';
import {memo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

type BoxOrderConfirmationDetailProps = {
  item?: {
    title: string;
    price: string;
    image: string;
  };
};

// Define route parameters specific to this screen
type OrderConfirmationDetailRouteProp = RouteProp<
  AppStackParamList,
  RouteMain.OrderConfirmationDetail
>;

export const BoxOrderConfirmationDetail: React.NamedExoticComponent<BoxOrderConfirmationDetailProps> =
  memo((item) => {
    const {styles, theme} = useStyles(stylesheet);
    const inset = useSafeAreaInsets();

    const insetButton = {
      marginBottom: inset.bottom,
    };

    const route = useRoute<OrderConfirmationDetailRouteProp>();
    const {selectedItem, quantity} = route.params;

    if (!selectedItem || !quantity) {
      return (
        <PageScreen contentContainerStyle={styles.containerPageScreen}>
          <TextApp>No item selected.</TextApp>
        </PageScreen>
      );
    }

    const cleanedPrice = selectedItem.price.replace(/\./g, '');
    const numericPrice = parseFloat(cleanedPrice);
    const totalAmount = (quantity * numericPrice).toLocaleString('vi-VN');

    return (
      <>
        <PageScreen contentContainerStyle={styles.containerPageScreen}>
          <TouchableApp style={styles.userInformation}>
            <Row columnGap={scaler(5)}>
              <Box height={'100%'}>
                <Icons.Location size={18} />
              </Box>
              <Box flex={1} rowGap={scaler(3)}>
                <TextApp size={FontSize.Font14} weight={700}>
                  Le Vu Hoang{' '}
                  <TextApp color={theme.colors.gray3} weight={600}>
                    (+84) 947 506 530
                  </TextApp>
                </TextApp>
                <TextApp>
                  N03-T7 Ngoai giao doan Phuong xuan tao , quan bac tu liem , ha
                  noi
                </TextApp>
              </Box>
              <Box>
                <Icons.ArrowRight size={18} />
              </Box>
            </Row>
          </TouchableApp>

          <Box
            color={theme.colors.white}
            borderRadius={scaler(10)}
            p={scaler(10)}>
            <TextApp size={FontSize.Font14} weight={700}>
              Ordered items:
            </TextApp>

            <Row mt={scaler(10)}>
              <Box
                width={scaler(100)}
                height={scaler(100)}
                borderRadius={scaler(10)}
                style={styles.imageContainer}>
                <ImageApp source={selectedItem.image} style={styles.image} />
              </Box>
              <Box flex={1} pl={scaler(10)} rowGap={scaler(5)}>
                <TextApp size={FontSize.Font14} weight={700}>
                  {selectedItem.title}
                </TextApp>
                <TextApp
                  size={FontSize.Font14}
                  weight={600}
                  color={theme.colors.red2}>
                  {selectedItem.price}
                </TextApp>
              </Box>
              <Absolute right={0} bottom={0}>
                <TextApp>x{quantity}</TextApp>
              </Absolute>
            </Row>
            <LineApp />
            <Row justify="space-between">
              <TextApp size={FontSize.Font14} weight={600}>
                Total amount ({quantity} products)
              </TextApp>
              <TextApp size={FontSize.Font14} weight={700}>
                đ{totalAmount}
              </TextApp>
            </Row>
          </Box>
          <Box
            color={theme.colors.white}
            borderRadius={scaler(10)}
            p={scaler(10)}>
            <TouchableApp>
              <Row justify="space-between">
                <TextApp size={FontSize.Font14} weight={700}>
                  Payment method
                </TextApp>
                <Row>
                  <TextApp color={theme.colors.gray3}>See all</TextApp>
                  <Icons.ArrowRight size={18} color={theme.colors.gray3} />
                </Row>
              </Row>
            </TouchableApp>
          </Box>
          <Box
            color={theme.colors.white}
            borderRadius={scaler(10)}
            p={scaler(10)}>
            <TextApp size={FontSize.Font14} weight={700}>
              Payment details
            </TextApp>
            <Row justify="space-between" mt={scaler(10)}>
              <TextApp>Total amount</TextApp>
              <TextApp>
                <TextApp textDecorationLine="underline">đ</TextApp>
                {totalAmount}
              </TextApp>
            </Row>
            <Row justify="space-between" mt={scaler(10)}>
              <TextApp>Delivery cost</TextApp>
              <TextApp>đ0</TextApp>
            </Row>
            <Row justify="space-between" mt={scaler(10)}>
              <TextApp>Total payment</TextApp>
              <TextApp weight={700}>
                <TextApp textDecorationLine="underline">đ</TextApp>
                {totalAmount}
              </TextApp>
            </Row>
          </Box>
          <Row
            color={theme.colors.white}
            borderRadius={scaler(10)}
            p={scaler(10)}
            columnGap={scaler(5)}>
            <Icons.DocumentScan color={ColorsStatic.red5} />
            <Box flex={1}>
              <TextApp weight={600}>
                By clicking 'Place Order,' you agree to comply with the Terms
                and Conditions.
              </TextApp>
            </Box>
          </Row>
        </PageScreen>
        <Absolute bottom={0} right={0} left={0}>
          <Row
            justify="flex-end"
            columnGap={scaler(15)}
            p={scaler(10)}
            color={theme.colors.white}
            style={insetButton}>
            <Box>
              <TextApp weight={600}>Total payment</TextApp>
              <TextApp
                weight={700}
                size={FontSize.Font14}
                color={theme.colors.red2}>
                <TextApp
                  color={theme.colors.red2}
                  size={FontSize.Font14}
                  textDecorationLine="underline">
                  đ
                </TextApp>
                {totalAmount}
              </TextApp>
            </Box>
            <TouchableApp style={styles.buttonOrder}>
              <TextApp
                size={FontSize.Font14}
                color={theme.colors.white}
                weight={700}>
                Oder now
              </TextApp>
            </TouchableApp>
          </Row>
        </Absolute>
      </>
    );
  });

const stylesheet = createStyleSheet(theme => ({
  containerPageScreen: {
    rowGap: scaler(8),
    marginTop: scaler(8),
  },
  userInformation: {
    backgroundColor: theme.colors.white,
    padding: scaler(10),
    borderRadius: scaler(10),
  },
  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonOrder: {
    backgroundColor: theme.colors.red2,
    borderRadius: scaler(10),
    paddingHorizontal: scaler(30),
    paddingVertical: scaler(10),
  },
}));
