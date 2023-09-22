import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './Signupvalidation';
import axios from 'axios';
import Navbar from './navbar';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        cnfpassword: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }
    const handleSubmit = (event) => {

        event.preventDefault();
        setErrors(Validation(values));
        if (errors.name === "" && errors.email === "" && errors.password === "" && errors.cnfpassword === "") {
            alert('signup successfully')
            axios.post('http://localhost:8081/signup', values)
                .then(res => {
                    navigate('/');
                })
                .catch(err => console.log(err));
        }
    }
    return (
        <>
            <div className='maindiv'>
                <Navbar />
                <div class="background">
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>
                <form action='' method='post' onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
                    <label>Name</label>
                    <input type="text" placeholder="User name" id="name" name="name"
                        onChange={handleInput} />
                    {errors.name && <span className='text-danger'> {errors.name}</span>}
                    <label>Email</label>
                    <input type="text" placeholder="Email"  id="username" name="email"
                        onChange={handleInput} />
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                    <label>Password</label>
                    <input type="password" placeholder="Password" id="password" name="password"
                        onChange={handleInput} />
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" id="cnfpassword" name="cnfpassword"
                        onChange={handleInput} />
                    {errors.cnfpassword && <span className='text-danger'> {errors.cnfpassword}</span>}
                    <button type="submit">Sign Up</button>
                    {/* <div class="credit1"><a className='log' href="/">Already I have an Account</a></div> */}
                    <div class="credit">
                        <Link id="loginlink" to="/">Already I have an Account</Link>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Signup;