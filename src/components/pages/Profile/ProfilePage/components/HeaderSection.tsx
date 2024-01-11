import React from 'react'
import { Section, Text, View, Icon } from '@atomic'
import { DeclarativeText, EditableProfileImage } from '@molecules'
import { global } from '@etc'
import { Stats } from '@organisms'
import { usePersona, useUser } from '@hooks'


const HeaderSection = () => {

    const { user } = useUser()
    const { persona } = usePersona()

    return (
        <Section margin='m' alignItems='center'>
            <EditableProfileImage image={global.artistImages['mesto']} />
            <View margin='m' alignItems='center'>
                <View flexDirection='row' alignItems='center'>
                    <Icon name='at' size='small' color='t1' />
                    <Text variant='paragraph-large-medium' marginLeft='xs'>{user.user?.username}</Text>
                </View>
                <View marginTop='s'>
                    <DeclarativeText
                        textItems={[
                            {
                                variant: 'paragraph',
                                text: persona.activePersonaType,
                                color: 't3'
                            }
                        ]}
                    />
                </View>
                <View marginTop='m'>
                    <DeclarativeText
                        textItems={[
                            {
                                variant: 'paragraph-medium',
                                underline: true,
                                text: 'Edit Profile',
                                color: 'matt',
                                onPress: () => console.log('Edit Profile')
                            }
                        ]}
                    />
                </View>
                <View marginTop='m'>
                    <Stats
                        items={[
                            {
                                title: '42',
                                subtitle: 'shows',
                                onPress: () => console.log('shows')
                            },
                            {
                                title: '1.5k',
                                subtitle: 'followers',
                                onPress: () => console.log('shows')
                            }
                        ]}
                    />
                </View>
            </View>
        </Section>
    )
}

export default HeaderSection