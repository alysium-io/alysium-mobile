import { SheetApi, useSheet } from '@hooks';

interface IUseProfilePage {
	createHostSheetApi: SheetApi;
	createArtistSheetApi: SheetApi;
	termsOfServiceSheetApi: SheetApi;
	privacyPolicySheetApi: SheetApi;
	aboutAlysiumSheetApi: SheetApi;
}

const useProfilePage = (): IUseProfilePage => {
	const createHostSheetApi = useSheet();
	const createArtistSheetApi = useSheet();

	const termsOfServiceSheetApi = useSheet();
	const privacyPolicySheetApi = useSheet();
	const aboutAlysiumSheetApi = useSheet();

	return {
		createArtistSheetApi,
		createHostSheetApi,
		termsOfServiceSheetApi,
		privacyPolicySheetApi,
		aboutAlysiumSheetApi
	};
};

export default useProfilePage;
