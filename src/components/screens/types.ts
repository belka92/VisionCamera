import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type TAppScreens = {
  HomeScreen: undefined;
  CameraScreen: undefined;
  GalleryScreen: undefined;
};

export type TScreenProps<TScreen extends keyof TAppScreens> =
  NativeStackScreenProps<TAppScreens, TScreen>;
