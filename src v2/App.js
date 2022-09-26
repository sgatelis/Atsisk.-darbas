import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainContext from "./context/MainContext"
import './App.css'
import LoginRegistration from './pages/LoginRegistration';
import ProfilePage from './pages/ProfilePage';
import FilterPage from './pages/FilterPage';
import LikesDislikesPage from './pages/LikesDislikesPage';
import LikesDislikesHistoryPage from './pages/LikesDislikesHistoryPage';
import io from "socket.io-client"
import Toolbar from './components/Toolbar';

const socket = io.connect("http://localhost:4000")


function App() {

    const [user, setUser] = useState()
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState()
    const [showToolbar, setShowToolbar] = useState(false)
    
    console.log(users);

    useEffect(() => {

        socket.on("login", (data) => {
            console.log(data);
        })
        socket.on("profile", data => {
            setUsers(data)
            console.log(data);
        })
    }, []) 

    
    
    return (
        <div className="App d-flex">
            <MainContext.Provider value={{user, setUser, users, setUsers, filteredUsers, setFilteredUsers, setShowToolbar, socket}}>
                <BrowserRouter>
                {showToolbar ? <Toolbar/> : null}
               
                <Routes>
                    <Route path='/' element={<LoginRegistration/>} ></Route>
                    <Route path='/profile' element={<ProfilePage/>} ></Route>
                    <Route path='/filter' element={<FilterPage/>} ></Route>                    
                    <Route path='/likesDislikes' element={<LikesDislikesPage/>} ></Route>
                    <Route path='/likesDislikesHistory' element={<LikesDislikesHistoryPage/>} ></Route>
                </Routes>            
            </BrowserRouter>
            </MainContext.Provider>         

         </div>

    );
}

export default App;