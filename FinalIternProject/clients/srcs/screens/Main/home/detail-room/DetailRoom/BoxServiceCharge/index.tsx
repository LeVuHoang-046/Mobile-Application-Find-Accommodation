import {Icons} from '@assets';
import {
  Box,
  BoxDetail,
  BoxInformationIconServiceProps,
  ListBoxInformationIcon,
  Row,
  TextApp,
} from '@component';
import {ColorsStatic} from '@constants';
import {FontSize, scaler} from '@themes';
import {StyleSheet} from 'react-native';

export const BoxServiceCharge = () => {
  const listService: BoxInformationIconServiceProps[] = [
    {
      icon: <Icons.Electric size={16} />,
      label: 'Electric',
      value: '3.800d/Kwh',
    },
    {
      icon: <Icons.Water size={16} />,
      label: 'Water',
      value: '40.000d/m3',
    },
    {
      icon: <Icons.Wifi size={16} />,
      label: 'Wifi',
      value: '100.000d/Room',
    },
    {
      icon: <Icons.CleanService size={16} />,
      label: 'Common service',
      value: '150.000d/person',
    },
  ];

  const listInterior: BoxInformationIconServiceProps[] = [
    {
      icon: <Icons.AirConditioning />,
      label: 'Air conditioning',
    },
    {
      icon: <Icons.Heater />,
      label: 'Heater',
    },
    {
      icon: <Icons.KitchenShelf />,
      label: 'Kitchen shelf',
    },
    {
      icon: <Icons.Bed />,
      label: 'Bed',
    },
    {
      icon: <Icons.WashingMachine />,
      label: 'Washing machine',
    },
    {
      icon: <Icons.Wardrobe />,
      label: 'Wardrobe',
    },
    {
      icon: <Icons.Fan />,
      label: 'Fan',
    },
  ];

  const listConvenient: BoxInformationIconServiceProps[] = [
    {
      icon: <Icons.Toilet/>,
      label: 'Enclosed sanitation',
    },
    {
      icon: <Icons.FingerPrint/>,
      label: 'Fingerprint security',
    },
    {
      icon: <Icons.Person/>,
      label: 'Not the same landlord',
    },
  ]

  return (
    <>
      <BoxDetail p={scaler(10)}>
        <Row pb={scaler(15)}>
          <Box
            borderWidth={1}
            borderColor={ColorsStatic.gray1}
            borderRadius={scaler(15)}
            p={scaler(7)}>
            <TextApp weight={700}>Service charge</TextApp>
          </Box>
        </Row>
        <ListBoxInformationIcon
          styleLabel={styles.textLabelService}
          weightLabel={700}
          styleValue={styles.textValueService}
          list={listService}
        />
      </BoxDetail>
      <BoxDetail p={scaler(10)}>
        <Row pb={scaler(15)}>
          <Box
            borderWidth={1}
            borderColor={ColorsStatic.gray1}
            borderRadius={scaler(15)}
            p={scaler(7)}>
            <TextApp weight={700}>Interior</TextApp>
          </Box>
        </Row>
        <ListBoxInformationIcon
          weightLabel={600}
          styleLabel={styles.textValueService}
          list={listInterior}
        />
      </BoxDetail>
      <BoxDetail p={scaler(10)}>
        <Row pb={scaler(15)}>
          <Box
            borderWidth={1}
            borderColor={ColorsStatic.gray1}
            borderRadius={scaler(15)}
            p={scaler(7)}>
            <TextApp weight={700}>Convenient</TextApp>
          </Box>
        </Row>
        <ListBoxInformationIcon
          weightLabel={600}
          styleLabel={styles.textValueService}
          list={listConvenient}
        />
      </BoxDetail>
    </>
  );
};

const styles = StyleSheet.create({
  textValueService: {
    fontSize: FontSize.Font12,
  },
  textLabelService: {
    color: ColorsStatic.gray1,
  },
});
