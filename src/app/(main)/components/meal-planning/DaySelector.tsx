import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DaySelector() {
  return (
    <div className="w-full flex flex-col border border-border rounded-xl overflow-hidden hover:shadow-sm transition-shadow cursor-pointer">
      <div className="h-40 bg-muted flex flex-col items-center justify-center gap-1">
        <h1 className="font-semibold text-black">Select a day</h1>
        <p className="text-sm text-muted-foreground">
          Click any day to plan a meal
        </p>
      </div>
      <div className="p-3 flex flex-col gap-1 flex-1 justify-between">
        <Input type="text" placeholder="e.g. Pizza" />
        <Button className="mt-2 bg-black text-white">Save</Button>
      </div>
    </div>
  );
}
