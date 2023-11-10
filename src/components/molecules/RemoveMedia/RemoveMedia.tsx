import React from 'react';
import {View} from 'react-native';
import {useStyles} from './RemoveMedia.useStyles';
import {CustomText, TouchableButton} from '../../atoms';

const RemoveMedia = ({
  handleClose,
  removeImage,
  shareMedia,
}: IRemoveMediaProps) => {
  const {styles, theme} = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <CustomText
          style={styles.question}
          text="Do you want to remove image?"
        />
        <View style={styles.buttons}>
          <TouchableButton
            onPress={handleClose}
            style={styles.button}
            title="Cancel"
            textStyle={styles.cancel}
          />
          <TouchableButton
            onPress={removeImage}
            style={styles.removeBtn}
            title="Remove"
            textStyle={styles.remove}
          />
        </View>
      </View>
      <View style={styles.wrapper}>
        <TouchableButton
          onPress={shareMedia}
          style={styles.button}
          title="Share Media"
          textStyle={styles.cancel}
        />
      </View>
    </View>
  );
};

export interface IRemoveMediaProps {
  handleClose: () => void;
  removeImage: () => void;
  shareMedia: () => void;
}
export default RemoveMedia;
