import { IsoDate, UrlString, Uuid } from 'src/entities/domain/sharedKernel';

export enum SecurityLevels {
	DANGER = 'danger',
	WARNING = 'warning',
	CLEAR = 'clear'
}


export class Detection {

	constructor(
		private _id: Uuid,
		private _securityLevel: SecurityLevels,
		private _detectedAt: IsoDate,
		private _url: UrlString,
	) {}

	get id() {
		return this._id;
	}

	get securityLevel() {
		return this._securityLevel;
	}

	get detectedAt() {
		return this._detectedAt;
	}

	get url() {
		return this._url;
	}

	public isUrlSafety() {
		return this._securityLevel === SecurityLevels.CLEAR;
	}

}