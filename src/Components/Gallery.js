import React from 'react';
import { Container, Paper } from '@material-ui/core'
import {CustomMasonry} from './CustomMasonry';

export const Gallery = (props) => {

    const breakpointColumnsObj = {
        default: 3,
        1000: 2,
        500: 1
      };
    return (

<CustomMasonry
  breakpointCols={breakpointColumnsObj}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">
  {props.images.map(imageObj => (
            <div>
                <img style={{borderRadius: "8px"}} src={`https://farm${imageObj.farm}.staticflickr.com/${imageObj.server}/${imageObj.id}_${imageObj.secret}.jpg`} className="image2" />
            </div>
        ))}
</CustomMasonry>

    )
}