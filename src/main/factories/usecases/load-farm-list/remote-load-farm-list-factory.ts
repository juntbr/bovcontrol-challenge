import {RemoteLoadFarmList} from '@/data/usecases';
import {makeAuthorizeHttpClientDecorator} from '@/main/factories/decorators';

export const makeRemoteLoadFarmList = (): RemoteLoadFarmList => {
  const url = 'http://challenge-front-end.bovcontrol.com/v1/checkList';
  return new RemoteLoadFarmList(url, makeAuthorizeHttpClientDecorator());
};
