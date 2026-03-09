import React from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const creditBundles = [
  {
    name: "Starter Pack",
    price: 4.99,
    credits: 50,
    features: [
      "Unlock 3 recipes",
      "or 2 chef profiles",
      "Great for first-time cooks",
      "No subscription required",
    ],
    color: "border-white/20",
    btn: "bg-white/10 text-white hover:bg-white/20",
    to: "/app/settings",
  },
  {
    name: "Pro Pack",
    price: 14.99,
    credits: 200,
    features: [
      "Unlock multiple recipes and chefs",
      "Includes planner month unlock",
      "Best value for active users",
      "No recurring billing",
    ],
    popular: true,
    color: "border-sage/50",
    btn: "bg-[#14b8a6] text-obsidian hover:bg-emerald-300",
    to: "/app/settings",
  },
  {
    name: "Studio Pack",
    price: 29.99,
    credits: 500,
    features: [
      "Maximum credit reserve",
      "Batch unlocks for deep learning",
      "Multiple planner month extensions",
      "No lock-in, pay as you go",
    ],
    color: "border-gold/50",
    btn: "bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:opacity-90",
    to: "/app/settings",
  },
];

const Membership: React.FC = () => {
  return (
    <section id="members" className="py-24 bg-obsidian text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="font-serif text-4xl text-white mb-4">
            Credit Wallet
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            No subscriptions. Buy credits only when you need them and spend on
            recipe, chef, and planner unlocks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {creditBundles.map((bundle) => (
            <div
              key={bundle.name}
              className={`relative p-8 rounded-2xl border ${bundle.color} bg-white/5 backdrop-blur-sm transition-transform hover:-translate-y-2 duration-300`}
            >
              {bundle.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#14b8a6] text-obsidian text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg shadow-sage/20">
                  Most Popular
                </div>
              )}

              <h3 className="font-serif text-2xl text-white mb-2">
                {bundle.name}
              </h3>
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    €{bundle.price.toFixed(2)}
                  </span>
                  <span className="text-gray-500 text-sm">one-time</span>
                </div>
                <span className="text-[#14b8a6] text-xs font-medium mt-1">
                  {bundle.credits} Credits
                </span>
              </div>

              <ul className="space-y-4 mb-8 text-left">
                {bundle.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-gray-300"
                  >
                    <Check className="w-4 h-4 text-[#14b8a6] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={bundle.to}
                className={`block w-full py-3 rounded-lg font-sans font-bold text-sm uppercase tracking-wider transition-all duration-300 ${bundle.btn}`}
              >
                Buy Credits
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Membership;
