import {use, useEffect, useState} from "react";

const Payment = ({cart,userCart,userid,deleteFunction})=>{
    console.log("cart: ", cart);
    console.log("usercart: ",userCart);


    const [cartValue,setCartValue]= useState(0);
    const [day,setDay]=useState("");
    const [month,setMonth]=useState("");
    const [year,setYear]=useState("");
    const [info,setInfo]=useState(false);

    useEffect(()=>{
        const totalValue = userCart.reduce((sum,product)=>sum+product.price*product.quantity,0)
        setCartValue(totalValue)
    },[cart])

    useEffect(()=>{
        const today = new Date();
        setDay(today.getDate());
        setMonth(today.getMonth()+1);
        setYear(today.getFullYear());
    },[])

    useEffect(()=>{

    },[info])

    const correctOrder = async ()=>{

        try {
            for(let data of cart){
                const response = await fetch('http://localhost:4000/api/orders',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({userID: data.userID,productID: data.productID,quantity: data.quantity,data:`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,price:"0"})

                });
                deleteFunction(data.productID,data.userID);
            }

            setInfo(true);

        }catch (err) {
            console.error('Error:', err);
        }
    }

    return(
        <div>
            <p>Total price: {cartValue}</p>
            <button onClick={correctOrder}>Confirm and pay</button>
            {(info)&&(
                <div>After receiving your package click 'Add opinion' on product page and share your opinion about our products!</div>
            )}
        </div>
    )
}
export default Payment;