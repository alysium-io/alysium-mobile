import React, { createContext } from 'react'
import { SheetApi, useSheet } from '@hooks'
import { ProviderProps } from '@types'
import AppBetaConfigBottomSheet from './AppBetaConfigBottomSheet'


type AppBetaConfigBottomSheetContextType = {
    appBetaConfigSheetApi: SheetApi
}

export const AppBetaConfigBottomSheetContext = createContext({} as AppBetaConfigBottomSheetContextType)

export const AppBetaConfigBottomSheetProvider : React.FC<ProviderProps> = ({ children }) => {

    const appBetaConfigSheetApi = useSheet()

    return (
        <>
            <AppBetaConfigBottomSheetContext.Provider value={{
                appBetaConfigSheetApi
            }}>
                {children}
                <AppBetaConfigBottomSheet sheetRef={appBetaConfigSheetApi.sheetRef} />
            </AppBetaConfigBottomSheetContext.Provider>
        </>
    )
}