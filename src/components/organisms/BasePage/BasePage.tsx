import React from 'react'
import { BasePageProvider } from './context'
import BasePageContent from './BasePageContent'


interface BasePageProps {
    children?: React.ReactNode
    FooterComponent?: React.FC
}

const BasePage : React.FC<BasePageProps> = ({
    children,
    FooterComponent
}) => {

    return (
        <BasePageProvider>
            <BasePageContent FooterComponent={FooterComponent}>
                {children}
            </BasePageContent>
        </BasePageProvider>
    )
}

export default BasePage