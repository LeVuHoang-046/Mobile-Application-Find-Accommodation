import {Icons} from '@assets';
import {
  Box,
  BoxServiceFeeProps,
  ListBoxServiceFee,
  Row,
  TextApp,
  TouchableApp,
} from '@component';
import {ColorsStatic, RouteMain, serviceIconsArray} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {FontSize, scaler} from '@themes';
import {FormsAddMoreService, TAppNavigation} from '@types';
import {memo} from 'react';
import {LogBox, StyleSheet} from 'react-native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
type FormAddMoreServiceProps = {
  onCallBack: (item: FormsAddMoreService) => void;
  onDelete: (serviceId: string) => void;
  services: FormsAddMoreService[];
};

export const FormServiceFee: React.FC<FormAddMoreServiceProps> = memo(
  ({services, onCallBack, onDelete}) => {
    const navigation =
      useNavigation<TAppNavigation<RouteMain.AddBuildingDetail>>();
    const list: BoxServiceFeeProps[] = [
      {
        icon: <Icons.Plug />,
        title: 'Electric',
        price: '30.000',
      },
      {
        icon: <Icons.Water />,
        title: 'Water',
        price: '4000',
      },
      {
        icon: <Icons.Wifi />,
        title: 'Wifi',
        price: '4000',
      },
      {
        icon: <Icons.CleanService />,
        title: 'Common service',
        price: '4000',
      },
    ];
    const formatNumberWithCommas = (value: string) => {
      const cleanValue = value.replace(/[^\d]/g, ''); // Remove non-numeric characters
      if (!cleanValue) return '';
      return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const getServiceIcon = (id: string) => {
      const service = serviceIconsArray.find(item => item.id === id);
      return service ? (
        service.icon({size: scaler(20), color: ColorsStatic.orange3})
      ) : (
        <Icons.Wifi size={20} />
      ); // Use a default icon if the id is not found
    };

    const listService: BoxServiceFeeProps[] = services.map(service => ({
      icon: getServiceIcon(service.iconService), // You can customize this based on the service
      title: service.nameService,
      price: service.serviceFee
        ? formatNumberWithCommas(service.serviceFee.toString()) + 'đ'
        : '0đ', // Assuming serviceFee is a number
    }));
    const handleNavigate = () => {
      navigation.navigate(RouteMain.AddServiceFee, {
        serviceData: null,
        onDelete: onDelete,
        onCallBackServiceSave: onCallBack,
      });
    };
    const handleServiceSelect = (service: FormsAddMoreService) => {
      // setSelectedRoom(room)
      navigation.navigate(RouteMain.AddServiceFee, {
        onCallBackServiceSave: onCallBack,
        onDelete: onDelete,
        serviceData: service,
      });
    };
    return (
      <Box color={ColorsStatic.white} p={scaler(10)} rowGap={scaler(10)}>
        <Row justify="space-between">
          <Box borderRadius={scaler(20)} borderWidth={0.75} p={scaler(5)}>
            <TextApp weight={700} size={FontSize.Font13}>
              Common service fee
            </TextApp>
          </Box>
          <TouchableApp style={styles.buttonAdd} onPress={handleNavigate}>
            <Icons.PlusVer2 color={ColorsStatic.orange3} />
          </TouchableApp>
        </Row>
        <ListBoxServiceFee services={services} list={list} />
        <ListBoxServiceFee
          onPress={handleServiceSelect}
          list={listService}
          services={services}
        />
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  buttonAdd: {
    padding: scaler(5),
  },
});
