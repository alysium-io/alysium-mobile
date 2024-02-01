import React from 'react'
import { Text, View } from '@atomic'
import { EditableProfileImage, LargeTextInput } from '@molecules'
import { global } from '@etc'


const HeaderSection = () => {

    return (
        <View marginTop='l' marginHorizontal='m' alignItems='center'>
            <EditableProfileImage
                image={global.sampleData.images.event}
            />
            <Text
                marginTop='l'
                textAlign='center'
                variant='paragraph-large'
                color='t2'
            >venue</Text>
            <View marginTop='l'>
                <LargeTextInput
                    textAlign='center'
                    placeholder='Venue Name'
                    onChangeText={() => { }}
                />
            </View>
        </View>
    )
}

export default HeaderSection