import {
  Absolute,
  Box,
  HeaderApp,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
  TextApp,
  TouchableApp,
} from '@component';
import {ColorsStatic, defaultUpdateInformationValue} from '@constants';
import {FormsUpdateInformation} from '@types';
import {FormProvider, useForm} from 'react-hook-form';
import {BoxUpdateInformation} from './BoxUpdateInformation';
import {Platform, StyleSheet} from 'react-native';
import {FontSize, scaler} from '@themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const UpdateInformationScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const forms = useForm<FormsUpdateInformation>({
    defaultValues: defaultUpdateInformationValue,
    mode: 'onChange',
  });
  const inset = useSafeAreaInsets();

  const insetButton = {
    marginBottom:
      Platform.OS === 'android' ? inset.bottom + scaler(10) : inset.bottom,
  };

  return (
    <Box flex={1}>
      <FormProvider {...forms}>
        <HeaderApp title="Update information" goBack />
        {navigateFinish ? (
          <Box flex={1} color={ColorsStatic.white}>
            <BoxUpdateInformation />
            <Absolute bottom={0} left={scaler(20)} right={scaler(20)}>
              <TouchableApp style={[styles.button, insetButton]}>
                <TextApp
                  color={ColorsStatic.white}
                  size={FontSize.Font14}
                  weight={700}
                  textAlign="center">
                  Updates
                </TextApp>
              </TouchableApp>
            </Absolute>
          </Box>
        ) : (
          <LoadingComponent />
        )}
      </FormProvider>
    </Box>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: ColorsStatic.orange5,
    paddingVertical: scaler(10),
    borderRadius: scaler(20),
  },
});

export const UpdateInformation = performanceNavigation(UpdateInformationScreen);
