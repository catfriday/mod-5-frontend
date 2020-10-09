import React from 'react'
import { Link }  from 'react-router-dom'

const LoginSignUp = (props) => {

    return(
        <div>
            <div>
                <Link to='/create_profile'>Create Profile</Link>
                <h3>or</h3>
                <form onSubmit={(e) => props.login(e)}>
                    <label>Login</label><br></br>
                    <input name="email" type="text" placeholder='email'></input>
                    <input name="password" type="text" placeholder='password'></input>
                    <input type="submit"/>
                </form>
            </div>
        
        {/* <Link to="/movies"> Show All Movies </Link>  */}


        </div>)
}

export default LoginSignUp
