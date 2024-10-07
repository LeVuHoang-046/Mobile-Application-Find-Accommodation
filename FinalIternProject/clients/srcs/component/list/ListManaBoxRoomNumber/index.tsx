import {
  BoxManaInformationRoomNumber,
  BoxManaInformationRoomNumberProps,
} from '@component/box';
import {Row} from '@component/layout';
import {scaler} from '@themes';
import {RoomInfoType} from '@types';

type ListManaBoxRoomNumberProps = {
  list: BoxManaInformationRoomNumberProps[];
  onPressRoom: (roomNumber: string) => void;
  activeRoomNumber?: RoomInfoType | null;
};

export const ListManaBoxRoomNumber: React.FC<ListManaBoxRoomNumberProps> = ({
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
        <BoxManaInformationRoomNumber
          key={index}
          roomnNumber={_.roomnNumber}
          status={_.status}
          onpress={() => onPressRoom(_.roomnNumber!)}
          isActive={activeRoomNumber?.name === _.roomnNumber}
        />
      ))}
    </Row>
  );
};
