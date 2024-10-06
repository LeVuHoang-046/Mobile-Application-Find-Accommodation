export enum EManaServiceOrderTab {
  WaitConfirm = 'Wait confirm',
  Delivering = 'Delivering',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

export enum EKeySheet {
  Time = 'time',
  Name = 'name',
  Code = 'code',
  MonthYear = 'month_year',
  Calender = 'calender',
  Root = 'root',
  Price = 'price',
  SortBy = 'sort_by',
  Area = 'area',
  RoomType = 'room_type',
  PostType = 'post_type',
  AmentitiesType = 'amentities_type',
  Interior = 'interior',
  Gender = 'gender',
  Facilities = 'facilities',
  FeeBase = 'fee_base',
  IconService = 'icon_service',
}

export enum ESort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum EStorage {
  ReactQueryCache = 'ReactQueryCache',
}

export enum StatusQueryType {
  LOADING = 'LOADING',
  NOT_STARTED = 'NOT_STARTED',
  SUCCESS = 200,
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN = 'UNKNOWN',
  MULTIPLE_DEVICES = 406,
  REQUEST_TIME_OUT = 'REQUEST_TIME_OUT',
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  SERVER_UNAVAILABLE = 'SERVER_UNAVAILABLE',
}
