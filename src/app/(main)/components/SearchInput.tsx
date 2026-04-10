// app/(main)/components/SearchInput.tsx
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
      router.push(`/recipes?search=${value}`);
    });
  }

  return (
    <Input
      className="w-64 h-8 mx-auto rounded-full text-sm"
      placeholder="Search recipes..."
      onChange={handleSearch}
    />
  );
}
