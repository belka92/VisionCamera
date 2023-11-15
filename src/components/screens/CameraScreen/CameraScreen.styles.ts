import {useTheme} from 'react-native-elements';
import {Dimensions, StyleSheet} from 'react-native';

export function useStyles() {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      width: Dimensions.get('window').width,
    },

    camButton: {
      zIndex: 6,
      width: 80,
      bottom: 80,
      height: 80,
      borderWidth: 4,
      borderRadius: 40,
      alignSelf: 'center',
      borderColor: '#222',
      position: 'absolute',
    },

    videoButton: {
      left: 60,
      zIndex: 6,
      width: 80,
      bottom: 80,
      height: 80,
      borderWidth: 4,
      borderRadius: 40,
      alignSelf: 'center',
      borderColor: '#222',
      position: 'absolute',
    },

    camCircle: {
      top: 3,
      width: 65,
      height: 65,
      borderWidth: 2,
      borderRadius: 40,
      alignSelf: 'center',
      borderColor: '#fff',
      backgroundColor: '#22222290',
    },

    videoCircle: {
      top: 7,
      width: 55,
      height: 55,
      borderWidth: 2,
      borderRadius: 40,
      alignSelf: 'center',
      borderColor: '#fff',
      backgroundColor: 'red',
    },

    device: {
      right: 55,
      zIndex: 6,
      bottom: 90,
      padding: 10,
      borderWidth: 2,
      borderRadius: 40,
      borderColor: '#fff',
      position: 'absolute',
      backgroundColor: '#B2BEB520',
    },

    torch: {
      top: 45,
      left: 20,
      zIndex: 6,
      position: 'absolute',
    },

    photoContainer: {
      right: 150,
      position: 'relative',
    },

    photo: {
      width: 65,
      height: 65,
      bottom: 87,
      borderWidth: 2,
      borderRadius: 8,
      borderColor: '#fff',
      position: 'absolute',
      backgroundColor: '#000',
    },

    video: {
      width: 200,
      height: 150,
      zIndex: 2222,
      position: 'absolute',
    },

    toggleCamera: {
      bottom: 30,
      zIndex: 555,
      borderRadius: 20,
      paddingVertical: 6,
      position: 'absolute',
      paddingHorizontal: 15,
      backgroundColor: '#222',
    },

    text: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
      // fontFamily: 'Thonburi-Light',
    },
  });

  return {styles, theme};
}
