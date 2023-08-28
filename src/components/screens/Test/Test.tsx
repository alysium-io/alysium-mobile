import React from 'react'
import { Artist } from '@screens'
import { StyleSheet } from 'react-native'
import { BasePage, NotchMargin, Text, View } from '@atomic'


const Test = () => {
    return (
        <BasePage>
            <NotchMargin />
            <View>
                <Text variant='p1'>Hello World</Text>
                <Text variant='p2'>Hello World</Text>
                <Text variant='p3'>Hello World</Text>
                <Text variant='p4'>Hello World</Text>
                <Text variant='p5'>Hello World</Text>
                <Text variant='p6'>Hello World</Text>
            </View>
        </BasePage>
    )
}

const styles = StyleSheet.create({
    container: {
        
    }
})

export default Test