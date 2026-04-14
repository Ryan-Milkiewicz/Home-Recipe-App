"use client";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function SearchInput() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    startTransition(() => {
      if (value.trim() === "") {
        router.push("/recipes");
        return;
      }
      router.push(`/recipes?search=${value}`);
    });
  }

  return (
    <Input
      className="h-8 mx-auto rounded-full text-sm"
      placeholder="Search recipes..."
      onChange={handleSearch}
    />
  );
}
