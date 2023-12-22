import React from 'react'
import { View } from '@atomic'
import ProfileCarouselHeader from './ProfileCarouselHeader'
import { ScrollView, StyleSheet } from 'react-native'


interface ProfileCarouselProps {
    children: React.ReactNode;
    title?: string;
}

const ProfileCarousel : React.FC<ProfileCarouselProps> = ({
    children,
    title
}) => {

    return (
        <View>
            { title && <ProfileCarouselHeader title={title} /> }
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                alwaysBounceHorizontal={false}
                style={styles.scrollView}
            >
                { children }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1
    }
})

export default ProfileCarousel