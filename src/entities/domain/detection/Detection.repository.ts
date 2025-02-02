import { Detection, SecurityLevels } from 'src/entities/domain/detection/Detection.entity';

type DetectionDto = {
	_detectedAt: string
	_id: string
	_securityLevel: SecurityLevels
	_url: string
}

export class DetectionRepository {
	public static async getAllDetections(): Promise<Detection[]> {
		const { detections } = await chrome.storage.local.get('detections') as unknown as {
			detections: DetectionDto[]
		};

		return detections.map((detectionDto) => new Detection(
			detectionDto._id,
			detectionDto._securityLevel,
			detectionDto._detectedAt,
			detectionDto._url
		));
	}

	public static async saveDetection(detection: Detection) {
		const storedDetections = await chrome.storage.local.get('detections') as unknown as {
			detections: Detection[]
		};
		const { detections } = storedDetections;
		detections.push(detection);
		chrome.storage.local.set({ detections });
	}
}