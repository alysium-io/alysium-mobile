import React from 'react'
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { View } from '@atomic'
import {
    StyleSheet,
    Button
} from 'react-native'


const Test = () => {
    
    const borderWidth = useSharedValue(1)
  
    const animatedStyles = useAnimatedStyle(() => {
        return {
            borderWidth: borderWidth.value,
        }
    })
  
    return (
        <>
            <View animated margin='l' paddingHorizontal='xl' variant='secondary' style={[
                styles.container,
                animatedStyles
            ]}
            />
    
            <Button title="Animate Border" onPress={() => {
                // Toggle the borderWidth between 1 and 10 for demonstration
                borderWidth.value = withSpring(borderWidth.value === 1 ? 10 : 1)
            }} />
        </>
    )
  }

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 200,
        borderWidth: 10
    }
})

export default Test