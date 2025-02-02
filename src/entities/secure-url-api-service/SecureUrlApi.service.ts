import {
  secureUrlApi,
  SecureUrlApiRoutes,
} from 'src/entities/secure-url-api-service/api';
import {
  ScanRequestParams,
  ScanRequestResponse,
  SecurityLevels,
} from 'src/entities/secure-url-api-service/dto/ScanRequest.dto';

export class SecureUrlApiService {
  public static async scanRequest(
    params: ScanRequestParams
  ): Promise<ScanRequestResponse> {
    const { data } = await secureUrlApi.post(
      SecureUrlApiRoutes.scanRequest,
      params
    );
    return data;
  }
}
