import { tagApiSlice } from '@flux/api/tag';
import { FindOneTagResponseDto } from '@flux/api/tag/dto/tag-find-one.dto';
import { SheetApi, useSheet } from '@hooks';
import { ApiIdentifier } from '@types';

interface IUseTagPage {
	tagData?: FindOneTagResponseDto;
	isTagDataLoading: boolean;
	isTagDataError: boolean;
	moreSheetApi: SheetApi;
	onPressFollowers: () => void;
}

const useTagPage = (tag_uid: ApiIdentifier): IUseTagPage => {
	const {
		data: tagData,
		isLoading: isTagDataLoading,
		isError: isTagDataError
	} = tagApiSlice.useFindOneQuery({ params: { tag_uid: tag_uid } });

	const moreSheetApi = useSheet();

	const onPressFollowers = () => console.log('Followers');

	return {
		tagData,
		isTagDataLoading,
		isTagDataError,
		moreSheetApi,
		onPressFollowers
	};
};

export default useTagPage;
