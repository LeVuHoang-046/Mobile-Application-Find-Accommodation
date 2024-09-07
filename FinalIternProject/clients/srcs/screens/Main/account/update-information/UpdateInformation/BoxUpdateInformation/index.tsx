import {Icons, Images} from '@assets';
import {
  Absolute,
  BottomSheetModalAppRef,
  BottomSheetPickerApp,
  BottomSheetPickerType,
  Box,
  ImageApp,
  InputApp,
  PageScreen,
  TouchableApp,
} from '@component';
import {CalenderPicker, CalenderRangePicker} from '@component/calender';
import {ColorsStatic, defaultUpdateInformationValue, EKeySheet} from '@constants';
import {scaler} from '@themes';
import {FormsUpdateInformation, ForwardRefComponent} from '@types';
import {forwardRef, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {useImmer} from 'use-immer';
import ImagePicker from 'react-native-image-crop-picker';

type BoxUpdateInformationProps = {
  item?: any;
};

const init = Array(3)
  .fill(0)
  .map((_, i) => ({label: `label: ${i}`, value: String(i)}));

  export const BoxUpdateInformation: ForwardRefComponent<
  BottomSheetModalAppRef,
  BoxUpdateInformationProps
> = forwardRef((item, ref) => {
  const {styles, theme} = useStyles(stylesheet);
  const {getValues, reset, control, formState, watch, setValue} =
    useFormContext<FormsUpdateInformation>();

  const [forms, setForms] = useImmer<FormsUpdateInformation>(getValues());
  const [avatarUri, setAvatarUri] = useState<string | null>(null); // State to store the selected image URI

  const handleChangeModal = (index: number) => {
    if (index === 0) {
      setForms(getValues());
    }
  };

  const handleReset = () => {
    setForms(defaultUpdateInformationValue);
  };

  const handleFind = () => {
    reset(forms);
  };

  const handleSelectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setAvatarUri(image.path);
    });
  };

  return (
    <Box color={theme.colors.white} mt={scaler(8)} p={scaler(10)} pb={scaler(20)}>
      <Box align="center">
        <TouchableApp onPress={handleSelectImage} style={styles.buttonAvatar}>
          <ImageApp
            source={avatarUri ? {uri: avatarUri} : Images.avatarDefault} 
            style={styles.image}
            resizeMode="stretch"
          />
          <Absolute bottom={0} right={scaler(2)} color={ColorsStatic.gray3} p={scaler(3)} borderRadius={scaler(10)}>

          <Icons.Camera color={ColorsStatic.white} size={18}/>
          </Absolute>
        </TouchableApp>
      </Box>

      <Box pt={scaler(20)} rowGap={scaler(20)}>
        <InputApp
          name="fullName"
          control={control}
          placeholder="Full name"
          valueText={forms.fullName}
          onChangeText={text => {
            setForms(daft => {
              daft.fullName = text;
            });
          }}
        />
        <InputApp
          name="phoneNumber"
          control={control}
          placeholder="0947506549"
          valueText={forms.phoneNumber}
          onChangeText={text => {
            setForms(daft => {
              daft.phoneNumber = text;
            });
          }}
        />
        <InputApp
          name="email"
          control={control}
          placeholder="Email"
          valueText={forms.email}
          onChangeText={text => {
            setForms(daft => {
              daft.email = text;
            });
          }}
        />
        <CalenderPicker
          timestamp={watch('dOB')}
          keySheet={EKeySheet.Calender}
          onChange={(timestamp: any) => {
            setValue('dOB', timestamp, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
          style={styles.picker(!!formState.errors.dOB)}
          title="Date of birth"
          placeholder="Date of birth"
        />
        <BottomSheetPickerType
          list={init}
          keySheet={EKeySheet.Gender}
          itemSelected={forms.gender}
          title="Gender"
          hideIcon
          onChange={item => {
            setForms(daft => {
              daft.gender = item;
            });
          }}
        />
      </Box>
    </Box>
  );
});

const stylesheet = createStyleSheet(theme => ({
  picker: isError => ({
    backgroundColor: theme.colors.white,
    borderColor: isError ? theme.colors.red2 : theme.colors.gray1,
  }),

  button: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius:scaler(50)
  },
  buttonAvatar: {
    height: scaler(82),
    width: scaler(82),
    // backgroundColor: ColorsStatic.gray5,
    borderRadius: scaler(50),
    padding: scaler(2)
  },
}));
