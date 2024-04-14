import { global } from '@etc';
import { SheetApi, useNavigation, useSheet } from '@hooks';
import { useRoute } from '@react-navigation/native';
import { ProviderProps, TagPageRouteProp } from '@types';
import React, { createContext } from 'react';
import { tagApiSlice } from 'src/redux/api';
import { FindOneTagResponseDto } from 'src/redux/api/tag/dto/tag-find-one.dto';

const { useFindOneQuery } = tagApiSlice;

export type TagPageContextType = {
	tagData: FindOneTagResponseDto | undefined;
	isTagDataLoading: boolean;
	isTagDataError: boolean;
	tagArtistsData: TagArtistsResponse | undefined;
	isTagArtistsDataLoading: boolean;
	isTagArtistsDataError: boolean;
	relatedTags: string[];
	onPressFollowers: () => void;
	moreSheetApi: SheetApi;
};

export const TagPageContext = createContext({} as TagPageContextType);

export const TagPageContextProvider: React.FC<ProviderProps> = ({
	children
}) => {
	const route = useRoute<TagPageRouteProp>();
	const { tagFollowersPage } = useNavigation();
	const {
		data: tagData,
		isLoading: isTagDataLoading,
		isError: isTagDataError
	} = useFindOneQuery({ params: { tag_id: route.params.tagId } });

	const {
		data: tagArtistsData,
		isLoading: isTagArtistsDataLoading,
		isError: isTagArtistsDataError
	} = useGetTagArtistsQuery({ tagId: route.params.tagId });

	const moreSheetApi = useSheet();

	const onPressFollowers = () => tagFollowersPage(route.params.tagId);

	return (
		<TagPageContext.Provider
			value={{
				tagData,
				isTagDataLoading,
				isTagDataError,
				tagArtistsData,
				isTagArtistsDataLoading,
				isTagArtistsDataError,
				relatedTags: global.sampleData.sampleTags,
				onPressFollowers,
				moreSheetApi
			}}
		>
			{children}
		</TagPageContext.Provider>
	);
};
