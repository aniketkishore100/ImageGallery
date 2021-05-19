import React from 'react';



export const Gallery = (props) => {

const RenderCard = props.images.map(imageObj=>{
    return(
        <div>
       <img src= {`https://farm${imageObj.farm}.staticflickr.com/${imageObj.server}/${imageObj.id}_${imageObj.secret}.jpg`} />

        </div>
    )
})
return(
    <div>
        {RenderCard}
    
    </div>
)
}


// export default Header;