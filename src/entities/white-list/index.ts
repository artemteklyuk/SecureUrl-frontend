import { Url } from 'src/entities/domain/sharedKernel';
import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';

export type WhiteListState = {
	hosts: Url[]
}

export type WhiteListActions = {
	addHost: (host: Url) => void
	removeHost: (host: Url) => void
}

export type WhiteListStore = WhiteListState & WhiteListActions

export const useWhiteListStore = create<WhiteListStore>()(persist(
	(set) => ({
		hosts: [],
		addHost: host => set(({ hosts }) => ({ hosts: [ ...hosts, host ] })),
		removeHost: host => set(({ hosts }) => ({ hosts: hosts.filter(currentHost => currentHost === host) }))
	}),
	{ name: 'white-list' }
));

