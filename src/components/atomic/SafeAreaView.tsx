import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from '@atomic'
import { StyleSheet, ViewStyle } from 'react-native'


interface SafeAreaViewProps {
    style?: ViewStyle;
    children: React.ReactNode;
}

const SafeAreaView : React.FC<SafeAreaViewProps> = ({
    style,
    children
}) => {

    const insets = useSafeAreaInsets()

    return (
        <View style={[styles.container, style]}>
            <View style={{ height: insets.top }} />
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})

export default SafeAreaView