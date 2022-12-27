import React from 'react';
import {FarmDetails} from '@/presentation/screens';
import {makeNewFarmValidation} from '../new-farm/newfarm-validation-factory';

export const MakeFarmDetailsScreen: React.FC = ({route}) => {
  return <FarmDetails validation={makeNewFarmValidation()} route={route} />;
};
