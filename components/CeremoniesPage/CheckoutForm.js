import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'sonner';

import Button from '@/components/common/Button';

export default function CheckoutForm({ onCancel, ceremony, discount }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.href,
            },
        });

        setIsLoading(false);

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className='bg-white rounded-lg p-5 w-full max-w-[95%] md:max-w-xl mx-auto max-md:max-h-[70vh] max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            <h3 className='text-2xl font-bold mb-4'>Complete Your Registration</h3>
            <div className='mb-2 flex flex-wrap items-baseline'>
                <p className='mr-2'>You are registering for:</p>
                <strong className='truncate'>{ceremony.title}</strong>
            </div>
            <p className='mb-4'>Amount: <strong>€{discount ? parseFloat(ceremony.price - (ceremony.price * (ceremony.discountPercent / 100)))?.toFixed(2) : parseFloat(ceremony.price).toFixed(2)}</strong></p>
            <form onSubmit={handleSubmit}>
                <PaymentElement
                    options={{ layout: 'tabs' }}
                />
                <div className="flex justify-end gap-4 mt-6">
                    <Button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="px-4 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading || !stripe || !elements}
                        id="submit"
                        type="submit"
                        className="px-4 rounded-lg bg-[#212A63] text-white"
                    >
                        {isLoading ? "Processing..." : "Pay now"}
                    </Button>
                </div>
            </form>
        </div>
    );
} 