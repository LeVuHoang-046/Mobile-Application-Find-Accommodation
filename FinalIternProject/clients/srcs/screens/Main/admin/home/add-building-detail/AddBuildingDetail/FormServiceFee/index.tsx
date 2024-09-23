import {Icons} from '@assets';
import {Box, BoxServiceFee, BoxServiceFeeProps, ListBoxServiceFee, Row, TextApp, TouchableApp} from '@component';
import {ColorsStatic, RouteMain} from '@constants';
import { useNavigation } from '@react-navigation/native';
import {FontSize, scaler} from '@themes';
import { TAppNavigation } from '@types';
import {memo} from 'react';
import { StyleSheet } from 'react-native';

export const FormServiceFee: React.FC = memo(() => {
  const navigation = useNavigation<TAppNavigation<RouteMain.AddBuildingDetail>>();
    const list: BoxServiceFeeProps[] = [
        {
            icon: <Icons.Plug/>,
            title: 'Electric',
            price: '30.000'
        },
        {
            icon:<Icons.Water/>,
            title: 'Water',
            price: '4000'
        },
        {
            icon:<Icons.Wifi/>,
            title: 'Wifi',
            price: '4000'
        },
        {
            icon:<Icons.CleanService/>,
            title: 'Common service',
            price: '4000'
        },
    ];
    const handleNavigate = () => {
      navigation.navigate(RouteMain.AddServiceFee)
    }
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
      <ListBoxServiceFee list={list}/>
    </Box>
  );
});

const styles = StyleSheet.create({
  buttonAdd:{
    padding: scaler(5)
  }
})
