import React from 'react'
import { Section } from '@atomic'
import { MenuListItem } from '@organisms'
import { SectionHeader } from '@molecules'
import CreateLinkBottomSheet from './CreateLinkBottomSheet'
import { useEditVenuePageContext } from '../hooks'


const LinksSection = () => {

    const { createLinkSheetApi } = useEditVenuePageContext()

    return (
        <>
            <Section>
                <SectionHeader margin='m' text='Links' />
                <MenuListItem
                    title='Create'
                    secondaryText='www.example.com'
                    onPress={() => createLinkSheetApi.open()}
                    secondaryTextProps={{ color: 't3' }}
                    icon='plus'
                    border
                />
                <MenuListItem
                    title='Google'
                    secondaryText='https://www.google.com'
                    onPress={() => console.log('Share')}
                    border
                />
                <MenuListItem
                    title='Facebook Something super long'
                    secondaryText='https://www.facebook.comfjdsklfjdslkfjkdsjfjslkd'
                    onPress={() => console.log('Share')}
                    border
                />
            </Section>
            <CreateLinkBottomSheet sheetApi={createLinkSheetApi} />
        </>
    )
}

export default LinksSection