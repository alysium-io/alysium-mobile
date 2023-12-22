import React, { useState } from 'react'
import { View, Section } from '@atomic'
import { SectionHeader } from '@molecules'
import { RadioListItem } from '@organisms'


const FeaturesSection = () => {

    const [checked, setChecked] = useState(false)

    return (
        <Section margin='m'>
            <SectionHeader text='Features' variant='large' />
            <View marginVertical='m'>
                <RadioListItem
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                    icon='alcohol'
                    title='Alcohol'
                    color_variant='matt'
                    subtitle={[
                        {
                            variant: 'paragraph-small',
                            text: 'If you serve alcohol, you must follow',
                            color: 't2'
                        },
                        {
                            variant: 'paragraph-small',
                            text: 'our guidelines ',
                            color: 't2',
                            newline: true
                        },
                        {
                            variant: 'paragraph-small',
                            text: 'Learn More',
                            color: 'matt',
                            underline: true
                        }
                    ]}
                />
                <RadioListItem
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                    icon='cheeseburger'
                    title='Food & Drink'
                    color_variant='matt'
                    subtitle={[
                        {
                            variant: 'paragraph-small',
                            text: 'Consider adding a ',
                            color: 't2'
                        },
                        {
                            variant: 'paragraph-small',
                            text: 'Menu',
                            color: 'matt',
                            underline: true
                        }
                    ]}
                />
                <RadioListItem
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                    icon='security'
                    title='Security'
                    color_variant='matt'
                    subtitle={[
                        {
                            variant: 'paragraph-small',
                            text: 'You are responsible for security,',
                            color: 't2'
                        },
                        {
                            variant: 'paragraph-small',
                            text: 'read our ',
                            color: 't2',
                            newline: true
                        },
                        {
                            variant: 'paragraph-small',
                            text: 'Policy',
                            color: 'matt',
                            underline: true
                        }
                    ]}
                />
                <RadioListItem
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                    icon='dog'
                    title='Pet Friendly'
                    color_variant='matt'
                    subtitle={[
                        {
                            variant: 'paragraph-small',
                            text: 'Can people bring their pooch? :)',
                            color: 't2'
                        }
                    ]}
                />
            </View>
        </Section>
    )
}

export default FeaturesSection