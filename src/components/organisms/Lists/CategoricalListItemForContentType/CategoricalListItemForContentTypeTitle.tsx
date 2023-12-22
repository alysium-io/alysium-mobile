import React from 'react'
import { View, Text } from '@atomic'
import { StyleSheet } from 'react-native'


interface CategoricalListItemForContentTypeTitleProps {
    title: string
    subtitle: string
}

const CategoricalListItemForContentTypeTitle : React.FC<CategoricalListItemForContentTypeTitleProps> = ({
    title,
    subtitle
}) => {

    return (
        <View style={styles.container} marginLeft='m'>
            <Text variant='paragraph-small' marginBottom='xs' color='t2'>{subtitle}</Text>
            <Text variant='paragraph'>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default CategoricalListItemForContentTypeTitle