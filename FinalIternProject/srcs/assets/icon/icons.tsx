// CustomIcons.jsimport React from 'react';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  default as Awesome6Icon,
  default as FontAwesome6Icon,
} from 'react-native-vector-icons/FontAwesome6';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

type iconProps = {
  color?: string;
  size?: number;
};

const Home = ({size = 30, color = '#000'}: iconProps) => {
  return <IconEntypo name="home" size={size} color={color} />;
};

const Service = ({size = 30, color = '#000'}: iconProps) => {
  return <IoniconsIcon name="storefront" size={size} color={color} />;
};

const Message = ({size = 30, color = '#000'}: iconProps) => {
  return <CommunityIcon name="message-badge" size={size} color={color} />;
};

const ArrowLeft = ({size = 30, color = '#ffffff'}: iconProps) => {
  return <AntIcon name="left" size={size} color={color} />;
};

const Calendar = ({size = 24, color = '#7F8487'}: iconProps) => {
  return <CommunityIcon name="calendar" size={size} color={color} />;
};

const Search = ({size = 30, color = '#ccc'}: iconProps) => {
  return <FeatherIcon name="search" size={size} color={color} />;
};
const CalendarOutLine = ({size = 15, color = '#000'}: iconProps) => {
  return <CommunityIcon name="calendar-blank" size={size} color={color} />;
};
const HomeSearchOutLine = ({size = 50, color = '#000'}: iconProps) => {
  return <CommunityIcon name="home-search-outline" size={size} color={color} />;
};
const AccountPlus = ({size = 50, color = '#000'}: iconProps) => {
  return (
    <CommunityIcon
      name="account-multiple-plus-outline"
      size={size}
      color={color}
    />
  );
};

const Filter = ({size = 30, color = '#000'}: iconProps) => {
  return <CommunityIcon name="filter" size={size} color={color} />;
};
const Location = ({size = 30, color = 'red'}: iconProps) => {
  return <MaterialIcon name="location-pin" size={size} color={color} />;
};
const ArrowDown = ({size = 30, color = '#000'}: iconProps) => {
  return <MaterialIcon name="arrow-drop-down" size={size} color={color} />;
};
const BackLeft = ({size = 15, color = '#000'}: iconProps) => {
  return <IoniconsIcon name="arrow-back" size={size} color={color} />;
};
const ShoppingCart = ({size = 20, color = '#000'}: iconProps) => {
  return <MaterialIcon name="shopping-cart" size={size} color={color} />;
};
const Menu = ({size = 30, color = '#000'}: iconProps) => {
  return <MaterialIcon name="menu" size={size} color={color} />;
};
const Post = ({size = 15, color = '#000'}: iconProps) => {
  return <CommunityIcon name="post" size={size} color={color} />;
};
const ShoppingCartOutLine = ({size = 30, color = '#000'}: iconProps) => {
  return <CommunityIcon name="cart-variant" size={size} color={color} />;
};
const CalendarClockOutLine = ({size = 15, color = '#000'}: iconProps) => {
  return (
    <CommunityIcon name="calendar-clock-outline" size={size} color={color} />
  );
};
const CreditCart = ({size = 15, color = '#000'}: iconProps) => {
  return (
    <CommunityIcon name="credit-card-check-outline" size={size} color={color} />
  );
};
const ScriptText = ({size = 15, color = '#000'}: iconProps) => {
  return <CommunityIcon name="script-text-outline" size={size} color={color} />;
};
const HeartOutLine = ({size = 15, color = '#000'}: iconProps) => {
  return <CommunityIcon name="cards-heart-outline" size={size} color={color} />;
};
const FileLock = ({size = 15, color = '#000'}: iconProps) => {
  return <CommunityIcon name="file-lock-outline" size={size} color={color} />;
};
const AlertOutLine = ({size = 15, color = '#000'}: iconProps) => {
  return (
    <CommunityIcon name="alert-rhombus-outline" size={size} color={color} />
  );
};
const LogOut = ({size = 15, color = '#000'}: iconProps) => {
  return <CommunityIcon name="logout" size={size} color={color} />;
};
const ArrowRight = ({size = 12, color = '#000'}: iconProps) => {
  return <CommunityIcon name="chevron-right" size={size} color={color} />;
};
const Setting = ({size = 15, color = '#000'}: iconProps) => {
  return <MaterialIcon name="settings" size={size} color={color} />;
};
const HeadSet = ({size = 30, color = '#000'}: iconProps) => {
  return <CommunityIcon name="headset" size={size} color={color} />;
};
const Sync = ({size = 15, color = '#000'}: iconProps) => {
  return <MaterialIcon name="sync" size={size} color={color} />;
};
const LocationHome = ({size = 30, color = '#000'}: iconProps) => {
  return <IoniconsIcon name="location-sharp" size={size} color={color} />;
};
const Notification = ({size = 35, color = '#fff'}: iconProps) => {
  return <IoniconsIcon name="notifications" size={size} color={color} />;
};
const BookMark = ({size = 30, color = '#000'}: iconProps) => {
  return (
    <CommunityIcon name="message-bookmark-outline" size={size} color={color} />
  );
};
const AccountCircle = ({size = 30, color = '#000'}: iconProps) => {
  return <CommunityIcon name="account-circle" size={size} color={color} />;
};

const CircleX = ({size = 14, color = '#000'}: iconProps) => {
  return <IoniconsIcon name="close-circle-outline" size={size} color={color} />;
};
const Eye = ({size = 14, color = '#000'}: iconProps) => {
  return <IoniconsIcon name="eye-outline" size={size} color={color} />;
};
const EyeOff = ({size = 14, color = '#000'}: iconProps) => {
  return <IoniconsIcon name="eye-off-outline" size={size} color={color} />;
};
const X_Mark = ({size = 14, color = '#000'}: iconProps) => {
  return <Awesome6Icon name="xmark" size={size} color={color} />;
};
const Check = ({size = 14, color = '#000', opacity= 1} : iconProps & {opacity?: number}) => {
  return <FeatherIcon name="check" size={size} color={color} style={{opacity}}/>;
};
const Empty = ({size = 14, color = '#000'}: iconProps) => {
  return <MaterialIcon name="hourglass-empty" size={size} color={color} />;
};
const District = ({size = 14, color = '#000'}: iconProps) => {
  return <CommunityIcon name="home-city" size={size} color={color} />;
};
const Tower = ({size = 14, color = '#000'}: iconProps) => {
  return <CommunityIcon name="city" size={size} color={color} />;
};
const Area = ({size = 14, color = '#000'}: iconProps) => {
  return <FontistoIcon name="arrow-expand" size={size} color={color} />;
};
const UserGroup = ({size = 14, color = '#000'}: iconProps) => {
  return <FontAwesome6Icon name="user-group" size={size} color={color} />;
};
const Heart = ({size = 14, color = '#000'}: iconProps) => {
  return <AntIcon name="heart" size={size} color={color} />;
};
const Dot = ({size = 14, color = '#000'}: iconProps) => {
  return <IconEntypo name="dot-single" size={size} color={color} />;
};
const GenderFemale = ({size = 14, color = '#E90074'}: iconProps) => {
  return <SimpleIcon name="symbol-female" size={size} color={color} />;
};
const GenderMale = ({size = 14, color = '#06D001'}: iconProps) => {
  return <IoniconsIcon name="male" size={size} color={color} />;
};
const GenderMaleFemale = ({size = 14, color = '#AF47D2'}: iconProps) => {
  return <IoniconsIcon name="male-female" size={size} color={color} />;
};
const ArrowSortByDown = ({size = 14, color = '#FF0000'}: iconProps) => {
  return <AntIcon name="arrowdown" size={size} color={color} />;
};
const Adjusment = ({size = 20, color = '#000'}: iconProps) => {
  return <FontAwesome6Icon name="sliders" size={size} color={color} />;
};
const ArrowSortByUp = ({size = 14, color = '#000'}: iconProps) => {
  return <AntIcon name="arrowup" size={size} color={color} />;
};
const MoneyRange = ({size = 14, color = '#000'}: iconProps) => {
  return <FontAwesome6Icon name="sack-dollar" size={size} color={color} />;
};
const ChatBox = ({size = 14, color = '#000'}: iconProps) => {
  return <IoniconsIcon name="chatbox-ellipses" size={size} color={color} />;
};
const Stair = ({size = 14, color = '#000'}: iconProps) => {
  return <FontAwesome6Icon name="stairs" size={size} color={color} />;
};
const Phone = ({size = 14, color = '#000'}: iconProps) => {
  return <FontAwesome6Icon name="phone" size={size} color={color} />;
};

const People = ({size = 14, color = '#000'}: iconProps) => {
  return <MaterialIcon name="people-alt" size={size} color={color} />;
};

const Electric = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <MaterialIcon name="electric-bolt" size={size} color={color} />;
};

const Water = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <IoniconsIcon name="water" size={size} color={color} />;
};

const Wifi = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <FontAwesome5Icon name="wifi" size={size} color={color} />;
};

const CleanService = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="broom" size={size} color={color} />;
};

const AirConditioning = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <MaterialIcon name="air" size={size} color={color} />;
};

const Heater = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <FontAwesome6Icon name="hot-tub-person" size={size} color={color} />;
};
const KitchenShelf = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <FontAwesome6Icon name="kitchen-set" size={size} color={color} />;
};
const Fridge = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="fridge" size={size} color={color} />;
};
const Bed = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <IoniconsIcon name="bed" size={size} color={color} />;
};
const WashingMachine = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="washing-machine" size={size} color={color} />;
};
const KitchenStuff = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="silverware-spoon" size={size} color={color} />;
};
const Table = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="table-furniture" size={size} color={color} />;
};
const Lamp = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="floor-lamp" size={size} color={color} />;
};
const Tree = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <FontAwesome5Icon name="tree" size={size} color={color} />;
};
const PictureDecord = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <IoniconsIcon name="image-sharp" size={size} color={color} />;
};
const Wardrobe = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="wardrobe" size={size} color={color} />;
};
const Shoes = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="shoe-formal" size={size} color={color} />;
};
const Curtains = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="curtains" size={size} color={color} />;
};
const Fan = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="fan" size={size} color={color} />;
};
const Mirror = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="mirror" size={size} color={color} />;
};
const Sofa = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="sofa" size={size} color={color} />;
};

const Person = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="account" size={size} color={color} />;
};
const Pet = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <MaterialIcon name="pets" size={size} color={color} />;
};
const Clock = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="clock-time-four" size={size} color={color} />;
};
const FingerPrint = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="fingerprint" size={size} color={color} />;
};
const Balcony = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="balcony" size={size} color={color} />;
};

const Toilet = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <FontAwesome5Icon name="toilet" size={size} color={color} />;
};
const Pencil = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <FontAwesome5Icon name="pencil-alt" size={size} color={color} />;
};

const Email = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="email" size={size} color={color} />;
};
const ShoppingCartPlus = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="cart-plus" size={size} color={color} />;
};
const Shield = ({size = 20, color = '#EB5B00'}: iconProps) => {
  return <CommunityIcon name="shield-star-outline" size={size} color={color} />;
};
const Plus = ({size = 24, color = '#000'}: iconProps) => {
  return <AntIcon name="plus" size={size} color={color} />;
};
const ChevronDown = ({size = 16, color = '#000'}: iconProps) => {
  return <FeatherIcon name="chevron-down" size={size} color={color} />;
};

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
  District,
  Tower,
  Area,
  UserGroup,
  Heart,
  Dot,
  GenderFemale,
  GenderMale,
  GenderMaleFemale,
  ArrowSortByDown,
  Adjusment,
  ArrowSortByUp,
  MoneyRange,
  Phone,
  ChatBox,
  Stair,
  People,
  Electric,
  Water,
  Wifi,
  CleanService,
  AirConditioning,
  Heater,
  KitchenShelf,
  Fridge,
  Bed,
  WashingMachine,
  KitchenStuff,
  Table,
  Lamp,
  Tree,
  PictureDecord,
  Wardrobe,
  Shoes,
  Curtains,
  Fan,
  Mirror,
  Sofa,
  Person,
  Pet,
  Clock,
  FingerPrint,
  Balcony,
  Toilet,
  Pencil,
  Email,
  ShoppingCartPlus,
  Shield,
  Plus,
  ChevronDown,
};
