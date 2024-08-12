// "use client";

// import CheckoutPage from "@/components/CheckoutPage";
// import convertToSubcurrency from "@/lib/convertToSubcurrency";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
//   throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
// }
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

// export default function Home() {
//   const amount = 49.99;

//   return (
//     <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
//       <div className="mb-10">
//         <h1 className="text-4xl font-extrabold mb-2">Sonny</h1>
//         <h2 className="text-2xl">
//           has requested
//           <span className="font-bold"> ${amount}</span>
//         </h2>
//       </div>

//       <Elements
//         stripe={stripePromise}
//         options={{
//           mode: "payment",
//           amount: convertToSubcurrency(amount),
//           currency: "usd",
//         }}
//       >
//         <CheckoutPage amount={amount} />
//       </Elements>
//     </main>
//   );
// }

"use client";

import React, { useState } from "react";
import PricingHeader from "./components/PricingHeader";
import PricingSwitch from "./components/PricingSwitch";
import PricingCard from "./components/PricingCard";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const togglePricingPeriod = (value: string) =>
    setIsYearly(parseInt(value) === 1);

  const plans = [
    {
      title: "Starter",
      monthlyPrice: 7.99,
      yearlyPrice: 80,
      description: "Full access to what Rush 2 Wager has to offer",
      features: [
        "Access to daily promo database",
        "Betting trends for big games",
        "Picks from trending handicappers",
      ],
      actionLabel: "Get Started",
      popular: true,
    },
    // {
    //   title: "Pro",
    //   monthlyPrice: 25,
    //   yearlyPrice: 250,
    //   description: "Perfect for owners of small & medium businessess",
    //   features: [
    //     "Example Feature Number 1",
    //     "Example Feature Number 2",
    //     "Example Feature Number 3",
    //   ],
    //   actionLabel: "Get Started",
    //   popular: true,
    // },
    // {
    //   title: "Enterprise",
    //   price: "Custom",
    //   description: "Dedicated support and infrastructure to fit your needs",
    //   features: [
    //     "Example Feature Number 1",
    //     "Example Feature Number 2",
    //     "Example Feature Number 3",
    //     "Super Exclusive Feature",
    //   ],
    //   actionLabel: "Contact Sales",
    //   exclusive: true,
    // },
  ];
  return (
    <div className="py-8 flex flex-col gap-0 justify-center items-center">
      <PricingHeader
        title="Pricing Plans"
        subtitle="Choose the plan that's right for you"
      />
      <PricingSwitch onSwitch={togglePricingPeriod} />
      <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8">
        {plans.map((plan) => {
          return (
            <PricingCard
              key={plan.title}
              {...plan}
              isYearly={isYearly}
              productLink="https://buy.stripe.com/test_9AQ9Cq52vawsfzWcMN"
            />
          );
        })}
      </section>
    </div>
  );
}
