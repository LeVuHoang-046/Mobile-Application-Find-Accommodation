import {
  BoxInformationRoomNumber,
  BoxInformationRoomNumberProps,
} from '@component/box';
import {Row} from '@component/layout';
import {scaler} from '@themes';

type ListBoxRoomNumberProps = {
  list: BoxInformationRoomNumberProps[];
  onPressRoom: (roomNumber: string) => void;
  activeRoomNumber?: string | null;
};

export const ListBoxRoomNumber: React.FC<ListBoxRoomNumberProps> = ({
  list,
  onPressRoom,
  activeRoomNumber,
}) => {
  return (
    <Row
      ph={scaler(5)}
      columnGap={scaler(15)}
      rowGap={scaler(10)}
      flexWrap="wrap">
      {list.map((_, index) => (
        <BoxInformationRoomNumber
          key={index}
          roomnNumber={_.roomnNumber}
          onpress={() => onPressRoom(_.roomnNumber!)}
          isActive={activeRoomNumber === _.roomnNumber}
        />
      ))}
    </Row>
  );
};
