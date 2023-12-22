import React, { useState, createContext } from 'react'
import { ProviderProps } from '@types'


export type BasePageContextType = {
    isFooterActive: boolean
    setIsFooterActive: (value: boolean) => void
    footerHeight: number
    setFooterHeight: (value: number) => void
}

export const BasePageContext = createContext({} as BasePageContextType)

export const BasePageProvider : React.FC<ProviderProps> = ({ children }) => {

    const [isFooterActive, setIsFooterActive] = useState(false)
    const [footerHeight, setFooterHeight] = useState(0)

    return (
        <BasePageContext.Provider
            value={{
                isFooterActive,
                setIsFooterActive,
                footerHeight,
                setFooterHeight
            }}
        >
            {children}
        </BasePageContext.Provider>
    )
}