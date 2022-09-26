import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import mainContext from '../context/MainContext'

const LikesDislakesPage = () => {

  const { socket, users, setUsers} = useContext(mainContext)

    const {index} = useParams()

    const nav = useNavigate()

    const [] = useState(null)
       
    function like(index) {
      nav("/likesDislikesHistory")
    }

    function dislike(index) {

    }
         
      
      
    // useEffect(() => {
    //     const options = {
    //       method: "POST",
    //       headers: {
    //       "content-type": "application/json"
    //       },
    //       body: JSON.stringify(updateUserMoney)
    //     }

    //     fetch("http://localhost:4000/updateMoney", options)
    //       .then(res => res.json())
    //       .then(data => {
    //         setUser(data.data)
    //       console.log(data)
    //     })    
        
    // },[totalAmount])

  
       
     
  return (
    
    <div> 
      <div className='d-flex f-wrap'>
        {users.map((x, i) => <div className='userCard' key={i}>

          {x.photo.map((x, i) => <div key={i}> <img src={x} alt="photo"/></div>)}
         
          <div className='title'>
            <h2>{x.username}</h2>
            <h2>{x.city}</h2>
            <h2>{x.age}</h2>
          </div>
          
        </div>
        )}
      </div>   
      
      <div className='d-flex'>

        <div>
            <button onClick={() => like(index)}>Like</button>
        </div>          
        <div>
            <button onClick={() => dislike(index)}>Dislike</button>
        </div>          
        
      </div>     
     
    </div>
  )
}

export default LikesDislakesPage
