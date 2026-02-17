import React from 'react';
import { Quote } from 'lucide-react';
import { testimonials } from '../data';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-obsidian-light border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="relative p-8 bg-black/40 rounded-xl border border-white/5">
                <Quote className="absolute top-6 left-6 w-8 h-8 text-white/10" />
                <p className="relative z-10 text-gray-300 italic font-serif mb-6 pt-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage to-blue-500 flex items-center justify-center text-obsidian font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">{t.name}</p>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">{t.role} • {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
         </div>
      </div>
    </section>
  );
};

export default Testimonials;