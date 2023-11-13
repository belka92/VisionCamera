import {useTheme} from 'react-native-elements';
import {StyleSheet} from 'react-native';

export function useStyles() {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FACBEA',
    },
    photos: {flex: 1, marginTop: 50},

    modal: {
      flex: 1,
      top: 20,
      alignItems: 'center',
      backgroundColor: '#222',
      justifyContent: 'center',
    },
    modalChildren: {
      top: 50,
      position: 'relative',
    },

    photo: {
      margin: 1,
      width: 100,
      height: 100,
      backgroundColor: '#000',
    },
    home: {
      flex: 1,
      top: 50,
      paddingHorizontal: 20,
    },
    buttons: {
      gap: 15,
      top: 40,
      paddingVertical: 20,
      flexDirection: 'row',
      paddingHorizontal: 20,
    },
  });

  return {styles, theme};
}
