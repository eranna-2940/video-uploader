import Navbar from './navbar';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './Loginvalidation';
import axios from 'axios';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const history = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
        localStorage.setItem('email', values.email)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if (errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/login', values)
                // console.log(values)
                .then(res => {
                    if (res.data === "Success") {
                        history('/home')
                    } else {
                        alert("No record existed");
                    }

                })
                .catch(err => console.log(err));
        }
    }
    return (
        <>
            <Navbar />
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form action='' onSubmit={handleSubmit}>
                <h3>Login</h3>
                <label>Email</label>
                <input type="text" placeholder="Email" id="username" name="email"
                    onChange={handleInput} />
                {errors.email && <span className='text-danger'> {errors.email}</span>}
                <label>Password</label>
                <input type="password" placeholder="Password" id="password" name="password"
                    onChange={handleInput} />
                {errors.password && <span className='text-danger'> {errors.password}</span>}
                <button type="submit">Log In</button>
                <div class="credit"><a href="##">Forgot Password</a>
                    <Link className='sig' to='/signup'>Create New Account</Link>
                </div>

            </form>

        </>
    )
}
export default Login;