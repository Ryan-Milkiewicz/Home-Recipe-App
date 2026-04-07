"use server";
import { db } from "@/index";
import { tagTable } from "@/db/schema";

export async function getTags() {
  return db.select().from(tagTable);
}
