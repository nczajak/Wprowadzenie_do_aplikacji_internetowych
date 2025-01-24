import {useEffect, useState} from "react";

const SumOfPrices=({cart})=>{

    const [cartValue,setCartValue]= useState(0);

    useEffect(()=>{
        const totalValue = cart.reduce((sum,product)=>sum+product.price*product.quantity,0)
        setCartValue(totalValue)
    },[cart])


    return (
        <div>
            <p>cart Value: {cartValue}</p>
        </div>
    )
}
export default SumOfPrices;