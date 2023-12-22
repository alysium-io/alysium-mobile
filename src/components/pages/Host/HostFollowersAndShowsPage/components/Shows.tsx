import React from 'react'
import { View } from '@atomic'
import { Thinput } from '@molecules'
import { ScrollView } from 'react-native'
import { ListContainer, EventWithTicketsListItem } from '@organisms'


interface ShowsProps {
    hostId: number
}

const Shows : React.FC<ShowsProps> = ({
    hostId
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
                            Array(10).fill(0).map((_, index) => (
                                <EventWithTicketsListItem
                                    key={index}
                                    image='https://www.tomorrowland.com/src/Frontend/Themes/tomorrowland/Core/Layout/images/timeline/2023-1.jpg'
                                    name={'Follower #' + index}
                                    ticketsSold={index}
                                    onPress={() => console.log('event pressed')}
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