import {ValidationBuilder as Builder} from '@/validation/validators/builder';
import {ValidationComposite as Composite} from '@/validation/validators/composite';

export const makeNewFarmValidation = (): Composite => {
  return Composite.build([
    ...Builder.field('farmerName').required().min(1).build(),
    ...Builder.field('cityFromFarm').required().min(1).build(),
    ...Builder.field('milkQuantity').required().min(1).build(),
    ...Builder.field('cowQuantity').required().min(1).build(),
    ...Builder.field('farmName').required().min(1).build(),
  ]);
};
