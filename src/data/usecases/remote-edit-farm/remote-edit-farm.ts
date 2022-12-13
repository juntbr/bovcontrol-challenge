import {HttpClient, HttpStatusCode} from '@/data/protocols/http';
import {UnexpectedError} from '@/domain/errors';
import {
  EditFarmExistent,
  EditFarmParams,
} from '@/domain/usecases/edit-farm-existent';

export class RemoteEditFarm implements EditFarmExistent {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<void>,
  ) {}
  async execute(params: EditFarmParams): Promise<any> {
    const response = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
      body: params.checklist,
      method: 'put',
    });

    switch (response.statusCode) {
      case HttpStatusCode.success:
        return response.body;
      case HttpStatusCode.forbidden:
        throw new UnexpectedError();
      default:
        throw new UnexpectedError();
    }
  }
}
