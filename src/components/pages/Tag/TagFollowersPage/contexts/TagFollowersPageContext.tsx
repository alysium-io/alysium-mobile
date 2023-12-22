import React, { createContext } from 'react'
import { ProviderProps } from '@types'
import { SheetRef, useSheet } from '@hooks'

export type TagFollowersPageContextType = {
    moreSheetRef: SheetRef;
    openMore: () => void;
}

export const TagFollowersPageContext = createContext({} as TagFollowersPageContextType)

export const TagFollowersPageProvider : React.FC<ProviderProps> = ({ children }) => {

    const {
        sheetRef : moreSheetRef,
        open : openMore
    } = useSheet()

    return (
        <TagFollowersPageContext.Provider value={{
            moreSheetRef,
            openMore
        }}>
            {children}
        </TagFollowersPageContext.Provider>
    )
}