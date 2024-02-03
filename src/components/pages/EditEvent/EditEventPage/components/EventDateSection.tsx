import React from 'react'
import { Section, View } from '@atomic'
import { SectionHeader } from '@molecules'
import { MenuListItem } from '@organisms'


const EventDateSection = () => {

    return (
        <Section marginVertical='l'>
            <View marginHorizontal='m'>
                <SectionHeader text='Event Date' titleVariant='large' />
            </View>
            <View>
                <MenuListItem
                    title='Doors Open'
                    secondaryText='Jan 2nd, 7:00pm'
                    onPress={() => console.log('pressed')}
                    color='ion'
                />
                <MenuListItem
                    title='Event Start'
                    secondaryText='Jan 2nd, 8:00pm'
                    onPress={() => console.log('pressed')}
                    color='ion'
                />
                <MenuListItem
                    title='Event End'
                    secondaryText='Jan 2nd, 2:00am'
                    onPress={() => console.log('pressed')}
                    color='ion'
                    border={false}
                />
            </View>
        </Section>
    )
}

export default EventDateSection