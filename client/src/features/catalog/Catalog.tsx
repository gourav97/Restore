import { Product } from "../../app/models/Products"
import ProducList from "./ProductList";
import { useState, useEffect } from "react";



export default function Catalog() {

    const [products, setProducts] = useState<Product[]>([]); // define type of product

    useEffect(() => {
      fetch('http://localhost:5000/api/products')
        .then(response => response.json())
        .then(data => setProducts(data))
    },[])
  
    

    return(
        <>
            <ProducList products={products}/>
        </>
    )
}