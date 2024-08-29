import React from 'react';
import {Platform, StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useStyles} from 'react-native-unistyles';
import {stylesheet} from './BoxButtonsForm.style';
import {scaler, shadow} from '@themes';
import {ColorsStatic} from '@constants';
import {Box, Row} from '@component/layout';
import {TouchableApp} from '@component/forms';
import {TextApp} from '@component/typography';
import {Icons} from '@assets';

export type BoxButtonsFormProps = {
  titleLeftButton?: string;
  titleBetweenButton?: string;
  titleRightButton?: string;
  styleBtn?: StyleProp<ViewStyle>;
  onPressLeftButton?: () => void;
  onPressRightButton?: () => void;
  insetBtn?: boolean;
  boxShadow?: boolean;
  iconLeft?: React.ReactNode;
  iconBetween?: React.ReactNode;
  iconRight?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const BoxButtonsForm: React.FC<BoxButtonsFormProps> = ({
  titleLeftButton = 'Report',
  titleBetweenButton,
  titleRightButton = 'Scheduling a room viewing',
  onPressLeftButton,
  onPressRightButton,
  styleBtn,
  insetBtn = true,
  boxShadow = true,
  style,
  iconLeft = <Icons.AlertOutLine color={ColorsStatic.tint} size={19} />,
  iconBetween = <Icons.Message size={21} color={ColorsStatic.tint} />,
  iconRight = <Icons.Calendar size={20} color={ColorsStatic.white} />,
}) => {
  const {styles} = useStyles(stylesheet);

  const inset = useSafeAreaInsets();

  const insetButton = insetBtn && {
    marginBottom:
      Platform.OS === 'android' ? inset.bottom + scaler(10) : inset.bottom,
  };

  const shadowContent = boxShadow && shadow.upto;

  return (
    <Box
      color={ColorsStatic.white}
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      style={[shadowContent,style]}>
      <Row>
        <TouchableApp
          onPress={onPressLeftButton}
          style={[
            styles.buttonSubmit,
            styles.buttonReportAndChat,
            insetButton,
            styleBtn,
          ]}>
          <Row columnGap={scaler(7)}>
            {iconLeft}
            <TextApp
              style={[
                styles.txtSubmit,
                {
                  color: ColorsStatic.tint,
                },
              ]}>
              {titleLeftButton}
            </TextApp>
          </Row>
        </TouchableApp>
        {titleBetweenButton && (
          <TouchableApp
            onPress={onPressRightButton}
            style={[
              styles.buttonSubmit,
              styles.buttonReportAndChat,
              insetButton,
              styleBtn,
            ]}>
            <Row columnGap={scaler(5)}>
              {iconBetween}
              <TextApp
                style={[
                  styles.txtSubmit,
                  {
                    color: ColorsStatic.tint,
                  },
                ]}>
                {titleBetweenButton}
              </TextApp>
            </Row>
          </TouchableApp>
        )}
        <TouchableApp
          onPress={onPressRightButton}
          style={[
            styles.buttonSubmit,
            styles.buttonScheduleOrder,
            insetButton,
            styleBtn,
          ]}>
          <Row columnGap={scaler(5)}>
            {iconRight}
            <TextApp pv={scaler(2)} style={styles.txtSubmit}>{titleRightButton}</TextApp>
          </Row>
        </TouchableApp>
      </Row>
    </Box>
  );
};
