import {FarmModel} from '@/domain/models';

export interface LoadFarmList {
  execute: () => Promise<FarmModel[] | undefined>;
}
