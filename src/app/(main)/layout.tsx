import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignCircleIcon } from "@hugeicons/core-free-icons";
import SearchInput from "./components/SearchInput";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidenav from "./components/Sidenav";
import { UserButton } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidenav />
        <div className="flex flex-col flex-1">
          <header className="h-14 border-b flex items-center px-4 gap-3">
            <SidebarTrigger />
            <Link
              href="/recipes"
              className="text-sm font-medium whitespace-nowrap"
            >
              Home Recipes
            </Link>
            <div className="flex-1 max-w-xs">
              <SearchInput />
            </div>
            <Button
              className="ml-auto shrink-0"
              variant="outline"
              size="sm"
              asChild
            >
              <Link href="/recipes/create" className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={PlusSignCircleIcon}
                  size={16}
                  strokeWidth={1.5}
                />
                <span className="hidden sm:inline">Add Recipe</span>
              </Link>
            </Button>
            <UserButton
              fallback={
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              }
            />
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
