import React, { createContext } from 'react'
import { SheetRef, useSheet } from '@hooks'
import { ProviderProps } from '@types'

export type HostFollowersAndShowsPageContextType = {
    moreSheetRef: SheetRef;
    openMore: () => void;
}

export const HostFollowersAndShowsPageContext = createContext({} as HostFollowersAndShowsPageContextType)

export const HostFollowersAndShowsPageProvider : React.FC<ProviderProps> = ({ children }) => {

    const {
        sheetRef : moreSheetRef,
        open : openMore
    } = useSheet()
    
    return (
        <HostFollowersAndShowsPageContext.Provider value={{
            moreSheetRef,
            openMore
        }}>
            {children}
        </HostFollowersAndShowsPageContext.Provider>
    )
}