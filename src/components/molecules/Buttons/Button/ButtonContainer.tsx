import React from 'react'
import { BgTouchAnimation } from '@atomic'
import { StyleSheet } from 'react-native'


interface ButtonContainerProps {
    children?: React.ReactNode
    onPress?: () => void
    borderColor: string
    backgroundColor: string
    isDisabled?: boolean
}

const ButtonContainer : React.FC<ButtonContainerProps> = ({
    children,
    onPress,
    borderColor,
    backgroundColor,
    isDisabled = false
}) => {

    return (
        <BgTouchAnimation
            color={backgroundColor}
            onPress={onPress}
            disabled={isDisabled}
            style={[
                styles.container,
                { borderColor }
            ]}
        >
            {children}
        </BgTouchAnimation>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.3,
        height: 55
    }
})

export default ButtonContainer