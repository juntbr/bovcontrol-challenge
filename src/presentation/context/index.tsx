import React from 'react';
import {AsyncStorageProvider} from './async-storage-context';
import {
  makeLocalStorageAdapter,
  makeRemoteEditFarmExistent,
  makeRemoteLoadFarmList,
  makeRemoteNewFarmCreation,
} from '@/main/factories/usecases';

const AppProvider: React.FC = ({children}) => (
  <AsyncStorageProvider
    AsyncStorage={makeLocalStorageAdapter()}
    editFarmExistent={makeRemoteEditFarmExistent()}
    newFarmCreation={makeRemoteNewFarmCreation()}
    loadFarmList={makeRemoteLoadFarmList()}>
    {children}
  </AsyncStorageProvider>
);

export default AppProvider;
