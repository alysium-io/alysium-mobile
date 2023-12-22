import React from 'react'
import { View } from '@atomic'
import { StyleSheet } from 'react-native'
import PillListHeader from './PillListHeader'


interface PillListProps {
    title?: string;
    children: React.ReactNode;
}

const PillList : React.FC<PillListProps> = ({
    children,
    title
}) => {

    return (
        <View style={styles.container}>
            { title && <PillListHeader title={title} /> }
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})

export default PillList