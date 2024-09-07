import {ButtonChooseService, ButtonChooseServiceProps} from '@component/button';
import {Row} from '@component/layout';
import {scaler} from '@themes';

type ListButtonServiceTabProps = {
  list: ButtonChooseServiceProps[];
};

export const ListButtonServiceTab: React.FC<ListButtonServiceTabProps> = ({
  list,
}) => {
  return (
    <Row columnGap={scaler(10)} rowGap={scaler(15)} flexWrap="wrap">
      {list.map((_, index) => (
        <ButtonChooseService {..._} key={`ButtonChooseService${index}`} />
      ))}
    </Row>
  );
};
