---
to: src/components/molecules/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.useStyles.ts
---
import { useTheme } from 'react-native-elements';
import { StyleSheet } from 'react-native';

export function useStyles() {
	const { theme } = useTheme();

    const styles = StyleSheet.create({

    });

	return { styles, theme };
}
