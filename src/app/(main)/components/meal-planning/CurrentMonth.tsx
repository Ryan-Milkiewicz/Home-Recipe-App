import { MonthlyMeals } from "@/lib/types/event";

type Props = {
  monthlyMeals: MonthlyMeals[];
};

export default function CurrentMonth({ monthlyMeals }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="flex items-center justify-between bg-muted px-5 py-4">
        <h2 className="text-xl font-bold">This Month</h2>
        <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {monthlyMeals.length} meals
        </span>
      </div>

      <div className="divide-y divide-border">
        {monthlyMeals.map((meal) => (
          <div key={meal.id} className="flex items-center gap-5 px-5 py-4">
            <span className="text-xl font-serif text-[#8b7355] w-8 text-center">
              {meal.day}
            </span>
            <span className="text-base">{meal.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
