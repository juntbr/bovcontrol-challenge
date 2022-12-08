import React from 'react';
import {NewFarm} from '@/presentation/screens';
import {makeRemoteNewFarmCreation} from '@/main/factories/usecases/new-farm-creation/remote-new-farm-creation-factory';

export const MakeNewFarmScreen: React.FC = () => {
  return <NewFarm newfarmcreation={makeRemoteNewFarmCreation()} />;
};
