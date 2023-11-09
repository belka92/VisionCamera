import {FC} from 'react';

import AppNavigator from './src/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import React from 'react';

const App: FC = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
