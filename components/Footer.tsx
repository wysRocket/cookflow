import React from "react";
import { ChefHat } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-obsidian border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 mb-4 md:mb-0"
          >
            <ChefHat className="h-6 w-6 text-[#14b8a6]" />
            <span className="font-serif text-xl font-bold tracking-wider text-white">
              COOK<span className="text-[#14b8a6]">FLOW</span>
            </span>
          </Link>

          <div className="flex gap-6">{/* Social media icons removed */}</div>
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
                  to="/app/shopping-list"
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
                  to="/legal/terms"
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
                  to="/legal/privacy"
                  className="hover:text-[#14b8a6] transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/legal/terms"
                  className="hover:text-[#14b8a6] transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/legal/vat"
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
          {/* Apple Pay */}
          <div className="h-8 w-[60px] bg-white rounded-md flex items-center justify-center p-1.5">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg"
              alt="Apple Pay"
              className="h-full w-full object-contain"
            />
          </div>
          {/* Visa */}
          <div className="h-8 w-[60px] bg-white rounded-md flex items-center justify-center px-2">
            <span
              style={{
                color: "#1434CB",
                fontFamily: '"Arial Black", Arial, sans-serif',
                fontWeight: 900,
                fontSize: "13px",
                fontStyle: "italic",
                letterSpacing: "0.5px",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              VISA
            </span>
          </div>
          {/* Mastercard */}
          <div className="h-8 w-[60px] bg-white rounded-md flex items-center justify-center p-1.5">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-full w-full object-contain"
            />
          </div>
          {/* Google Pay */}
          <div className="h-8 w-[60px] bg-white rounded-md flex items-center justify-center p-1.5">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
              alt="Google Pay"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>
            © {new Date().getFullYear()} CookFlow Europe Ltd. All rights
            reserved.
          </p>
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
