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
  Calendar03Icon,
  GridIcon,
  StarIcon,
  SpoonIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "All recipes", href: "/recipes", icon: GridIcon },
  { label: "Meal planner", href: "/meal-planner", icon: Calendar03Icon },
  { label: "Favorites", href: "/favorites", icon: StarIcon },
];

// TODO: Get tags from SQL
const tabItems = [
  { label: "Baking", href: "/recipes?tag=Baking" },
  { label: "Beef", href: "/recipes?tag=Beef" },
  { label: "Chicken", href: "/recipes?tag=Chicken" },
  { label: "Cock Pot", href: "/recipes?tag=Cock%20Pot" },
  { label: "Desserts", href: "/recipes?tag=Desserts" },
  { label: "Dips", href: "/recipes?tag=Dips" },
  { label: "Pasta", href: "/recipes?tag=Pasta" },
  { label: "Quick Meals", href: "/recipes?tag=Quick%20Meal" },
  { label: "Soup", href: "/recipes?tag=Soup" },
];

export default function SideNav() {
  const { setOpenMobile, isMobile } = useSidebar();
  const pathname = usePathname();

  const closeOnMobile = () => {
    if (isMobile) setOpenMobile(false);
  };
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/recipes">
              <HugeiconsIcon
                icon={SpoonIcon}
                size={28}
                color="black"
                strokeWidth={1.5}
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Browse</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  onClick={closeOnMobile}
                >
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
            {tabItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  onClick={closeOnMobile}
                >
                  <Link href={item.href}>{item.label}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
