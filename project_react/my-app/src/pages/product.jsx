import Logo from "../components/logo";
import Footer from "../components/footer";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import BucketComponent from "../components/bucketComponent";
import CommentForms from "../components/commentForms";
import Comments from "../components/comments";

const Product = ({products})=>{

    const { id } = useParams();
    const productId=parseInt(id,10);
    const[product,setProduct]=useState({});
    const [isCommentFormVisibile,setIsCommentFormVisibile] = useState(false);
    const [comments,setComments]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [canAdd,setCanAdd]=useState(true);
    const [quantity,setQuantity]=useState(0);
    const [orders,setOrders]=useState([]);

    const [user,setUser] = useState(()=>{
        const localData=localStorage.getItem("user");
        return localData ? JSON.parse(localData):-1;
    })

    useEffect(()=>{
        Promise.all([
            fetch(`http://localhost:4000/api/comments/${product.id}`)
                .then(res=>res.json())
                .then(data=>{
                    setComments(data.comments)
                }),
            fetch(`http://localhost:4000/api/orders`)
                .then(res=>res.json())
                .then(data=>{
                    const userOrders = data.orders.filter(
                        item=>item.userID===user.id
                    );
                    setOrders(userOrders)
                })
        ]).finally(()=>{
            setIsLoading(false)
        });
    },[product,user])

    console.log(orders,comments);


    const addToCart = async ()=>{
        if(user===-1){
            alert('you have to log in to add product to your cart')
        }
        else if(quantity<1 || quantity>product.rating){
            alert('quantity should be between 1 and remaining quantity')
        }
        else {

            try {

                const response = await fetch('http://localhost:4000/productsInCarts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({userid: user.id, productid: product.id, quantity: quantity}),
                });
                const data = await response.json();
                alert("added successfully!");
            } catch (err) {
                console.error('Error:', +err);
            }
        }
    }

    useEffect(()=>{
        products.forEach(prod=>{
            if(prod.id===productId){
                setProduct(prod);
            }
        })
    },)


    const createForm = () =>{
        setIsCommentFormVisibile(true);
    }

    useEffect(() => {
        if(user===-1){
            setCanAdd(false)
        }
        else {
            const matchingUser = comments.find(comment => user.id === comment.userID);
            const matchingProduct = orders.find(item=>item.productID===product.id);
            setCanAdd(!matchingUser && matchingProduct);
        }
    },[comments]);

    const refreshComments = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/comments/${product.id}`);
            const data = await response.json();
            setComments(data.comments);
        } catch (err) {
            console.error('Error fetching comments:', err);
        }
    };


    return (
        <>
            <div>
                <Logo/>
            </div>
            <div className="loginBucket">
                <BucketComponent/>
            </div>
            <div className="productAddingToCart">
                <div>
                    <div className="phototitle">
                        <img src={product.image} alt={"productPhoto"} width="400px" height="400px"/>
                        <h5>{product.title}</h5>
                        <p>{product.description}</p>
                    </div>
                </div>
                <div className="addingToCart">
                    <div>
                        <p className="desc">And you can be the proud owner of this wonderful item! </p>
                        <p className="select">Select the product quantity and add to your cart now!</p>
                        <div className="inputAddingButt">
                            <div className="remaining">
                                <div>Remaining quantity: {product.rating}</div>
                                <input className="quantity" type="number" value={quantity} onChange={(e) => {
                                    setQuantity(e.target.value)
                                }}/>
                            </div>
                            {user === -1 ? (
                                <Link to={`/login`}>Add to Cart</Link>
                            ) : (
                                <button className="addingToCartButt" onClick={addToCart}>Add to Cart</button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
            {(canAdd) && (
                <button onClick={createForm}>Add opinion</button>
            )}
            <CommentForms userid={user.id} productid={product.id} isVisible={isCommentFormVisibile} refreshComments={refreshComments}/>
            <Comments comments={comments} user={user} refreshComments={refreshComments} />
            <Footer/>
        </>

    )
}

export default Product;
