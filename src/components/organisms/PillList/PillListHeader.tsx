import React from 'react'
import { View, Text } from '@atomic'
import { StyleSheet } from 'react-native'


interface PillListHeaderProps {
    title: string;
}

const PillListHeader : React.FC<PillListHeaderProps> = ({
    title
}) => {

    return (
        <View style={styles.container} marginBottom='m'>
            <Text variant='h5'>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    }
})

export default PillListHeader