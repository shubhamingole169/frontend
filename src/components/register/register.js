import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory()

    const [ user, setUser] = useState({
        name:"",
        dob:"",
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    
    

    const register = () => {
            const { name, dob, email, password } = user
            if( name && dob && email && password){
            
            axios.post("https://elansol-backend.onrender.com/register", user)
            .then( res => {
                history.push("/login")
            })
        } else {
            alert("invlid input")
        }
        
    }

    return (
        
        <div className="register">
        {console.log("User", user)}
        <h1>Register</h1>
        <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></input>
        <input type="date" name="dob" value={user.dob} placeholder="Date of Birth" onChange={handleChange}></input>
        <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
        <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}></input>
        <div className="button-container">
                <div className="button" onClick={register}>Register</div>
        </div>
        <div className="button-container">
                <div className="button" onClick={() => history.push("/login")}>Login</div>
        </div>
        </div>
    )
}

export default Register