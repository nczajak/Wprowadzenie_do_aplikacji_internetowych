import OrderDetails from "../components/orderDetails";
import {useEffect, useState} from "react";


const Order = ()=>{

    const [cart,setCart]=useState([]);
    const [user,setUser] = useState(()=>{
        const localData=localStorage.getItem("user");
        return localData ? JSON.parse(localData):-1;
    })


    useEffect(()=>{
        fetch('http://localhost:4000/api/productsInCarts')
            .then(res=>res.json())
            .then(data=>{
                const userProductsId = data.productsInCarts.filter(
                    item => item.userID === user.id
                );
                setCart(userProductsId);
            })
    },[])

    console.log(cart)
    return(
        <OrderDetails/>
    )
}
export default Order;