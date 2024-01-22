import React, {useState} from "react";
import {Link} from "react-router-dom";
import AxiosInstance from "../config/axiosInstance";

const Login: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const responese = await AxiosInstance.post('/users/login', {
                email, password
            });

            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 2);

            const cookieValue = encodeURIComponent('token') + '=' + encodeURIComponent(responese.data) + '; expires=' + expirationDate.toUTCString() + 'path=/';
            document.cookie = cookieValue;

            setEmail('');
            setPassword('');
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <br/><br/><br/><br/><br/>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" placeholder="email here" onChange={(e) => {
                                setEmail(e.target.value);
                            }}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" placeholder="password here"
                                   onChange={(e) => {
                                       setPassword(e.target.value);
                                   }}/>
                        </div>
                    </div>
                    <div className="col-12">
                        <br/>
                        <button className="btn btn-primary col-12" onClick={login}>Login</button>
                        <br/>
                        <br/>
                        <Link to="/signup" className='btn btn-outline-dark col-12'>Sign up</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;