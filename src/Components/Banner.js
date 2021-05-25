import React from 'react';
import {Search} from './Search'
import logo from '../logo.png'

export const Banner = (props) => {
    return (
        <div className='container-fluid header mb-5'>
            <div className='row '>
                <div className='col-1'>
                    <a href="/">
                <img alt="banner logo"src={logo}></img>
                </a>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 mb-auto'>
                    <h2 className='title display-2'>Gallery</h2>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                <Search value = {props.value} onChange={props.handleChange}/>
                </div>
            </div>
        </div>
    );
}


// export default Header;