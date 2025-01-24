import React, {useState} from "react";
import {Link} from "react-router-dom";

const Register = ()=>{

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [repeatPassword,setRepeatPassword]=useState("")
    const [guard, setGuard]=useState(false);

    const correctRegister=async ()=> {
        try {
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            const data = await response.json();
            alert("Registered successfully!");
            setUsername("");
            setPassword("");
            setRepeatPassword("");
            setGuard(true);

        }catch (err) {
            console.error('Error:', err);
        }
    }
    return(
        <div>
            <div>
                <h3>register</h3>
                <div>
                    <p>username</p>
                    <input type="text" value={username} onChange={(e)=>{
                        setUsername(e.target.value);
                    }}/>
                    <p>password (minimalna długość hasła to 8)</p>
                    <input type="text" value={password} onChange={(e)=>{
                        setPassword(e.target.value);
                    }}/>
                    <p>repeat password </p>
                    <input type="text" value={repeatPassword} onChange={(e)=>{
                        setRepeatPassword(e.target.value);
                    }}/>
                </div>
                {(username.length===0 || password.length<8 || repeatPassword.length===0) &&
                    (<button disabled>register me</button> )
                }
                {(username.length>0 && password.length>7 && repeatPassword.length>0 && repeatPassword!==password) &&
                    (<button onClick={()=>alert("Passwords do not match!")}>register me</button>)
                }

                {(username.length>0 && password.length>7 && repeatPassword===password) &&
                    (<button onClick={()=> correctRegister()}>register me</button>)
                }
                {(guard) &&
                    (<div>
                        <p>Przejdź do strony logowania</p>
                        <Link to={`/login`}>log in </Link>
                    </div>)
                }
            </div>
        </div>
    )
}
export default Register;