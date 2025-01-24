import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const Login=()=>{

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [users,setUsers]=useState("");

    useEffect(()=>{
        fetch('http://localhost:4000/api/users')
            .then(res=>res.json())
            .then(data=>{
                setUsers(data.users);
            });
    },[]);

    const appendToStorage=(user)=>{
        const userid=[user.id];
        localStorage.setItem("user",JSON.stringify({id: user.id, username: user.username, password: user.password}));
    }

    const correctLogin = ()=>{
        let flag=false;
        users.forEach(user=>{
            if(user.username === username && user.password===password){
                appendToStorage(user);
                alert("log in successfully");
                flag=true;
            }
        })
        if (!flag){
            alert("you are not registered")
        }
    }
   return (
       <div>
          <div>
             <h3>Log in to fully enjoy our website, add products to your cart, and leave reviews for products.</h3>
              <div>
                  <p>username</p>
                  <input type="text" value={username} onChange={(e) => {
                      setUsername(e.target.value);
                  }}/>
                  <p>password</p>
                  <input type="text" value={password} onChange={(e) => {
                      setPassword(e.target.value);
                  }}/></div>
              <button onClick={correctLogin}>log in</button>
          </div>
           <div>
               <Link to={`register`}>If you don't have an account click here to register</Link>
          </div>
       </div>

   )
}
export default Login;