"use client";
import { convertToHoursAndMinutes } from "../../../lib/helper";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@hugeicons/core-free-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tag } from "@/lib/types/recipe";

type Props = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  cookTime: number;
  servings: number;
  tags?: Tag[];
  isFavorited: boolean;
  toggleFavorite: (id: number) => void;
};

export default function RecipeCard({
  id,
  title,
  description,
  imageUrl,
  cookTime,
  servings,
  tags,
  isFavorited,
  toggleFavorite,
}: Props) {
  return (
    <Link href={`/recipes/${id}`} className="h-full">
      <div className="h-full flex flex-col bg-white border border-border rounded-xl overflow-hidden hover:shadow-sm transition-shadow cursor-pointer">
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
        <div className="p-3 flex flex-col gap-1 flex-1 justify-between">
          <p className="text-sm font-medium leading-tight">{title}</p>
          {description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
          <div className="flex flex-wrap gap-1">
            {tags?.map((t) => (
              <span
                key={t.id}
                className="text-xs bg-purple-50 text-purple-800 px-2 py-0.5 rounded-full"
              >
                {t.name}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-1">
            {cookTime != null && (
              <span className="text-xs text-muted-foreground">
                {convertToHoursAndMinutes(cookTime)}
              </span>
            )}
            {servings && (
              <span className="text-xs text-muted-foreground">
                · {servings} servings
              </span>
            )}
          </div>
          <div className="flex items-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="bg-white/80 hover:bg-white rounded-full p-1.5 shadow transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(id);
                  }}
                >
                  <HugeiconsIcon
                    icon={StarIcon}
                    size={18}
                    color={isFavorited ? "gold" : "black"}
                    fill={isFavorited ? "gold" : "white"}
                    strokeWidth={2}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isFavorited ? "Remove from favorites" : "Add to favorites!"}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </Link>
  );
}
