
import { Button } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";



export default function Catalog() {
    const [products, setProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       agent.Catalog.list()
       .then(products => setProduct(products))
       .catch(error => console.log(error))
       .finally(() => setLoading(false))
    }, [])

    if(loading) return <LoadingComponent message='Loading products...'/>
   
    return (
        <>
            <ProductList products={products} />            
        </>
    )
}