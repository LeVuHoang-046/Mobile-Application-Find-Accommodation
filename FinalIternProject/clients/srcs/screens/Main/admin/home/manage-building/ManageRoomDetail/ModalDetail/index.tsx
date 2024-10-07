import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ColorsStatic} from '@constants';
import Modal from 'react-native-modal';

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onDeny: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  onDeny,
  title = 'Confirm Room Availability',
  message = 'Is the room available?',
  confirmText = 'Available',
  cancelText = 'Unavailable',
}) => {
  return (
    <Modal onBackdropPress={onClose} isVisible={visible} backdropOpacity={0.3}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onDeny} style={styles.button}>
              <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onConfirm();
                onClose();
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: ColorsStatic.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    padding: 10,
    backgroundColor: ColorsStatic.tint,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: ColorsStatic.white,
    fontWeight: '600',
  },
});
