import {React,useEffect,useState} from 'react';
import {Search} from './Search'
export const Header = (props) => {
    const [scrollPos, setscrollPos] = useState(0)
    const [show, setShow] = useState(true)

    useEffect(()=>{
        window.addEventListener('scroll',handleScroll)

        return ()=>{
            window.removeEventListener('scroll',handleScroll)
        }
    },[])
const handleScroll = () =>{
    console.log(document.body.getBoundingClientRect().top)
    setscrollPos(document.body.getBoundingClientRect().top)
    setShow(document.body.getBoundingClientRect().top > scrollPos-290)
}
{console.log(show , scrollPos)}
    return(
        
        <div className={show?'nav-hidden':'nav-active'}>
            <div className="container-fluid custom-nav">
              <div className="mt-2 mr-3 navbar-search">
              <Search value = {props.value} onChange={props.handleChange}/>
              </div>
              </div>
              </div>
    )
}