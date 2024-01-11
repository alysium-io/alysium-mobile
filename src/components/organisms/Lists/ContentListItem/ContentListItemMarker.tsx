import React from 'react'
import { Icon, View } from '@atomic'
import { IconNames } from '@svg'


interface ContentListItemMarkerProps {
    icon: IconNames
}

const ContentListItemMarker : React.FC<ContentListItemMarkerProps> = ({
    icon
}) => (
    <View marginRight='m'>
        <Icon name={icon} size='small' color='t3' />
    </View>
)

export default ContentListItemMarker