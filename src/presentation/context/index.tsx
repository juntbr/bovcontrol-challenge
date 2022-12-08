import React from 'react';
import {AsyncStorageProvider} from './async-storage-context';
import {makeLocalStorageAdapter} from '@/main/factories/usecases';

const AppProvider: React.FC = ({children}) => (
  <AsyncStorageProvider AsyncStorage={makeLocalStorageAdapter()}>
    {children}
  </AsyncStorageProvider>
);

export default AppProvider;
