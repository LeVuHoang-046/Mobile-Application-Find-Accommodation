import {Icons} from '@assets';
import {BottomSheetPickerAppRef} from '@component/bottom-sheet';
import {
  BottomSheetModalApp,
  BottomSheetModalAppRef,
} from '@component/BottomSheetModalApp';
import {ButtonSelectBottomSheet} from '@component/button';
import {TouchableApp} from '@component/forms';
import {Box, BoxFormTitle, Row} from '@component/layout';
import {TextApp} from '@component/typography';
import {EFocusRangeCalendar, initDatePicker} from '@constants';
import {FontSize, scaler} from '@themes';
import {ForwardRefComponent, ItemPickerDateType} from '@types';
import {formatUnixToDateString} from '@utils';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {DateData} from 'react-native-calendars';
import {MarkedDates} from 'react-native-calendars/src/types';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {useImmer} from 'use-immer';
import {CalenderApp} from '../CalenderApp';
import {BottomSheetCalenderPicker} from './BottomSheetCalenderPicker.type';
import {HeaderSheetCalenderPicker} from './HeaderSheetCalenderPicker';

export const CalenderRangePicker: ForwardRefComponent<
  BottomSheetPickerAppRef,
  BottomSheetCalenderPicker
> = forwardRef(
  (
    {
      onChange,
      keySheet,
      hideIcon,
      style,
      valueEnd,
      valueStart,
      placeholder,
      title,
      require,
      saveWhenPressCloseHeader = false,
    },
    ref,
  ) => {
    const {
      theme: {colors},
    } = useStyles(stylesheet);
    const [date, setDate] = useImmer<ItemPickerDateType>(initDatePicker);
    const [focus, setFocus] = useState<EFocusRangeCalendar>(
      EFocusRangeCalendar.From,
    );
    const modalSheetBottomApp = useRef<BottomSheetModalAppRef>(null);

    useEffect(() => {
      resetDatePicker();
    }, [valueEnd, valueStart]);

    useImperativeHandle(
      ref,
      () => ({
        open,
      }),
      [],
    );

    const resetDatePicker = () => {
      setDate({
        endDate: valueEnd,
        startDate: valueStart,
      });
    };

    const open = () => {
      modalSheetBottomApp.current?.open();
    };

    const handlePressClose = () => {
      modalSheetBottomApp.current?.close();
      resetDatePicker();
    };

    const handleRemoveValue = () => {
      onChange?.({
        startDate: null,
        endDate: null,
      });
    };

    const handlePressConfirm = () => {
      onChange?.(date);
      modalSheetBottomApp.current?.close();
    };

    const handleDayPress = (_date: DateData) => {
      if (focus === EFocusRangeCalendar.From) {
        setDate(daft => {
          daft.startDate = _date;
        });
        setFocus(EFocusRangeCalendar.To);
        return;
      }
      setDate(daft => {
        daft.endDate = _date;
      });
    };

    const handleChangeModal = (index: number) => {
      if (index === -1) {
        setFocus(EFocusRangeCalendar.From);
      }
    };
    const Label = useMemo(() => {
      if (!valueStart?.timestamp || !valueEnd?.timestamp) {
        return undefined;
      }
      return `${formatUnixToDateString(
        valueStart?.timestamp,
      )} - ${formatUnixToDateString(valueEnd?.timestamp)}`;
    }, [valueStart, valueEnd]);

    const getThemeMarked = useCallback((dateMarked?: string, tint = false) => {
      if (!dateMarked) {
        return {};
      }
      return {
        [dateMarked]: {
          color: tint ? `${colors.tint}1A` : colors.background,
          endingDay: true,
          startingDay: true,
          textColor: tint ? colors.tint : colors.gray3,
        },
      };
    }, []);

    const MarkedDates: MarkedDates = useMemo(() => {
      const isFrom = focus === EFocusRangeCalendar.From;
      return {
        ...getThemeMarked(
          date?.startDate?.dateString,
          isFrom || !date?.endDate?.dateString,
        ),
        ...getThemeMarked(date?.endDate?.dateString, !isFrom),
      };
    }, [date, focus]);

    const RangeDate = useMemo(() => {
      if (focus === EFocusRangeCalendar.From) {
        return {
          min: undefined,
          max: date.endDate?.dateString,
        };
      }
      return {
        min: date.startDate?.dateString,
        max: undefined,
      };
    }, [date, focus]);
    return (
      <>
        <ButtonSelectBottomSheet
          placeholder={placeholder}
          label={Label}
          onPress={() => {
            modalSheetBottomApp.current?.open();
          }}
          Icon={<Icons.Calendar />}
          hideIcon={hideIcon}
          style={style}
          onRemoveValue={handleRemoveValue}
          require={require}
          isHasValue={!!valueEnd || !!valueStart}
        />
        <BottomSheetModalApp
          snapPoints={[scaler(450)]}
          ref={modalSheetBottomApp}
          onChange={handleChangeModal}
          keySheet={keySheet}>
          <Box flex={1}>
            <HeaderSheetCalenderPicker
              onPressClose={handlePressClose}
              onPressConfirm={handlePressConfirm}
              title={title}
              disabled={!date?.startDate || !date?.endDate}
            />
            <Row ph={scaler(20)} columnGap={scaler(6)} mt={scaler(12)}>
              <BoxFormTitle flex={1} title="Từ ngày" require>
                <ButtonDatePick
                  label={formatUnixToDateString(date.startDate?.timestamp)}
                  isFocus={focus === EFocusRangeCalendar.From}
                  onPress={() => setFocus(EFocusRangeCalendar.From)}
                />
              </BoxFormTitle>
              <BoxFormTitle flex={1} title="Đến ngày" require>
                <ButtonDatePick
                  disabled={!date.startDate}
                  label={formatUnixToDateString(date.endDate?.timestamp)}
                  isFocus={focus === EFocusRangeCalendar.To}
                  onPress={() => setFocus(EFocusRangeCalendar.To)}
                />
              </BoxFormTitle>
            </Row>
            <CalenderApp
              onDayPress={handleDayPress}
              markedDate={MarkedDates}
              minDate={RangeDate.min}
              maxDate={RangeDate.max}
            />
          </Box>
        </BottomSheetModalApp>
      </>
    );
  },
);

type ButtonDatePickProps = {
  onPress?: () => void;
  label?: string;
  disabled?: boolean;
  isFocus: boolean;
};
const ButtonDatePick: React.FC<ButtonDatePickProps> = ({
  onPress,
  label,
  disabled,
  isFocus,
}) => {
  const {
    styles,
    theme: {colors},
  } = useStyles(stylesheet);
  return (
    <TouchableApp
      onPress={onPress}
      style={styles.button(label, isFocus)}
      disabled={disabled}>
      <Box flex={1}>
        <TextApp
          numberOfLines={1}
          size={FontSize.Font13}
          weight={400}
          color={label ? colors.text : colors.gray3}>
          {label || '__/__/__'}
        </TextApp>
      </Box>
      <Row>
        <Icons.Calendar color={isFocus ? colors.tint : colors.gray3} />
      </Row>
    </TouchableApp>
  );
};

const stylesheet = createStyleSheet(({colors}) => ({
  button: (label, isFocus) => ({
    borderRadius: scaler(5),
    borderWidth: scaler(1),
    paddingVertical: scaler(6),
    paddingHorizontal: scaler(8),
    borderColor: isFocus ? colors.tint : colors.gray4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: scaler(32),
    backgroundColor: label ? colors.white : colors.gray6,
    opacity: label ? 1 : 0.5,
  }),
}));
