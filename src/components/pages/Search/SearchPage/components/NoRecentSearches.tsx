import React from 'react'
import { View } from '@atomic'
import { DeclarativeText } from '@molecules'


const NoRecentSearches = () => {

    return (
        <View>
            <DeclarativeText
                textItems={[
                    {
                        text: 'No recent searches...',
                        variant: 'paragraph-medium'
                    }
                ]}
            />
        </View>
    )
}

export default NoRecentSearches