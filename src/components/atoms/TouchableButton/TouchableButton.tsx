import React, {ReactNode} from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import CustomText from '../CustomText';

const TouchableButton = ({
  onPress,
  icon,
  title,
  textStyle,
  children,
  ...props
}: ITouchableButtonProps) => {
  return (
    <TouchableOpacity {...props} onPress={onPress}>
      {icon}
      {title && <CustomText style={textStyle} text={title} />}
      {children}
    </TouchableOpacity>
  );
};

export interface ITouchableButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  title?: string | number;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
  children?: any;
}

export default TouchableButton;
