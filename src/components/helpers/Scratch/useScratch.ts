import { SheetApi, useSheet } from '@hooks';

interface IUseScratch {
	configMenuSheetApi: SheetApi;
}

const useScratch = (): IUseScratch => {
	const configMenuSheetApi = useSheet();

	return {
		configMenuSheetApi
	};
};

export default useScratch;
