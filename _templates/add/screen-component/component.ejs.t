---
to: src/components/screens/<%= h.changeCase.pascal(name) %>Screen/<%= h.changeCase.pascal(name) %>Screen.tsx
---
import React from 'react';
import {View, Text} from 'react-native'
import { Layout  } from '../../../ui-kit';

import { useStyles } from './<%= h.changeCase.pascal(name) %>Screen.useStyles';
import type { TScreenProps } from '../types';
import { useTheme } from 'react-native-elements';


const <%= h.changeCase.pascal(name) %>Screen = ({ navigation, route: { params } }: TScreenProps<'<%= h.changeCase.pascal(name) %>Screen'>) => {
	const { theme } = useTheme();

	return (
		<View>
			<Layout backgroundColor="transparent">
				<Text><%= h.changeCase.pascal(name) %>Screen</Text>
			</Layout>
		</View>
	);
};

export default <%= h.changeCase.pascal(name) %>Screen;