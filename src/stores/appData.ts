import { create } from "zustand";

type AppData = {
	seasons: string[];
	programs: string[];
};

type AppDataStore = AppData & {
	setAppData: (data: AppData) => void;
};

export const useAppDataStore = create<AppDataStore>((set) => ({
	seasons: [],
	programs: [],
	setAppData: (data) => set(data),
}));
