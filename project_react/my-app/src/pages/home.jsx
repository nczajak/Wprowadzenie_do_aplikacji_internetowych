import React, {useState} from 'react';
import Products from '../components/products'
import Logo from '../components/logo'
import Navigation from '../components/navigation'
import Description from "../components/description";
import Footer from "../components/footer";
import LoginLogout from "../components/loginLogout";
import BucketComponent from "../components/bucketComponent";
import {Link} from "react-router-dom";


const Home =({products})=>{
    console.log("jestes w domu")


    const [user,setUser] = useState(()=>{
        const localData=localStorage.getItem("user");
        return localData ? JSON.parse(localData):-1;
    })

    return (
        <>
            <div className="app">
                <div>
                    <Logo/>
                    <div>

                    </div>
                    <div className="loginBucket">
                        {user === -1 ? (
                            <Link to={`/login`}>Bucket</Link>
                        ):(
                            <BucketComponent/>
                        )}
                        <LoginLogout/>
                    </div>

                </div>
                <div className="home_nav_prod">
                    <div>
                        <Navigation/>
                    </div>
                    <div>
                        <Description/>
                        <Products products={products}/>
                    </div>
                </div>
                <div>
                    <Footer/>
                </div>

            </div>
        </>

    )
};
export default Home;