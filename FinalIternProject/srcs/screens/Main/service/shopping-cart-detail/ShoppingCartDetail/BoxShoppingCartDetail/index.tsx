import React, { useState, useCallback, memo } from 'react';
import { TextInput } from 'react-native';
import { Icons } from "@assets";
import { Box, Row, TextApp, TouchableApp, ImageApp } from "@component";
import { FontSize, scaler } from "@themes";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type BoxShoppingCartDetailProps = {
  selectedItem: {
    image: any;
    title: string;
    price: string;
  };
};

export const BoxShoppingCartDetail: React.NamedExoticComponent<BoxShoppingCartDetailProps> = memo(({ selectedItem }) => {
  const { theme, styles } = useStyles(stylesheet);
  const [quantity, setQuantity] = useState<number>(1); // Store quantity as a number
  const [isMinusPressed, setIsMinusPressed] = useState(false);
  const [isPlusPressed, setIsPlusPressed] = useState(false);

  const increaseQuantity = useCallback(() => {
    setQuantity(prev => prev + 1);
  }, []);

  const decreaseQuantity = useCallback(() => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  }, []);

  const handleQuantityChange = useCallback((value: string) => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
    setQuantity(isNaN(numericValue) ? 1 : numericValue);
  }, []);

  return (
    <>
      <Row mt={scaler(10)}>
        <Box
          width={scaler(100)}
          height={scaler(100)}
          borderRadius={scaler(10)}
          style={styles.imageContainer}
        >
          <ImageApp source={selectedItem.image} style={styles.image} />
        </Box>
        <Box flex={1} pl={scaler(10)} rowGap={scaler(5)}>
          <TextApp size={FontSize.Font14} weight={700}>
            {selectedItem.title}
          </TextApp>
          <TextApp size={FontSize.Font14} weight={600} color={theme.colors.red2}>
            {selectedItem.price}
          </TextApp>
        </Box>
      </Row>
      <Row
        pt={scaler(10)}
        pb={scaler(15)}
        align="center"
        justify="space-between"
      >
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
              quantity === 1 || isMinusPressed ? styles.quantityButtonDisabled : null,
            ]}
          >
            <Icons.Minus color={theme.colors.gray10} />
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
            ]}
          >
            <Icons.PlusVer2 color={theme.colors.gray10} />
          </TouchableApp>
        </Row>
      </Row>
    </>
  );
});

const stylesheet = createStyleSheet(theme => ({
  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  quantityButton: {
    padding: scaler(5),
    borderWidth: scaler(1),
    borderColor: theme.colors.gray1,
    borderRadius: scaler(5),
    width: scaler(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonPressed: {
    backgroundColor: theme.colors.gray4,
  },
  quantityButtonDisabled: {
    backgroundColor: theme.colors.gray4,
  },
  quantityInput: {
    minWidth: scaler(40),
    borderWidth: scaler(1),
    borderColor: theme.colors.gray1,
    textAlign: 'center',
    paddingVertical: 0,
    paddingHorizontal: scaler(5),
    fontSize: FontSize.Font16,
    borderRadius: scaler(5),
  },
}));
