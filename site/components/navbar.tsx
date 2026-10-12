"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname?.includes("/cms")) return <></>;

  return <NavContent />;
}

function NavContent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavigationMenu>
      <div className="md:hidden">
        <Button
          id="menu-toggle"
          variant="ghost"
          aria-expanded={isOpen}
          aria-controls="menu"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
        {isOpen && <NavItems />}
      </div>
      <div className="hidden md:block">
        <NavItems />
      </div>
    </NavigationMenu>
  );
}

function NavItems() {
  const pathname = usePathname();

  const getLinkStyle = (path: string) => {
    const isActive = pathname === path || pathname?.startsWith(path + "/");
    return `${navigationMenuTriggerStyle()} ${
      isActive
        ? "text-foreground underline decoration-primary underline-offset-4 decoration-[3px] hover:bg-accent"
        : "hover:bg-accent"
    }`;
  };

  return (
    <NavigationMenuList id="menu" className="w-full justify-between gap-1">
      <div className="flex flex-wrap gap-1">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={getLinkStyle("/")}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={getLinkStyle("/members")}>
            <Link href="/members">Members</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={getLinkStyle("/learn")}>
            <Link href="/learn">Learn</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={getLinkStyle("/activities")}>
            <Link href="/activities">Activities</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={getLinkStyle("/meeting-minutes")}
          >
            <Link href="/meeting-minutes">Meeting Minutes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={getLinkStyle("/resources")}>
            <Link href="/resources">Resources</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={getLinkStyle("/gallery")}>
            <Link href="/gallery">Gallery</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={getLinkStyle("/about")}>
            <Link href="/about">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </div>

      <NavigationMenuItem>
        <NavigationMenuLink
          asChild
          className="inline-flex items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
        >
          <Link href="https://discord.gg/pvz3PW69yw">Discord</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}
