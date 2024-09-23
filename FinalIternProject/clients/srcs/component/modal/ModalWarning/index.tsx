import React, {forwardRef, useImperativeHandle, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import Modal, {ModalProps} from 'react-native-modal';
import {ModalAppDetailRef} from '../ModalAppDetail';
import { ButtonModalWarningType, ForwardRefComponent } from '@types';
import { ColorsStatic } from '@constants';
import { Box, Row } from '@component/layout';
import { FontSize, scaler } from '@themes';
import { Icons } from '@assets';
import { TextApp } from '@component/typography';
import { TouchableApp } from '@component/forms';

export type ModalWarningProps = {
  listButtonBefore?: ButtonModalWarningType[];
  listButtonBetween?: ButtonModalWarningType[];
  listButtonAfter?: ButtonModalWarningType[];
  title: string;
  onPressAgree?: () => void;
} & Partial<Omit<ModalProps, 'isVisible' | 'backdropOpacity' | 'children'>>;

export const ModalWarning: ForwardRefComponent<
  ModalAppDetailRef,
  ModalWarningProps
> = forwardRef(
  (
    {
      onModalWillHide,
      onPressAgree,
      listButtonBefore = [],
      listButtonBetween = [],
      listButtonAfter = [],
      title,
    },
    ref,
  ) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    useImperativeHandle(
      ref,
      () => ({
        show,
        hide,
      }),
      [],
    );

    const show = () => {
      setShowModal(true);
    };
    const hide = () => {
      setShowModal(false);
    };

    const ListButton: ButtonModalWarningType[] = useMemo(() => {
      const ButtonCancel = {
        title: 'Huỷ',
        color: ColorsStatic.gray3,
        onPress: hide,
      };
      const ButtonAgree = {
        title: 'Đồng ý',
        onPress: onPressAgree,
      };
      return [
        ...listButtonBefore,
        ButtonCancel,
        ...listButtonBetween,
        ButtonAgree,
        ...listButtonAfter,
      ];
    }, [
      hide,
      onPressAgree,
      listButtonBefore,
      listButtonBetween,
      listButtonAfter,
    ]);

    return (
      <Modal
        isVisible={showModal}
        onModalWillHide={onModalWillHide}
        backdropOpacity={0.3}>
        <Box
          color={ColorsStatic.white}
          borderRadius={scaler(5)}
          p={scaler(24)}
          pb={scaler(16)}>
          <Row align="flex-start" columnGap={scaler(12)}>
            <Icons.Warning />
            <Box flex={1}>
              <TextApp weight={600} size={FontSize.Font13}>
                {title}
              </TextApp>
            </Box>
          </Row>
          <Row justify="flex-end">
            {ListButton?.map((button, index) => {
              return (
                <TouchableApp
                  key={index}
                  onPress={button?.onPress}
                  style={styles.button}>
                  <TextApp
                    weight={600}
                    color={button?.color || ColorsStatic.red1}
                    textTransform="uppercase">
                    {button.title}
                  </TextApp>
                </TouchableApp>
              );
            })}
          </Row>
        </Box>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  button: {
    padding: scaler(8),
  },
});
