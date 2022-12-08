import React from 'react';
import FarmListScreen from '@/presentation/screens/FarmList';
import {makeRemoteLoadFarmList} from '@/main/factories/usecases';

export const FarmListScreenFactory: React.FC = () => {
  return <FarmListScreen loadFarmList={makeRemoteLoadFarmList()} />;
};
