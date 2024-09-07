import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
export const TouchableApp: React.FC<TouchableOpacityProps> = props => {
  return <TouchableOpacity activeOpacity={0.8} {...props} />;
};
