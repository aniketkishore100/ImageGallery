import { React, useRef } from 'react';
import SearchIcon from '@material-ui/icons/Search';

export const Search = (props) => {

  const text = useRef(""); //references to the current state of the search bar
  function handleChange(e) {
    window.scrollTo({
      top: 0,
    });
    props.onChange(text.current.value)
  }

  const handleKeypress = e => {
    //triggers by pressing the enter key
    if (e.which == 13) {
      handleChange();
    }
  };
  return (

    <center>
      <div className='container d-flex justify-content-center'>
        <div className="input-group mb-3 ">
          <input type="text" ref={text} onKeyPress={handleKeypress} className="form-control custom-search" placeholder="Search free high resolution photos" />
          <div className="input-group-append">
            <button className="btn custom-btn" onClick={handleChange}><SearchIcon /></button>
          </div>
        </div>
      </div>
    </center>
  )

}