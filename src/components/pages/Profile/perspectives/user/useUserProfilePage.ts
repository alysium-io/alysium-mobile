import { SheetApi, useSheet } from '@hooks';

interface IUseUserProfilePage {
	createArtistSheetApi: SheetApi;
}

const useUserProfilePage = (): IUseUserProfilePage => {
	const createArtistSheetApi = useSheet();

	return {
		createArtistSheetApi
	};
};

export default useUserProfilePage;
