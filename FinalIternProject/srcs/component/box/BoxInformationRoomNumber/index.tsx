import {TouchableApp} from '@component/forms';
import {TextApp} from '@component/typography';
import {FontSize, scaler} from '@themes';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

export type BoxInformationRoomNumberProps = {
  roomnNumber?: string;
  onpress?: () => void;
  isActive?: boolean;
};

export const BoxInformationRoomNumber: React.FC<
  BoxInformationRoomNumberProps
> = ({roomnNumber, onpress, isActive}) => {
  const {styles, theme} = useStyles(stylesheet);
  return (
    <TouchableApp
      onPress={onpress}
      style={[styles.buttonRoom, isActive && styles.activeButtonRoom]}>
      <TextApp
        color={isActive ? theme.colors.orange5 : theme.colors.text}
        weight={800}
        size={FontSize.Font13}>
        {roomnNumber}
      </TextApp>
    </TouchableApp>
  );
};

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
}));
