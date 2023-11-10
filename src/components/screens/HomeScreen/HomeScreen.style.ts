import { useTheme } from 'react-native-elements';
import {  StyleSheet } from 'react-native';

export function useStyles() {
	const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            gap: 50,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#FACBEA',
          },

    });

	return { styles, theme };
}
