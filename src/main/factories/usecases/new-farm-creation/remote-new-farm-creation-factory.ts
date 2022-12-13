import {RemoteNewFarm} from '@/data/usecases';
import {makeAxiosHttpClient} from '@/main/factories/http/axios-http-client-factory';
import config from '@/../.env.json';

export const makeRemoteNewFarmCreation = (): RemoteNewFarm => {
  const url = config.API_URL;
  const axiosHttpClient = makeAxiosHttpClient();
  return new RemoteNewFarm(url, axiosHttpClient);
};
