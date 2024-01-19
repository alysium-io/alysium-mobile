import React from 'react'
import { Section } from '@atomic'
import { useArtistPageContext } from '../hooks'
import { SheetRef } from '@hooks'
import {
    BottomSheet,
    BottomSheetListItemLink,
    BottomSheetHeader
} from '@organisms'


interface LinksBottomSheetProps {
    sheetRef: SheetRef
}

const LinksBottomSheet : React.FC<LinksBottomSheetProps> = ({
    sheetRef
}) => {

    const { data } = useArtistPageContext()

    return (
        <BottomSheet sheetRef={sheetRef}>
            <BottomSheetHeader text='Links' />
            <Section margin='none'>
                {/* {data?.links.map((link, index) => (
                    <BottomSheetListItemLink
                        key={index}
                        text={link.title}
                        url={link.url}
                        border={index !== data?.links.length - 1}
                    />
                ))} */}
            </Section>
        </BottomSheet>
    )
}

export default LinksBottomSheet