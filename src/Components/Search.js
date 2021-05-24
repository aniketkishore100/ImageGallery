import { React, useRef } from 'react';
import { makeStyles, Paper, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';



export const Search = (props) => {

  const text = useRef("");
  function handleChange(e) {
    props.onChange(text.current.value)
  }
  return (

    <center>
      <div className='container d-flex justify-content-center'>

        <div class="input-group mb-3 ">
          <input type="text" ref={text} className="form-control custom-search" placeholder="Search free high resolution photos" />
          <div className="input-group-append">
            <button class="btn custom-btn" onClick={handleChange}><SearchIcon /></button>
          </div>

        </div>

      </div>
      
    </center>
  )

}