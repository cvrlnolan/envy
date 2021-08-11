import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react'

const PaypalButton = (props) => {

    const [orderID, setOrderID] = useState();

    const { amount } = props

    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: "Envy Purchase",
                        amount: {
                            currency_code: "USD",
                            value: 10
                        },
                        payee: {
                            email_address: process.env.NEXT_PUBLIC_PAYPAL_PAYEE_EMAIL_ADDRESS //payee email address from Paypal
                        },
                    }
                ],
                application_context: {
                    shipping_preference: "NO_SHIPPING",
                },
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    }

    function onApprove(data, actions) {
        const paymentData = {
            orderID: data.orderID,
            amount
        }
        return actions.order.capture().then(function (details) {
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
                <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} disabled={amount === 0 ? true : false} style={{ layout: "horizontal", color: "gold", shape: "pill" }} />
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
            {isPending ? <Loader active /> : null}
        </>
    );
}

export default PaypalButton