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
    <header className="fixed inset-x-0 top-4 z-50 px-3 sm:px-4">
      <nav className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full border border-white/10 bg-black/50 px-4 py-2.5 shadow-lg shadow-black/30 backdrop-blur-md sm:px-6 sm:py-3">
        <Link
          href="/"
          className="shrink-0 text-xs font-semibold tracking-[0.15em] text-white uppercase neon-link sm:text-sm sm:tracking-[0.2em]"
        >
          TONG
        </Link>

        <ul className="flex items-center gap-3.5 sm:gap-8">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-xs tracking-wide transition-all duration-300 neon-link sm:text-sm ${
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
