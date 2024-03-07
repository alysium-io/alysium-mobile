import React from 'react'
import { Section, View } from '@atomic'
import { DeclarativeText, EditableProfileImage } from '@molecules'
import { Stats } from '@organisms'
import UsernameDisplay from './UsernameDisplay'
import { usePersona, useUser } from '@hooks'
import { useProfilePageContext } from '../hooks'


const HeaderSection = () => {

    const { user } = useUser()
    const { changeProfileImage } = useProfilePageContext()
    const { persona } = usePersona()

    return (
        <Section margin='m' alignItems='center'>
            <EditableProfileImage image={user.user?.profile_picture.url || ''} onChooseImage={changeProfileImage} />
            <View margin='m' alignItems='center'>
                <UsernameDisplay />
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