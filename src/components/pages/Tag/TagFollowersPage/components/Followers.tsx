import React from 'react'
import { View } from '@atomic'
import { ScrollView } from 'react-native'
import { Thinput } from '@molecules'
import { ListContainer, UserWithUsernameListItem } from '@organisms'


interface FollowersProps {
    tagId: number;
}

const Followers : React.FC<FollowersProps> = ({
    tagId
}) => {

    return (
        <View>
            <ScrollView alwaysBounceVertical={false}>
                <View margin='m'>
                    <Thinput
                        icon='search'
                        onChangeText={(text) => console.log(text)}
                        placeholder='Search Followers'
                    />
                </View>
                <View marginHorizontal='m'>
                    <ListContainer>
                        {
                            Array.from({ length: 10 }).map((_, index) => (
                                <UserWithUsernameListItem
                                    key={index}
                                    image='https://www.tomorrowland.com/src/Frontend/Themes/tomorrowland/Core/Layout/images/timeline/2023-1.jpg'
                                    name={'follower #' + index}
                                    username={'follower #' + index}
                                    onPress={() => console.log('pressed ' + index)}
                                />
                            ))
                        }
                    </ListContainer>
                </View>
            </ScrollView>
        </View>
    )
}

export default Followers