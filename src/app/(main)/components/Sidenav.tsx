"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Book,
  Book04Icon,
  Calendar03Icon,
  GridIcon,
  StarIcon,
  SpoonIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "All recipes", href: "/recipes", icon: GridIcon },
  { label: "My cookbook", href: "/cookbook", icon: Book04Icon },
  { label: "Meal planner", href: "/meal-planner", icon: Calendar03Icon },
  { label: "Favorites", href: "/favorites", icon: StarIcon },
];

const tagItems = [
  { label: "Quick meals", href: "/recipes?tag=quick" },
  { label: "Dinner", href: "/recipes?tag=weeknight" },
  { label: "Breakfast", href: "/recipes?tag=breakfast" },
  { label: "Pasta", href: "/recipes?tag=pasta" },
  { label: "Baking", href: "/recipes?tag=baking" },
  { label: "Desserts", href: "/recipes?tag=desserts" },
];

export default function SideNav() {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <HugeiconsIcon
              icon={SpoonIcon}
              size={48}
              color="black"
              strokeWidth={1.5}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Browse</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <Link href={item.href}>
                    {item.label}
                    <HugeiconsIcon
                      icon={item.icon}
                      size={28}
                      color="black"
                      strokeWidth={1.5}
                    />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tags</SidebarGroupLabel>
          <SidebarMenu>
            {tagItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">Settings</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
