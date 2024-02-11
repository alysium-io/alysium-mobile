import React from 'react'
import { HeaderSafeArea, ScrollView } from '@atomic'
import { BasePage } from '@organisms'
import { ProfilePageProvider } from './contexts'
import {
    SelectAccountSection,
    HeaderSection,
    MenuSection,
    CreateProfileActionFooter,
    LogoutSection
} from './components'


const ProfilePage = () => {

    return (
        <BasePage FooterComponent={CreateProfileActionFooter}>
            <HeaderSafeArea>
                <ScrollView alwaysBounceVertical>
                    <HeaderSection />
                    <SelectAccountSection />
                    <MenuSection />
                    <LogoutSection />
                </ScrollView>
            </HeaderSafeArea>
        </BasePage>
    )
}

export default () => (
    <ProfilePageProvider>
        <ProfilePage />
    </ProfilePageProvider>
)