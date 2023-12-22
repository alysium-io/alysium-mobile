import React from 'react'
import { Section, View, Text } from '@atomic'
import { Button, SectionHeader } from '@molecules'
import { MenuListItem, SummaryTextBlock } from '@organisms'


const SummarySection = () => {

    return (
        <Section marginVertical='m'>
            <View marginHorizontal='m'>
                <SectionHeader text='Summary' variant='large' />
            </View>
            <View margin='m'>
                <SummaryTextBlock
                    title='Event Details'
                    items={[
                        { label: 'Number of Artists', value: '3' },
                        { label: 'Doors Open', value: '7:00pm' },
                        { label: 'Event Start', value: '8:00pm' },
                        { label: 'Event End', value: '2:00am' },
                        { label: 'Total Event Duration', value: '6 hrs' },
                        { label: 'Venue', value: '10080 N. Virginia Ave' }
                    ]}
                />
            </View>
            <View>
                <MenuListItem
                    title='Preview'
                    onPress={() => console.log('Preview')}
                    titleProps={{ color: 't2' }}
                    border
                />
                <MenuListItem
                    title='Make Assets'
                    onPress={() => console.log('Make Assets')}
                    titleProps={{ color: 't2' }}
                    border
                />
                <MenuListItem
                    title='Share'
                    onPress={() => console.log('Share')}
                    titleProps={{ color: 't2' }}
                    border
                />
                <View margin='m'>
                    <Button
                        variant='outlined'
                        color_variant='matt'
                        text='Finalize'
                        onPress={() => console.log('Finalize')}
                    />
                </View>
            </View>
        </Section>
    )
}

export default SummarySection