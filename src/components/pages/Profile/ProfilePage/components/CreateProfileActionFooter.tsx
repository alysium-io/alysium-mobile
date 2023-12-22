import React from 'react'
import { View } from '@atomic'
import { Button } from '@molecules'


const CreateProfileActionFooter = () => {

    return (
        <View flexDirection='row'>
            <View margin='m' flex={1} marginRight='s'>
                <Button
                    text='Create Host'
                    onPress={() => console.log('pressed')}
                />
            </View>
            <View margin='m' flex={1} marginLeft='s'>
                <Button
                    text='Create Artist'
                    onPress={() => console.log('pressed')}
                />
            </View>
        </View>
    )
}

export default CreateProfileActionFooter