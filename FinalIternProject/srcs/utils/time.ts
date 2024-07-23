import { ColorsStatic, EFormatDayJS, ONE_DAY_MILLISECONDS } from '@constants';
import { ItemPickerDateType } from '@types';
import dayjs from 'dayjs';
import {DateData, MarkedDates} from 'react-native-calendars/src/types';
import { capitalizeFirstLetter } from './common';


export const formatUnixToDateString = (
  timestamp: number | undefined,
  format = EFormatDayJS.DateSlashDMY,
): string => {
  if (!timestamp) {
    return '';
  }
  return format === EFormatDayJS.DateFull
    ? capitalizeFirstLetter(dayjs(timestamp).format(format))
    : dayjs(timestamp).format(format);
};

export const isTodayInRange = (startUnix: number, endUnix: number): boolean => {
  if (!startUnix || !endUnix) {
    return false;
  }
  const today = dayjs();
  const startDate = dayjs(startUnix);
  const endDate = dayjs(endUnix);

  return today.isAfter(startDate) && today.isBefore(endDate);
};

export const formatStringToYearAndMonth = (dateString: string): string => {
  const date = dayjs(dateString, 'YYYYMM');
  return date.format('YYYY-MM');
};

export const formatUnixToDateCalender = (
  timestamp: number | undefined | null,
) => {
  if (!timestamp) {
    return '';
  }
  return dayjs(timestamp).format(EFormatDayJS.DateDashYMD);
};

export const formatTimeDateToDate = (
  startTimestamp?: number,
  endTimestamp?: number,
): string => {
  if (startTimestamp === undefined) {
    return '';
  }

  const formattedStartDate = dayjs(startTimestamp).format(
    EFormatDayJS.DateSlashDMY,
  );

  if (endTimestamp !== undefined) {
    const formattedEndDate = dayjs(endTimestamp).format(
      EFormatDayJS.DateSlashDMY,
    );
    return `${formattedStartDate} - ${formattedEndDate}`;
  }

  return formattedStartDate;
};

export const getPeriodCalendarRange = (
  startTimestamp: number,
  endTimestamp: number,
): MarkedDates => {
  const periods: MarkedDates = {};
  if (startTimestamp === endTimestamp) {
    return {
      [formatUnixToDateCalender(startTimestamp)]: {
        color: ColorsStatic.gray1,
        textColor: ColorsStatic.blue4,
        startingDay: true,
        endingDay: true,
      },
    };
  }
  let currentTimestamp = startTimestamp;
  while (currentTimestamp < endTimestamp) {
    const isStartTime = currentTimestamp === startTimestamp;
    const dateString = formatUnixToDateCalender(currentTimestamp);
    periods[dateString] = {
      color: isStartTime ? ColorsStatic.gray1 : ColorsStatic.background,
      startingDay: isStartTime,
      textColor: isStartTime ? ColorsStatic.blue4 : ColorsStatic.blue4,
    };
    currentTimestamp += ONE_DAY_MILLISECONDS; // Move to the next day
  }
  const dateString = formatUnixToDateCalender(endTimestamp);
  periods[dateString] = {
    color: ColorsStatic.gray1,
    endingDay: true,
    textColor: ColorsStatic.blue4,
  };
  return periods;
};

export const getMonthStartEndCurrent = (): ItemPickerDateType => {
  const startOfMonth = dayjs().startOf('month');
  const endOfMonth = dayjs().endOf('month');

  const startDate: DateData = {
    year: startOfMonth.year(),
    month: startOfMonth.month() + 1,
    day: startOfMonth.date(),
    timestamp: startOfMonth.valueOf(),
    dateString: startOfMonth.format('YYYY-MM-DD'),
  };

  const endDate: DateData = {
    year: endOfMonth.year(),
    month: endOfMonth.month() + 1,
    day: endOfMonth.date(),
    timestamp: endOfMonth.valueOf(),
    dateString: endOfMonth.format('YYYY-MM-DD'),
  };

  return {startDate, endDate};
};
