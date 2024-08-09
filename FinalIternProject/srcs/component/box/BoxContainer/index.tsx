import React, { PropsWithChildren } from 'react';
import { ColorValue, StyleProp, TextStyle } from 'react-native';
import { Icons } from '@assets';
import { Row } from '@component/layout';
import { LineApp } from '@component/LineApp';
import { TextApp } from '@component/typography';
import { ColorsStatic } from '@constants';
import { FontSize, scaler } from '@themes';
import { BoxDetail } from '../BoxDetail';

type BoxContainerProps = {
  title?: string;
  text?: string;
  colorTile?: ColorValue;
  hideLine?: boolean;
  require?: boolean;
  Icon?: React.ReactNode;
  showIcon?: boolean;
  styleText?: StyleProp<TextStyle>;
};

export const BoxContainer: React.FC<PropsWithChildren<BoxContainerProps>> = ({
  title,
  children,
  colorTile = ColorsStatic.text,
  text,
  hideLine = false,
  require = false,
  Icon = <Icons.Pencil/>,
  showIcon = false,
  styleText
}) => {
  return (
    <BoxDetail p={scaler(10)}>
      <Row columnGap={scaler(8)}>
        {showIcon ? Icon : null}
        <TextApp color={colorTile} weight={800} size={FontSize.Font16}>
          {title}
          <>
            {require ? <TextApp color={ColorsStatic.tint}> *</TextApp> : null}
          </>
        </TextApp>
      </Row>
      {!hideLine && <LineApp />}
      <>
        {!!children ? children : <TextApp style={styleText} weight={500}>{text ?? '_'}</TextApp>}
      </>
    </BoxDetail>
  );
};
