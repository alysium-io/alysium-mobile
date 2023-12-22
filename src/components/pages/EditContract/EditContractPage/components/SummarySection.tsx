import React from 'react'
import { Section, View } from '@atomic'
import { Button, SectionHeader } from '@molecules'
import { SummaryTextBlock, MenuListItem, TextSection } from '@organisms'


const SummarySection = () => {

    return (
        <Section>
            <View margin='m'>
                <SectionHeader text='Summary' variant='large' />
            </View>
            <View margin='m'>
                <SummaryTextBlock
                    title='Event Details'
                    items={[
                        { label: 'Event Name', value: 'EDX Tuesdays' },
                        { label: 'Doors Open', value: '7:00pm' },
                        { label: 'Event Start', value: '8:00pm' },
                        { label: 'Event End', value: '2:00am' },
                        { label: 'Total Event Duration', value: '5 hrs' },
                        { label: 'Venue', value: '10080 N. Virginia Ave' }
                    ]}
                />
            </View>
            <View margin='m'>
                <SummaryTextBlock
                    title='Artist Details'
                    items={[
                        { label: 'Artist Name', value: 'Seth Hills' },
                        { label: 'Artist Guarantee', value: '$2,500' },
                        { label: 'Artist Start', value: '9:00pm' },
                        { label: 'Artist End', value: '10:00pm' },
                        { label: 'Artist Duration', value: '1 hr' }
                    ]}
                />
            </View>
            <View margin='m'>
                <TextSection
                    header='Additional Details'
                    body='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam faucibus, nisl nunc aliquet nunc, quis aliquam nunc nisl nec nisl.'
                />
            </View>
            <View>
                <MenuListItem
                    title='Preview'
                    onPress={() => console.log('Preview')}
                    titleProps={{ color: 't2' }}
                    border
                />
                <View margin='m'>
                    <Button
                        variant='outlined'
                        color_variant='matt'
                        text='Send to Artist'
                        onPress={() => console.log('Send to Artist')}
                    />
                </View>
            </View>
        </Section>
    )
}

export default SummarySection