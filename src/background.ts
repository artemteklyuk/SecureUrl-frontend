import { ConfigurationFlags } from 'src/entities/domain/configuration';

console.log('background');

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    config: {
      [ConfigurationFlags.G_LTD_DOMAINS]: true,
      [ConfigurationFlags.MALWARE]: true,
      [ConfigurationFlags.SCAMS]: true,
      [ConfigurationFlags.SHOW_BLOCKS_COUNTER]: true,
    },
  });
  chrome.storage.local.set({
    detections: [],
  });
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'openNewTab') {
    const params = new URLSearchParams({
      ...request.payload,
    });
    chrome.tabs.create({
      url: `chrome-extension://${chrome.runtime.id}/warning.html?${params}`,
    });
  }
});
