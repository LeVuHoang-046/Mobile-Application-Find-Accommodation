import {Icons} from '@assets';
import {HeaderSheetPicker} from '@component/bottom-sheet/BottomSheetPickerMultilineApp/HeaderSheetPicker';
import {
  BottomSheetModalApp,
  BottomSheetModalAppRef,
} from '@component/BottomSheetModalApp';
import {TouchableApp, TouchableIconApp} from '@component/forms';
import {Absolute, Box, Row} from '@component/layout';
import {TextApp} from '@component/typography';
import {
  ColorsStatic,
  EKeySheet,
  HEIGHT_ITEM_PICKER,
  MONTHS,
  ThemeCalendar,
} from '@constants';
import {FontSize, scaler} from '@themes';
import {capitalizeFirstLetter} from '@utils';
import dayjs from 'dayjs';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Calendar, DateData} from 'react-native-calendars';
import {MarkedDates} from 'react-native-calendars/src/types';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {ListPicker} from './ListApp';

type CalenderAppProps = {
  onDayPress?: (date: DateData) => void;
  markedDate?: MarkedDates;
  minDate?: string;
  maxDate?: string;
};

export const CalenderApp: React.FC<CalenderAppProps> = ({
  onDayPress,
  markedDate,
  minDate,
  maxDate,
}) => {
  const {styles, theme} = useStyles(stylesheet);

  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format('YYYY-MM-DD'),
  );

  const [indexMonth, setIndexMonth] = useState<number>(0);
  const [indexYear, setIndexYear] = useState<number>(0);

  const modalSheetBottomApp = useRef<BottomSheetModalAppRef>(null);

  const YEARS = useMemo(() => {
    const currentYear = dayjs().year();
    return Array.from({length: 20 * 2 + 1}, (_, i) => {
      const _year = (currentYear - 20 + i).toString();
      return {
        label: _year,
        value: _year,
      };
    });
  }, []);

  const markedDates: MarkedDates | undefined = useMemo(() => {
    const calenderToday = dayjs().format('YYYY-MM-DD');
    return {
      [calenderToday]: {
        textColor: ColorsStatic.tint,
      },
      ...(markedDate || {}),
    };
  }, [markedDate]);

  useEffect(() => {
    initDatePickMonthYear();
  }, [selectedDate]);

  const initDatePickMonthYear = () => {
    const date = dayjs(selectedDate);
    const _year = date.year();
    const indexYearFocus = YEARS.findIndex(_ => _.value === _year.toString());
    const _month = date.month();
    setIndexYear(indexYearFocus);
    setIndexMonth(_month);
  };

  const changeMonth = (direction: number) => {
    const newDate = dayjs(selectedDate)
      .add(direction, 'month')
      .format('YYYY-MM-DD');
    setSelectedDate(newDate);
  };

  const handleCloseModal = () => {
    initDatePickMonthYear();
    modalSheetBottomApp.current?.close();
  };

  const handleConfirmModal = () => {
    const _month = MONTHS[indexMonth]?.value;
    const _year = YEARS[indexYear]?.value;
    const newDate = `${_year}-${_month}-01`;
    modalSheetBottomApp.current?.close();
    setSelectedDate(newDate);
  };

  const renderHeader = useCallback((date: any) => {
    return (
      <Row width={'100%'} justify="space-between" pl={scaler(8)}>
        <TouchableIconApp
          onPress={() => modalSheetBottomApp.current?.open()}
          IconRight={<Icons.ArrowDown size={20} />}
          weightText={700}
          styleText={{color: ColorsStatic.blue4}}
          title={capitalizeFirstLetter(dayjs(date).format('MMMM, YYYY'))}
        />
        <Row>
          <TouchableApp
            style={styles.buttonArrow}
            onPress={() => changeMonth(-1)}>
            <Icons.ArrowLeft />
          </TouchableApp>
          <TouchableApp
            style={styles.buttonArrow}
            onPress={() => changeMonth(1)}>
            <Icons.ArrowRight size={20} />
          </TouchableApp>
        </Row>
      </Row>
    );
  }, []);

  return (
    <Box flex={1}>
      <Calendar
        onDayPress={onDayPress}
        current={selectedDate}
        key={selectedDate}
        firstDay={1}
        style={{
          marginBottom: scaler(24),
        }}
        disableAllTouchEventsForDisabledDays={true}
        markingType={'period'}
        hideArrows={true}
        renderHeader={renderHeader}
        theme={ThemeCalendar}
        markedDates={markedDates}
        minDate={minDate}
        maxDate={maxDate}
      />
      <BottomSheetModalApp
        snapPoints={[5 * HEIGHT_ITEM_PICKER + scaler(180)]}
        ref={modalSheetBottomApp}
        keySheet={EKeySheet.MonthYear}>
        <Box flex={1}>
          <HeaderSheetPicker
            title={'Chọn tháng năm'}
            onPressClose={handleCloseModal}
            onPressConfirm={handleConfirmModal}
          />
          <Row mv={scaler(20)}>
            <Box flex={1} ph={scaler(20)}>
              <TextApp
                weight={700}
                color={theme.colors.blue4}
                size={FontSize.Font15}>
                Tháng
              </TextApp>
            </Box>
            <Box flex={1} ph={scaler(20)}>
              <TextApp
                weight={700}
                color={theme.colors.blue4}
                size={FontSize.Font15}>
                Năm
              </TextApp>
            </Box>
          </Row>
          <Box flexDirection="row" height={HEIGHT_ITEM_PICKER * 5}>
            <Absolute
              width={'100%'}
              height={HEIGHT_ITEM_PICKER}
              top={HEIGHT_ITEM_PICKER * 2}
              left={scaler(5)}
              right={scaler(5)}
              color={`${theme.colors.tint}11`}
              borderRadius={scaler(8)}
            />

            <ListPicker
              data={MONTHS}
              indexSelect={indexMonth}
              onSelect={index => setIndexMonth(index)}
              keyList="month"
            />
            <ListPicker
              data={YEARS}
              indexSelect={indexYear}
              onSelect={index => setIndexYear(index)}
              keyList="year"
            />
          </Box>
        </Box>
      </BottomSheetModalApp>
    </Box>
  );
};

const stylesheet = createStyleSheet({
  buttonArrow: {
    padding: scaler(10),
  },
});
