export type WindowInfo = {
	origin: string
	href: string
}

class BrowserService {

	constructor() {}

	public async getActiveTabWindowInfo(): Promise<WindowInfo> {

		const [ activeTab ] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

		if (!activeTab.id) {
			throw new Error('Cannot get active tab');
		}

		const injectionResult = await chrome.scripting.executeScript({
			target: { tabId: activeTab.id },
			func: () => ({ origin: window.origin, href: window.location.href })
		});

		if (!injectionResult[0].result) {
			throw new Error('Cannot inject code');
		}
		const { origin, href } = injectionResult[0].result;

		return { origin, href };
	}
}

export const browserService = new BrowserService();