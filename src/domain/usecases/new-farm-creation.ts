import {FarmModel} from '@/domain/models';

export type NewFarmParams = {
  checklists: FarmModel[];
};

export interface NewFarmCreation {
  execute(params: NewFarmParams): Promise<undefined>;
}
