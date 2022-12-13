import {RemoteLoadFarmList} from '@/data/usecases';
import {makeAuthorizeHttpClientDecorator} from '@/main/factories/decorators';
import config from '@/../.env.json';

export const makeRemoteLoadFarmList = (): RemoteLoadFarmList => {
  const url = config.API_URL;
  return new RemoteLoadFarmList(url, makeAuthorizeHttpClientDecorator());
};
