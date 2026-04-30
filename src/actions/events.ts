"use server";
import { eventsTable } from "@/db/schema";
import { db } from "@/index";
import { revalidatePath } from "next/cache";

export async function saveEvent(recipeId: number, date: string) {
  await db
    .insert(eventsTable)
    .values({ recipeId, date })
    .onConflictDoUpdate({ target: eventsTable.date, set: { recipeId } });

  revalidatePath("/");
}
