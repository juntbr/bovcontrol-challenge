import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  FarmListScreenFactory,
  MakeNewFarmScreen,
} from '@/main/factories/screens';
import {FarmDetails} from '@/presentation/screens/FarmDetails';

const {Navigator, Screen} = createNativeStackNavigator();

export const AppStack: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="FarmList" component={FarmListScreenFactory} />
      <Screen name="NewFarm" component={MakeNewFarmScreen} />
      <Screen name="FarmDetails" component={FarmDetails} />
    </Navigator>
  );
};
