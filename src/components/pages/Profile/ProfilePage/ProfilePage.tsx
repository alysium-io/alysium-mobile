import React from 'react'
import { HeaderSafeArea, ScrollView } from '@atomic'
import { BasePage } from '@organisms'
import {
    SelectAccountSection,
    HeaderSection,
    MenuSection,
    CreateProfileActionFooter
} from './components'


const ProfilePage = () => {

    return (
        <BasePage FooterComponent={CreateProfileActionFooter}>
            <HeaderSafeArea>
                <ScrollView alwaysBounceVertical>
                    <HeaderSection />
                    <SelectAccountSection />
                    <MenuSection />
                </ScrollView>
            </HeaderSafeArea>
        </BasePage>
    )
}

export default ProfilePage