import { global } from '@etc';
import { tagApiSlice } from '@flux/api/tag';
import { FindOneTagResponseDto } from '@flux/api/tag/dto/tag-find-one.dto';
import { SheetApi, createUseContextHook, useSheet } from '@hooks';
import { useRoute } from '@react-navigation/native';
import { ProviderProps, TagPageRouteProp } from '@types';
import React, { createContext } from 'react';

export type TagPageContextType = {
	tagData: FindOneTagResponseDto;
	isTagDataLoading: boolean;
	isTagDataError: boolean;
	relatedTags: string[];
	onPressFollowers: () => void;
	moreSheetApi: SheetApi;
};

export const TagPageContext = createContext({} as TagPageContextType);

export const TagPageContextProvider: React.FC<ProviderProps> = ({
	children
}) => {
	const route = useRoute<TagPageRouteProp>();
	const {
		data: tagData,
		isLoading: isTagDataLoading,
		isError: isTagDataError
	} = tagApiSlice.useFindOneQuery({ params: { tag_id: route.params.tagId } });

	const moreSheetApi = useSheet();

	const onPressFollowers = () => console.log('Followers');

	if (!tagData) {
		return <></>;
	}

	return (
		<TagPageContext.Provider
			value={{
				tagData,
				isTagDataLoading,
				isTagDataError,
				relatedTags: global.sampleData.sampleTags,
				onPressFollowers,
				moreSheetApi
			}}
		>
			{children}
		</TagPageContext.Provider>
	);
};

export const useTagPageContext = createUseContextHook<TagPageContextType>(
	TagPageContext,
	'TagPageContext'
);