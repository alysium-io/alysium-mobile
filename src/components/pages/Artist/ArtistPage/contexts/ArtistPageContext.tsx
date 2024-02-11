import React, { createContext } from 'react'
import { ArtistPageRouteProp, ArtistDetailsResponse, ProviderProps } from '@types'
import { useRoute } from '@react-navigation/native'
import artistApiSlice from 'src/redux/api/artistApiSlice'
import { SheetApi, useNavigation, useSheet } from '@hooks'


const {
    useGetArtistDetailsQuery
} = artistApiSlice

export type ArtistPageContextType = {
    moreSheetApi: SheetApi
    notificationsSheetApi: SheetApi
    linksSheetApi: SheetApi
    onPressFollowers: () => void
    onPressShows: () => void
    data: ArtistDetailsResponse | undefined
    isLoading: boolean
    error: any
}

export const ArtistPageContext = createContext({} as ArtistPageContextType)

export const ArtistPageProvider : React.FC<ProviderProps> = ({ children }) => {

    const route = useRoute<ArtistPageRouteProp>()
    const { data, isLoading, error } = useGetArtistDetailsQuery({ artistId: route.params.artistId })
    const { artistFollowersAndShowsPage } = useNavigation()

    const moreSheetApi = useSheet()
    const notificationsSheetApi = useSheet()
    const linksSheetApi = useSheet()

    const onPressFollowers = () => artistFollowersAndShowsPage(route.params.artistId, 0)
    const onPressShows = () => artistFollowersAndShowsPage(route.params.artistId, 1)

    return (
        <ArtistPageContext.Provider
            value={{
                moreSheetApi,
                notificationsSheetApi,
                linksSheetApi,
                onPressFollowers,
                onPressShows,
                data,
                isLoading,
                error
            }}
        >
            {children}
        </ArtistPageContext.Provider>
    )
}