import React from 'react'
import { View, Text } from '@atomic'
import { Stats } from '@organisms'


const SubHeader = () => {

    return (
        <View margin='m' flexDirection='row' alignItems='center' justifyContent='space-between'>
            <View>
                <Text variant='page-header' marginBottom='xs'>Electro House</Text>
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