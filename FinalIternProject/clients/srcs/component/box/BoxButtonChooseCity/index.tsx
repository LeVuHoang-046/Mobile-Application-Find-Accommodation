import { ButtonChooseCity, ButtonChooseCityProps } from '@component/button';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import { stylesheet } from './BoxButtonChooseCity.style';
import { Box } from '@component/layout';
import { FontSize, scaler } from '@themes';
import { TextApp } from '@component/typography';


export type BoxButtonChooseCityProps = {
  title?: string;
  buttons: ButtonChooseCityProps[];
  style?: StyleProp<ViewStyle>;
};

export const BoxButtonChooseCity: React.FC<
  BoxButtonChooseCityProps
> = ({title, buttons, style}) => {
  const {
    styles,
    theme: {colors},
  } = useStyles(stylesheet);

//   const itemChooseTrainingFacility: UseQueryResult<UnitsByAccount, Error> =
//     useQuery({
//       queryKey: [EQueryKey.ItemChooseTrainingFacility],
//       staleTime: Infinity,
//     });

  const handleButtonPress = (index: number) => {
    buttons[index].onPress?.();
  };

  return (
    <Box
      color={colors.white}
      width="100%"
      ph={scaler(20)}
      pv={scaler(10)}
      style={style}>
      {!!title && (
        <TextApp weight={700} color={colors.gray3} size={FontSize.Font13}>
          {title}
        </TextApp>
      )}

      {buttons.map((button, index) => {
        return (
          <ButtonChooseCity
            key={`BoxButtonChooseTrainingFacility_${index}`}
            stylePressable={styles.stylePressable(index)}
            Icon={button.Icon}
            label={button.label}
            onPress={() => handleButtonPress(index)}
            // showIcon={
            //   String(itemChooseTrainingFacility.data?.hocvienCanboId) ===
            //   String(button.id)
            // }
          />
        );
      })}
    </Box>
  );
};
