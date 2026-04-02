import { Method } from "@/lib/types/recipe";

export default function RecipeImportSelectorCard({
  title,
  description,
  icon,
  isSelected,
  method,
  onMethodChanged,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  method: Method;
  onMethodChanged: (importMethod: Method) => void;
}) {
  return (
    <div
      onClick={() => onMethodChanged(method)}
      className={`border border-border rounded-xl overflow-hidden transition-all cursor-pointer ${
        isSelected
          ? "ring-2 ring-gray-300 ring-offset-2 bg-gray-50"
          : "hover:shadow-sm"
      }`}
    >
      <div className="h-40 bg-muted flex items-center justify-center text-4xl">
        {icon}
      </div>
      <div className="p-3 flex flex-col gap-1">
        <h1 className="text-sm font-medium leading-tight">{title}</h1>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
