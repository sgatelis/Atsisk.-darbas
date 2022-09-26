import {useRef, useEffect, useContext} from 'react';
import MainContext from '../context/MainContext';
import {useNavigate} from "react-router-dom"


const LoginRegistration = () => {

    const {socket, setUser} = useContext(MainContext)

    const nav = useNavigate()

    const refs = {
        username: useRef(),
        password1: useRef(),      
        password2: useRef(),       
        city: useRef(),       
        gender: useRef(),       
        age: useRef()       
    }

    function register() {

        const user  = {                      
            username: refs.username.current.value,
            password1: refs.password1.current.value,            
            password2: refs.password2.current.value,            
            city: refs.city.current.value,            
            gender: refs.gender.current.value,            
            age: refs.age.current.value            
        }

        console.log(user)

        const options = {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(user)
        }

        fetch("http://localhost:4000/register", options)
            .then(res => res.json())
            .then(data => {
                console.log(data)           
            })
    } 

    const ref = {
        username: useRef(),
        password: useRef()        
    }

    function login() {
        
        const user  = {                      
            username: ref.username.current.value,
            password: ref.password.current.value               
        }

        console.log(user)

        const options = {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(user),
            credentials: "include"
        }

        fetch("http://localhost:4000/login", options)
            .then(res => res.json())
            .then(data => {               
                if(!data.error){
                    setUser(data.data) 
                    socket.emit("login", data.data)                
                    nav("/profile")
                }
                console.log(data) 
                
            })
             
    }

    function autoLoginTrigger(e) {
        localStorage.setItem("autologin", String(e.target.checked))
    }

    useEffect(() => {
        const autologin = localStorage.getItem("autologin")

        if (autologin === "true") {
            const options = {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            }

            fetch('http://localhost:4000/autologin', options)
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        setUser(data.data.user)
                        nav('/profile')
                    }
                    console.log(data)
                })
        }
    }, [])

    return (
        <div className="login-registration d-flex align-center">
            
            <div className="register grow1 d-flex align-center flex-column">               
                <input ref={refs.username} type="text" placeholder="username"/>
                <input ref={refs.password1} type="text" placeholder="password 1"/>
                <input ref={refs.password2} type="text" placeholder="password 2"/>
                <input ref={refs.city} type="text" placeholder="city"/>
                <input ref={refs.gender} type="text" placeholder="gender"/>
                <input ref={refs.age} type="number" placeholder="user age"/>
               
                <button onClick={register}>Register</button>
            </div>

            <div className="login grow1 d-flex align-center flex-column">
                <input ref={ref.username} type="text" placeholder="username"/>
                <input ref={ref.password} type="text" placeholder="password"/>

                <div className='d-flex align-center flex-column checkbox'>
                    <label htmlFor='check'>Stay logged in</label>
                    <input onChange={autoLoginTrigger} type="checkbox" id="check"/>
                </div>
                
                <button onClick={login}>Login</button>
            </div>

        </div>
    );
};

export default LoginRegistration;