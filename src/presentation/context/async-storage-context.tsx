/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
import {FarmModel} from '@/domain/models';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {
  makeRemoteLoadFarmList,
  makeRemoteNewFarmCreation,
  makeRemoteEditFarmExistent,
} from '@/main/factories/usecases';
import {Storage} from '@/data/protocols/cache/storage';

const loadFarmList = makeRemoteLoadFarmList();
const newFarmCreation = makeRemoteNewFarmCreation();
const editFarmExistent = makeRemoteEditFarmExistent();
interface ContextData {
  getDataFromAsyncStorage: () => void;
  saveDataToAsyncStorage: (value: any) => void;
  editDataFromAsyncStorage: (farmId: String, editedData: FarmModel) => void;
  farmList: FarmModel[];
  syncEditedListWithRemote: () => void;
  syncCreatedListWithRemote: () => void;
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
    // AsyncStorage.clear('@checklists');
    // syncEditedListsWithRemote();
    // syncCreatedListWithRemote();
    getDataFromAsyncStorage();
  }, []);

  const saveDataToAsyncStorage = async (value: FarmModel) => {
    try {
      const oldCheckList = await AsyncStorage.get('@checklist');
      const localChecklist = await AsyncStorage.get('@createdChecklist');
      if (!localChecklist) {
        await AsyncStorage.set('@createdChecklist', [value]);
        return await addNewChecklistIntoStorage(
          oldCheckList,
          value,
          AsyncStorage,
          setFarmList,
        );
      }
      localChecklist.push(value);
      await AsyncStorage.set('@updatedLists', localChecklist);
      if (!oldCheckList) return;

      return await addNewChecklistIntoStorage(
        oldCheckList,
        value,
        AsyncStorage,
        setFarmList,
      );
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
      const localUpdatedLists = await AsyncStorage.get('@updatedLists');
      if (localUpdatedLists) {
        localUpdatedLists.push(farmId);
        await AsyncStorage.set('@updatedLists', localUpdatedLists);
        return addEditedListToLocalStorage(
          localCheckList,
          farmId,
          editedData,
          setFarmList,
          AsyncStorage,
        );
      }
      await AsyncStorage.set('@updatedLists', [farmId]);
      return await addEditedListToLocalStorage(
        localCheckList,
        farmId,
        editedData,
        setFarmList,
        AsyncStorage,
      );
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

  const syncEditedListWithRemote = async () => {
    const localCheckList = await AsyncStorage.get('@checklist');
    const localUpdatedLists = await AsyncStorage.get('@updatedLists');
    console.log({localUpdatedLists});
    if (!localUpdatedLists) return;

    const newSet = new Set(localUpdatedLists);
    const arrayWithoutRepeatingIds = Array.from(newSet);

    arrayWithoutRepeatingIds.forEach(async (id: number) => {
      const editedFarm = localCheckList.filter(
        (farm: FarmModel) => farm._id == id,
      )[0] as FarmModel;
      const editFarmFormat = {
        type: editedFarm.type,
        amount_of_milk_produced: parseInt(editedFarm.amount_of_milk_produced),
        number_of_cows_head: parseInt(editedFarm.number_of_cows_head),
        had_supervision: editedFarm.had_supervision,
        farmer: {
          name: editedFarm.farmer.name,
          city: editedFarm.farmer.city,
        },
        from: {
          name: editedFarm.from.name,
        },
        to: {
          name: editedFarm.to.name,
        },
        location: {
          latitude: -23.5,
          longitude: -46.6,
        },
        created_at: editedFarm.created_at,
        updated_at: editedFarm.updated_at,
      };
      console.log({editFarmFormat});
      try {
        await editFarmExistent.execute({id: id, checklist: editFarmFormat});
        await AsyncStorage.clear('@updatedLists');
      } catch (e) {
        console.error(e);
      }
    });
  };
  const syncCreatedListWithRemote = async () => {
    const localChecklist = await AsyncStorage.get('@createdChecklist');
    console.log({localChecklist});

    if (!localChecklist) return;

    const formatedChecklist = localChecklist.map((farm, index) => {
      const id = Math.floor(Math.random() * 100000) + 1;
      return {
        ...formatFarmObject(farm),
        id: (id + index).toString(),
      };
    });

    try {
      await newFarmCreation.execute({checklists: formatedChecklist});
      await AsyncStorage.clear('@createdChecklist');
      console.log(newCheckList);
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
        syncEditedListWithRemote,
        syncCreatedListWithRemote,
        farmList,
      }}>
      {children}
    </AsyncStorageContext.Provider>
  );
};

async function addNewChecklistIntoStorage(
  oldCheckList: any,
  value: FarmModel,
  AsyncStorage: Storage,
  setFarmList: React.Dispatch<React.SetStateAction<FarmModel[]>>,
) {
  const newCheckList = oldCheckList.concat(value);
  await AsyncStorage.set('@checklist', newCheckList);
  setFarmList(newCheckList);
  return newCheckList;
}

function addEditedListToLocalStorage(
  localCheckList: any,
  farmId: String,
  editedData: any,
  setFarmList: React.Dispatch<React.SetStateAction<FarmModel[]>>,
  AsyncStorage: Storage,
) {
  const localCheckListParsed = localCheckList;
  const newCheckList = localCheckListParsed?.map((farm: FarmModel) => {
    if (farm._id == farmId) return {...farm, ...editedData};
    return farm;
  });
  setFarmList(newCheckList);

  return AsyncStorage.set('@checklist', newCheckList);
}

const formatFarmObject = (farm: FarmModel) => {
  return {
    type: farm.type,
    amount_of_milk_produced: parseInt(farm.amount_of_milk_produced),
    number_of_cows_head: parseInt(farm.number_of_cows_head),
    had_supervision: farm.had_supervision,
    farmer: {
      name: farm.farmer.name,
      city: farm.farmer.city,
    },
    from: {
      name: farm.from.name,
    },
    to: {
      name: farm.to.name,
    },
    location: {
      latitude: -23.5,
      longitude: -46.6,
    },
    created_at: farm.created_at,
    updated_at: farm.updated_at,
  };
};

export function useAsyncStorage(): ContextData {
  const context = useContext(AsyncStorageContext);

  if (!context) {
    throw new Error(
      'Your component must be used within a UseAsyncStorage Provider',
    );
  }
  return context;
}
