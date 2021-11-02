import React from 'react'
import { INewReleaseBarItem } from './interfaces/INewReleaseBarItem'

const NewReleaseBarItem: React.FC<INewReleaseBarItem> = (props) => {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={`heading-${props.index}`}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${props.index}`} aria-expanded="false" aria-controls={`collapse-${props.index}`}>
                    {props.title}
                </button>
            </h2>
            <div id={`collapse-${props.index}`} className="accordion-collapse collapse" aria-labelledby={`heading-${props.index}`} data-bs-parent="#accordionExample1">
                <div className="accordion-body">
                    {
                        props.content === '' ?
                            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam a cupiditate reiciendis architecto consequuntur, minus accusamus aliquid dolor ut quaerat maxime deserunt, nesciunt reprehenderit laudantium deleniti voluptatum in pariatur sit."
                            :
                            props.content
                    }
                </div>
            </div>
        </div>
    )
}

export { NewReleaseBarItem }