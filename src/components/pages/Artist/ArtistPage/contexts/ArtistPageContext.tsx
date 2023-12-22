import React, { createContext } from 'react'
import { ArtistPageRouteProp, ArtistResponse, ProviderProps } from '@types'
import { useRoute } from '@react-navigation/native'
import { useLazyArtistQuery } from 'src/redux/api/base/baseApiSlice'
import { SheetApi, useNavigation, useSheet } from '@hooks'
import { global } from '@etc'


export type ArtistPageContextType = {
    moreSheetApi: SheetApi
    notificationsSheetApi: SheetApi
    linksSheetApi: SheetApi
    onPressFollowers: () => void
    onPressShows: () => void
    loadArtistData: () => void
    data: ArtistResponse | undefined
    isLoading: boolean
    error: any
}

export const ArtistPageContext = createContext({} as ArtistPageContextType)

export const ArtistPageProvider : React.FC<ProviderProps> = ({ children }) => {

    const route = useRoute<ArtistPageRouteProp>()
    const [ getArtistData, { data, isLoading, error }] = useLazyArtistQuery()
    const { artistFollowersAndShowsPage } = useNavigation()

    const loadArtistData = () => {
        getArtistData({ artistId: route.params.itemId })
    }

    const moreSheetApi = useSheet()
    const notificationsSheetApi = useSheet()
    const linksSheetApi = useSheet()

    const onPressFollowers = () => artistFollowersAndShowsPage(route.params.itemId, 0)
    const onPressShows = () => artistFollowersAndShowsPage(route.params.itemId, 1)

    return (
        <ArtistPageContext.Provider
            value={{
                moreSheetApi,
                notificationsSheetApi,
                linksSheetApi,
                onPressFollowers,
                onPressShows,
                loadArtistData,
                data: global.sampleApiResponses.artist,
                isLoading,
                error
            }}
        >
            {children}
        </ArtistPageContext.Provider>
    )
}