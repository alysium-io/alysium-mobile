import React from 'react'
import { HeaderSafeArea, Section, ScrollView, Text, View } from '@atomic'
import { MenuListItem, BasePage } from '@organisms'
import { useNavigation } from '@hooks'

const PagesPage = () => {

    const {
        artistPage,
        hostPage,
        eventPage,
        searchPage,
        tagPage,
        editEventPage,
        editContractPage,
        eventManagerPage,
        contractManager,
        profilePage
    } = useNavigation()

    return (
        <BasePage>
            <HeaderSafeArea>
                <ScrollView alwaysBounceVertical>
                    <View margin='m'>
                        <Text variant='page-header'>Example Pages</Text>
                    </View>
                    <Section>
                        <MenuListItem
                            title='Profile'
                            subtitle='Edit profile, change accounts, etc.'
                            onPress={() => profilePage()}
                        />
                        <MenuListItem
                            title='Contract Manager'
                            subtitle='Artists can manage their contracts here'
                            onPress={() => contractManager()}
                        />
                        <MenuListItem
                            title='Event Manager'
                            subtitle='Hosts can manage their events here'
                            onPress={() => eventManagerPage()}
                        />
                        <MenuListItem
                            title='Edit Contract'
                            subtitle='Private edit contract page'
                            onPress={() => editContractPage(1)}
                        />
                        <MenuListItem
                            title='Edit Event'
                            subtitle='Private edit event page'
                            onPress={() => editEventPage(1)}
                        />
                        <MenuListItem
                            title='Tag'
                            subtitle='Public tag page'
                            onPress={() => tagPage(1)}
                        />
                        <MenuListItem
                            title='Search'
                            subtitle='Search page, available for everyone'
                            onPress={() => searchPage()}
                        />
                        <MenuListItem
                            title='Event'
                            subtitle='Public event page'
                            onPress={() => eventPage(1)}
                        />
                        <MenuListItem
                            title='Artist'
                            subtitle='Public artist profile'
                            onPress={() => artistPage(1)}
                        />
                        <MenuListItem
                            title='Host'
                            subtitle='Public host profile'
                            onPress={() => hostPage(1)}
                        />
                    </Section>
                </ScrollView>
            </HeaderSafeArea>
        </BasePage>
    )
}

export default PagesPage