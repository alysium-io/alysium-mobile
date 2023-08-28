import React from 'react'
import { BasePage, Text } from '@atomic'
import { BasicList, BasicListItem } from '@molecules'
import { ArtistPageRouteProp } from '@types'
import { useRoute } from '@react-navigation/native'
import { useArtistQuery } from 'src/redux/api/base/baseApiSlice'
import { CreatorPageTemplate } from '@templates'
import { StyleSheet } from 'react-native'
import GenreAvatar from 'src/components/atomic/GenreAvatar'


const Artist = () => {

    const route = useRoute<ArtistPageRouteProp>()

    const { data, isLoading, error } = useArtistQuery({ artist_id: route.params.item_id })
    
    return (
        <BasePage>
            {
                data && (
                    <CreatorPageTemplate
                        image={data.data.attributes.spotify_image}
                        title={data.data.attributes.spotify_name}
                        subtitle={data.data.attributes.spotify_genres}
                        dominantColor='#9cd6ff'
                    >
                        <BasicList>
                            {
                                data.data.attributes.genres.data.map(genre => {
                                    return (
                                        <BasicListItem
                                            key={genre.id}
                                            title={genre.attributes.name}
                                            subtitle='genre'
                                            onPress={() => console.log('Pressed')}
                                            Profile={() => <GenreAvatar color={genre.attributes.color} />}
                                        />
                                    )
                                })
                            }
                        </BasicList>
                        <Text margin='m'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                            optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                            obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                            nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                            tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
                            sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                            recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
                            minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
                            quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
                            fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
                            consequuntur! Commodi minima excepturi repudiandae velit hic maxime
                            doloremque. Quaerat provident commodi consectetur veniam similique ad 
                            earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo 
                            fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
                            suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
                            modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
                            totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam 
                            quasi aliquam eligendi, placeat qui corporis!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                            optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                            obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                            nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                            tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
                            sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                            recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
                            minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
                            quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
                            fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
                            consequuntur! Commodi minima excepturi repudiandae velit hic maxime
                            doloremque. Quaerat provident commodi consectetur veniam similique ad 
                            earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo 
                            fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
                            suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
                            modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
                            totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam 
                            quasi aliquam eligendi, placeat qui corporis!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                            optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                            obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                            nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                            tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
                            sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                            recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
                            minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
                            quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
                            fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
                            consequuntur! Commodi minima excepturi repudiandae velit hic maxime
                            doloremque. Quaerat provident commodi consectetur veniam similique ad 
                            earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo 
                            fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
                            suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
                            modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
                            totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam 
                            quasi aliquam eligendi, placeat qui corporis!
                        </Text>
                    </CreatorPageTemplate>
                )
            }
        </BasePage>
    )
}

const styles = StyleSheet.create({
    container: {
        
    }
})

export default Artist