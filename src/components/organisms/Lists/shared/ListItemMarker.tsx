import React from 'react'
import { Icon, View } from '@atomic'
import { IconNames } from '@svg'


interface ListItemMarkerProps {
    markerIcon?: IconNames
    markerColor?: React.ComponentProps<typeof Icon>['color']
}

const ListItemMarker : React.FC<ListItemMarkerProps> = ({
    markerIcon = 'checkmark',
    markerColor = 't3'
}) => (
    <View marginHorizontal='m'>
        <Icon name={markerIcon} size='small' color={markerColor} />
    </View>
)

export default ListItemMarker