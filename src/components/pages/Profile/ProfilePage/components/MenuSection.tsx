import React from 'react'
import { Section, View } from '@atomic'
import { MenuListItem } from '@organisms'
import { SectionHeader } from '@molecules'


const MenuSection = () => {

    return (
        <Section>
            <View marginHorizontal='m'>
                <SectionHeader text='Menu' variant='large' />
            </View>
            <MenuListItem
                title='Settings'
                subtitle='Change account preferences, notifications, and more'
                onPress={() => console.log('Settings')}
                border
            />
            <MenuListItem
                title='Alysium'
                subtitle='Learn more about Alysium'
                onPress={() => console.log('Settings')}
                border
            />
            <MenuListItem
                title='Terms of Service'
                subtitle='Read our terms of service'
                onPress={() => console.log('Settings')}
                border={false}
            />
        </Section>
    )
}

export default MenuSection