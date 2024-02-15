import React, { createContext } from 'react'
import { useRoute } from '@react-navigation/native'
import { ProviderProps, TagResponse, TagPageRouteProp, TagArtistsResponse } from '@types'
import { SheetApi, useNavigation, useSheet } from '@hooks'
import { global } from '@etc'
import tagApiSlice from 'src/redux/api/tagApiSlice'


const {
    useGetTagDetailsQuery,
    useGetTagArtistsQuery
} = tagApiSlice

export type TagPageContextType = {
    tagData: TagResponse | undefined
    isTagDataLoading: boolean
    isTagDataError: boolean
    tagArtistsData: TagArtistsResponse | undefined
    isTagArtistsDataLoading: boolean
    isTagArtistsDataError: boolean
    relatedTags: string[]
    onPressFollowers: () => void
    moreSheetApi: SheetApi
}

export const TagPageContext = createContext({} as TagPageContextType)

export const TagPageContextProvider : React.FC<ProviderProps> = ({ children }) => {

    const route = useRoute<TagPageRouteProp>()
    const { tagFollowersPage } = useNavigation()
    const {
        data : tagData,
        isLoading : isTagDataLoading,
        isError : isTagDataError
    } = useGetTagDetailsQuery({ tagId: route.params.tagId })

    const {
        data : tagArtistsData,
        isLoading : isTagArtistsDataLoading,
        isError : isTagArtistsDataError
    } = useGetTagArtistsQuery({ tagId: route.params.tagId })

    const moreSheetApi = useSheet()

    const onPressFollowers = () => tagFollowersPage(route.params.tagId)

    return (
        <TagPageContext.Provider value={{
            tagData,
            isTagDataLoading,
            isTagDataError,
            tagArtistsData,
            isTagArtistsDataLoading,
            isTagArtistsDataError,
            relatedTags: global.sampleData.sampleTags,
            onPressFollowers,
            moreSheetApi
        }}>
            {children}
        </TagPageContext.Provider>
    )
}