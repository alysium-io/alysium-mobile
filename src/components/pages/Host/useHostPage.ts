import { Host, hostApiSlice } from '@flux/api/host';
import { SheetApi, useSheet } from '@hooks';
import { ApiIdentifier } from '@types';

interface IUseHostPage {
	hostData?: Host;
	hostError: any;
	hostIsLoading: boolean;
	moreSheetApi: SheetApi;
	notificationsSheetApi: SheetApi;
	linksSheetApi: SheetApi;
	onPressFollowers: () => void;
	onPressShows: () => void;
	openLinks: () => void;
}

const useHostPage = (host_uid: ApiIdentifier): IUseHostPage => {
	const {
		data: hostData,
		isLoading: hostIsLoading,
		error: hostError
	} = hostApiSlice.useFindOneQuery({
		params: { host_uid: host_uid }
	});

	const moreSheetApi = useSheet();
	const notificationsSheetApi = useSheet();
	const linksSheetApi = useSheet();

	const onPressFollowers = () => console.log('Followers');
	const onPressShows = () => console.log('Shows');
	const openLinks = () => console.log('Links');

	return {
		moreSheetApi,
		notificationsSheetApi,
		linksSheetApi,
		onPressFollowers,
		onPressShows,
		openLinks,
		hostData,
		hostError,
		hostIsLoading
	};
};

export default useHostPage;
