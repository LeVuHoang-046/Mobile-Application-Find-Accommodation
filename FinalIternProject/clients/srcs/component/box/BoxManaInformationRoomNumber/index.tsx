import {TouchableApp} from '@component/forms';
import {TextApp} from '@component/typography';
import { EStatusRoom } from '@constants';
import {FontSize, scaler} from '@themes';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

export type BoxManaInformationRoomNumberProps = {
  roomnNumber?: string;
  status?: EStatusRoom;
  onpress?: () => void;
  isActive?: boolean;
};

export const BoxManaInformationRoomNumber: React.FC<
  BoxManaInformationRoomNumberProps
> = ({roomnNumber, status, onpress, isActive}) => {
  const {styles, theme} = useStyles(stylesheet);
  const isUnavailable = status === EStatusRoom.Unavailable; // Check if room is unavailable

  return (
    <TouchableApp
      onPress={onpress} // Keep clickable regardless of availability
      style={[
        styles.buttonRoom,
        isActive && styles.activeButtonRoom,
        isUnavailable && styles.unavailableRoom, // Apply blur only if the room is unavailable
      ]}
    >
      <TextApp
        color={isUnavailable ? theme.colors.text : theme.colors.text} // Change text color only if unavailable
        weight={800}
        size={FontSize.Font13}
      >
        {roomnNumber}
      </TextApp>
    </TouchableApp>
  );
};

// Style adjustments for unavailable room
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
    opacity: 0.3, // Reduce opacity only for unavailable rooms
    backgroundColor: theme.colors.gray3, // Optional: change background color for unavailable rooms
  },
}));


