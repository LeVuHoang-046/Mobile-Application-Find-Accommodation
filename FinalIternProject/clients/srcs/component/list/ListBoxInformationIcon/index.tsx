import {
  BoxInformationIconService,
  BoxInformationIconServiceProps,
} from '@component/box';
import {Row} from '@component/layout';
import {FontWeightType} from '@component/typography';
import {scaler} from '@themes';
import {StyleProp, TextStyle} from 'react-native';

type ListBoxInformationIconProps = {
  list: BoxInformationIconServiceProps[];
  styleLabel?: StyleProp<TextStyle>;
  styleValue?: StyleProp<TextStyle>;
  isBold?: boolean;
  weightLabel?: FontWeightType;
};

export const ListBoxInformationIcon: React.FC<ListBoxInformationIconProps> = ({
  list,
  styleLabel,
  styleValue,
  isBold = false,
  weightLabel,
}) => {
  return (
    <Row flexWrap="wrap" columnGap={scaler(16)} rowGap={scaler(15)}>
      {list.map((_, index) => (
        <BoxInformationIconService
          weightLabel={weightLabel}
          styleLabel={styleLabel}
          styleValue={styleValue}
          isBold={isBold}
          key={index}
          icon={_.icon}
          label={_.label}
          value={_.value}
        />
      ))}
    </Row>
  );
};
