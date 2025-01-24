import {useEffect, useState} from "react";
import SumOfPrices from "../components/sumOfPrices";
import Footer from "../components/footer";
import OrderDetails from "../components/orderDetails";
import {Link} from "react-router-dom";

const BucketPage =()=>{

    const [cart,setCart]=useState([]);
    const [products,setProducts]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [orderDetailsComponent,setOrderDetailsComponent]=useState(false);
    const [deleteComponent,setDeleteComponent]=useState(true);

    const [user,setUser] = useState(()=>{
        const localData=localStorage.getItem("user");
        return localData ? JSON.parse(localData):-1;
    })

    useEffect(()=>{
        Promise.all([
            fetch('http://localhost:4000/api/productsInCarts')
                .then(res=>res.json())
                .then(data=>{
                    const userProductsId = data.productsInCarts.filter(
                        item => item.userID === user.id
                    );
                    setCart(userProductsId);
                }),
            fetch('http://localhost:4000/api/products')
                .then(res => res.json())
                .then(data=> {
                    setProducts(data.products);
                })
        ]).finally(()=>{
            setIsLoading(false)
            });
    },[user]);

    const userProducts = cart.map(cartItem => {
        const product =products.find(prod => prod.id === cartItem.productID)
        return { ...product, quantity: cartItem.quantity };
    })

    const deleteFromCart = async (productId,userId)=>{
        console.log("prodid: ",productId)
        console.log("uid: ",userId)

        try{
            const response = await fetch(`http://localhost:4000/productsInCarts/${productId}/${userId}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(response.ok){
                setCart(prevCart=>prevCart.filter(item=>item.productID!==productId))
            }

        } catch (error) {
            console.error('Błąd podczas usuwania z koszyka:', error);
        }
    }
    const showOrderDetails =()=>{
        setOrderDetailsComponent(true);
        setDeleteComponent(false);
    }
    useEffect(()=>{

    },[deleteComponent]);

    if (isLoading) {
        return <p></p>;
    }

    return(
        <>
            <div>
                {userProducts.map((data, id) => (
                    <div key={id}>
                        <div>
                            <img src={data.image} alt={"productPhoto"} width="40px" height="40px"/>
                        </div>
                        <div>
                            {data.title}
                        </div>
                        <div>
                            Category: {data.category}
                        </div>
                        <div>
                            Price {data.price} $
                        </div>
                        <div>
                            Quantity: {data.quantity}
                        </div>
                        {(deleteComponent)&& (
                            <button onClick={() => deleteFromCart(data.id, user.id)}>delete from cart</button>
                        )}
                    </div>
                ))}
                <SumOfPrices cart={userProducts}/>
                <button onClick={showOrderDetails}>Place Order</button>
                {(orderDetailsComponent)&&(
                    <OrderDetails cart={cart} userCart={userProducts} user={user.id} deleteFunction={deleteFromCart} />
                )}

            </div>
            <Footer/>

        </>

)
}
export default BucketPage;