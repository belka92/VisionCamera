import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FC} from 'react';
import {CameraScreen, GalleryScreen, HomeScreen} from './components';

const Stack = createNativeStackNavigator();

const AppNavigator: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home Screen" component={HomeScreen} />
      <Stack.Screen name="Camera Screen" component={CameraScreen} />
      <Stack.Screen name="Gallery Screen" component={GalleryScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
