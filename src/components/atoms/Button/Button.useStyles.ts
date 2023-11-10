import { useTheme } from 'react-native-elements';
import { StyleSheet } from 'react-native';



export const containerStyles = StyleSheet.create({
	loading: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export function useStyles() {

	const { theme } = useTheme();

	const variantStyleSet = {
		default: StyleSheet.create({
			buttonStyle: {},
			titleStyle: {},
		}),
		small: StyleSheet.create({
			buttonStyle: {
				height: 32,
				maxHeight: 32,
				minHeight: 32,
			},
			titleStyle: {
				fontFamily: 'Karla_400Regular',
				fontSize: 14,
			},
		}),
		medium: StyleSheet.create({
			buttonStyle: {
				height: 42,
				maxHeight: 42,
				minHeight: 42,
			},
			titleStyle: {
				fontFamily: 'Karla_700Bold',
				fontSize: 16,
				fontWeight: '700',
			},
		}),
		large: StyleSheet.create({
			buttonStyle: {
				height: 60,
				maxHeight: 60,
				minHeight: 60,
			},
			titleStyle: {
				fontFamily: 'Karla_700Bold',
				fontSize: 16,
			},
		}),
	};

	const typeStyleSet = {
		solid: StyleSheet.create({
			buttonStyle: {
				backgroundColor: theme.colors?.warning,
				borderColor: theme.colors?.black,
				borderWidth: 1,
				paddingHorizontal: 12,
			},
			titleStyle: {
				color: theme.colors?.black,
				fontFamily: 'Karla_400Regular',
				fontSize: 16,
			},
			disabledStyle: {
				borderColor: theme.colors?.black,
			},
			disabledTitleStyle: {},
		}),
		outline: StyleSheet.create({
			buttonStyle: {
				backgroundColor: theme.colors?.white,
				borderColor: theme.colors?.black,
				borderWidth: 1,
				paddingHorizontal: 12,
			},
			titleStyle: {
				color: theme.colors?.black,
				fontFamily: 'Karla_700Bold',
				fontWeight: 'bold',
			},
			disabledStyle: {
				backgroundColor: theme.colors?.white,
				opacity: 0.5,
			},
			disabledTitleStyle: {
				color: theme.colors?.secondary,
			},
		}),
		clear: StyleSheet.create({
			buttonStyle: {
				backgroundColor: 'transparent',
				borderBottomColor: theme.colors?.secondary,
				borderBottomWidth: 1,
				paddingBottom: 0,
				paddingHorizontal: 1,
				paddingVertical: 0,
			},
			titleStyle: {
				color: theme.colors?.secondary,
			},
			disabledStyle: {},
			disabledTitleStyle: {},
		}),
		transparent: StyleSheet.create({
			buttonStyle: {
				backgroundColor: 'transparent',
				paddingHorizontal: 0,
				paddingVertical: 4,
			},
			titleStyle: {
				color: theme.colors?.black,
			},
			disabledStyle: {
				backgroundColor: 'transparent',
			},
			disabledTitleStyle: {},
		}),
		blurred: StyleSheet.create({
			titleStyle: {
				color: theme.colors?.white,
			},
			buttonStyle: {
				backgroundColor: 'transparent',
				borderColor: 'transparent',
			},
			disabledStyle: {
				backgroundColor: 'rgba(51, 51, 51, 0.5)',
				borderColor: 'rgba(51, 51, 51, 0.5)',
			},
			disabledTitleStyle: {
				color: theme.colors?.white,
			},
		}),
		grey: StyleSheet.create({
			titleStyle: {
				color: theme.colors?.black,
				fontFamily: 'Karla_400Regular',
				fontSize: 16,
			},
			buttonStyle: {
				backgroundColor: theme.colors?.grey1,
				borderColor: theme.colors?.grey1,
			},
			disabledStyle: {
				backgroundColor: 'rgba(51, 51, 51, 0.5)',
				borderColor: 'rgba(51, 51, 51, 0.5)',
			},
			disabledTitleStyle: {
				color: theme.colors?.white,
			},
		}),
	};

	const blockStyleSet = {
		fit: StyleSheet.create({
			buttonStyle: {},
		}),
		inline: StyleSheet.create({
			buttonStyle: {
				minWidth: 60,
				width: 60,
			},
		}),
	};

	const loadingColor = theme.colors?.black;

	return { styleSets: variantStyleSet, blockStyleSet, typeStyleSet, theme, loadingColor };
}
