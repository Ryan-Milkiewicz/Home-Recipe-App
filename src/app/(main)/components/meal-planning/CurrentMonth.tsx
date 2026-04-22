const meals = [
  { day: 3, name: "Spaghetti Bolognese" },
  { day: 7, name: "Chicken Stir Fry" },
  { day: 12, name: "Tacos" },
  { day: 18, name: "Grilled Salmon" },
  { day: 22, name: "Mushroom Risotto" },
  { day: 25, name: "BBQ Ribs" },
];

export default function CurrentMonth() {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="flex items-center justify-between bg-muted px-5 py-4">
        <h2 className="text-xl font-bold">This Month</h2>
        <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {meals.length} meals
        </span>
      </div>

      <div className="divide-y divide-border">
        {meals.map((meal) => (
          <div key={meal.day} className="flex items-center gap-5 px-5 py-4">
            <span className="text-xl font-serif text-[#8b7355] w-8 text-center">
              {meal.day}
            </span>
            <span className="text-base">{meal.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
