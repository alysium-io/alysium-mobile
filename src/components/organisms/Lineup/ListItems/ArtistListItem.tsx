import React from 'react'
import { Time } from '@etc'
import { useBgTouchAnimation } from '@hooks'
import { ArtistImage } from '../Images'
import LineupTextContainer from '../LineupTextContainer'
import LineupListItemRightColumn from '../LineupListItemRightColumn'
import ListItemContainer from '../ListItemContainer'
import { Connection } from '../Connections'
import { ContainerType, LineupArtistProperties } from '../settings'


type ArtistListItemProps = LineupArtistProperties & {
    currentContainerType: ContainerType
    nextContainerType: ContainerType | null
}

const ArtistListItem : React.FC<ArtistListItemProps> = ({
    name,
    image,
    startTime,
    endTime,
    currentContainerType,
    nextContainerType
}) => {

    const { Touchable } = useBgTouchAnimation('transparent', 'rgba(255, 255, 255, 0.1)')

    const onPress = () => {
        console.log('Pressed: ' + name)
    }

    return (
        <Touchable onPress={onPress}>
            <ListItemContainer containerType='artist'>
                <ArtistImage image={image} />
                <LineupTextContainer
                    title={name}
                    subtitle={Time.getDuration(startTime, endTime)}
                />
                <Connection
                    currentContainerType={currentContainerType}
                    nextContainerType={nextContainerType}
                />
                <LineupListItemRightColumn text={startTime.format('h:mma')} />
            </ListItemContainer>
        </Touchable>
    )
}

export default ArtistListItem