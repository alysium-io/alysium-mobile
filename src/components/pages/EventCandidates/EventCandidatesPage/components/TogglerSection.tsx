import React from 'react'
import { Section } from '@atomic'
import { TabToggler } from '@molecules'
import useEventCandidatesPageContext from '../hooks/useEventCandidatesPageContext'


const TogglerSection = () => {

    const { setToggleFilterId } = useEventCandidatesPageContext()

    return (
        <Section margin='m' marginTop='none'>
            <TabToggler
                data={[
                    { id: 0, text: 'all' },
                    { id: 1, text: 'active' }
                ]}
                defaultActiveTab={0}
                onChange={(id: number) => setToggleFilterId(id)}
            />
        </Section>
    )
}

export default TogglerSection