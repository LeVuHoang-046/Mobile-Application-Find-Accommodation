import React, { memo } from 'react';
import { Box, TextApp } from '@component';
import { Button, Pressable, StyleSheet, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ColorsStatic } from '@constants';
import { scaler } from '@themes';

type BoxInputChatProps = {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
};

export const BoxInputChat: React.NamedExoticComponent<BoxInputChatProps> = memo(({ newMessage, setNewMessage, handleSendMessage }) => {
  const inset = useSafeAreaInsets();

  return (
    <Box flexDirection="row" align="center" p={10} color={ColorsStatic.white} style={{ marginBottom: inset.bottom }}>
      <TextInput
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 20,
          padding: 10,
          marginRight: 10,
        }}
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Type a message..."
      />
      <Pressable style={styles.button}  onPress={handleSendMessage} >
      <TextApp color={ColorsStatic.white}>Send</TextApp>

      </Pressable>
    </Box>
  );
});

const styles = StyleSheet.create({
    button: {
        backgroundColor: ColorsStatic.blue10,
        padding: scaler(10),
        borderRadius: scaler(15)
    }
})
