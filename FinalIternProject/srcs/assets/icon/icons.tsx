// CustomIcons.jsimport React from 'react';
import IconEntypo from 'react-native-vector-icons/Entypo'; 
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type iconProps = {
  color?: string;
  size?: number;
};

export const IconHome = ({ size = 30, color = '#000' }: iconProps) => {
  return <IconEntypo name="home" size={size} color={color} />;
};

export const IconService = ({ size = 30, color = '#000' }: iconProps) => {
  return <IoniconsIcon name="storefront" size={size} color={color} />
}

export const IconMessage = ({size = 30, color = '#000'}: iconProps) => {
  return <CommunityIcon name='message-badge'size={size} color={color}/>
}

// export const IconAccount = 
