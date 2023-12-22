import React from 'react'
import { Text, View } from '@atomic'
import { StyleSheet } from 'react-native'


interface RadioListItemTitleProps {
    text: string
}

const RadioListItemTitle : React.FC<RadioListItemTitleProps> = ({
    text
}) => {

    return (
        <View style={styles.container}>
            <Text
                variant='paragraph-large'
                color='t1'
                numberOfLines={0}
            >{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default RadioListItemTitle