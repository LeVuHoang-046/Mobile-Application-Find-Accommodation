import { Icons } from '@assets';
import { Box, Row, TextApp, TouchableApp } from '@component';
import { ColorsStatic, RouteMain } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { FontSize, scaler } from '@themes';
import { FormsAddListRoom, TAppNavigation } from '@types';
import { memo, useState } from 'react';
import { StyleSheet, Image as RNImage } from 'react-native';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
type FormAddListRoomProps = {
  onCallBack: (item: FormsAddListRoom) => void;
  onDelete: (roomID: string) => void;
  rooms: FormsAddListRoom[]; 
};

export const FormAddListRoom: React.FC<FormAddListRoomProps> = memo(
  ({ onCallBack, rooms, onDelete }) => {
    const navigation = useNavigation<TAppNavigation<RouteMain.AddBuildingDetail>>();
    
    
    const [selectedRoom, setSelectedRoom] = useState<FormsAddListRoom | null>(null);

    const handleNavigate = () => {
      navigation.navigate(RouteMain.AddListRoom, {
        onCallbackSave: onCallBack,
        onDelete: onDelete,
        roomData: null, 
      });
    };

    const handleRoomSelect = (room: FormsAddListRoom) => {
      setSelectedRoom(room)
      navigation.navigate(RouteMain.AddListRoom, {
        onCallbackSave: onCallBack,
        onDelete: onDelete,
        roomData: room, 
      });
    };

    return (
      <Box color={ColorsStatic.white} p={scaler(10)} rowGap={scaler(15)}>
        <Box rowGap={scaler(5)}>
          <TextApp weight={700} size={FontSize.Font16} color={ColorsStatic.orange3}>
            List room
          </TextApp>
          <Row columnGap={scaler(10)} rowGap={scaler(10)} flexWrap='wrap'>
            {rooms.map((room, index) => (
              <TouchableApp
                key={room.id}
                onPress={() => handleRoomSelect(room)} 
              >
                <Box
                  p={scaler(5)}
                  borderColor={ColorsStatic.gray1}
                  borderWidth={1}
                  borderRadius={scaler(7)}
                  height={scaler(180)}
                  width={scaler(110)}
                  rowGap={scaler(20)}
                  mb={scaler(5)}
                >
                  <Box height={scaler(80)}>
                    {room.imageRoom?.length > 0 ? (
                      <RNImage source={{ uri: room.imageRoom[0].path }} style={styles.image} />
                    ) : (
                      <TextApp>No Image</TextApp>
                    )}
                  </Box>
                  <Box rowGap={scaler(15)}>
                    <TextApp size={FontSize.Font13} weight={700}>
                      {room.roomNumber}
                    </TextApp>
                    <TextApp weight={700} color={ColorsStatic.red2}>
                      {room.roomPrice} VND
                    </TextApp>
                  </Box>
                </Box>
              </TouchableApp>
            ))}
            <TouchableApp style={styles.button} onPress={handleNavigate}>
              <Row columnGap={scaler(5)}>
                <Icons.PlusVer2 color={ColorsStatic.orange3} />
                <TextApp weight={600} color={ColorsStatic.orange3}>
                  Add room
                </TextApp>
              </Row>
            </TouchableApp>
          </Row>
        </Box>
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  button: {
    padding: scaler(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: scaler(7),
  },
});
