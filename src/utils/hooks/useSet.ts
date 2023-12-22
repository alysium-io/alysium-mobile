import { useState } from 'react'

interface IUseSet<T> {
    items: Set<T>
    toggleItem: (itemId: T) => T[]
    setItems: (items: Set<T>) => void
}

const useSet = <T>(ids: T[] = []) : IUseSet<T> => {

    const [items, setItems] = useState(new Set(ids))

    const toggleItem = (itemId: T) : T[] => {
        const newSelection = new Set(items)
        if (items.has(itemId)) {
            newSelection.delete(itemId)
        } else {
            newSelection.add(itemId)
        }
        setItems(newSelection)
        return Array.from(newSelection)
    }
    
    return {
        items,
        setItems,
        toggleItem
    }
}

export default useSet