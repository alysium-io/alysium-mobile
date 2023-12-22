import React, { createContext } from 'react'
import { SheetRef, useSheet } from '@hooks'
import { ProviderProps } from '@types'

export type ArtistFollowersAndShowsPageContextType = {
    moreSheetRef: SheetRef;
    openMore: () => void;
}

export const ArtistFollowersAndShowsPageContext = createContext({} as ArtistFollowersAndShowsPageContextType)

export const ArtistFollowersAndShowsPageProvider : React.FC<ProviderProps> = ({ children }) => {

    const {
        sheetRef : moreSheetRef,
        open : openMore
    } = useSheet()
    
    return (
        <ArtistFollowersAndShowsPageContext.Provider value={{
            moreSheetRef,
            openMore
        }}>
            {children}
        </ArtistFollowersAndShowsPageContext.Provider>
    )
}