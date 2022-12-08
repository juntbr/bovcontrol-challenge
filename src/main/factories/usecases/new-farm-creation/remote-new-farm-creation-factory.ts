import {RemoteNewFarm} from '@/data/usecases';
import {makeAxiosHttpClient} from '@/main/factories/http/axios-http-client-factory';

export const makeRemoteNewFarmCreation = (): RemoteNewFarm => {
  const url = 'http://challenge-front-end.bovcontrol.com/v1/checkList';
  const axiosHttpClient = makeAxiosHttpClient();
  return new RemoteNewFarm(url, axiosHttpClient);
};
