import {ColorValue} from 'react-native/types';
import {FontWeightType, TypographyStyleType} from './typography.type';
import { FontSize } from '@themes';

export const getStyleTypography = (
  props: TypographyStyleType,
  colorDefault: ColorValue,
) => {
  const {
    m,
    mt,
    mr,
    mb,
    ml,
    mh,
    mv,
    p,
    pt,
    pr,
    pb,
    pl,
    ph,
    pv,
    me,
    ms,
    pe,
    ps,
    maxH,
    maxW,
    minH,
    minW,
    align,
    justify,
    color = colorDefault,
    size = FontSize.Font12,
    weight,
    ...propsStyle
  } = props;
  const margin = {
    marginLeft: ml || mh || m,
    marginTop: mt || mv || m,
    marginRight: mr || mh || m,
    marginBottom: mb || mv || m,
    marginStart: ms,
    marginEnd: me,
  };

  const padding = {
    paddingLeft: pl || ph || p,
    paddingTop: pt || pv || p,
    paddingRight: pr || ph || p,
    paddingBottom: pb || pv || p,
    paddingStart: ps,
    paddingEnd: pe,
  };

  return {
    ...propsStyle,
    ...margin,
    ...padding,
    ...getFontWeight(weight),
    maxHeight: maxH,
    maxWidth: maxW,
    minHeight: minH,
    minWidth: minW,
    alignItems: align,
    justifyContent: justify,
    color: color,
    fontSize: size,
  };
};

//Bổ xung fontFamily vào các case
const getFontWeight = (weight: FontWeightType) => {
  const _weight = weight ? String(weight) : 'normal';
  switch (weight) {
    case 100:
    case 200:
    case 300:
      return {
        fontFamily: 'Mulish-Light',
      };
    case 400:
      return {
        fontFamily: 'Mulish-ExtraLight',
      };
    case 500:
      return {
        fontFamily: 'Mulish-Medium',
      };
    case 600:
      return {
        fontFamily: 'Mulish-SemiBold',
      };
    case 700:
      return {
        fontFamily: 'Mulish-Bold',
      };
    case 800:
      return {
        fontFamily: 'Mulish-ExtraBold',
      };
    case 900:
      return {
        fontFamily: 'Mulish-Black',
      };
    default:
      return {
        fontFamily: 'Mulish-Medium',
      };
  }
};
