import React from 'react';
import { Instagram, Twitter, Youtube, ChefHat } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-obsidian border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <ChefHat className="h-6 w-6 text-sage" />
            <span className="font-serif text-xl font-bold tracking-wider text-white">
              COOK<span className="text-sage">FLOW</span>
            </span>
          </div>
          
          <div className="flex gap-6">
            <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-b border-white/5 pb-12">
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-sage cursor-pointer">Academy</li>
              <li className="hover:text-sage cursor-pointer">Mentors</li>
              <li className="hover:text-sage cursor-pointer">Pricing</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-sage cursor-pointer">Blog</li>
              <li className="hover:text-sage cursor-pointer">Technique Guide</li>
              <li className="hover:text-sage cursor-pointer">Ingredient Map</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-sage cursor-pointer">About</li>
              <li className="hover:text-sage cursor-pointer">Careers</li>
              <li className="hover:text-sage cursor-pointer">Press</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-sage cursor-pointer">Privacy</li>
              <li className="hover:text-sage cursor-pointer">Terms</li>
              <li className="hover:text-sage cursor-pointer">VAT Info</li>
            </ul>
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