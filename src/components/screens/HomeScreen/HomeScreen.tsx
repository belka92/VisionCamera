import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {TouchableButton} from '../../atoms';
import {useStyles} from './HomeScreen.style';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {styles} = useStyles();

  const navigateToCameraScreen = () => {
    navigation.navigate('Camera Screen' as never);
  };

  const navigateToGalleryScreen = () => {
    navigation.navigate('Gallery Screen' as never);
  };

  return (
    <View style={styles.container}>
      <TouchableButton
        onPress={navigateToCameraScreen}
        icon={<FontAwesome6 name="camera-retro" size={50} />}
      />
      <TouchableButton
        onPress={navigateToGalleryScreen}
        icon={<FontAwesome6 name="image" size={50} />}
      />
    </View>
  );
};

export default HomeScreen;
