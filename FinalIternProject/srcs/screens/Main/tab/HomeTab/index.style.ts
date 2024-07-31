import {ColorsStatic, screenWidth} from '@constants';
import {scaler} from '@themes';
import {createStyleSheet} from 'react-native-unistyles';

export const stylesheet = createStyleSheet(theme =>({
  slide: {
    width: screenWidth,
    height: '100%',
  },
  container: {
    width: screenWidth,
    height: scaler(200),
  },
  notiIcon: {
    position: 'absolute',
    top: scaler(35),
    right: scaler(15),
  },
  AnimatesearchBarContainer: {
    backgroundColor: theme.colors.white,
    position: 'absolute',
    paddingTop: scaler(15),
    paddingBottom: scaler(7),
    right: 0,
    left: 0,
    zIndex: 999,
    opacity: 1,
  },
  animationButton:{
    zIndex: 999
  },
  // ====================MODAL STYLES================
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    height: 250,
    width: 300,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    zIndex: 1,
  },

  scrollView: {
    paddingBottom:scaler(50)
  },

  headerSearchBar:{
    borderRadius: scaler(10),
    backgroundColor: theme.colors.gray8,
    paddingVertical: scaler(9),
    paddingLeft: scaler(30),
  },
  // =============================LIST OPTION STYLE=====================
  ListOpt: {
    flex: 1,
    marginHorizontal: scaler(15),
  },
  OptionContainer: {
    alignItems: 'center',
    paddingVertical: scaler(10),
    marginVertical: scaler(5),
    backgroundColor: theme.colors.white,
    marginHorizontal: scaler(5),
    borderRadius: scaler(15),
    width: scaler(65),
    height: scaler(100),
  },
  OptionItemsContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: scaler(10),
  },
  // =============================DISTRICT BOARD STYLE=====================

  DistrictContainer: {
    backgroundColor: theme.colors.black,
    marginVertical: scaler(10),
    borderRadius: scaler(15),
    width: scaler(100),
    height: scaler(130),
    overflow:'hidden'

  },
  imageDistrict: {
    width: '100%',
    height: '100%',
  },
  // ===============================================
  LowCostBoard: {
    height: 250,
    backgroundColor: 'red',
    marginVertical: 20,
    width: screenWidth - 30,
    borderRadius: 15,
  },
}));
