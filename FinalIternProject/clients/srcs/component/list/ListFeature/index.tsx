import { BoxFeature, BoxFeatureProps } from '@component/box';
import { Row } from '@component/layout';
import { FontWeightType } from '@component/typography';
import { scaler } from '@themes';
import { StyleProp, TextStyle } from 'react-native';

type ListFeatureProps = {
  list: BoxFeatureProps[];
  styleLabel?: StyleProp<TextStyle>;
  styleValue?: StyleProp<TextStyle>;
  isBold?: boolean;
  weightLabel?: FontWeightType;
  onpress?: () => void;
};

export const ListFeature: React.FC<ListFeatureProps> = ({
  list,
  styleLabel,
  styleValue,
  isBold = false,
  weightLabel,
  onpress,
}) => {
  return (
    <Row flexWrap="wrap" columnGap={scaler(16)} rowGap={scaler(15)}>
      {list.map((_, index) => (
        <BoxFeature
          weightLabel={weightLabel}
          styleLabel={styleLabel}
          styleValue={styleValue}
          isBold={isBold}
          icon={_.icon}
          key={index}
          label={_.label}
          value={_.value}
          onPress={_.onPress}
        />
      ))}
    </Row>
  );
};
