import dayjs from 'dayjs';
import React, {forwardRef, useImperativeHandle, useMemo, useRef} from 'react';
import {HeaderCalenderPicker} from './HeaderCalenderPicker';
import { ColorsStatic, EKeySheet, ThemeCalendar } from '@constants';
import { ForwardRefComponent } from '@types';
import { Icons } from '@assets';
import { scaler } from '@themes';
import {Calendar, DateData} from 'react-native-calendars';
import {MarkedDates} from 'react-native-calendars/src/types';
import { formatUnixToDateCalender, formatUnixToDateString } from '@utils';
import { ButtonSelectBottomSheet, ButtonSelectBottomSheetProps } from '@component/button';
import { BottomSheetPickerAppRef } from '@component/bottom-sheet';
import { BottomSheetModalApp, BottomSheetModalAppRef } from '@component/BottomSheetModalApp';
import { Box } from '@component/layout';

type CalenderPickerProps = {
  onChange?: ((timestamp: number) => void) | undefined;
  title?: string;
  placeholder?: string;
  keySheet: EKeySheet;
  timestamp: number | undefined | null;
} & Pick<ButtonSelectBottomSheetProps, 'style'>;

export const CalenderPicker: ForwardRefComponent<
  BottomSheetPickerAppRef,
  CalenderPickerProps
> = forwardRef(
  (
    {title, keySheet, onChange, style, timestamp, placeholder = '__/__/__'},
    ref,
  ) => {
    const modalSheetBottomApp = useRef<BottomSheetModalAppRef>(null);

    useImperativeHandle(
      ref,
      () => ({
        open,
      }),
      [],
    );

    const open = () => {
      modalSheetBottomApp.current?.open();
    };

    const markedDates: MarkedDates | undefined = useMemo(() => {
      const calenderToday = dayjs().format('YYYY-MM-DD');
      if (!timestamp) {
        return {
          [calenderToday]: {
            textColor: ColorsStatic.tint,
          },
        };
      }
      return {
        [calenderToday]: {
          textColor: ColorsStatic.tint,
        },
        [formatUnixToDateCalender(timestamp)]: {
          color: ColorsStatic.tint,
          endingDay: true,
          startingDay: true,
          textColor: ColorsStatic.white,
        },
      };
    }, [timestamp]);

    const handleDayPress = (date: DateData) => {
      onChange?.(date?.timestamp);
      modalSheetBottomApp.current?.close();
    };

    return (
      <>
        <ButtonSelectBottomSheet
          placeholder={placeholder}
          label={formatUnixToDateString(timestamp || 0)}
          onPress={() => {
            modalSheetBottomApp.current?.open();
          }}
          Icon={Icons.Calendar}
          style={style}
        />
        <BottomSheetModalApp
          snapPoints={['50%']}
          ref={modalSheetBottomApp}
          keySheet={keySheet}>
          <Box flex={1}>
            <HeaderCalenderPicker
              title={title}
              onPress={() => modalSheetBottomApp.current?.close()}
            />
            <Box flex={1}>
              <Calendar
                onDayPress={handleDayPress}
                initialDate={undefined}
                monthFormat={'MMMM, yyyy'}
                firstDay={1}
                theme={ThemeCalendar}
                style={{
                  marginBottom: scaler(24),
                }}
                disableAllTouchEventsForDisabledDays={true}
                enableSwipeMonths={true}
                markingType={'period'}
                markedDates={markedDates}
                // onPressArrowLeft={subtractMonth => subtractMonth()}
                // onPressArrowRight={addMonth => addMonth()}
                // renderArrow={direction =>
                //   direction === 'left' ? (
                //     <Icons.ChevronRight />
                //   ) : (
                //     <Icons.ChevronRight />
                //   )
                // }
              />
            </Box>
          </Box>
        </BottomSheetModalApp>
      </>
    );
  },
);
