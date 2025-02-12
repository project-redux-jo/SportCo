import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
   <nav> 
    <div className='bg-blue'>
        <ul className='flex justify-evenly'>
            <Link to = "/"><li>Home</li></Link>
            <Link to = "/aboutUs"><li>About us</li></Link>
            <Link to = "/contactUs"><li>Contact us</li></Link>
        </ul>
    </div>
   </nav>
  )
}

export default Navbar