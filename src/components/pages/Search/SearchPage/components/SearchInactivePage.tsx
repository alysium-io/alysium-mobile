import React from 'react'
import { View, Section } from '@atomic'
import { BlockListItem, CategoricalListItemForContentType } from '@organisms'
import { ContentType } from '@types'
import { SectionHeader } from '@molecules'
import { FadeInUp, FadeOutDown } from 'react-native-reanimated'
import { useNavigation } from '@hooks'


const SearchInactivePage = () => {

    const { locationPage } = useNavigation()

    return (
        <View
            animated
            entering={FadeInUp.duration(250)}
            exiting={FadeOutDown.duration(250)}
        >
            <Section marginBottom='l'>
                <CategoricalListItemForContentType
                    contentType={ContentType.artist}
                    title='Artists'
                    subtitle='42 following'
                    onPress={() => console.log('pressed')}
                />
                <CategoricalListItemForContentType
                    contentType={ContentType.host}
                    title='Hosts'
                    subtitle='12 following'
                    onPress={() => console.log('pressed')}
                />
                <CategoricalListItemForContentType
                    contentType={ContentType.tag}
                    title='Tags'
                    subtitle='2 following'
                    onPress={() => console.log('pressed')}
                />
                <CategoricalListItemForContentType
                    contentType={ContentType.location}
                    title='Locations'
                    subtitle='1 following'
                    onPress={() => locationPage(2)}
                />
            </Section>
            <Section margin='m'>
                <SectionHeader text='Discover' icon='discover' />
                <View marginBottom='m'>
                    <BlockListItem
                        icon='tag'
                        title='Electro House'
                        subtitle='1.2k followers'
                        color='ion'
                        onPress={() => console.log('pressed')}
                    />
                </View>
                <View marginBottom='m'>
                    <BlockListItem
                        icon='location'
                        title='Los Angeles'
                        subtitle='5.1M followers'
                        color='ion'
                        onPress={() => console.log('pressed')}
                    />
                </View>
                <View marginBottom='m'>
                    <BlockListItem
                        icon='tag'
                        title='house'
                        subtitle='2.6M followers'
                        color='ion'
                        onPress={() => console.log('pressed')}
                    />
                </View>
            </Section>
        </View>
    )
}

export default SearchInactivePage