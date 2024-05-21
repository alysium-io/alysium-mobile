import { SheetApi, useSheet } from '@hooks';

interface IUseProfilePage {
	createHostSheetApi: SheetApi;
	createArtistSheetApi: SheetApi;
}

const useProfilePage = (): IUseProfilePage => {
	const createHostSheetApi = useSheet();
	const createArtistSheetApi = useSheet();

	return {
		createArtistSheetApi,
		createHostSheetApi
	};
};

export default useProfilePage;
