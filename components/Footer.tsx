import React from "react";
import { Instagram, Twitter, Youtube, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-obsidian border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <Link to="/" className="flex items-center gap-2 mb-4 md:mb-0">
            <ChefHat className="h-6 w-6 text-[#14b8a6]" />
            <span className="font-serif text-xl font-bold tracking-wider text-white">
              COOK<span className="text-[#14b8a6]">FLOW</span>
            </span>
          </Link>

          <div className="flex gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-b border-white/5 pb-12">
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/app/courses"
                  className="hover:text-[#14b8a6] transition-colors"
                >
                  Academy
                </Link>
              </li>
              <li>
                <Link
                  to="/app/chefs"
                  className="hover:text-[#14b8a6] transition-colors"
                >
                  Mentors
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/sign-up"
                  className="hover:text-[#14b8a6] transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/app/community"
                  className="hover:text-[#14b8a6] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/app/recipes"
                  className="hover:text-[#14b8a6] transition-colors"
                >
                  Technique Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/app/recipes"
                  className="hover:text-[#14b8a6] transition-colors"
                >
                  Ingredient Map
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/app/chefs"
                  className="hover:text-[#14b8a6] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/sign-up"
                  className="hover:text-[#14b8a6] transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/app/community"
                  className="hover:text-[#14b8a6] transition-colors"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/app/settings"
                  className="hover:text-[#14b8a6] transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/app/settings"
                  className="hover:text-[#14b8a6] transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/app/settings"
                  className="hover:text-[#14b8a6] transition-colors"
                >
                  VAT Info
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-white/5">
          <span className="text-xs text-gray-600 uppercase tracking-widest mr-2">
            Secure Payments
          </span>
          {/* Visa */}
          <div className="h-7 px-3 bg-white rounded flex items-center justify-center">
            <svg viewBox="0 0 50 16" height="12" aria-label="Visa">
              <text
                x="0"
                y="13"
                fontFamily="Arial"
                fontWeight="bold"
                fontSize="14"
                fill="#1a1f71"
              >
                VISA
              </text>
            </svg>
          </div>
          {/* Mastercard */}
          <div className="h-7 px-2 bg-[#1E293B] border border-white/10 rounded flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-[#eb001b] opacity-90" />
            <div className="w-5 h-5 rounded-full bg-[#f79e1b] opacity-90 -ml-2" />
          </div>
          {/* PayPal */}
          <div className="h-7 px-3 bg-white rounded flex items-center justify-center">
            <svg viewBox="0 0 60 16" height="12" aria-label="PayPal">
              <text
                x="0"
                y="13"
                fontFamily="Arial"
                fontWeight="bold"
                fontSize="13"
              >
                <tspan fill="#003087">Pay</tspan>
                <tspan fill="#009cde">Pal</tspan>
              </text>
            </svg>
          </div>
          {/* Apple Pay */}
          <div className="h-7 px-3 bg-black border border-white/10 rounded flex items-center">
            <span className="text-white text-[11px] font-semibold tracking-tight">
              {" "}
              Pay
            </span>
          </div>
          {/* Stripe badge */}
          <div className="h-7 px-3 bg-[#635bff] rounded flex items-center">
            <span className="text-white text-[11px] font-bold tracking-wide">
              stripe
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>© 2024 CookFlow Europe Ltd. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <span>Made in Berlin</span>
            <span>Metric System Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
