import React from 'react'
import { Text } from '@atomic'


interface ListItemRankProps {
    rnk: number
}

const ListItemRank : React.FC<ListItemRankProps> = ({ rnk }) => {
    return <Text variant='paragraph-medium' marginRight='m'>{rnk}</Text>
}

export default ListItemRank