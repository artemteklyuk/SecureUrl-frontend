import dayjs from 'dayjs';
import { ConfigurationState } from 'src/entities/configuration';
import {
  Detection,
  SecurityLevels,
} from 'src/entities/domain/detection/Detection.entity';
import { DetectionRepository } from 'src/entities/domain/detection/Detection.repository';
import { UrlString } from 'src/entities/domain/sharedKernel';
import { SecureUrlApiService } from 'src/entities/secure-url-api-service';
import { v4 as uuid } from 'uuid';

export class DetectionService {
  public static createDetection(
    url: UrlString,
    securityLevel: SecurityLevels
  ): Detection {
    return new Detection(uuid(), securityLevel, dayjs().toISOString(), url);
  }

  public static async getDetection(url: string): Promise<Detection> {
    const { config } = (await chrome.storage.local.get(
      'config'
    )) as unknown as { config: ConfigurationState };

    const urlInfo = await SecureUrlApiService.scanRequest({
      url,
      scanOptions: {
        gltdDomains: config.gLTDDomains,
        malware: config.malware,
        scams: config.scams,
      },
    });
    console.log(urlInfo, 'urlInfo');

    return this.createDetection(url, urlInfo.status);
  }

  public static async getAllDetections(): Promise<Detection[]> {
    return await DetectionRepository.getAllDetections();
  }
}
