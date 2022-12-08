import {HttpClient, HttpStatusCode} from '@/data/protocols/http';
import {AccessDeniedError, UnexpectedError} from '@/domain/errors';
import {FarmModel} from '@/domain/models';
import {LoadFarmList} from '@/domain/usecases';

export class RemoteLoadFarmList implements LoadFarmList {
  callsCount: number = 0;
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<FarmModel[] | undefined>,
  ) {}

  async execute(): Promise<FarmModel[] | undefined> {
    const response = await this.httpClient.request({
      method: 'get',
      url: this.url,
    });
    switch (response.statusCode) {
      case HttpStatusCode.success:
        return response.body;
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      case HttpStatusCode.noContent:
        return [];
      default:
        throw new UnexpectedError();
    }
  }
}
