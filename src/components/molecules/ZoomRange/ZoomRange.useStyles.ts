import {useTheme} from 'react-native-elements';
import {StyleSheet} from 'react-native';

export function useStyles() {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    zoomContainer: {
      width: 150,
      bottom: 170,
      padding: 10,
      zIndex: 9999,
      borderRadius: 40,
      position: 'absolute',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#22222250',
      justifyContent: 'space-between',
    },

    zoomCount: {
      width: 35,
      padding: 5,
      borderRadius: 40,
      alignItems: 'center',
      backgroundColor: '#222',
      justifyContent: 'center',
    },
    zoomText: {
      fontSize: 12,
      color: '#fff',
      fontWeight: '600',
      fontFamily: 'Thonburi-Light',
    },

    activeZoomCount: {
      width: 55,
      padding: 10,
      alignItems: 'center',
    },
    activeTextZoomCount: {
      color: '#FFD700',
    },
  });

  return {styles, theme};
}
