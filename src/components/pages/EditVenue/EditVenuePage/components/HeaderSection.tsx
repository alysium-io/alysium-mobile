import React from 'react'
import { Text, View } from '@atomic'
import { EditableProfileImage, LargeTextInput } from '@molecules'
import { global } from '@etc'
import { Controller } from 'react-hook-form'
import { useEditVenuePageContext } from '../hooks'


const HeaderSection = () => {

    const { formMethods } = useEditVenuePageContext()

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
                <Controller
                    control={formMethods.control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <LargeTextInput
                            placeholder='Venue Name'
                            onChangeText={onChange}
                            textAlign='center'
                            onBlur={onBlur}
                            value={value}
                        />
                    )}
                    name='name'
                />
            </View>
        </View>
    )
}

export default HeaderSection