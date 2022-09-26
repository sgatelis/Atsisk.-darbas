import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import mainContext from '../context/MainContext'


const SingleCard = () => {  

  const {quantity} = useContext(mainContext)
  const nav = useNavigate()

  function card() {

    nav("/likeDislikeHistory")

  }
    
  return (
    <div onClick={card} className="singleCard" >
      <div className='d-flex align-center'>
        <p className='likes'>People I liked</p>
        <p className='likes'>People who liked me</p>
      </div>     
      
      {/* <img src={liked.user.image} alt=""/>
      <h1>{liked.user.username}</h1> */}
      
    </div>
  )
}

export default SingleCard
