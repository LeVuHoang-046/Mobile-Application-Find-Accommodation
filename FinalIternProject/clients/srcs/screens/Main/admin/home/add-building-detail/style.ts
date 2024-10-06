import { ColorsStatic } from '@constants';
import { scaler } from '@themes';
import {createStyleSheet} from 'react-native-unistyles';


export const stylesheet = createStyleSheet({
  picker: isError => ({
    backgroundColor: ColorsStatic.white,
    borderColor: isError ? ColorsStatic.red2 : ColorsStatic.gray3,
  }),
  txtAddCalendar: {
    color: ColorsStatic.tint,
    fontWeight: '600',
  },
  buttonAddCalendar: {
    marginHorizontal: scaler(10),
    paddingVertical: scaler(6),
    paddingHorizontal: scaler(20),
    backgroundColor: ColorsStatic.blue6,
    borderRadius: scaler(6),
  },
  button: {
    flex: 1,
  },
  scrollView:{
    paddingBottom: scaler(90)
  },
  buttonImage: {
    padding: scaler(30),
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: scaler(15),
    borderWidth: 1.25,
    borderStyle: 'dashed',
    borderColor: ColorsStatic.orange3,
  },
  buttonVideo: {
    padding: scaler(30),
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: scaler(15),
    borderWidth: 1.25,
    borderStyle: 'dashed',
    borderColor: ColorsStatic.orange3,
  },
  keyboard:{
    flex:1
  },
  image: {
    width: scaler(80),
    height: scaler(80),
    borderRadius: scaler(10)
  },
  buttonDelImage: {
    position: 'absolute',
    top: scaler(0),
    right: scaler(0),
    backgroundColor: ColorsStatic.red2,
    borderRadius: scaler(20),
    padding: scaler(3),
  },
  video: {
    height: '100%',
    width: '100%',
    borderRadius: scaler(15),
    overflow:'hidden'
  },
  buttonDelVideo:{
    position: 'absolute',
    top: scaler(0),
    right: scaler(0),
    backgroundColor: ColorsStatic.red2,
    borderRadius: scaler(20),
    padding: scaler(3),
  },
  modal: {

  },
  ChooseIcon:{
    minWidth:scaler(70),
    minHeight:scaler(70), 
    justifyContent:'center',
    alignItems:'center',
    borderRadius: scaler(10),
    borderWidth: 1,
    borderColor: ColorsStatic.gray1
  }
});
