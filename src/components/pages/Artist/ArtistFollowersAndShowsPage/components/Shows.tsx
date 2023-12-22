import React from 'react'
import { View } from '@atomic'
import { ScrollView } from 'react-native'
import { ListContainer, EventWithTicketsListItem } from '@organisms'
import { Thinput } from '@molecules'


interface ShowsProps {
    artistId: number;
}

const Shows : React.FC<ShowsProps> = ({
    artistId
}) => {

    return (
        <View>
            <ScrollView alwaysBounceVertical={false}>
                <View margin='m'>
                    <Thinput
                        icon='search'
                        onChangeText={(text) => console.log(text)}
                        placeholder='Search Shows'
                    />
                </View>
                <View marginHorizontal='m'>
                    <ListContainer>
                        {
                            Array.from({ length: 10 }).map((_, index) => (
                                <EventWithTicketsListItem
                                    key={index}
                                    image='https://www.tomorrowland.com/src/Frontend/Themes/tomorrowland/Core/Layout/images/timeline/2023-1.jpg'
                                    name={'Event #' + index}
                                    ticketsSold={index}
                                    onPress={() => console.log('event pressed ' + index)}
                                />
                            ))
                        }
                    </ListContainer>
                </View>
            </ScrollView>
        </View>
    )
}

export default Shows