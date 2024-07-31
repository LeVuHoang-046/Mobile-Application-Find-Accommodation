import {Icons} from '@assets';
import {TouchableApp} from '@component/forms';
import {Center} from '@component/layout';
import {scaler} from '@themes';
import {ForwardRefComponent} from '@types';
import {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useState,
} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

export type ModalAppDetailRef = {
  show: () => void;
  hide: () => void;
  handleHideModal?: () => void;
};

type ModalAppDetailProps = {
  styleContainer?: StyleProp<ViewStyle>;
  onHideModal?: () => void;
} & Partial<Omit<ModalProps, 'isVisible' | 'backdropOpacity' | 'children'>>;

export const ModalAppDetail: ForwardRefComponent<
  ModalAppDetailRef,
  PropsWithChildren<ModalAppDetailProps>
> = forwardRef(
  ({children, styleContainer, onModalWillHide, onHideModal}, ref) => {
    const {
      styles,
      theme: {colors},
    } = useStyles(stylesheet);

    const [showModal, setShowModal] = useState<boolean>(false);

    useImperativeHandle(
      ref,
      () => ({
        show,
        hide,
        handleHideModal,
      }),
      [],
    );

    const show = () => {
      setShowModal(true);
    };

    const handleHideModal = () => {
      setShowModal(false);
    };

    const hide = () => {
      if (onHideModal) {
        onHideModal();
      } else {
        setShowModal(false);
      }
    };
    return (
      <Modal
        isVisible={showModal}
        onModalWillHide={onModalWillHide}
        backdropOpacity={0.3}
        onBackdropPress={hide}
        >
        <Center flex={1}>
          {/* <TouchableApp onPress={hide} style={styles.button}>
            <Icons.X_Mark />
          </TouchableApp> */}
          <Center
            width={'100%'}
            color={colors.white}
            borderRadius={scaler(10)}
            children={children}
            style={[styles.modal, styleContainer]}
          />
        </Center>
      </Modal>
    );
  },
);

const stylesheet = createStyleSheet(() => ({
  button: {
    padding: scaler(6),
  },
  modal: {
    paddingVertical: scaler(30),
  },
}));
