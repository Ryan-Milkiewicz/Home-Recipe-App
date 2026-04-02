import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidenav from "./components/Sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidenav />
        <div className="flex flex-col flex-1">
          <header className="h-14 border-b flex items-center px-4 gap-3">
            <SidebarTrigger />
            <span className="text-sm font-medium">Home Recipes</span>
            <Input
              className="w-64 h-8 mx-auto rounded-full text-sm"
              placeholder="Search recipes..."
            />
            <Button className="ml-auto" variant="outline">
              <Link href="/recipes/create">Add Recipe</Link>
            </Button>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
