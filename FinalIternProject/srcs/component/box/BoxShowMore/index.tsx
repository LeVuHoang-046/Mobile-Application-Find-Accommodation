import { Icons } from '@assets';
import {TouchableApp} from '@component/forms';
import {Row} from '@component/layout';
import {TextApp} from '@component/typography';
import {FontSize, scaler} from '@themes';
import { ColorValue } from 'react-native';
import {useStyles} from 'react-native-unistyles';

type BoxShowMore = {
  label?: string;
  textMore?: string;
  onPress?: () => void;
  iconLeft?: React.FunctionComponent<any>;
  sizeIcon?: number;
  colorIcon?: string;
};

export const BoxShowMore: React.FC<BoxShowMore> = ({
  label,
  textMore = 'View all',
  onPress,
  iconLeft: IconLeft = Icons.Check,
  sizeIcon,
  colorIcon,
}) => {
  const {theme} = useStyles();
  return (
    <Row p={scaler(10)} justify="space-between">
        <Row columnGap={scaler(8)}>
        {IconLeft && <IconLeft size={sizeIcon} color={colorIcon}/>}
      <TextApp weight={700} size={FontSize.Font17}>
        {label}
      </TextApp>
        </Row>
      <TouchableApp onPress={onPress} style={{padding: scaler(5)}}>
        <TextApp weight={500} size={FontSize.Font13} color={theme.colors.tint}>
          {textMore}
        </TextApp>
      </TouchableApp>
    </Row>
  );
};
