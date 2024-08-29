import {Icons} from '@assets';
import {
  Absolute,
  Box,
  BoxDetail,
  ButtonThreeDots,
  Row,
  TextApp,
  TouchableIconApp,
  TouchableIconAppProps,
} from '@component';
import {ColorsStatic} from '@constants';
import {FontSize, scaler} from '@themes';
import React, {memo, useState} from 'react';
import {Shadow} from 'react-native-shadow-2';

type BoxNotificationProps = {
  item?: any;
};

export type BoxNotificationType = {
  title: string;
  text: string;
  date: string;
  time: string;
  icon: React.ReactNode;
};

export const BoxNotification: React.NamedExoticComponent<BoxNotificationProps> =
  memo(({item}) => {
    const [activeMenu, setActiveMenu] = useState<number | null>(null);

    const list: BoxNotificationType[] = [
      {
        title: 'Miễn phí tin dăng hoàn toàn',
        text: 'App miễn phí đăng tin trọn đời',
        time: '17:51',
        date: '22-06-2024',
        icon: <Icons.AirConditioning size={30} />,
      },
      {
        title: 'Tiếp cận nhiều khách hàng hơn cùng lúc',
        text: 'Tin đăng đối tác sẽ giúp chủ nhà gia tăng lượt hiển thị, tiếp cận nhiều khách hàng hơn, gia tăng tỉ lệ lấp phòng',
        time: '18:27',
        date: '12-04-2024',
        icon: <Icons.AirConditioning size={30} />,
      },
      {
        title: 'Nhắc bạn mẹo nhỏ !!!',
        text: 'Nếu tòa nhà của bạn còn nhiều phòng trông thì hãy tạo tòa nhà và thêm tòa nhà khi tạo tin đăng. Điều này sẽ tiết kiệm được số lượng tin đăng của bạn.',
        time: '12:04',
        date: '21-04-2024',
        icon: <Icons.AirConditioning size={30} />,
      },
    ];

    const buttons: TouchableIconAppProps[] = [
      {
        title: 'Mark as read',
        IconRight: <Icons.Check color={ColorsStatic.gray10} />,
        onPress: undefined,
      },
      {
        title: 'Delete',
        IconRight: <Icons.TrashCan color={ColorsStatic.gray10} />,
        onPress: undefined,
      },
    ];

    const toggleMenu = (index: number) => {
      setActiveMenu(activeMenu === index ? null : index);
    };

    return (
      <>
        {list.map((item, index) => (
          <BoxDetail key={`BoxNotification_${index}`} p={scaler(10)} pb={scaler(15)}>
            <Row columnGap={scaler(10)} align="flex-start">
              <Box>{item.icon}</Box>
              <Box rowGap={scaler(5)} flex={1}>
                <TextApp size={FontSize.Font16} weight={600}>
                  {item.title}
                </TextApp>
                <TextApp size={FontSize.Font14}>{item.text}</TextApp>
                <Row p={scaler(5)} justify="flex-end">
                  <TextApp>{item.time}</TextApp>
                  <TextApp>{item.date}</TextApp>
                </Row>
              </Box>
              <Box>
                <ButtonThreeDots onPress={() => toggleMenu(index)} />
              </Box>
            </Row>
            {activeMenu === index ? (
              <Absolute right={scaler(30)} top={scaler(20)} zIndex={999999}>
                <Shadow
                  distance={6}
                  startColor={'#00000015'}
                  style={{borderRadius: scaler(3)}}>
                  <Box
                    color={ColorsStatic.white}
                    ph={scaler(16)}
                    pv={scaler(4)}
                    borderRadius={scaler(3)}>
                    {buttons?.map((_, i) => (
                      <TouchableIconApp {..._} key={i} />
                    ))}
                  </Box>
                </Shadow>
              </Absolute>
            ) : null}
          </BoxDetail>
        ))}
      </>
    );
  });
