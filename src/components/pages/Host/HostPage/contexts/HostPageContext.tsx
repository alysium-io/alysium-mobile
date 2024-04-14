import { SheetApi, useNavigation, useSheet } from '@hooks'
import { useRoute } from '@react-navigation/native'
import { HostPageRouteProp, ProviderProps } from '@types'
import React, { createContext } from 'react'
import { hostApiSlice } from 'src/redux/api'
import { Host } from 'src/redux/api/host/host.entity'


const {
	useFindOneQuery
} = hostApiSlice

export type HostPageContextType = {
    moreSheetApi: SheetApi
    notificationsSheetApi: SheetApi
    linksSheetApi: SheetApi
    onPressFollowers: () => void
    onPressShows: () => void
    data: Host | undefined
    isLoading: boolean
    error: any
}

export const HostPageContext = createContext({} as HostPageContextType)

export const HostPageProvider : React.FC<ProviderProps> = ({ children }) => {

    const route = useRoute<HostPageRouteProp>()
    const { isLoading, error, data } = useFindOneQuery({ params: { host_id: route.params.hostId } })
    const { hostFollowersAndShowsPage } = useNavigation()

    const moreSheetApi = useSheet()
    const notificationsSheetApi = useSheet()
    const linksSheetApi = useSheet()

    const onPressFollowers = () => hostFollowersAndShowsPage(route.params.hostId, 0)
    const onPressShows = () => hostFollowersAndShowsPage(route.params.hostId, 1)

    return (
        <HostPageContext.Provider
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
        </HostPageContext.Provider>
    )
}
