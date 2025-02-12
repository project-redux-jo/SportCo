import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// تحميل مفتاح Stripe
const stripePromise = loadStripe("pk_test_51QrCkKQi0GNPsTf97yoOWNd3d8A8Qr5C8OKtcgdonIyS88G42mhUw613K2hGWmu1lJIuLBMPaCksViPIGUGP2xsz0090Ar0ZdJ");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(""); // حالة لحفظ المبلغ المدخل
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // التحقق من أن المبلغ صالح
    if (!amount || isNaN(amount) || amount <= 0) {
      setPaymentStatus("❌ الرجاء إدخال مبلغ صالح.");
      return;
    }

    try {
      const response = await fetch(
        "https://console.firebase.google.com/project/redux-project-791e5/usage/details",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: Number(amount) * 100 }), // تحويل المبلغ إلى سنتات
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "⚠️ حدث خطأ أثناء إنشاء الدفع.");
      }

      // تأكيد الدفع باستخدام PaymentIntent
      const cardElement = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: cardElement },
      });

      if (error) {
        setPaymentStatus("❌ خطأ في الدفع: " + error.message);
      } else if (paymentIntent.status === "succeeded") {
        setPaymentStatus("✅ تمت عملية الدفع بنجاح!");
      }
    } catch (error) {
      setPaymentStatus("❌ خطأ: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Stripe Payment</h1>
      <form onSubmit={handleSubmit}>
        {/* إدخال المبلغ */}
        <input
          type="number"
          placeholder="أدخل المبلغ بالدولار"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        
        {/* إدخال بيانات البطاقة */}
        <CardElement
          className="p-2 border rounded mb-4"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
        
        {/* زر الدفع */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
          disabled={!stripe}
        >
          Pay
        </button>
      </form>

      {/* عرض حالة الدفع */}
      {paymentStatus && <p className="mt-4">{paymentStatus}</p>}
    </div>
  );
};

const App = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default App;
