import { ConfigurationFlags } from 'src/entities/domain/configuration';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { create } from 'zustand/react';


export type ConfigurationState = {
	[key in ConfigurationFlags]: boolean
}

export type ConfigurationActions = {
	toggleConfig: (flagName: ConfigurationFlags) => void
	syncConfig: (config: ConfigurationState) => void
}

export type ConfigurationStore = ConfigurationState & ConfigurationActions

export const useConfigurationStore = create<ConfigurationStore>()(subscribeWithSelector(persist(
	(set) => ({
		[ConfigurationFlags.G_LTD_DOMAINS]: true,
		[ConfigurationFlags.MALWARE]: true,
		[ConfigurationFlags.SCAMS]: true,
		[ConfigurationFlags.SHOW_BLOCKS_COUNTER]: true,
		toggleConfig: (flagName) => set((state) => ({ [flagName]: !state[flagName] })),
		syncConfig: ({
			showBlocksCounter,
			scams,
			malware,
			gLTDDomains
		}) => set(() => ({ showBlocksCounter, scams, malware, gLTDDomains }))
	}),
	{ name: 'configuration-store', }
)));


export const syncWithChromeStorage = (): void => {

	chrome.storage.local.get([ 'config' ], (result) => {
		if ('config' in result) {
			const { scams, malware, gLTDDomains, showBlocksCounter } = result.config;
			useConfigurationStore.getState().syncConfig({ scams, malware, gLTDDomains, showBlocksCounter });
		}
	});
	useConfigurationStore.subscribe(
		(state) => ({
			gLTDDomains: state.gLTDDomains,
			scams: state.scams,
			malware: state.malware,
			showBlocksCounter: state.showBlocksCounter
		}),
		({ scams, gLTDDomains, showBlocksCounter, malware }) => {
			chrome.storage.local.set({ config: { gLTDDomains, scams, showBlocksCounter, malware } });
		}
	);

	chrome.storage.onChanged.addListener((changes) => {
		if (changes.config && changes.config.newValue !== undefined) {
			useConfigurationStore.getState().syncConfig(changes.config.newValue);
		}
	});

};