import {GetStorage} from '@/data/protocols/cache/get-storage';
import {HttpClient, HttpRequest, HttpResponse} from '@/data/protocols/http';

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpClient,
  ) {}

  async request(params: HttpRequest): Promise<HttpResponse> {
    const account: any = await this.getStorage.get('account');
    if (account?.accessToken) {
      Object.assign(params, {
        headers: Object.assign(params.headers || {}, {
          'x-access-token': account?.accessToken,
        }),
      });
    }
    const response = await this.httpGetClient.request(params);
    return response;
  }
}
