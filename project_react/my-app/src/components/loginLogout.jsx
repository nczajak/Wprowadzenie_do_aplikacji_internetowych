import {Link} from "react-router-dom";
import {useState} from "react";
import Logout from "./logout";

const LoginLogout = ()=>{

    const [user,setUser] = useState(()=>{
        const localData=localStorage.getItem("user");
        return localData ? JSON.parse(localData):-1;
    })

    const isLogIn=() =>{
        return user !== -1;
    }


    const logOut = ()=>{
        localStorage.setItem("user",JSON.stringify(-1));
        setUser(-1);
    }


    return (
        <>
            {(isLogIn()) &&
                (<Logout logout={logOut} user={user} />)

            }
            {(!isLogIn()) &&
                (
                    <div className="loginButtonHome">
                        <Link className="loginLink" to={`login`}>Log in</Link>
                    </div>
                )
            }
        </>
    )
}

export default LoginLogout;