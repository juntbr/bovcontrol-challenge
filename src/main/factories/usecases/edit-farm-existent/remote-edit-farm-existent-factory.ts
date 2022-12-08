import {RemoteEditFarm} from '@/data/usecases';
import {makeAxiosHttpClient} from '@/main/factories/http/axios-http-client-factory';

export const makeRemoteEditFarmExistent = (): RemoteEditFarm => {
  const url = 'http://challenge-front-end.bovcontrol.com/v1/checkList';
  const axiosHttpClient = makeAxiosHttpClient();
  return new RemoteEditFarm(url, axiosHttpClient);
};
