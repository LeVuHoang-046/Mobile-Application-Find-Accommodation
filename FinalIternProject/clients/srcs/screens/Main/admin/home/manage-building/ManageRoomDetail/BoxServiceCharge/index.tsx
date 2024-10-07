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
import { FacilityType, InteriorType, RoomInfoType } from '@types';
import { getIconById } from '@utils';
import { memo } from 'react';
import {StyleSheet} from 'react-native';

type BoxServiceChargeProps = {
  itemFacilityies?: FacilityType[];
  itemInteriors?: InteriorType[];
}

export const BoxServiceCharge: React.NamedExoticComponent<BoxServiceChargeProps> = memo(({itemFacilityies,itemInteriors}) => {



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

 
  const InteriorsList = itemInteriors?.map(interior => ({
    icon: getIconById(interior.icon), 
    label: interior.name,

  })) || [];

    const facilitiesList = itemFacilityies?.map(facility => ({
    icon: getIconById(facility.icon), 
    label: facility.name,

  })) || [];

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
          list={InteriorsList}
        />
      </BoxDetail>
      <BoxDetail p={scaler(10)}>
        <Row pb={scaler(15)}>
          <Box
            borderWidth={1}
            borderColor={ColorsStatic.gray1}
            borderRadius={scaler(15)}
            p={scaler(7)}>
            <TextApp weight={700}>Facilities</TextApp>
          </Box>
        </Row>
        <ListBoxInformationIcon
          weightLabel={600}
          styleLabel={styles.textValueService}
          list={facilitiesList}
        />
      </BoxDetail>
    </>
  );
});

const styles = StyleSheet.create({
  textValueService: {
    fontSize: FontSize.Font12,
  },
  textLabelService: {
    color: ColorsStatic.gray1,
  },
});
