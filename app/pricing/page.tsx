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
              productLink="https://buy.stripe.com/test_8wM146aNp2NT72E6oo"
            />
          );
        })}
      </section>
    </div>
  );
}
