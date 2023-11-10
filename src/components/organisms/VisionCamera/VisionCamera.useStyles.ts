import { useTheme } from 'react-native-elements';
import { Dimensions, StyleSheet } from 'react-native';

export function useStyles() {
	const { theme } = useTheme();

    const styles = StyleSheet.create({
        camera: {
            flex: 1,
            alignItems: 'center',
            width: Dimensions.get('window').width,
          },
          loading: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
    });

	return { styles, theme };
}
