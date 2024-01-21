import React from 'react'
import { useHostPageContext } from '../hooks'
import { SheetRef } from '@hooks'
import {
    BottomSheet,
    BottomSheetHeader,
    BottomSheetListItemLink
} from '@organisms'


interface LinksBottomSheetProps {
    sheetRef: SheetRef
}

const LinksBottomSheet : React.FC<LinksBottomSheetProps> = ({
    sheetRef
}) => {

    const { data } = useHostPageContext()

    return (
        <BottomSheet sheetRef={sheetRef}>
            <BottomSheetHeader text='Links' />
            {/* {data?.links.map((link, index) => (
                <BottomSheetListItemLink
                    key={index}
                    text={link.title}
                    url={link.url}
                    border={index !== data.links.length - 1}
                />
            ))} */}
        </BottomSheet>
    )
}

export default LinksBottomSheet