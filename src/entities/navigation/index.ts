import { create } from 'zustand/react';

export enum Pages {
	SETTINGS = 'settings',
	MAIN = 'main'
}

export type NavigationState = {
	currentPage: Pages
}

export type NavigationActions = {
	setCurrentPage: (page: Pages) => void
}

export type NavigationStore = NavigationActions & NavigationState

export const useNavigationStore = create<NavigationStore>()((set) => ({
	currentPage: Pages.MAIN,
	setCurrentPage: (page) => set({ currentPage: page })
}));