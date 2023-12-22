import React from 'react'
import { useNavigation } from '@hooks'
import { useArtistPageContext } from '../hooks'
import { SectionHeader } from '@molecules'
import {
    ListContainer,
    TagWithRankListItem
} from '@organisms'

const data = {
    "data": {
        "id": 1,
        "attributes": {
            "spotify_image": "https://i.scdn.co/image/ab6761610000e5ebda9a10f67a550b3b3e7d71b7",
            "spotify_url": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ",
            "spotify_followers": 323,
            "spotify_artist_id": "1Xyo4u8uXC1ZmMpatF05PJ",
            "spotify_name": "Mesto",
            "spotify_popularity": 100,
            "spotify_genres": "canadian contemporary r&b,canadian pop,hip hop,neo soul,pop,r&b,toronto rap",
            "short": "Dutch DJ & Producer",
            "color": "#ffffff",
            "bio": "Mesto is a Dutch DJ and record producer. He is best known for his collaboration with Martin Garrix, \"Bouncybob\", which was released on 18 December 2015. He has released songs on Spinnin' Records, Musical Freedom, and Revealed Recordings. He has performed at festivals including Tomorrowland, Creamfields, and Mysteryland.",
            "genres": {
                "data": [
                    {
                        "id": 1,
                        "attributes": {
                            "name": "canadian contemporary r&b",
                            "color": "B0E0E6",
                            "rank": "2",
                            "createdAt": "2021-03-16T20:00:00.000Z",
                            "updatedAt": "2021-03-16T20:00:00.000Z"
                        }
                    },
                    {
                        "id": 2,
                        "attributes": {
                            "name": "canadian pop",
                            "color": "F3A0F0",
                            "rank": "6",
                            "createdAt": "2021-03-16T20:00:00.000Z",
                            "updatedAt": "2021-03-16T20:00:00.000Z"
                        }
                    },
                    {
                        "id": 3,
                        "attributes": {
                            "name": "hip hop",
                            "color": "FFD700",
                            "rank": "12",
                            "createdAt": "2021-03-16T20:00:00.000Z",
                            "updatedAt": "2021-03-16T20:00:00.000Z"
                        }
                    },
                    {
                        "id": 4,
                        "attributes": {
                            "name": "neo soul",
                            "color": "D2691E",
                            "rank": "24",
                            "createdAt": "2021-03-16T20:00:00.000Z",
                            "updatedAt": "2021-03-16T20:00:00.000Z"
                        }
                    }
                ]
            },
            "createdAt": null,
            "updatedAt": null
        }
    },
    "meta": {}
}

const TagsSection : React.FC = () => {

    const { tagPage } = useNavigation()
    // const { data } = useArtistPageContext()

    if (!data || data.data.attributes.genres.data.length === 0) return null

    return (
        <ListContainer>
            <SectionHeader text='Tags' />
            {data.data.attributes.genres.data.map((item, index) => {
                return (
                    <TagWithRankListItem
                        key={index}
                        name={item.attributes.name}
                        color={item.attributes.color}
                        rank={index}
                        onPress={() => tagPage(item.id)}
                    />
                )
            })}
        </ListContainer>
    )
}

export default TagsSection