import React from 'react'
import { ProfileCarousel, ProfileCarouselItem } from '@organisms'


interface RelatedProfilesSectionProps {
    items: {
        itemId: number;
        image: string;
        title: string;
        subtitle: string;
    }[] | undefined;
    title?: string;
}

const RelatedProfilesSection : React.FC<RelatedProfilesSectionProps> = ({
    items,
    title
}) => {

    if (!items || items.length === 0) return null

    return (
        <ProfileCarousel title={title}>
            {items.map(item => (
                <ProfileCarouselItem
                    key={item.itemId}
                    image={item.image}
                    name={item.title}
                    subheader={item.subtitle}
                    onPress={() => console.log('Pressed')}
                    onPressButton={() => console.log('Pressed button')}
                />
            ))}
        </ProfileCarousel>
    )
}

export default RelatedProfilesSection