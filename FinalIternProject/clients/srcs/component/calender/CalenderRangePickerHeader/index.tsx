import {Icons} from '@assets';
import {BottomSheetPickerAppRef} from '@component/bottom-sheet';
import {
  BottomSheetModalApp,
  BottomSheetModalAppRef,
} from '@component/BottomSheetModalApp';
import {Box} from '@component/layout';
import {ColorsStatic, ThemeCalendar} from '@constants';
import {scaler} from '@themes';
import {ForwardRefComponent} from '@types';
import {
  formatUnixToDateString,
  getPeriodCalendarRange,
  isEmptyObject,
} from '@utils';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Calendar, DateData} from 'react-native-calendars';
import {MarkedDates} from 'react-native-calendars/src/types';
import {ButtonSelectBottomSheet} from '@component/button';
import {HeaderSheetCalenderPicker} from './HeaderSheetCalenderPicker';
import { BottomSheetCalenderPicker } from './BottomSheetCalenderPicker.type';

export const CalenderRangePickerHeader: ForwardRefComponent<
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
      saveWhenPressCloseHeader = false,
    },
    ref,
  ) => {
    const modalSheetBottomApp = useRef<BottomSheetModalAppRef>(null);

    const start = useRef<DateData | null>(valueStart);
    const end = useRef<DateData | null>(valueEnd);
    const period = useRef<MarkedDates>({});

    const [_, setForceRender] = useState<boolean>(false);

    useEffect(() => {
      if (valueStart && valueEnd) {
        start.current = valueStart;
        end.current = valueEnd;
        const periods = getPeriodCalendarRange(
          valueStart?.timestamp,
          valueEnd?.timestamp,
        );
        period.current = periods;
        setForceRender(prev => !prev);
      }
    }, [valueStart, valueEnd]);

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

    const handlePressClose = () => {
      modalSheetBottomApp.current?.close();
      if (saveWhenPressCloseHeader) {
        return;
      }

      end.current = null;
      start.current = null;
      period.current = {};

      onChange?.({
        startDate: null,
        endDate: null,
      });

      // Re-render calendar
      setForceRender(prev => !prev);
    };

    const handlePressConfirm = () => {
      modalSheetBottomApp.current?.close();

      onChange?.({
        startDate: start.current,
        endDate: end.current,
      });
    };

    const setDay = useCallback((dayObj: DateData) => {
      const {dateString, day, month, year} = dayObj;
      // Convert to local 12:00 AM
      const timestamp = new Date(year, month - 1, day).getTime();
      const newDayObj = {...dayObj, timestamp};

      // Check if start is empty or if both start and end are already set
      const startIsEmpty = isEmptyObject(start.current);
      if (startIsEmpty || (!startIsEmpty && !isEmptyObject(end.current))) {
        const periods: MarkedDates = {
          [dateString]: {
            color: ColorsStatic.gray1,
            endingDay: true,
            startingDay: true,
            textColor: ColorsStatic.blue4,
          },
        };
        start.current = newDayObj;
        period.current = periods;
        end.current = null;
      } else {
        // If end date is older than start date, switch them
        const savedTimestamp = start.current!.timestamp!;
        if (savedTimestamp >= timestamp) {
          const periods = getPeriodCalendarRange(timestamp, savedTimestamp);
          end.current = start.current;
          start.current = newDayObj;
          period.current = periods;
        } else if (savedTimestamp < timestamp) {
          const periods = getPeriodCalendarRange(savedTimestamp, timestamp);
          end.current = newDayObj;
          period.current = periods;
        }
      }
      // Re-render calendar
      setForceRender(prev => !prev);
    }, []);

    const renderLabel = useMemo(() => {
      const startDate = formatUnixToDateString(start.current?.timestamp);
      const endDate = formatUnixToDateString(end.current?.timestamp);
      if (!!start.current && !!end.current && !!valueEnd && !!valueStart) {
        return `${startDate} - ${endDate}`;
      }
      if (start.current && valueStart) {
        return `${startDate}`;
      }
      return placeholder;
    }, [valueEnd, valueStart, start.current, end.current]);

    return (
      <>
        <ButtonSelectBottomSheet
          placeholder={placeholder}
          label={renderLabel}
          onPress={() => modalSheetBottomApp.current?.open()}
          Icon={<Icons.Calendar />}
          hideIcon={hideIcon}
          style={style}
        />
        <BottomSheetModalApp
          snapPoints={['50%']}
          ref={modalSheetBottomApp}
          keySheet={keySheet}>
          <Box flex={1}>
            <HeaderSheetCalenderPicker
              onPressClose={handlePressClose}
              onPressConfirm={handlePressConfirm}
              title={title}
            />
            <Box flex={1}>
              <Calendar
                onDayPress={setDay}
                monthFormat={'MMMM yyyy'}
                firstDay={1}
                onPressArrowLeft={(subtractMonth: any) => subtractMonth()}
                onPressArrowRight={(addMonth:any) => addMonth()}
                disableAllTouchEventsForDisabledDays={true}
                enableSwipeMonths={true}
                markingType={'period'}
                markedDates={period.current}
                renderArrow={(direction: any) =>
                  direction === 'left' ? (
                    <Icons.ArrowLeft />
                  ) : (
                    <Icons.ArrowRight />
                  )
                }
                theme={ThemeCalendar}
                style={{
                  marginBottom: scaler(24),
                }}
              />
            </Box>
          </Box>
        </BottomSheetModalApp>
      </>
    );
  },
);
