import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './AppStack';

export const Navigator: React.FC = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};
