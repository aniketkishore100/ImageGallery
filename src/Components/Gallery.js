import React from 'react';
import { CustomMasonry } from './CustomMasonry';

export const Gallery = (props) => {

    const breakPoints = { //breakpoints from responsiveness
        default: 3,
        1000: 2,
        500: 1
    };
    return (

        <CustomMasonry breakpointCols={breakPoints} className="grid" columnClassName="item">
            {props.images.map(imageObj => (
                <div>
                    <img className="grid-image" alt="" key={imageObj.id} src={`https://farm${imageObj.farm}.staticflickr.com/${imageObj.server}/${imageObj.id}_${imageObj.secret}.jpg`} />
                </div>
            ))}
        </CustomMasonry>

    )
}