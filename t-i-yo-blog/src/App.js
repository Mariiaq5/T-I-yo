import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Header";
import ApplicationView from "./Components/ApplicationView";
import { useEffect } from 'react';
import Authorize from './Components/Authorize';
import "./App.css";
import { useNavigate } from 'react-router-dom';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);


    useEffect(() => {
        if (!localStorage.getItem("users")) {
            setIsLoggedIn(false) 
        }
    }, [isLoggedIn])
    
    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {isLoggedIn ?
                <ApplicationView />
                :
                <Authorize setIsLoggedIn={setIsLoggedIn} />
            }
        </Router>
    );
}
export default App;
