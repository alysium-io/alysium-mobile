import { tagApiSlice } from '@flux/api/tag';
import { FindOneTagResponseDto } from '@flux/api/tag/dto/tag-find-one.dto';
import { ApiIdentifier } from '@types';

interface IUseTagPage {
	tagData?: FindOneTagResponseDto;
	isTagDataLoading: boolean;
	isTagDataError: boolean;
}

const useTagPage = (tag_uid: ApiIdentifier): IUseTagPage => {
	const {
		data: tagData,
		isLoading: isTagDataLoading,
		isError: isTagDataError
	} = tagApiSlice.useFindOneQuery({ params: { tag_uid: tag_uid } });

	return {
		tagData,
		isTagDataLoading,
		isTagDataError
	};
};

export default useTagPage;
