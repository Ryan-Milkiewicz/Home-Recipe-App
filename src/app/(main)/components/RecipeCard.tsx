import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/lib/types/recipe";

type Props = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  cookTime: number;
  servings: number;
  tags?: Tag[];
};

export default function RecipeCard({
  id,
  title,
  description,
  imageUrl,
  cookTime,
  servings,
  tags,
}: Props) {
  return (
    <Link href={`/recipes/${id}`}>
      <div className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-sm transition-shadow cursor-pointer">
        <div className="h-40 bg-muted flex items-center justify-center text-4xl relative">
          {imageUrl ? (
            <Image
              fill
              src={imageUrl}
              alt={title}
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            "🍽️"
          )}
        </div>
        <div className="p-3 flex flex-col gap-1">
          <p className="text-sm font-medium leading-tight">{title}</p>
          {description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1">
            {cookTime != null && (
              <span className="text-xs text-muted-foreground">
                {cookTime} min
              </span>
            )}
            {servings && (
              <span className="text-xs text-muted-foreground">
                · {servings} servings
              </span>
            )}
            {tags && (
              <>
                {tags
                  //.filter((t) => t !== null)
                  .map((t) => (
                    <span
                      key={t.id}
                      className="ml-auto text-xs bg-purple-50 text-purple-800 px-2 py-0.5 rounded-full"
                    >
                      {t.name}
                    </span>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
