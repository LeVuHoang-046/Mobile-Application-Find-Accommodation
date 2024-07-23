// CustomIcons.jsimport React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Awesome6Icon from 'react-native-vector-icons/FontAwesome6';
type iconProps = {
  color?: string;
  size?: number;
};

const Home = ({ size = 30, color = '#000' }: iconProps) => {
  return <IconEntypo name="home" size={size} color={color} />;
};

const Service = ({ size = 30, color = '#000' }: iconProps) => {
  return <IoniconsIcon name="storefront" size={size} color={color} />
}

const Message = ({ size = 30, color = '#000' }: iconProps) => {
  return <CommunityIcon name='message-badge' size={size} color={color} />
}

const ArrowLeft = ({ size = 30, color = '#ffffff' }: iconProps) => {
  return <AntIcon name='left' size={size} color={color} />
}

const Calendar = ({ size = 24, color = '#7F8487' }: iconProps) => {
  return <CommunityIcon name="calendar" size={size} color={color} />
}

const Search = ({ size = 30, color = '#ccc' }: iconProps) => {
  return <FeatherIcon name="search" size={size} color={color} />
}
const CalendarOutLine = ({ size = 15, color = '#000' }: iconProps) => {
  return <CommunityIcon name="calendar-blank" size={size} color={color} />
}
const HomeSearchOutLine = ({ size = 50, color = '#000' }: iconProps) => {
  return <CommunityIcon name="home-search-outline" size={size} color={color} />
}
const AccountPlus = ({ size = 50, color = '#000' }: iconProps) => {
  return <CommunityIcon name="account-multiple-plus-outline" size={size} color={color} />
}

const Filter = ({ size = 30, color = '#000' }: iconProps) => {
  return <CommunityIcon name="filter" size={size} color={color} />
}
const Location = ({ size = 30, color = 'red' }: iconProps) => {
  return <MaterialIcon name="location-pin" size={size} color={color} />
}
const ArrowDown = ({ size = 30, color = '#000' }: iconProps) => {
  return <MaterialIcon name="arrow-drop-down" size={size} color={color} />
}
const BackLeft = ({ size = 15, color = '#000' }: iconProps) => {
  return <IoniconsIcon name="arrow-back" size={size} color={color} />
}
const ShoppingCart = ({ size = 30, color = '#000' }: iconProps) => {
  return <MaterialIcon name="shopping-cart" size={size} color={color} />
}
const Menu = ({ size = 30, color = '#000' }: iconProps) => {
  return <MaterialIcon name="menu" size={size} color={color} />
}
const Post = ({ size = 15, color = '#000' }: iconProps) => {
  return <CommunityIcon name="post" size={size} color={color} />
}
const ShoppingCartOutLine = ({ size = 30, color = '#000' }: iconProps) => {
  return <CommunityIcon name="cart-variant" size={size} color={color} />
}
const CalendarClockOutLine = ({ size = 15, color = '#000' }: iconProps) => {
  return <CommunityIcon name="calendar-clock-outline" size={size} color={color} />
}
const CreditCart = ({ size = 15, color = '#000' }: iconProps) => {
  return <CommunityIcon name="credit-card-check-outline" size={size} color={color} />
}
const ScriptText = ({ size = 15, color = '#000' }: iconProps) => {
  return <CommunityIcon name="script-text-outline" size={size} color={color} />
}
const HeartOutLine = ({ size = 15, color = '#000' }: iconProps) => {
  return <CommunityIcon name="cards-heart-outline" size={size} color={color} />
}
const FileLock = ({ size = 15, color = '#000' }: iconProps) => {
  return <CommunityIcon name="file-lock-outline" size={size} color={color} />
}
const AlertOutLine = ({ size = 15, color = '#000' }: iconProps) => {
  return <CommunityIcon name="alert-rhombus-outline" size={size} color={color} />
}
const LogOut = ({ size = 15, color = '#000' }: iconProps) => {
  return <CommunityIcon name="logout" size={size} color={color} />
}
const ArrowRight = ({ size = 12, color = '#000' }: iconProps) => {
  return <CommunityIcon name="chevron-right" size={size} color={color} />
}
const Setting = ({ size = 15, color = '#000' }: iconProps) => {
  return <MaterialIcon name="settings" size={size} color={color} />
}
const HeadSet = ({ size = 30, color = '#000' }: iconProps) => {
  return <CommunityIcon name="headset" size={size} color={color} />
}
const Sync = ({ size = 15, color = '#000' }: iconProps) => {
  return <MaterialIcon name="sync" size={size} color={color} />
}
const LocationHome = ({ size = 30, color = '#000' }: iconProps) => {
  return <IoniconsIcon name="location-sharp" size={size} color={color} />
}
const Notification = ({ size = 35, color = '#fff' }: iconProps) => {
  return <IoniconsIcon name="notifications" size={size} color={color} />
}
const BookMark = ({ size = 30, color = '#000' }: iconProps) => {
  return <CommunityIcon name='message-bookmark-outline' size={size} color={color} />
}
const AccountCircle = ({ size = 30, color = '#000' }: iconProps) => {
  return <CommunityIcon name='account-circle' size={size} color={color} />
}

const CircleX = ({ size = 14, color = '#000' }: iconProps) => {
  return <IoniconsIcon name='close-circle-outline' size={size} color={color} />
}
const Eye = ({ size = 14, color = '#000' }: iconProps) => {
  return <IoniconsIcon name='eye-outline' size={size} color={color} />
}
const EyeOff = ({ size = 14, color = '#000' }: iconProps) => {
  return <IoniconsIcon name='eye-off-outline' size={size} color={color} />
}
const X_Mark = ({ size = 14, color = '#000' }: iconProps) => {
  return <Awesome6Icon name='xmark' size={size} color={color} />
}
const Check = ({ size = 14, color = '#000' }: iconProps) => {
  return <FeatherIcon name='check' size={size} color={color} />
}
const Empty = ({ size = 14, color = '#000' }: iconProps) => {
  return <MaterialIcon name='hourglass-empty' size={size} color={color} />
}

export const Icons = {
  Home,
  Service,
  Message,
  ArrowLeft,
  Calendar,
  Search,
  CalendarOutLine,
  HomeSearchOutLine,
  AccountPlus,
  Filter,
  Location,
  ArrowDown,
  BackLeft,
  ShoppingCart,
  Menu,
  Post,
  ShoppingCartOutLine,
  CalendarClockOutLine,
  CreditCart,
  ScriptText,
  HeartOutLine,
  FileLock,
  AlertOutLine,
  LogOut,
  ArrowRight,
  Setting,
  HeadSet,
  LocationHome,
  Notification,
  BookMark,
  AccountCircle,
  Sync,
  CircleX,
  Eye,
  EyeOff,
  X_Mark,
  Check,
  Empty,
}

