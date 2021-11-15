import React from 'react'
import { NewReleaseBarItem } from './components/NewReleaseBarItem/NewReleaseBarItem'
import { NewReleaseSearchInput } from './components/NewReleaseSearchInput/NewReleaseSearchInput'

const NewReleaseBar: React.FC = () => {
    const newReleasesItens: { title: string, content: string }[] = [
        {
            title: 'Release Item 1',
            content: ''
        },
        {
            title: 'Release Item 1',
            content: ''
        },
        {
            title: 'Release Item 1',
            content: ''
        },
        {
            title: 'Release Item 1',
            content: ''
        },
        {
            title: 'Release Item 1',
            content: ''
        },
    ]

    return (
        <React.Fragment>
            <NewReleaseSearchInput />
            <div className="accordion" id="accordionExample1">
                <h3>New Releases</h3>
                {
                    newReleasesItens.map((item: { title: string, content: string }, index: number) =>
                        <NewReleaseBarItem
                            title={item.title}
                            content={item.content}
                            index={index}
                            key={`newReleaseBarItem-${index}`}
                        />
                    )
                }
                <h6>Show more</h6>
            </div>
        </React.Fragment>
    )
}

export { NewReleaseBar }