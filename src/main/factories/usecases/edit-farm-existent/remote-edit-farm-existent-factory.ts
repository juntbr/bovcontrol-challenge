import {RemoteEditFarm} from '@/data/usecases';
import {makeAxiosHttpClient} from '@/main/factories/http/axios-http-client-factory';
import config from '@/../.env.json';

export const makeRemoteEditFarmExistent = (): RemoteEditFarm => {
  const url = config.API_URL;
  const axiosHttpClient = makeAxiosHttpClient();
  return new RemoteEditFarm(url, axiosHttpClient);
};
