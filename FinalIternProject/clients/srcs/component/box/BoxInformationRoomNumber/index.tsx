import {TouchableApp} from '@component/forms';
import {TextApp} from '@component/typography';
import { EStatusRoom } from '@constants';
import {FontSize, scaler} from '@themes';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

export type BoxInformationRoomNumberProps = {
  roomnNumber?: string;
  onpress?: () => void;
  status?: number;
  isActive?: boolean;
};

export const BoxInformationRoomNumber: React.FC<
  BoxInformationRoomNumberProps
> = ({roomnNumber, status, onpress, isActive}) => {
  const {styles, theme} = useStyles(stylesheet);
  const isAvailable = status === EStatusRoom.Available; // Check if the room is available

  return (
    <TouchableApp
      onPress={isAvailable ? onpress : undefined} // Only enable onPress if status is 0
      style={[
        styles.buttonRoom,
        isActive && styles.activeButtonRoom,
        !isAvailable && styles.unavailableRoom, // Apply blur style if status is 1
      ]}
      disabled={!isAvailable} // Disable touch when status is 1
    >
      <TextApp
        color={isActive ? theme.colors.orange5 : theme.colors.text}
        weight={800}
        size={FontSize.Font13}
      >
        {roomnNumber}
      </TextApp>
    </TouchableApp>
  );
};

// Add style for unavailable room
const stylesheet = createStyleSheet(theme => ({
  buttonRoom: {
    backgroundColor: theme.colors.gray7,
    paddingVertical: scaler(8),
    paddingHorizontal: scaler(20),
    borderRadius: scaler(5),
  },
  activeButtonRoom: {
    backgroundColor: theme.colors.orange6,
    borderWidth: scaler(1),
    borderColor: theme.colors.orange5,
  },
  unavailableRoom: {
    opacity: 0.5, // Blur effect by reducing opacity
  },
}));

