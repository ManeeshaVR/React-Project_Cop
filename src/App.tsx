import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import './App.css'
import Member from "./components/Member";
import Deposit from "./components/Deposit";
import Home from "./components/Home";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import React from "react";
import Transaction from "./components/Transaction";
import View from "./components/View";

function App() {

    const navStyle: React.CSSProperties = {
        position: 'fixed',
        zIndex: "999",
        width: '100%'
    }

    return(

        <Router>
            <div>
                <nav style={navStyle} className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <div className="navbar-brand" href="#">
                            <img src="../src/assets/cop-logo.png" alt="logo" className='logo'/>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/login'>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to='/'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/member'>Member</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/deposit'>Deposit</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/transaction'>Transaction</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/view'>View</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/member' element={<Member/>}></Route>
                    <Route path='/deposit' element={<Deposit/>}></Route>
                    <Route path='/transaction' element={<Transaction/>}></Route>
                    <Route path='/view' element={<View/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/signup' element={<SignUp/>}></Route>
                </Routes>
            </div>
        </Router>
    )
}

export default App
