import React from 'react';
import {Search} from './Search'
export const Header = (props) => {
    return(
            <div className="container-fluid custom-nav">
              <div className="mt-2 mr-3 navbar-search">
              <Search value = {props.value} onChange={props.handleChange}/>
              </div>
              </div>
    )
}