import React, {PropsWithChildren} from 'react';
import {ColorValue} from 'react-native';

import {BoxDetail} from '../BoxDetail';
import { ColorsStatic } from '@constants';
import { Icons } from '@assets';
import { FontSize, scaler } from '@themes';
import { Row } from '@component/layout';
import { TextApp } from '@component/typography';
import { LineApp } from '@component/LineApp';

type BoxContainerProps = {
  title?: string;
  text?: string;
  colorTile?: ColorValue;
  hideLine?: boolean;
  require?: boolean;
  Icon?: React.ReactNode;
  showIcon?: boolean;
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
        {!!children ? children : <TextApp weight={500}>{text ?? '_'}</TextApp>}
      </>
    </BoxDetail>
  );
};
