import React from 'react';
import { Container, Paper } from '@material-ui/core'
import Masonry from 'react-masonry-css';


export const Gallery = (props) => {

    const breakPoints = {
        default: 3,
        1100: 2,
        700:1
    }
    return (

<Container style={{ maxWidth:'80vw'}}>
<Masonry breakpointCols={breakPoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {props.images.map(imageObj => (
            <Paper  key={imageObj.id} elevation={3} style={{borderRadius: "8px"}}>
                <img style={{borderRadius: "8px"}} src={`https://farm${imageObj.farm}.staticflickr.com/${imageObj.server}/${imageObj.id}_${imageObj.secret}.jpg`} className="image" />
            </Paper>
        ))}
    </Masonry>
</Container>
    )
}