import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../app/store/configuureStore.";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/basketSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";

const stripePromise = loadStripe('pk_test_51Nd7nHD1dRUiREd2gViyC1KNusKfydPaA5GzN0Iv0zuWPqL21SY1XXoLdRx2OwdZcSDpiHGSA6nZolKXZIsiN9e9000FlR7E0t');

export default function CheckoutWrapper() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        agent.Payments.createPaymentIntent()
            .then(basket => dispatch(setBasket(basket)))
            .catch(e => console.log(e))
            .finally(() => setLoading(false))
    }, [dispatch]);

    if(loading) return <LoadingComponent message="Loading checkout....."/>
    
    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage/>
        </Elements>
    )
}