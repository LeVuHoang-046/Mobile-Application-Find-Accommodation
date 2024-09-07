import React from 'react';
import {IconButtonProps} from '../forms.type';
import { ButtonBase, Center } from '@component';
import { scaler } from '@themes';

export const IconButton: React.FC<IconButtonProps> = ({
  isActive,
  isLoading,
  isDisabled,
  onPress,
  scaleTo,
  IconElement,
  IconSvg,
  styleContainer,
  styleButton,
  stylePressable,
  ...props
}) => {
  return (
    <ButtonBase
      isActive={isActive}
      isLoading={isLoading}
      isDisabled={isDisabled}
      scaleTo={scaleTo}
      stylePressable={stylePressable}
      styleButton={styleButton}
      onPress={onPress}>
      <Center height={scaler(30)} p={scaler(12)} {...props}>
        {!!IconSvg ? IconSvg : null}
        {!!IconElement ? IconElement : null}
      </Center>
    </ButtonBase>
  );
};
