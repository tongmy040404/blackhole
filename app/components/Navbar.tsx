"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/awards", label: "Awards" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="mx-auto flex max-w-3xl items-center justify-between rounded-full border border-white/10 bg-black/50 px-6 py-3 shadow-lg shadow-black/30 backdrop-blur-md">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.2em] text-white uppercase neon-link"
        >
          TONG
        </Link>

        <ul className="flex items-center gap-6 sm:gap-8">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm tracking-wide transition-all duration-300 neon-link ${
                    isActive ? "text-white" : "text-white/60"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
