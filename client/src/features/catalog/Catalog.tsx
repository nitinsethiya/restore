
import ProductList from "./ProductList";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configuureStore.";
import { fetchProductsAsync, productSelector } from "./catalogSlice";



export default function Catalog() {
    const products = useAppSelector(productSelector.selectAll);
    const dispatch = useAppDispatch();
    const {productsLoaded, status} = useAppSelector(state => state.catalog);

    useEffect(() => {
       if(!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    if(status.includes('pending')) return <LoadingComponent message='Loading products...'/>
   
    return (
        <>
            <ProductList products={products} />            
        </>
    )
}