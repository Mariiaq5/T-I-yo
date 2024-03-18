import './Home.css';
import React from 'react';
import { useNavigate } from "react-router-dom";

const Home = (props) => {
const userString = localStorage.getItem("users");
const userLS = JSON.parse(userString);
const navigate = useNavigate();
    return (
        <div>
            <div className="banner-container">
                <div className="text-center">
                    <h1 className=" text-6xl">Welcome to T-I-yo</h1>
                    <h2 className="text-4xl mt-8 text-white">Travel brings power and love back into your life.</h2>
                    { userLS.admin == true ? (
                        <>
                    <button class="btn btn-outline-success btn-sm" onClick={() => navigate(`/users`)}>Users List</button>
                        </>
                    ) : (<></>)
                    }

                </div>
            </div>
        </div>
    );
};
export default Home;