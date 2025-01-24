import {useEffect, useState} from "react";
import Input from "./input";

const ProductCategory = ({products})=>{

    const [newProducts,setNewProducts]=useState([]);
    const [category,setCategory]=useState("All products")

    useEffect(() => {
        setNewProducts(products);
    }, [products]);



    useEffect(()=>{
        const menClothes = document.getElementById("men");
        const womenClothes = document.getElementById("women");
        const jewelery = document.getElementById("jewelery");
        const electronics = document.getElementById("electronics");
        const allProducts = document.getElementById("allProducts");

        const mensClothesCategory=()=> {
            const updateProducts = products.filter(product =>
                product.category ==="men's clothing"

        );
            setNewProducts(updateProducts);
            setCategory("men's clothing");

        }

        const womenClothesCategory=()=> {
            const updateProducts = products.filter(product =>
                product.category ==="women's clothing"

        );
            setNewProducts(updateProducts);
            setCategory("women's clothing");


        }

        const jeweleryCategory=()=> {
            const updateProducts = products.filter(product =>
                product.category === "jewelery"
            );
            setNewProducts(updateProducts);
            setCategory("jewelery");


        }

        const electronicsCategory=()=> {
            const updateProducts = products.filter(product =>
                product.category === "electronics"
            );
            setNewProducts(updateProducts);
            setCategory("electronics");

        }

        const allProductsCategory=()=> {
            setNewProducts(products);
            setCategory("All products")

        }

            menClothes.addEventListener("click",mensClothesCategory)
            womenClothes.addEventListener("click",womenClothesCategory)
            jewelery.addEventListener("click",jeweleryCategory)
            electronics.addEventListener("click",electronicsCategory)
            allProducts.addEventListener("click",allProductsCategory)


    },[products])


    return(
            <Input products={newProducts} category={category}/>
    )
}
export default ProductCategory;