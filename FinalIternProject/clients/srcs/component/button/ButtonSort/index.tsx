import { Icons } from '@assets';
import { TouchableIconApp } from '@component/forms';
import { ESort } from '@constants';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {useStyles} from 'react-native-unistyles';

type ButtonSortProps = {
  sort?: ESort;
  onPress?: (nextSort: ESort) => void;
  style?: StyleProp<ViewStyle>;
  title?: string;
  disabled?: boolean;
};

export const ButtonSort: React.FC<ButtonSortProps> = ({
  sort = ESort.DESC,
  onPress,
  style,
  title = 'Sắp xếp',
  disabled,
}) => {
  const {theme} = useStyles();
  const handleSort = () => {
    onPress?.(sort === ESort.DESC ? ESort.ASC : ESort.DESC);
  };
  return (
    <TouchableIconApp
      disabled={disabled}
      IconRight={
        sort === ESort.DESC ? (
          <Icons.ArrowSortByDown color={theme.colors.tint} />
        ) : (
          <Icons.ArrowSortByUp color={theme.colors.tint} />
        )
      }
      title={title}
      onPress={handleSort}
      style={[{opacity: disabled ? 0.3 : 1}, style]}
    />
  );
};
