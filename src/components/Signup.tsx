import React, {useState} from "react";
import {Link} from "react-router-dom";
import AxiosInstance from "../config/axiosInstance";

const SignUp: React.FC = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signup = async () => {
        try {
            const responese = await AxiosInstance.post('/users/register', {
                fullName, email, password
            });
            setFullName('');
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
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input value={fullName} type="text" className="form-control" placeholder="full name here"
                                   onChange={(e) => {
                                       setFullName(e.target.value);
                                   }}/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input value={email} type="email" className="form-control" placeholder="email here"
                                   onChange={(e) => {
                                       setEmail(e.target.value);
                                   }}/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input value={password} type="password" className="form-control" placeholder="password here"
                                   onChange={(e) => {
                                       setPassword(e.target.value);
                                   }}/>
                        </div>
                    </div>
                    <div className="col-12">
                        <br/>
                        <button className="btn btn-primary col-12" onClick={signup}>Register Now</button>
                        <br/>
                        <br/>
                        <Link to="/login" className='btn btn-outline-dark col-12'>Already have an account</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;