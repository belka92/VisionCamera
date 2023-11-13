---
to: src/components/screens/<%= h.changeCase.pascal(name) %>Screen/<%= h.changeCase.pascal(name) %>Screen.useStyles.ts
---
import { useTheme } from 'react-native-elements';
import { StyleSheet } from 'react-native';

export function useStyles() {
	const { theme } = useTheme();

    const styles = StyleSheet.create({

    });

	return { styles, theme };
}
