import React from 'react'
import { Section } from '@atomic'
import { SectionHeader } from '@molecules'
import { useTextInput } from '@hooks'
import {
    EditableDescription,
    EditableAssetImages
} from '@organisms'


const AssetsSection = () => {

    const textInput = useTextInput()

    return (
        <Section>
            <SectionHeader margin='m' text='Assets' />
            <EditableDescription
                multiline
                scrollEnabled={false}
                textInputApi={textInput}
                placeholder='Describe this venue using cool words and stuff...'
            />
            <EditableAssetImages />
        </Section>
    )
}

export default AssetsSection