import {HttpClient, HttpStatusCode} from '@/data/protocols/http';
import {NoAuthError, UnexpectedError} from '@/domain/errors';
import {FarmModel} from '@/domain/models';
import {NewFarmParams} from '@/domain/usecases';

export class RemoteNewFarm implements NewFarmParams {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<FarmModel>,
  ) {}
  checklists: FarmModel[] = [];
  async execute(body: NewFarmParams): Promise<any> {
    const response = await this.httpClient.request({
      url: this.url,
      body,
      method: 'post',
    });

    switch (response.statusCode) {
      case HttpStatusCode.success:
        return response.body;
      case HttpStatusCode.forbidden:
        throw new NoAuthError();
      default:
        throw new UnexpectedError();
    }
  }
}
