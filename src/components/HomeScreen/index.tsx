import React, {FC} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const HomeScreen: FC = () => {
  const navigation = useNavigation();

  const navigateToCameraScreen = () => {
    navigation.navigate('Camera Screen' as never);
  };

  const navigateToGalleryScreen = () => {
    navigation.navigate('Gallery Screen' as never);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToCameraScreen}>
        <FontAwesome6 name="camera-retro" size={50} />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToGalleryScreen}>
        <FontAwesome6 name="image" size={50} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FACBEA'
  },
});
