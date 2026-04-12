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
import { useSidebar } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "All recipes", href: "/recipes", icon: GridIcon },
  { label: "My cookbook", href: "/cookbook", icon: Book04Icon },
  { label: "Meal planner", href: "/meal-planner", icon: Calendar03Icon },
  { label: "Favorites", href: "/favorites", icon: StarIcon },
];

const tagItems = [
  { label: "Quick Meals", href: "/recipes?tag=Quick%20Meal" },
  { label: "Dinner", href: "/recipes?tag=Dinner" },
  { label: "Breakfast", href: "/recipes?tag=Breakfast" },
  { label: "Pasta", href: "/recipes?tag=Pasta" },
  { label: "Baking", href: "/recipes?tag=Baking" },
  { label: "Desserts", href: "/recipes?tag=Desserts" },
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
            {tagItems.map((item) => (
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

      {/* <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">Settings</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
    </Sidebar>
  );
}
