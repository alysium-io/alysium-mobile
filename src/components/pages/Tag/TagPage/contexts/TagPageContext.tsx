import React, { createContext } from 'react'
import { useRoute } from '@react-navigation/native'
import { ProviderProps, TagResponse, TagPageRouteProp, TagArtistsResponse } from '@types'
import { SheetApi, useNavigation, useSheet } from '@hooks'
import { global } from '@etc'
import tagApiSlice from 'src/redux/api/tagApiSlice'


const {
    useLazyGetTagDetailsQuery,
    useLazyGetTagArtistsQuery
} = tagApiSlice

export type TagPageContextType = {
    tagData: TagResponse | undefined
    isTagDataLoading: boolean
    isTagDataError: boolean
    loadTagData: () => void
    tagArtistsData: TagArtistsResponse | undefined
    isTagArtistsDataLoading: boolean
    isTagArtistsDataError: boolean
    loadTagArtistsData: () => void
    relatedTags: string[]
    onPressFollowers: () => void
    moreSheetApi: SheetApi
}

export const TagPageContext = createContext({} as TagPageContextType)

export const TagPageContextProvider : React.FC<ProviderProps> = ({ children }) => {

    const route = useRoute<TagPageRouteProp>()
    const { tagFollowersPage } = useNavigation()
    const [
        getTagData,
        {
            data : tagData,
            isLoading : isTagDataLoading,
            isError : isTagDataError
        }
    ] = useLazyGetTagDetailsQuery()
    const loadTagData = () => getTagData({ tagId: route.params.itemId })

    const [
        getTagArtistsData,
        {
            data : tagArtistsData,
            isLoading : isTagArtistsDataLoading,
            isError : isTagArtistsDataError
        }
    ] = useLazyGetTagArtistsQuery()
    const loadTagArtistsData = () => getTagArtistsData({ tagId: route.params.itemId })

    const moreSheetApi = useSheet()

    const onPressFollowers = () => tagFollowersPage(route.params.itemId)

    return (
        <TagPageContext.Provider value={{
            tagData,
            isTagDataLoading,
            isTagDataError,
            loadTagData,
            tagArtistsData,
            isTagArtistsDataLoading,
            isTagArtistsDataError,
            loadTagArtistsData,
            relatedTags: global.sampleData.sampleTags,
            onPressFollowers,
            moreSheetApi
        }}>
            {children}
        </TagPageContext.Provider>
    )
}