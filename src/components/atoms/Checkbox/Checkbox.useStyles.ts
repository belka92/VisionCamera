import { useTheme } from 'react-native-elements';
import { StyleSheet } from 'react-native';

export function useStyles() {
	const isTablet = useIsTablet();
	const { theme } = useTheme();

    const styles = StyleSheet.create({

    });

	return { styles, isTablet, theme };
}
