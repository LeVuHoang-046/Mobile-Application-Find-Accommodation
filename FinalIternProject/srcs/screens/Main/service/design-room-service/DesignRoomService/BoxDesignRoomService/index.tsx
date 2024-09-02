import React, {useState, memo, useCallback} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Icons, Images} from '@assets';
import {Box, Row} from '@component/layout';
import {
  ButtonBuyService,
  ButtonBuyServiceProps,
  EmptyData,
  ImageApp,
  TextApp,
  TouchableApp,
} from '@component';
import {FontSize, scaler} from '@themes';
import {ColorsStatic, RouteMain} from '@constants';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {LineApp} from '@component/LineApp';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';
import { TAppNavigation } from '@types';

type BoxDesignRoomServiceProps = {
  item: any;
  onAddToCart: () => void;
  cartCount: number
};

export const BoxDesignRoomService: React.NamedExoticComponent<BoxDesignRoomServiceProps> =
  memo(({item, onAddToCart, cartCount}) => {
    const {styles} = useStyles(stylesheet);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] =
      useState<ButtonBuyServiceProps | null>(null);
    const [quantity, setQuantity] = useState<number>(1); // Store quantity as a number
    const [isMinusPressed, setIsMinusPressed] = useState(false);
    const [isPlusPressed, setIsPlusPressed] = useState(false);
    const translateY = useSharedValue(0);

    const list: ButtonBuyServiceProps[] = [
      {
        image: Images.DesginRoom1,
        title: 'Design room thiet ke de cor phong theo yeu cau',
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

    const openModal = useCallback((item: ButtonBuyServiceProps) => {
      setSelectedItem(item);
      setModalVisible(true);
      setQuantity(1); // Reset quantity to 1 when a new item is selected
    }, []);

    const closeModal = () => {
      setModalVisible(false);
      setSelectedItem(null);
      translateY.value = 0;
    };

    const increaseQuantity = useCallback(() => {
      setQuantity(prev => {
        const newQuantity = prev + 1;
        return newQuantity;
      });
    }, []);

    const decreaseQuantity = useCallback(() => {
      setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    }, []);

    const handleQuantityChange = useCallback((value: string) => {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
      const newQuantity = isNaN(numericValue) ? 1 : numericValue;
      setQuantity(newQuantity); // Update the quantity state immediately
    }, []);

    const gestureHandler =
      useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: event => {
          translateY.value = event.translationY;
        },
        onEnd: () => {
          if (translateY.value > 100) {
            closeModal();
          } else {
            translateY.value = withSpring(0);
          }
        },
      });

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateY: translateY.value}],
      };
    });

    const navigation = useNavigation<TAppNavigation<RouteMain.DesignRoomService>>();

    const handleNavigateOrderDetail = useCallback(() => {
      navigation.navigate(RouteMain.OrderConfirmationDetail, {selectedItem, quantity});
    }, [selectedItem,quantity]);

    const handleNavigate = useCallback((item: ButtonBuyServiceProps) => {
      navigation.navigate(RouteMain.ProductDetails, {item, quantity, cartCount})
    },[quantity, cartCount]);

    return (
      <Box flex={1}>
        <Row
          ph={scaler(10)}
          rowGap={scaler(10)}
          flexWrap="wrap"
          justify="space-between"
          mt={scaler(10)}>
          {list.map((item, index) => (
            <ButtonBuyService
              key={`ButtonBuyService ${index}`}
              {...item}
              onPressBuy={() => openModal(item)}
              onPressAdd={onAddToCart}
              onPress={() => handleNavigate(item)}
            />
          ))}
        </Row>

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={closeModal}
          backdropOpacity={0.5}
          style={styles.modal}
          swipeDirection="down"
          onSwipeComplete={closeModal}>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.modalContent, animatedStyle]}>
              {selectedItem ? (
                <>
                  <Row>
                    <Box
                      width={scaler(100)}
                      height={scaler(100)}
                      borderRadius={scaler(10)}
                      style={styles.imageContainer}>
                      <ImageApp
                        source={selectedItem.image}
                        style={styles.image}
                      />
                    </Box>
                    <Box flex={1} pl={scaler(10)}>
                      <TextApp size={FontSize.Font16} weight={700}>
                        {selectedItem.title}
                      </TextApp>
                      <TextApp
                        size={FontSize.Font16}
                        weight={700}
                        color={ColorsStatic.red2}>
                        {selectedItem.price}
                      </TextApp>
                    </Box>
                  </Row>
                  <LineApp />
                  {/* Quantity Box */}
                  <Row
                    pt={scaler(10)}
                    pb={scaler(15)}
                    align="center"
                    justify="space-between">
                    <TextApp size={FontSize.Font16} weight={700}>
                      Quantity
                    </TextApp>
                    <Row>
                      <TouchableApp
                        onPressIn={() => setIsMinusPressed(true)}
                        onPressOut={() => setIsMinusPressed(false)}
                        onPress={decreaseQuantity}
                        style={[
                          styles.quantityButton,
                          quantity === 1 || isMinusPressed
                            ? styles.quantityButtonDisabled
                            : null,
                        ]}>
                        <Icons.Minus color={ColorsStatic.gray10} />
                      </TouchableApp>
                      <TextInput
                        style={styles.quantityInput}
                        keyboardType="numeric"
                        value={quantity.toString()}
                        onChangeText={handleQuantityChange}
                      />
                      <TouchableApp
                        onPressIn={() => setIsPlusPressed(true)}
                        onPressOut={() => setIsPlusPressed(false)}
                        onPress={increaseQuantity}
                        style={[
                          styles.quantityButton,
                          isPlusPressed ? styles.quantityButtonPressed : null,
                        ]}>
                        <Icons.PlusVer2 color={ColorsStatic.gray10} />
                      </TouchableApp>
                    </Row>
                  </Row>
                  <TouchableApp style={styles.button} onPress={handleNavigateOrderDetail}>
                    <TextApp
                      color={ColorsStatic.white}
                      size={FontSize.Font16}
                      weight={600}>
                      Buy now
                    </TextApp>
                  </TouchableApp>
                </>
              ) : (
                <EmptyData />
              )}
            </Animated.View>
          </PanGestureHandler>
        </Modal>
      </Box>
    );
  });

const stylesheet = createStyleSheet({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: ColorsStatic.white,
    padding: scaler(10),
    borderRadius: 10,
  },
  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    padding: scaler(10),
    backgroundColor: ColorsStatic.red2,
    borderRadius: scaler(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButton: {
    padding: scaler(5),
    borderWidth: scaler(1),
    borderColor: ColorsStatic.gray1,
    borderRadius: scaler(5),
    width: scaler(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonPressed: {
    backgroundColor: ColorsStatic.gray4,
  },
  quantityButtonDisabled: {
    backgroundColor: ColorsStatic.gray4,
  },
  quantityInput: {
    minWidth: scaler(40),
    borderWidth: scaler(1),
    borderColor: ColorsStatic.gray1,
    textAlign: 'center',
    paddingVertical: 0,
    paddingHorizontal: scaler(5),
    fontSize: FontSize.Font16,
    borderRadius: scaler(5),
  },
});
