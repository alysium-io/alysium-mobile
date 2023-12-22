import React, { createContext } from 'react'
import { HostPageRouteProp, HostResponse, ProviderProps } from '@types'
import { useRoute } from '@react-navigation/native'
import { useLazyHostQuery } from 'src/redux/api/base/baseApiSlice'
import { SheetApi, useNavigation, useSheet } from '@hooks'
import { global } from '@etc'


export type HostPageContextType = {
    moreSheetApi: SheetApi
    notificationsSheetApi: SheetApi
    linksSheetApi: SheetApi
    onPressFollowers: () => void
    onPressShows: () => void
    loadHostData: () => void
    data: HostResponse | undefined
    isLoading: boolean
    error: any
}

export const HostPageContext = createContext({} as HostPageContextType)

export const HostPageProvider : React.FC<ProviderProps> = ({ children }) => {

    const route = useRoute<HostPageRouteProp>()
    const [ getHostData, { isLoading, error }] = useLazyHostQuery()
    const { hostFollowersAndShowsPage } = useNavigation()

    const loadHostData = () => {
        getHostData({ hostId: route.params.itemId })
    }

    const moreSheetApi = useSheet()
    const notificationsSheetApi = useSheet()
    const linksSheetApi = useSheet()

    const onPressFollowers = () => hostFollowersAndShowsPage(route.params.itemId, 0)
    const onPressShows = () => hostFollowersAndShowsPage(route.params.itemId, 1)

    return (
        <HostPageContext.Provider
            value={{
                moreSheetApi,
                notificationsSheetApi,
                linksSheetApi,
                onPressFollowers,
                onPressShows,
                loadHostData,
                data: global.sampleApiResponses.host,
                isLoading,
                error
            }}
        >
            {children}
        </HostPageContext.Provider>
    )
}