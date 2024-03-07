import React from 'react'
import { SimpleGrid } from 'react-native-super-grid'
import LargeSelectableItem from './LargeSelectableItem'
import { LargeSelectableItemData } from './shared'
import { useSet } from '@hooks'
import { generateId } from '@etc'


const listKey = generateId()

interface LargeSelectableItemListProps {
    data: LargeSelectableItemData[]
    onPress: (arr: number[]) => void
}

const LargeSelectableItemList : React.FC<LargeSelectableItemListProps> = ({
    data,
    onPress
}) => {

    const {
        items,
        toggleItem
    } = useSet<number>()

    const _onPress = (id: number) => {
        const newItems = toggleItem(id)
        onPress(newItems)
    }

    return (
        <SimpleGrid
            listKey={listKey}
            spacing={10}
            maxItemsPerRow={2}
            data={data}
            renderItem={({ item }) => (
                <LargeSelectableItem
                    key={item.id}
                    text={item.title}
                    icon={item.icon}
                    selected={items.has(item.id)}
                    onPress={() => _onPress(item.id)}
                />
            )}
        />
    )
}

export default LargeSelectableItemList