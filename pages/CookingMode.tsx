import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { recipes } from "../data";

interface CookingStep {
  title: string;
  description: string;
  timerSeconds?: number;
  ingredients?: string[];
}

interface RecipeSteps {
  name: string;
  steps: CookingStep[];
}

const RECIPE_STEPS: Record<string, RecipeSteps> = {
  "1": {
    name: "Honey Glazed Salmon",
    steps: [
      {
        title: "Prep your station",
        description:
          "Preheat oven to 400°F (200°C) and line a baking sheet with foil. Gather all ingredients and equipment before you start — a clean station makes for clean cooking.",
        ingredients: ["Baking sheet", "Aluminium foil"],
      },
      {
        title: "Mix the glaze",
        description:
          "In a small bowl, whisk together honey, soy sauce, minced garlic, and grated ginger until fully combined. The glaze should be smooth and glossy with a deep amber colour.",
        ingredients: ["3 tbsp honey", "2 tbsp soy sauce"],
      },
      {
        title: "Season the salmon",
        description:
          "Pat each salmon fillet completely dry with paper towels — this is crucial for a proper sear. Season generously with salt and black pepper on both sides.",
        ingredients: ["2 salmon fillets", "Salt & pepper"],
      },
      {
        title: "Heat the pan",
        description:
          "Heat olive oil in an oven-safe skillet over medium-high heat until it shimmers and wisps of smoke appear. The pan must be very hot before the salmon goes in.",
        timerSeconds: 120,
        ingredients: ["1 tbsp olive oil"],
      },
      {
        title: "Sear the salmon",
        description:
          "Place the salmon fillet skin-side down in the hot pan. Press gently with a spatula for the first 30 seconds to ensure full contact. Cook without moving for 3 minutes until the skin is golden and crispy.",
        timerSeconds: 180,
        ingredients: ["Salmon fillet", "2 tbsp olive oil"],
      },
      {
        title: "Apply the glaze",
        description:
          "Flip the salmon carefully and brush generously with the honey-soy glaze, coating all surfaces. The glaze should sizzle immediately and start to caramelise.",
        ingredients: ["Honey glaze", "2 cloves garlic"],
      },
      {
        title: "Bake to finish",
        description:
          "Transfer the skillet to the preheated oven and bake for 8–10 minutes until cooked through and the glaze has caramelised to a deep amber. The fish should flake easily.",
        timerSeconds: 600,
        ingredients: ["Salmon fillets"],
      },
      {
        title: "Plate and serve",
        description:
          "Remove from oven and rest for 2 minutes. Serve immediately with lemon wedges and fresh dill. The skin should be perfectly crispy and the glaze lacquered.",
        timerSeconds: 120,
        ingredients: ["Fresh lemon", "Fresh dill"],
      },
    ],
  },
  "4": {
    name: "Spicy Ramen",
    steps: [
      {
        title: "Simmer the broth",
        description:
          "Bring chicken broth to a gentle simmer in a large pot over medium heat. A properly simmered broth is the soul of great ramen — don't rush it.",
        timerSeconds: 300,
        ingredients: ["4 cups chicken broth"],
      },
      {
        title: "Build the flavour",
        description:
          "Whisk in miso paste and chili oil until fully dissolved. The broth should turn a rich amber and smell deeply savoury with a lingering heat.",
        ingredients: ["2 tbsp miso paste", "1 tbsp chili oil"],
      },
      {
        title: "Cook the noodles",
        description:
          "Cook ramen noodles in a separate pot of boiling water according to package instructions. Cook to just al dente — they'll absorb more liquid in the bowl.",
        timerSeconds: 180,
        ingredients: ["2 packs ramen noodles"],
      },
      {
        title: "Soft-boil the eggs",
        description:
          "Boil eggs for exactly 6 minutes, then immediately transfer to an ice bath for 2 minutes. This gives you a perfectly jammy, custard-like yolk.",
        timerSeconds: 360,
        ingredients: ["2 eggs"],
      },
      {
        title: "Prep toppings",
        description:
          "Peel the eggs and slice in half lengthwise. Cut chashu pork into thin, even rounds. Slice green onions on the diagonal for more surface area.",
        ingredients: ["100g chashu pork", "Green onions", "2 sheets nori"],
      },
      {
        title: "Assemble bowls",
        description:
          "Divide cooked noodles between two deep, warmed bowls and ladle the hot, fragrant broth over until the noodles are just covered.",
        ingredients: ["Cooked noodles", "Hot broth"],
      },
      {
        title: "Add toppings and serve",
        description:
          "Arrange egg halves, pork slices, green onions, nori sheets, and a sprinkle of sesame seeds. Serve immediately while piping hot.",
        ingredients: ["Egg halves", "Pork slices", "Sesame seeds"],
      },
    ],
  },
};

const DEFAULT_STEPS: RecipeSteps = {
  name: "Avocado Toast",
  steps: [
    {
      title: "Toast the bread",
      description:
        "Toast the sourdough until deep golden and crispy all the way through. A properly toasted base holds the avocado without going soggy.",
      timerSeconds: 180,
      ingredients: ["2 slices sourdough"],
    },
    {
      title: "Prep the avocado",
      description:
        "Halve the avocado, remove the pit, and scoop the flesh into a bowl. Mash with lemon juice, salt, and black pepper to your preferred texture.",
      ingredients: ["1 ripe avocado", "Juice of ½ lemon"],
    },
    {
      title: "Cook the eggs",
      description:
        "Fry in a little butter or poach for 3 minutes in barely simmering water. You want a set white and a runny, golden yolk.",
      timerSeconds: 180,
      ingredients: ["2 eggs"],
    },
    {
      title: "Build the toast",
      description:
        "Spread the avocado mixture generously over each slice of toast, all the way to the edges. Top with red pepper flakes and everything bagel seasoning.",
      ingredients: ["Avocado mash", "Red pepper flakes", "Bagel seasoning"],
    },
    {
      title: "Finish and serve",
      description:
        "Place the egg on top, season with a final pinch of salt. Garnish with microgreens and serve immediately while the toast is still crisp and warm.",
      ingredients: ["Egg", "Microgreens"],
    },
  ],
};

const CookingMode: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const recipeData = id ? recipes.find((r) => r.id === Number(id)) : null;
  const { name, steps } =
    id && RECIPE_STEPS[id]
      ? RECIPE_STEPS[id]
      : {
          name: recipeData?.name || DEFAULT_STEPS.name,
          steps: [
            {
              title: "Preparation",
              description: `Prepare the ingredients for ${recipeData?.name || "the dish"}. Make sure your workspace is clean and organized.`,
              ingredients: recipeData
                ? recipeData.ingredients.slice(0, 3)
                : DEFAULT_STEPS.steps[0].ingredients,
            },
            ...DEFAULT_STEPS.steps.slice(1),
          ],
        };
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [timerLeft, setTimerLeft] = useState(steps[0].timerSeconds ?? 0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    setCurrentStep(0);
  }, [id]);

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Reset timer when step changes
  useEffect(() => {
    setTimerLeft(step.timerSeconds ?? 0);
    setTimerRunning(false);
  }, [currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

  // Countdown ticker
  useEffect(() => {
    if (!timerRunning) return;
    const intervalId = setInterval(() => {
      setTimerLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timerRunning]);

  // Auto-stop when countdown hits zero
  useEffect(() => {
    if (timerLeft === 0 && timerRunning) {
      setTimerRunning(false);
    }
  }, [timerLeft, timerRunning]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleTimerClick = () => {
    if (timerLeft === 0) {
      setTimerLeft(step.timerSeconds ?? 0);
      setTimerRunning(true);
    } else {
      setTimerRunning((r) => !r);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A] flex flex-col overflow-hidden">
      {/* Faint radial accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(249,115,22,0.05) 0%, transparent 65%)",
        }}
      />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 flex-shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] border border-[#334155] rounded-full text-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:border-[#14b8a6] transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> <span>Back</span>
        </button>
        <div className="px-4 py-1.5 bg-[#1E293B] border border-[#334155] rounded-full text-sm text-[#94A3B8]">
          Step {currentStep + 1} of {steps.length}
        </div>
        <p className="text-sm text-[#F1F5F9] truncate max-w-[180px] text-right hidden sm:block">
          {name}
        </p>
      </header>

      {/* Progress bar */}
      <div className="w-full h-[3px] bg-[#1E293B] flex-shrink-0">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(to right, #14b8a6, #D4AF37)",
          }}
        />
      </div>

      {/* Main content — vertically centred */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 overflow-y-auto relative z-10">
        <div className="w-full max-w-3xl">
          {/* Step badge */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-[#14b8a6] flex items-center justify-center shadow-lg shadow-teal-900/40">
              <span className="text-3xl font-bold text-white">
                {currentStep + 1}
              </span>
            </div>
          </div>

          {/* Step card */}
          <div className="bg-[#1E293B] rounded-3xl border border-[#334155] p-10 shadow-2xl mt-6">
            <h2 className="text-2xl font-bold text-[#F1F5F9] text-center">
              {step.title}
            </h2>
            <p className="text-lg text-[#94A3B8] leading-relaxed text-center mt-4 max-w-xl mx-auto">
              {step.description}
            </p>

            {step.timerSeconds !== undefined && step.timerSeconds > 0 && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleTimerClick}
                  className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#14b8a6]/10 border border-[#14b8a6]/30 rounded-full hover:bg-[#14b8a6]/20 transition-colors"
                >
                  <Clock className="w-4 h-4 text-[#14b8a6]" />
                  <span className="text-2xl font-bold text-[#14b8a6]">
                    {formatTime(timerLeft > 0 ? timerLeft : step.timerSeconds)}
                  </span>
                  <span className="text-xs text-[#14b8a6]/60">
                    {timerLeft === 0
                      ? "Tap to reset"
                      : timerRunning
                        ? "Tap to pause"
                        : "Start timer"}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Ingredient spotlight */}
          {step.ingredients && step.ingredients.length > 0 && (
            <div className="mt-4 bg-[#1E293B]/50 border border-[#334155] rounded-2xl px-6 py-4 flex items-center gap-6">
              <span className="text-sm text-[#64748B] flex-shrink-0">
                Needed now:
              </span>
              <div className="flex gap-2 flex-wrap">
                {step.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-xl text-sm text-[#F1F5F9]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
            <button
              onClick={() =>
                currentStep === 0
                  ? navigate("/app/courses")
                  : setCurrentStep((s) => s - 1)
              }
              className="w-full sm:w-auto px-8 py-4 bg-[#1E293B] border border-[#334155] rounded-full text-[#94A3B8] hover:text-[#F1F5F9] hover:border-[#14b8a6] transition-all order-2 sm:order-1"
            >
              {currentStep === 0 ? "All Courses" : "Previous"}
            </button>

            {/* Step dots */}
            <div className="flex items-center gap-2 order-1 sm:order-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={`transition-all rounded-full ${
                    i < currentStep
                      ? "w-2.5 h-2.5 bg-[#14b8a6]"
                      : i === currentStep
                        ? "w-2.5 h-2.5 ring-2 ring-[#14b8a6] ring-offset-1 ring-offset-[#0F172A]"
                        : "w-2.5 h-2.5 bg-[#334155]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentStep((s) => Math.min(steps.length - 1, s + 1))
              }
              disabled={currentStep === steps.length - 1}
              className="w-full sm:w-auto px-8 py-4 bg-[#14b8a6] rounded-full text-white font-bold shadow-lg shadow-teal-900/30 hover:bg-[#0d9488] disabled:opacity-40 disabled:cursor-not-allowed transition-all order-3"
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookingMode;
