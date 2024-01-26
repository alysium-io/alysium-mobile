import React from 'react'
import { View, Text } from '@atomic'
import { Stats } from '@organisms'
import { useTagPageContext } from '../hooks'


const SubHeader = () => {

    const { tagData } = useTagPageContext()

    return (
        <View margin='m' flexDirection='row' alignItems='center' justifyContent='space-between'>
            <View>
                <Text variant='page-header' marginBottom='xs'>{tagData?.data.attributes.name}</Text>
                <Text variant='paragraph-medium' color='t2'>#12 most followed</Text>
            </View>
            <Stats
                items={[
                    { subtitle: 'Followers', title: '1.2k', onPress: () => console.log('pressed') },
                    { subtitle: 'Artists', title: '103', onPress: () => console.log('pressed') }
                ]}
            />
        </View>
    )
}

export default SubHeader