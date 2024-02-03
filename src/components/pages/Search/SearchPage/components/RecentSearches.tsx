import React from 'react'
import { Section, View } from '@atomic'
import { SectionHeader } from '@molecules'
import { ContentListItem } from '@organisms'
import { useSearchPageContext } from '../hooks'
import { ContentType } from '@types'


const RecentSearches = () => {

    const { recentSearches, onPressSearchResult } = useSearchPageContext()

    return (
        <Section>
            <View marginHorizontal='m'>
                <SectionHeader text='Recent Searches' titleVariant='large' />
            </View>
            {
                recentSearches?.map(result => (
                    <ContentListItem
                        key={result.id}
                        title={result.name}
                        subtitle='artist'
                        onPress={() => onPressSearchResult(result)}
                        contentType={ContentType.artist}
                        image={result.image}
                        border
                    />
                ))
            }
        </Section>
    )
}

export default RecentSearches