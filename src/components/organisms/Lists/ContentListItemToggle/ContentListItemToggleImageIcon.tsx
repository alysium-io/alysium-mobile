import React from 'react'
import { View } from '@atomic'
import { imageSizeScheme } from './shared'
import { DefaultIconImage } from '@atomic'
import { IconNames } from '@svg'


interface ContentListItemToggleImageIconProps {
    size: keyof typeof imageSizeScheme
    icon: IconNames
}

const ContentListItemToggleImageIcon : React.FC<ContentListItemToggleImageIconProps> = ({
    size,
    icon
}) => {

    return (
        <View style={{ height: imageSizeScheme[size] }}>
            <DefaultIconImage icon={icon} />
        </View>
    )
}

export default ContentListItemToggleImageIcon