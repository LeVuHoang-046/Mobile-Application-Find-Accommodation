import {Icons} from '@assets';
import {Box, BoxFeatureProps, ListFeature, TextApp} from '@component';
import {ColorsStatic, RouteMain, RouteTabAdmin, ShadowStyle1} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {FontSize, scaler} from '@themes';
import {TAppNavigation} from '@types';

export const BoxFeature = () => {
  const navigation = useNavigation<TAppNavigation<RouteTabAdmin.HomeTab>>();
  const listInterior: BoxFeatureProps[] = [
    {
      icon: <Icons.UsersOutLine />,
      label: 'Customers',
      onPress: () => navigation.navigate(RouteMain.ListCustomers)
      
    },
    {
      icon: <Icons.Staff />,
      label: 'Staff',
      onPress: () => navigation.navigate(RouteMain.ListStaffs)
    },
    {
      icon: <Icons.AddBuild />,
      label: 'Add buildings',
      onPress: () => navigation.navigate(RouteMain.AddBuildingDetail)
    },
    {
      icon: <Icons.HomeEdit />,
      label: 'Manage building',
      onPress: () => navigation.navigate(RouteMain.ManageBuilding)
    },
    {
      icon: <Icons.Calendar size={20} color={ColorsStatic.blue9} />,
      label: 'Manage Schedule',
      onPress: () => navigation.navigate(RouteMain.ManageSchedule)
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
  return (
    <Box
      style={ShadowStyle1}
      color={ColorsStatic.white}
      mt={scaler(20)}
      borderRadius={scaler(15)}
      mh={scaler(10)}
      p={scaler(10)}>
      <TextApp size={FontSize.Font14} mb={scaler(10)} weight={700}>
        Feature
      </TextApp>
      <ListFeature
        weightLabel={600}
        list={listInterior}
      />
    </Box>
  );
};
