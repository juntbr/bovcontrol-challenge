import {HttpClient, HttpStatusCode} from '@/data/protocols/http';
import {EmailInUseError, UnexpectedError} from '@/domain/errors';
import {
  EditFarmExistent,
  EditFarmParams,
} from '@/domain/usecases/edit-farm-existent';

export class RemoteEditFarm implements EditFarmExistent {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<void>,
  ) {}
  async execute(id: EditFarmParams): Promise<any> {
    const response = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'put',
    });

    switch (response.statusCode) {
      case HttpStatusCode.success:
        return response.body;
      case HttpStatusCode.forbidden:
        throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
}
