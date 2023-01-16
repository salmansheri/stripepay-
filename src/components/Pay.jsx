import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import Axios from "axios";

const KEY =
  "pk_test_51MQktJSIAirQdLTsgCPnNeUVwxcW4aN3oX3W1R58nadPXy0XmF3IJHEP7QiebbFoupqE479mojW5i7qe3zRXcI8o00Xf36J3Sv";

function Pay() {
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await Axios.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken]);
  return (
    <div>
      <StripeCheckout
        name="ShoppingKart"
        billingAddress=""
        shippingAddress=""
        description="Your Total is "
        amount={2000}
        token={onToken}
        stripeKey={KEY}>
        <button>pay</button>
      </StripeCheckout>
    </div>
  );
}

export default Pay;
