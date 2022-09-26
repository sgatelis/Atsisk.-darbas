import React from 'react'
import { Link } from 'react-router-dom'

const Toolbar = () => {
    
  return (
    <div className='toolbar'>
      <Link to="/">Login</Link>
      <Link to="/filter">Filter</Link>
      <Link to="/likesDislikesHistory">Like History</Link>
    </div>
  )
}

export default Toolbar
