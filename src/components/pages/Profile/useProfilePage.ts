import { SheetApi, useSheet } from '@hooks';

interface IUseProfilePage {
	createArtistSheetApi: SheetApi;
	termsOfServiceSheetApi: SheetApi;
	privacyPolicySheetApi: SheetApi;
	aboutAlysiumSheetApi: SheetApi;
}

const useProfilePage = (): IUseProfilePage => {
	const createArtistSheetApi = useSheet();

	const termsOfServiceSheetApi = useSheet();
	const privacyPolicySheetApi = useSheet();
	const aboutAlysiumSheetApi = useSheet();

	return {
		createArtistSheetApi,
		termsOfServiceSheetApi,
		privacyPolicySheetApi,
		aboutAlysiumSheetApi
	};
};

export default useProfilePage;
