import React from "react";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";
import Hero from "../components/Hero";
import AnswerSection from "../components/AnswerSection";
import AcademyGrid from "../components/AcademyGrid";
import RitualList from "../components/RitualList";
import Membership from "../components/Membership";
import Testimonials from "../components/Testimonials";
import ConsultantForm from "../components/ConsultantForm";
import Footer from "../components/Footer";

const LandingPage: React.FC = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is CookFlow?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CookFlow is a culinary learning platform that combines chef-led masterclasses, technique-first recipe libraries, and planning tools so cooks can learn, practice, and repeat advanced cooking workflows in one place.",
        },
      },
      {
        "@type": "Question",
        name: "Who is CookFlow for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CookFlow is designed for ambitious home cooks, culinary students, and professionals who want structured cooking lessons, deeper food-science context, and guided practice instead of a loose collection of recipes.",
        },
      },
      {
        "@type": "Question",
        name: "How does CookFlow work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Members browse public culinary themes, create a profile, then unlock lessons, recipes, chefs, and planning features through a credit wallet. Each learning path connects techniques, science notes, and practical cooking sessions.",
        },
      },
      {
        "@type": "Question",
        name: "What makes CookFlow different from a recipe app?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CookFlow focuses on culinary progression rather than storage alone. It pairs recipes with chef context, lesson structure, technique explanations, and workflow tools such as meal planning and shopping support.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-obsidian text-gray-200 selection:bg-[#14b8a6] selection:text-obsidian">
      <Seo
        title="CookFlow | Culinary Learning Platform for Recipes, Masterclasses, and Meal Planning"
        description="CookFlow is a culinary learning platform with chef-led masterclasses, advanced recipes, technique explanations, and meal-planning workflows for ambitious home cooks and professionals."
        pathname="/"
        jsonLd={faqSchema}
      />
      <Navbar />
      <main>
        <Hero />
        <AnswerSection />
        <AcademyGrid />
        <RitualList />
        <Testimonials />
        <Membership />
        <ConsultantForm />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
