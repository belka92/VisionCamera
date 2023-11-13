import {useTheme} from 'react-native-elements';
import {StyleSheet} from 'react-native';

export function useStyles() {
  const {theme} = useTheme();

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

  return {styles, theme};
}
