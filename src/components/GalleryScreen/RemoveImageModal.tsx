import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';


type TRemoveModalProps = {
  handleClose: () => void;
  removeImage: () => void;
  shareMedia: () => void;
};

const RemoveImageModal: FC<TRemoveModalProps> = ({
  handleClose,
  removeImage,
  shareMedia,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.question}>Do you want to remove image?</Text>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={handleClose} style={styles.button}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={removeImage} style={styles.removeBtn}>
            <Text style={styles.remove}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={shareMedia} style={styles.button}>
          <Text style={styles.cancel}>Share Media</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RemoveImageModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  wrapper: {
    flex: 1,
    padding: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FACBEA',
  },
  question: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Thonburi',
  },
  buttons: {
    flex: 1,
    gap: 20,
    padding: 30,
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  removeBtn: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff',
    backgroundColor: 'red',
  },
  cancel: {
    fontSize: 16,
    color: '#4361EE',
    fontFamily: 'Thonburi-Light',
  },
  remove: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Thonburi-Light',
  },
});
