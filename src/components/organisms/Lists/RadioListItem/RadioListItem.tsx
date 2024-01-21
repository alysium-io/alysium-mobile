import React from 'react'
import { View, Radio } from '@atomic'
import { StyleSheet } from 'react-native'
import { FeatureColors } from '@types'
import RadioListItemIcon from './RadioListItemIcon'
import { IconNames } from '@svg'
import RadioListItemTitle from './RadioListItemTitle'
import { DeclarativeText, DeclarativeTextItems } from '@molecules'


interface RadioListItemProps {
    checked: boolean
    colorVariant?: 'default' | keyof FeatureColors
    onPress: () => void
    icon?: IconNames
    title: string
    subtitle?: DeclarativeTextItems
}

const RadioListItem : React.FC<RadioListItemProps> = ({
    checked,
    colorVariant = 'default',
    onPress,
    icon,
    title,
    subtitle
}) => {

    return (
        <View style={styles.container} marginVertical='m'>
            { icon && (
                <View marginRight='s'>
                    <RadioListItemIcon icon={icon} />
                </View>
            ) }
            <View flex={1}>
                <RadioListItemTitle text={title} />
                { subtitle && (
                    <View marginTop='xs'>
                        <DeclarativeText textItems={subtitle} />
                    </View>
                ) }
            </View>
            <Radio
                colorVariant={colorVariant}
                checked={checked}
                onPress={onPress}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default RadioListItem