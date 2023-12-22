import React from 'react'
import { View } from '@atomic'
import { BasePage } from '@organisms'
import { ScrollView } from 'react-native'


const ExperimentPageTwo = () => {

    return (
        <BasePage>
            <ScrollView>
                {
                    Array(100).fill(0).map((_, index) => (
                        <View
                            key={index}
                            height={50}
                            style={{ backgroundColor: `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}` }}
                            marginBottom='s'
                        />
                    ))
                }
            </ScrollView>
        </BasePage>
    )

}

export default ExperimentPageTwo