import React, { useState, useEffect } from 'react';
import {Paper, Typography} from '@material-ui/core';
import {Search} from './Search'
import Image from '../spenny.jpg'
import Logo from '../logo.png'

export const Banner = (props) => {
    return (
        <div className='container-fluid header mb-5'>
            <div className='row '>
                <div className='col-1'>
                    <a href="/">
                <img src="../logo.png"></img>
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