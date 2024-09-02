import React, {useMemo} from 'react';
import {useStyles} from 'react-native-unistyles';
import {ButtonAppProps, stylesheetForms} from '../forms.style';
import {ESpinnerPlacement, EVariantButton} from '../forms.enum';
import {ButtonBase} from '@component/button';
import {Box} from '@component/layout';
import {TextApp} from '@component/typography';
import {FontSize} from '@themes';

export const ButtonApp: React.FC<ButtonAppProps> = ({
  leftIcon,
  rightIcon,
  title,
  isLoading,
  spinner = <></>,
  spinnerPlacement = ESpinnerPlacement.Start,
  loadingText,
  color,
  variant = EVariantButton.Solid,
  style,
  isActive = true,
  isDisabled,
  onPress,
  scaleTo,
  styleButton,
  stylePressable,
  ...props
}) => {
  const {styles, theme} = useStyles(stylesheetForms);
  const LeftIcon = useMemo(() => {
    const Icon = !!leftIcon ? leftIcon : <></>;
    if (!isLoading) {
      return Icon;
    }
    return spinnerPlacement === ESpinnerPlacement.Start ? spinner : Icon;
  }, [isLoading, leftIcon, spinnerPlacement]);

  const RightIcon = useMemo(() => {
    const Icon = !!rightIcon ? rightIcon : <></>;
    if (!isLoading) {
      return Icon;
    }
    return spinnerPlacement === ESpinnerPlacement.End ? spinner : Icon;
  }, [isLoading, rightIcon, spinnerPlacement]);

  const TitleButton = useMemo(() => {
    return !(isLoading && loadingText) ? title : loadingText;
  }, [isLoading, title, loadingText]);

  return (
    <ButtonBase
      isActive={isActive}
      isLoading={isLoading}
      isDisabled={isDisabled}
      scaleTo={scaleTo}
      onPress={onPress}
      styleButton={[
        styles.button,
        styles.buttonApp(variant, color || theme.colors.tint),
        styles.activeButton(!!isActive),
        styleButton,
      ]}
      stylePressable={stylePressable}>
      <Box>{LeftIcon}</Box>
      <Box>
        <TextApp
          size={FontSize.Font14}
          weight={600}
          style={styles.textButtonApp(variant, color || theme.colors.tint)}>
          {TitleButton}
        </TextApp>
      </Box>
      <Box>{RightIcon}</Box>
    </ButtonBase>
  );
};
