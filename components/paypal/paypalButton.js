import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useState, useEffect } from "react"
import { Loader } from "semantic-ui-react"
import axios from "axios"

const PaypalButton = (props) => {

    const [orderID, setOrderID] = useState()

    const { ticket, quantity, name, email } = props

    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: "Envy Ticket Purchase",
                        amount: {
                            currency_code: "USD",
                            value: 10 * parseInt(quantity)
                        },
                        payee: {
                            email_address: process.env.NEXT_PUBLIC_PAYPAL_PAYEE_EMAIL_ADDRESS //payee email address from Paypal
                        },
                    }
                ],
                application_context: {
                    shipping_preference: "NO_SHIPPING", //Optional context, to include shipping just delete this property..
                },
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    }

    function onApprove(data, actions) {
        //This function is called when a transaction is successful .. 
        // Hence database base operations concerning the transaction can be implement here 

        const mailDetails = {
            name,
            amount: 10 * parseInt(quantity),
            userEmail: email
        }
        return actions.order.capture().then(function (details) {
            axios.post("/api/event/purchase", mailDetails) //Send Mail to client after successful purchase..
            //Also deduce number of tickets bought from firestore document .. Left that function out purposely.
            console.log(details)
        });
    }

    function onError(err) {
        console.log(err)
    }

    return (
        <>
            <PayPalScriptProvider deferLoading={true} options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_DEVELOPMENT_CLIENT_ID }}>
                <LoadScriptButton />
                <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} disabled={ticket ? false : true} style={{ layout: "horizontal", color: "gold", shape: "pill" }} />
            </PayPalScriptProvider>
        </>
    )
}

function LoadScriptButton() {
    const [{ isResolved, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "setLoadingStatus",
            value: "pending"
        });
    }, [dispatch])

    return (
        <>
            {isPending ? <Loader inline="centered" active /> : null}
        </>
    );
}

export default PaypalButton