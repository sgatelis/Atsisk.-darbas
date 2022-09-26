import {useContext, useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import MainContext from '../context/MainContext'


const ProfilePage = () => {

  const {user, setUser} = useContext(MainContext) 

  const nav = useNavigate()
  
  const photoRef = useRef()
  
  
  const newPhotoArr = []

  function changePhoto() {

    
    const newPhoto = photoRef.current.value
    newPhotoArr.push(newPhoto)
    console.log(newPhoto, newPhotoArr, user);

    const newUser = {
      username: user.username,
      newPhoto
    }

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newUser)
      
    }

    fetch("http://localhost:4000/updatePhoto", options)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setUser(data.data)
          // socket.emit("login", data.data)          
        }
        console.log(data)
      })
          
  }
      useEffect(() => {
        
          if(user.photo.length >= 2){
            user.photo.shift() 
            console.log(user.photo); 
        }
        
       
        
          if (user.photo.length >= 2){
            setTimeout(() => {            
          nav("/filter")            
          }, 5000)
          }      
          
        
      }, [user])

          

  function logout() {

    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json"
      },
      credentials: "include"
    }

    fetch('http://localhost:4000/logout', options)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          localStorage.setItem("autologin", "false")
          nav("/")
          console.log(data)
        }
      })
  }

  
  return (
    <div className='user'>
      <div>
         <button onClick={logout}>Logout</button>
      </div>
     
      <div className='profile'>
        {user.photo.map((x, i) => <div key={i}><img src={x} alt="photo"/></div> )}
      </div> 
       <input ref={photoRef} type="text" placeholder="photo url" />
       <button onClick={changePhoto}>ADD PHOTOS</button>
      
    </div>
  )
}

export default ProfilePage
