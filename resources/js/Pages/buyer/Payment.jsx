import React, { useState } from "react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import { Head, useForm } from "@inertiajs/react";
import PaymentHeader from "@/Components/Buyer/Payment/PaymentHeader";
import PaymentMethodSwitcher from "@/Components/Buyer/Payment/PaymentMethodSwitcher";
import PaymentFormCard from "@/Components/Buyer/Payment/PaymentFormCard";
import PaymentInfoPanel from "@/Components/Buyer/Payment/PaymentInfoPanel";

function Payment() {
    const [paymentMethod, setPaymentMethod] = useState("stripe"); // stripe or manual

    const { data, setData, post, processing, errors } = useForm({
        order_id: "",
        amount: "",
        transaction_id: "", // ম্যানুয়াল পেমেন্টের জন্য
        payment_type: "stripe",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // ব্যাকএন্ডে ডাটা পাঠানোর সময় payment_type সেট করে দিচ্ছি
        data.payment_type = paymentMethod;
        post(route("buyer.payment.process"));
    };

    return (
        <BuyerLayout>
            <Head title="Secure Payment" />

            <div className="p-6 max-w-[1100px] mx-auto text-white">
                <PaymentHeader />

                <PaymentMethodSwitcher
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                />

                <div className="grid lg:grid-cols-2 gap-10">
                    <PaymentFormCard
                        handleSubmit={handleSubmit}
                        data={data}
                        setData={setData}
                        paymentMethod={paymentMethod}
                        processing={processing}
                    />

                    <PaymentInfoPanel
                        paymentMethod={paymentMethod}
                        data={data}
                    />
                </div>
            </div>
        </BuyerLayout>
    );
}

export default Payment;
