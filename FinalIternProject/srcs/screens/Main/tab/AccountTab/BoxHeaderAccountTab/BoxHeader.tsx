import {Icons} from '@assets';
import {Absolute, AvatarUser, Box, TextApp, TouchableApp} from '@component';
import {ColorsStatic, screenWidth} from '@constants';
import {FontSize, scaler} from '@themes';
import {memo} from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';

export const BoxHeader: React.NamedExoticComponent = memo(() => {
  return (
    <>
      {/* ============= HEADER ================== */}
      <Box style={styles.header}>
        <Absolute right={15} top={15}>
          <TouchableHighlight>
            <Icons.Setting />
          </TouchableHighlight>
        </Absolute>
      </Box>
      {/* ===================== START ACCOUNT BOARD ==================== */}
      <Absolute top={scaler(145)}>
        <TouchableApp activeOpacity={1} style={styles.accountButton}>
          <Box style={styles.avatar}>
            <AvatarUser size={50} />
          </Box>
          <Box ml={scaler(10)} style={{flex: 0.85}}>
            <TextApp weight={600} size={FontSize.Font14}>
              Le Vu Hoang
            </TextApp>
            <TextApp weight={600} pt={scaler(10)}>
              0123456789
            </TextApp>
          </Box>
          <Icons.ArrowRight size={22} color={ColorsStatic.black} />
        </TouchableApp>
      </Absolute>
    </>
  );
});
const styles = StyleSheet.create({
  header: {
    backgroundColor: ColorsStatic.gray1,
    height: scaler(180),
    justifyContent: 'center', // align subHeader vertically
  },
  accountButton: {
    backgroundColor: ColorsStatic.white,
    zIndex: 100,
    borderRadius: scaler(15),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: scaler(70),
    marginHorizontal: scaler(15),
    width: screenWidth - 30,
    padding: scaler(10),
  },

  avatar: {
    width: '100%',
    height: '100%',
    flex: 0.15,
  },
});
