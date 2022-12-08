/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
import {FarmModel} from '@/domain/models';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {makeRemoteLoadFarmList} from '@/main/factories/usecases';
import {Storage} from '@/data/protocols/cache/storage';

const loadFarmList = makeRemoteLoadFarmList();
interface ContextData {
  getDataFromAsyncStorage: () => void;
  saveDataToAsyncStorage: (value: any) => void;
  editDataFromAsyncStorage: (farmId: String, editedData: FarmModel) => void;
  farmList: FarmModel[];
}

export const AsyncStorageContext = createContext<ContextData>(
  {} as ContextData,
);
interface AsyncStorageProviderProps {
  AsyncStorage: Storage;
}

export const AsyncStorageProvider: React.FC<AsyncStorageProviderProps> = ({
  children,
  AsyncStorage,
}) => {
  const [farmList, setFarmList] = useState<FarmModel[]>([]);
  useEffect(() => {
    // AsyncStorage.clear('@checklist');
    getDataFromAsyncStorage();
  }, []);

  const saveDataToAsyncStorage = async (value: FarmModel) => {
    try {
      const oldCheckList = await AsyncStorage.get('@checklist');
      if (oldCheckList) {
        const newCheckList = oldCheckList.concat(value);
        await AsyncStorage.set('@checklist', newCheckList);
        setFarmList(newCheckList);
        return newCheckList;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const initializaAsyncStorage = async (farmArray: FarmModel[]) => {
    await AsyncStorage.set('@checklist', farmArray);
    setFarmList(farmArray);
  };

  const editDataFromAsyncStorage = async (farmId: String, editedData: any) => {
    try {
      const localCheckList = await AsyncStorage.get('@checklist');
      if (localCheckList) {
        const localCheckListParsed = localCheckList;
        const newCheckList = localCheckListParsed?.map((farm: FarmModel) => {
          if (farm._id == farmId) return {...farm, ...editedData};
          return farm;
        });
        // setOfflineUpdates(offlineUpdates.push(farmId));
        const newCheckListParsed = JSON.stringify(newCheckList);
        setFarmList(newCheckList);
        return AsyncStorage.set('@checklist', newCheckListParsed);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getDataFromAsyncStorage = async (): Promise<FarmModel[] | void> => {
    try {
      const value = await AsyncStorage.get('@checklist');
      if (value) {
        const checkListFromAsyncStorage = value;
        return setFarmList(checkListFromAsyncStorage);
      }
      const farmListResponse = await loadFarmList.execute();
      if (farmListResponse) {
        return initializaAsyncStorage(farmListResponse);
      }
      return;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AsyncStorageContext.Provider
      value={{
        getDataFromAsyncStorage,
        saveDataToAsyncStorage,
        editDataFromAsyncStorage,
        farmList,
      }}>
      {children}
    </AsyncStorageContext.Provider>
  );
};

export function useAsyncStorage(): ContextData {
  const context = useContext(AsyncStorageContext);

  if (!context) {
    throw new Error('userAuth must be used within a AuthProvider');
  }
  return context;
}
