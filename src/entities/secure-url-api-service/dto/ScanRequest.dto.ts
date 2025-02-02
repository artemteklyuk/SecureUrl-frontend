export type ScanRequestParams = {
  url: string;
  scanOptions: {
    malware: boolean;
    scams: boolean;
    gltdDomains: boolean;
  };
};

export enum SecurityLevels {
  DANGER = 'danger',
  WARNING = 'warning',
  CLEAR = 'clear',
}

export type ScanRequestResponse = {
  status: SecurityLevels;
};
