import React from "react";

const answerCards = [
  {
    question: "What is CookFlow?",
    answer:
      "CookFlow is a culinary learning platform that combines chef-led masterclasses, technique-first recipe libraries, and planning tools so cooks can learn, practice, and repeat advanced cooking workflows in one place.",
  },
  {
    question: "Who is CookFlow for?",
    answer:
      "CookFlow is designed for ambitious home cooks, culinary students, and professionals who want structured cooking lessons, deeper food-science context, and guided practice instead of a loose collection of recipes.",
  },
  {
    question: "How does CookFlow work?",
    answer:
      "Members browse public culinary themes, create a profile, then unlock lessons, recipes, chefs, and planning features through a credit wallet. Each learning path connects techniques, science notes, and practical cooking sessions.",
  },
  {
    question: "What makes CookFlow different from a recipe app?",
    answer:
      "CookFlow focuses on culinary progression rather than storage alone. It pairs recipes with chef context, lesson structure, technique explanations, and workflow tools such as meal planning and shopping support.",
  },
];

const AnswerSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0b1220] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#14b8a6] mb-4">
            AI-Ready Overview
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Clear answers for cooks, search engines, and AI assistants
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            These summaries explain what CookFlow does, who it serves, and how
            the platform works so visitors can understand it quickly and answer
            engines can cite it accurately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {answerCards.map((card) => (
            <article
              key={card.question}
              className="rounded-2xl border border-white/10 bg-white/5 p-8"
            >
              <h3 className="font-serif text-2xl text-white mb-3">
                {card.question}
              </h3>
              <p className="text-gray-300 leading-relaxed">{card.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnswerSection;
