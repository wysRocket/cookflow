import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const repoRoot = new URL("..", import.meta.url);
const dataPath = new URL("../data.ts", import.meta.url);
const reportPath = new URL("../docs/kitchen-content-audit.md", import.meta.url);

const transpiled = ts.transpileModule(await fs.readFile(dataPath, "utf8"), {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
  fileName: "data.ts",
});

const moduleUrl = `data:text/javascript;base64,${Buffer.from(
  transpiled.outputText,
).toString("base64")}`;
const { recipes } = await import(moduleUrl);

const duplicateIds = [];
const duplicateNames = [];
const duplicateImages = [];
const missingFields = [];
const invalidCategories = [];
const brokenImageUrls = [];

const allowedCategories = new Set([
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
]);

const seenIds = new Set();
const seenNames = new Set();
const seenImages = new Set();

for (const recipe of recipes) {
  if (seenIds.has(recipe.id)) duplicateIds.push(recipe.id);
  seenIds.add(recipe.id);

  const normalizedName = recipe.name.trim().toLowerCase();
  if (seenNames.has(normalizedName)) duplicateNames.push(recipe.name);
  seenNames.add(normalizedName);

  const missing = [];
  if (!recipe.name?.trim()) missing.push("name");
  if (!recipe.category?.trim()) missing.push("category");
  if (!recipe.description?.trim()) missing.push("description");
  if (!Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0) {
    missing.push("ingredients");
  }
  if (!Array.isArray(recipe.steps) || recipe.steps.length === 0) {
    missing.push("steps");
  }
  const effectiveImage = recipe.detailImage ?? recipe.image;
  if (!recipe.image?.trim()) missing.push("image");
  if (!effectiveImage?.trim()) missing.push("detailImage");
  if (missing.length > 0) {
    missingFields.push(`- #${recipe.id} ${recipe.name}: ${missing.join(", ")}`);
  }

  if (!allowedCategories.has(recipe.category)) {
    invalidCategories.push(`- #${recipe.id} ${recipe.name}: ${recipe.category}`);
  }

  if (seenImages.has(recipe.image)) duplicateImages.push(recipe.image);
  seenImages.add(recipe.image);
}

const uniqueImageUrls = Array.from(
  new Set(
    recipes.flatMap((recipe) =>
      [recipe.image, recipe.detailImage].filter(Boolean),
    ),
  ),
);

for (const url of uniqueImageUrls) {
  try {
    const response = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (!response.ok) brokenImageUrls.push(`- ${url} (${response.status})`);
  } catch (error) {
    brokenImageUrls.push(`- ${url} (${error.message})`);
  }
}

const flaggedRecipes = [
  "- #2 Berry Acai Bowl: replaced incorrect salad/egg image with an acai bowl photo.",
  "- #13 Sous Vide Duck Breast: replaced mismatched boiled-egg image with a plated duck breast photo.",
  "- #53 Baked Feta Veg Traybake: added both preview and detail image coverage using the new `detailImage` field.",
  "- #28 Tonkotsu Ramen from Scratch: replaced the duplicated bastilla image with a tonkotsu ramen bowl photo.",
  "- #34 Mushroom Barley Soup: replaced the duplicated tom yum image with a mushroom soup photo.",
  "- #37 Pesto Gnocchi with Green Beans: replaced the steak image with a gnocchi photo.",
  "- #49 Salmon Nicoise Salad: replaced the generic plant bowl image with a salmon salad photo.",
  "- #51 Smoky Tomato Lentil Pasta: replaced the steak image with a tomato pasta photo.",
  "- #52 Ginger Scallion Chicken Noodles: replaced the ramen image with a chicken noodle bowl photo.",
  "- #54 Tuna Kimchi Fried Rice: replaced the shakshuka image with a fried rice photo.",
  "- #58 Creamy Corn Chowder: replaced the tom yum image with a creamy corn dish photo.",
  "- #60 Coconut Mango Chia Parfait: replaced the lemon dessert image with a mango-coconut yogurt photo.",
  "- #61 Roasted Cauliflower Tacos: replaced the shrimp taco image with a vegetarian taco photo.",
  "- #46 Huevos Rancheros: replaced the shared egg-pan photo with a Mexican breakfast plate image.",
  "- #47 Greek Lemon Chicken Orzo: replaced the shared roast-chicken photo with a lemon-herb chicken plate image.",
  "- #62 Spinach Artichoke Stuffed Chicken: replaced the shared roast-chicken photo with a stuffed chicken image.",
  "- #64 Turkish Menemen: replaced the shared egg-pan photo with a Turkish breakfast image centered on menemen.",
  "- #66 Pumpkin Sage Pasta Bake: replaced the risotto image with a baked pasta photo.",
  "- #70 Berry Yogurt Crumble Cups: replaced the muffin image with a yogurt-and-berries photo.",
];

const duplicateImageCount = new Set(duplicateImages).size;
const duplicateImageGroups = Array.from(
  recipes.reduce((groups, recipe) => {
    const key = recipe.image;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(`#${recipe.id} ${recipe.name}`);
    return groups;
  }, new Map()).entries(),
).filter(([, items]) => items.length > 1);

const report = `# Kitchen Content Audit

Date: 2026-04-22
Repo: ${path.resolve(fileURLToPath(repoRoot))}

## Scope

- Audited all Kitchen recipe entries exported from \`data.ts\`.
- Checked required data fields, duplicate ids/names/image urls, allowed categories, and live reachability of recipe image assets.
- Performed targeted manual fixes for the original QA issues plus image/description mismatches uncovered during the full review.

## Summary

- Total recipes audited: ${recipes.length}
- Missing required field issues: ${missingFields.length}
- Duplicate id issues: ${duplicateIds.length}
- Duplicate name issues: ${duplicateNames.length}
- Reused preview image flags: ${duplicateImageCount}
- Invalid category issues: ${invalidCategories.length}
- Broken image URL issues: ${brokenImageUrls.length}

## Targeted Fixes Completed

${flaggedRecipes.join("\n")}

## Remaining Validation Findings

### Missing fields
${missingFields.length === 0 ? "- None" : missingFields.join("\n")}

### Duplicate ids
${duplicateIds.length === 0 ? "- None" : duplicateIds.map((id) => `- ${id}`).join("\n")}

### Duplicate names
${duplicateNames.length === 0 ? "- None" : duplicateNames.map((name) => `- ${name}`).join("\n")}

### Invalid categories
${invalidCategories.length === 0 ? "- None" : invalidCategories.join("\n")}

### Reused preview images
${duplicateImageCount === 0 ? "- None" : `- Confirmed: ${duplicateImageCount} distinct preview image URLs are reused across ${duplicateImageGroups.reduce((count, [, items]) => count + items.length, 0)} recipes. These are not schema errors, but they are strong candidates for content/image mismatch review.`}

${duplicateImageCount === 0 ? "" : duplicateImageGroups.map(([url, items]) => `- ${items.join(" | ")}\n  URL: ${url}`).join("\n")}

### Broken image URLs
${brokenImageUrls.length === 0 ? "- None" : brokenImageUrls.join("\n")}
`;

await fs.writeFile(reportPath, report);
