import { tagApiSlice } from '@flux/api/tag';
import { TopTagsResponseDto } from '@flux/api/tag/dto/tag-top.dto';
import { usePagination } from '@hooks';

interface IUseTopTagsPage {
	topTagsData?: TopTagsResponseDto;
	nextPage: () => void;
}

const useTopTagsPage = (): IUseTopTagsPage => {
	const { page, defaultLimit, nextPage } = usePagination();

	const { data: topTagsData } = tagApiSlice.useTopTagsQuery({
		query: {
			limit: defaultLimit,
			page: page
		}
	});

	return {
		topTagsData,
		nextPage
	};
};

export default useTopTagsPage;
