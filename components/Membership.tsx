import React from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Commis",
    price: 15,
    features: [
      "Access to all Standard Recipes",
      "Monthly Technique Workshop",
      "Community Forum Access",
      "HD Mobile App",
    ],
    color: "border-white/20",
    btn: "bg-white/10 text-white hover:bg-white/20",
    to: "/auth/sign-up?plan=commis",
  },
  {
    name: "Chef de Partie",
    price: 29,
    features: [
      "Everything in Commis",
      "Full Academy Access (6 Cities)",
      "Ingredient Sourcing Guide",
      "Quarterly Live Q&A",
    ],
    popular: true,
    color: "border-sage/50",
    btn: "bg-[#14b8a6] text-obsidian hover:bg-emerald-300",
    to: "/auth/sign-up?plan=chef-de-partie",
  },
  {
    name: "Executive",
    price: 89,
    features: [
      "Everything in Chef de Partie",
      "1-on-1 Mentor Feedback",
      "Custom Menu Development",
      "Priority Event Booking",
    ],
    color: "border-gold/50",
    btn: "bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:opacity-90",
    to: "/auth/sign-up?plan=executive",
  },
];

const Membership: React.FC = () => {
  return (
    <section id="members" className="py-24 bg-obsidian text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="font-serif text-4xl text-white mb-4">
            Join The Brigade
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Choose your rank. From enthusiast to expert, we provide the tools
            for your ascent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-8 rounded-2xl border ${tier.color} bg-white/5 backdrop-blur-sm transition-transform hover:-translate-y-2 duration-300`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#14b8a6] text-obsidian text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg shadow-sage/20">
                  Most Popular
                </div>
              )}

              <h3 className="font-serif text-2xl text-white mb-2">
                {tier.name}
              </h3>
              <div className="flex items-baseline justify-center gap-1 mb-6">
                <span className="text-4xl font-bold text-white">
                  €{tier.price}
                </span>
                <span className="text-gray-500 text-sm">/month</span>
              </div>

              <ul className="space-y-4 mb-8 text-left">
                {tier.features.map((feature, i) => (
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
                to={tier.to}
                className={`block w-full py-3 rounded-lg font-sans font-bold text-sm uppercase tracking-wider transition-all duration-300 ${tier.btn}`}
              >
                Select Tier
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Membership;
