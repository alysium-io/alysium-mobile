import React from 'react'
import { HeaderSafeArea, ScrollView } from '@atomic'
import { BasePage } from '@organisms'
import { TagPageContextProvider } from './contexts'
import {
    SubHeader,
    ActionButtons,
    Artists
} from './components'


const TagPage = () => {

    return (
        <BasePage>
            <HeaderSafeArea>
                <ScrollView>
                    <SubHeader />
                    <ActionButtons />
                    <Artists />
                </ScrollView>
            </HeaderSafeArea>
        </BasePage>
    )
}

export default () => (
    <TagPageContextProvider>
        <TagPage />
    </TagPageContextProvider>
)