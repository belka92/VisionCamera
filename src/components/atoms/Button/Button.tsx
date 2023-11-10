import React from 'react';
import {Button as RNEButton} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {useStyles} from './Button.useStyles';

import type {ViewStyle, GestureResponderEvent} from 'react-native';
import type {ButtonProps} from 'react-native-elements';

const Button = ({
  variant = 'default',
  buttonStyle,
  titleStyle,
  type = 'solid',
  block = 'fit',
  icon,
  iconRight,
  iconPosition,
  trackingName,
  loading = false,
  disabled = false,
  onPress,
  ...props
}: IButtonProps) => {
  const {styleSets, typeStyleSet, blockStyleSet, loadingColor} = useStyles();

  const withIconStyle: ViewStyle = icon
    ? {
        [iconRight || iconPosition === 'right'
          ? 'marginRight'
          : 'marginLeft']: 8,
      }
    : {};

  const handlePress = (event: GestureResponderEvent) => {
    onPress?.(event);
  };

  return (
    <RNEButton
      {...props}
      disabled={disabled || loading}
      buttonStyle={StyleSheet.flatten([
        styleSets[variant].buttonStyle,
        typeStyleSet[type].buttonStyle,
        blockStyleSet[block].buttonStyle,
        buttonStyle,
      ])}
      disabledStyle={StyleSheet.flatten([typeStyleSet[type].disabledStyle])}
      disabledTitleStyle={StyleSheet.flatten([
        typeStyleSet[type].disabledTitleStyle,
        loading && {color: 'transparent'},
      ])}
      icon={icon}
      iconPosition={iconPosition}
      iconRight={iconRight}
      loadingProps={{
        color: loadingColor,
      }}
      titleStyle={StyleSheet.flatten([
        styleSets[variant].titleStyle,
        typeStyleSet[type].titleStyle,
        withIconStyle,
        titleStyle,
        loading && {color: 'transparent'},
      ])}
      onPress={handlePress}
    />
  );
};

export interface IButtonProps extends Omit<ButtonProps, 'type'> {
  variant?: 'default' | 'small' | 'medium';
  block?: 'fit' | 'inline';
  type?: ButtonProps['type'] | 'transparent' | 'blurred' | 'grey';
  trackingName?: string;
}

export default Button;
