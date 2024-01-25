import React from 'react'
import { Icon, View } from '@atomic'
import { StyleSheet } from 'react-native'
import { IconNames } from '@svg'


interface DefaultIconImageProps {
    icon: IconNames
    backgroundColor?: React.ComponentProps<typeof View>['backgroundColor']
    iconColor?: React.ComponentProps<typeof Icon>['color']
}

const DefaultIconImage : React.FC<DefaultIconImageProps> = ({
    icon,
    backgroundColor = 'ion_light',
    iconColor = 't2'
}) => {

    return (
        <View style={styles.container} backgroundColor={backgroundColor}>
            <Icon
                name={icon}
                color={iconColor}
                size='regular'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default DefaultIconImage