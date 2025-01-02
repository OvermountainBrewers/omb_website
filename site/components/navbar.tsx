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
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={getLinkStyle("/")}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/members" legacyBehavior passHref>
            <NavigationMenuLink className={getLinkStyle("/members")}>
              Members
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/learn" legacyBehavior passHref>
            <NavigationMenuLink className={getLinkStyle("/learn")}>
              Learn
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/activities" legacyBehavior passHref>
            <NavigationMenuLink className={getLinkStyle("/activities")}>
              Activities
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/meeting-minutes" legacyBehavior passHref>
            <NavigationMenuLink className={getLinkStyle("/meeting-minutes")}>
              Meeting Minutes
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/resources" legacyBehavior passHref>
            <NavigationMenuLink className={getLinkStyle("/resources")}>
              Resources
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/gallery" legacyBehavior passHref>
            <NavigationMenuLink className={getLinkStyle("/gallery")}>
              Gallery
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={getLinkStyle("/about")}>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </div>

      <NavigationMenuItem>
        <Link href="https://discord.gg/pvz3PW69yw" legacyBehavior passHref>
          <NavigationMenuLink className="inline-flex items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
            Discord
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}
