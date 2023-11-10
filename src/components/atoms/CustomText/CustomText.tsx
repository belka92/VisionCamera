import React from 'react';
import {StyleProp, TextProps, TextStyle} from 'react-native';
import {Text} from 'react-native';

const CustomText = ({style, text}: ICustomTextProps) => {
  return <Text style={style}>{text}</Text>;
};

export interface ICustomTextProps extends TextProps {
  style: StyleProp<TextStyle>;
  text: string | number;
}

export default CustomText;
