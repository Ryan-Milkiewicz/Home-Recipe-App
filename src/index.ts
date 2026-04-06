import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { ingredientTable, recipeTable, stepsTable } from "./db/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function seed() {
  // Seeding initial db values
  console.log("Seeding database...");

  // Insert recipes
  const [pasta, curry, salad] = await db
    .insert(recipeTable)
    .values([
      {
        title: "Spaghetti Carbonara",
        description:
          "A classic Italian pasta dish with eggs, cheese, and pancetta.",
        prepTime: 10,
        cookTime: 20,
        servings: 4,
        difficulty: "medium",
      },
      {
        title: "Chicken Tikka Masala",
        description: "Tender chicken in a rich, spiced tomato cream sauce.",
        prepTime: 20,
        cookTime: 40,
        servings: 6,
        difficulty: "hard",
      },
      {
        title: "Caesar Salad",
        description: "Crisp romaine lettuce with Caesar dressing and croutons.",
        prepTime: 15,
        cookTime: 0,
        servings: 2,
        difficulty: "easy",
      },
    ])
    .returning();

  // Insert ingredients
  await db.insert(ingredientTable).values([
    // Carbonara
    {
      recipeId: pasta.id,
      ingredientName: "Spaghetti",
      amount: "400",
      unit: "g",
    },
    {
      recipeId: pasta.id,
      ingredientName: "Pancetta",
      amount: "150",
      unit: "g",
    },
    { recipeId: pasta.id, ingredientName: "Eggs", amount: "4", unit: "" },
    {
      recipeId: pasta.id,
      ingredientName: "Pecorino Romano",
      amount: "100",
      unit: "g",
    },
    {
      recipeId: pasta.id,
      ingredientName: "Black Pepper",
      amount: "1",
      unit: "tsp",
    },

    // Tikka Masala
    {
      recipeId: curry.id,
      ingredientName: "Chicken Breast",
      amount: "800",
      unit: "g",
    },
    {
      recipeId: curry.id,
      ingredientName: "Tikka Masala Paste",
      amount: "4",
      unit: "tbsp",
    },
    {
      recipeId: curry.id,
      ingredientName: "Coconut Cream",
      amount: "400",
      unit: "ml",
    },
    {
      recipeId: curry.id,
      ingredientName: "Chopped Tomatoes",
      amount: "400",
      unit: "g",
    },
    {
      recipeId: curry.id,
      ingredientName: "Garlic Cloves",
      amount: "4",
      unit: "",
    },

    // Caesar Salad
    {
      recipeId: salad.id,
      ingredientName: "Romaine Lettuce",
      amount: "1",
      unit: "head",
    },
    {
      recipeId: salad.id,
      ingredientName: "Caesar Dressing",
      amount: "4",
      unit: "tbsp",
    },
    { recipeId: salad.id, ingredientName: "Parmesan", amount: "50", unit: "g" },
    {
      recipeId: salad.id,
      ingredientName: "Croutons",
      amount: "1",
      unit: "cup",
    },
  ]);

  // Insert steps
  await db.insert(stepsTable).values([
    // Carbonara
    {
      recipeId: pasta.id,
      stepNumber: 1,
      step: "Bring a large pot of salted water to a boil and cook spaghetti until al dente.",
    },
    {
      recipeId: pasta.id,
      stepNumber: 2,
      step: "Fry pancetta in a pan over medium heat until crispy.",
    },
    {
      recipeId: pasta.id,
      stepNumber: 3,
      step: "Whisk eggs with grated Pecorino Romano and black pepper in a bowl.",
    },
    {
      recipeId: pasta.id,
      stepNumber: 4,
      step: "Remove pan from heat, add drained pasta, then quickly stir in the egg mixture. Toss well and serve immediately.",
    },

    // Tikka Masala
    {
      recipeId: curry.id,
      stepNumber: 1,
      step: "Marinate chicken in tikka masala paste for at least 1 hour.",
    },
    {
      recipeId: curry.id,
      stepNumber: 2,
      step: "Grill or pan fry the chicken until charred and cooked through.",
    },
    {
      recipeId: curry.id,
      stepNumber: 3,
      step: "Fry garlic in a pan, add chopped tomatoes and coconut cream, simmer for 15 minutes.",
    },
    {
      recipeId: curry.id,
      stepNumber: 4,
      step: "Add chicken to the sauce and simmer for a further 10 minutes. Serve with rice or naan.",
    },

    // Caesar Salad
    {
      recipeId: salad.id,
      stepNumber: 1,
      step: "Wash and chop romaine lettuce into bite-sized pieces.",
    },
    {
      recipeId: salad.id,
      stepNumber: 2,
      step: "Toss lettuce with Caesar dressing until well coated.",
    },
    {
      recipeId: salad.id,
      stepNumber: 3,
      step: "Top with croutons and shaved Parmesan. Serve immediately.",
    },
  ]);

  console.log("Seeding complete!");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
