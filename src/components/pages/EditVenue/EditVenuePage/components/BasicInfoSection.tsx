import React, { useState } from 'react'
import { Section } from '@atomic'
import { SectionHeader, EditableTextInputWithLabel, EditableNumericInputWithLabel } from '@molecules'
import { useTextInput } from '@hooks'
import { Formatting } from '@etc'


const BasicInfoSection = () => {

    const [text, setText] = useState<string>('')
    const textInput1 = useTextInput()
    const textInput2 = useTextInput()
    const textInput3 = useTextInput()

    return (
        <Section marginTop='xl' marginHorizontal='m'>
            <SectionHeader text='Basic Info' />
            <EditableTextInputWithLabel
                label='address'
                textInputApi={textInput1}
                placeholder='10028 N. Virginia Ave.'
                onChangeText={() => { }}
            />
            <EditableNumericInputWithLabel
                label='phone #'
                textInputApi={textInput2}
                placeholder='(123) 456-7891'
                keyboardType='phone-pad'
                onChangeText={(text: string) => setText(Formatting.formatPhoneNumber(text))}
                value={text}
                maxLength={14}
            />
            <EditableNumericInputWithLabel
                label='capacity'
                textInputApi={textInput3}
                placeholder='Max # of people'
                keyboardType='numeric'
                onChangeText={(text: string) => setText(Formatting.formatCommaSeparatedNumber(text))}
                value={text}
            />
        </Section>
    )
}

export default BasicInfoSection