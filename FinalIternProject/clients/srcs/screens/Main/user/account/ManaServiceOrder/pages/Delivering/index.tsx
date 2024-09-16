import {Box, Row, TextApp, TouchableApp} from '@component';
import { LineApp } from '@component/LineApp';
import { ColorsStatic, ShadowStyle1 } from '@constants';
import { FontSize, scaler } from '@themes';
import { StyleSheet } from 'react-native';

export const Delivering = () => {
  return (
    <TouchableApp style={[styles.buttonContainer, ShadowStyle1]}>
      <Box p={scaler(10)}>
        <Row justify="space-between" p={scaler(3)}>
          <TextApp size={FontSize.Font13} weight={700}>
            Tư vấn thiết kế phòng
          </TextApp>
          <TextApp weight={600} color={ColorsStatic.red2}>
            Delivering
          </TextApp>
        </Row>
        <Row columnGap={scaler(15)} pt={scaler(5)} align="flex-start">
          <Box
            width={scaler(80)}
            height={scaler(80)}
            color={'red'}
            borderRadius={scaler(10)}></Box>
          <Box rowGap={scaler(5)} flex={1}>
            <TextApp size={FontSize.Font14}>
              Thiết Kế/decor Phòng Theo Yêu cầu
            </TextApp>
            <TextApp
              size={FontSize.Font14}
              weight={700}
              color={ColorsStatic.red2}>
              1.500.000
            </TextApp>
          </Box>
        </Row>
        <LineApp />
        <Box align="flex-end" rowGap={scaler(8)}>
          <Row>
            <TextApp size={FontSize.Font13} weight={600}>
              Total amount (1 products):{' '}
              <TextApp
                size={FontSize.Font14}
                weight={700}
                color={ColorsStatic.red2}
                textDecorationLine="underline">
                đ
              </TextApp>
              <TextApp
                size={FontSize.Font14}
                weight={700}
                color={ColorsStatic.red2}>
                1.500.000
              </TextApp>
            </TextApp>
          </Row>
          <TouchableApp style={styles.buttonSeeDetail}>
            <TextApp weight={600}>See details</TextApp>
          </TouchableApp>
        </Box>
      </Box>
    </TouchableApp>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: ColorsStatic.white,
    borderRadius: scaler(10),
    marginTop: scaler(10),
  },
  buttonSeeDetail: {
    borderWidth: scaler(1),
    borderColor: ColorsStatic.gray2,
    paddingVertical: scaler(5),
    paddingHorizontal: scaler(15),
    borderRadius: scaler(5),
  },
});
