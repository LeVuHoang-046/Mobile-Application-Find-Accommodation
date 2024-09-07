import {LayoutStyleType} from './layout.type';

export const getStyleLayout = (props: LayoutStyleType) => {
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
    color,
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
    maxHeight: maxH,
    maxWidth: maxW,
    minHeight: minH,
    minWidth: minW,
    alignItems: align,
    justifyContent: justify,
    backgroundColor: color,
  };
};
