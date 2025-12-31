"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const router = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white"
        >
          StoryAI
        </Link>

        {/* Links */}
        <ul className="flex items-center gap-8 text-sm font-medium">
          <li>
            <Link
              href="/"
              className={`rounded-lg px-4 py-2 text-white transition hover:bg-indigo-700 ${
                router === "/" ? "bg-indigo-600" : ""
              }`}
            >
              Home
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all group-hover:w-full" />
            </Link>
          </li>

          <li>
            <Link
              href="/bot"
              className={`rounded-lg px-4 py-2 text-white transition hover:bg-indigo-700 ${
                router === "/bot" ? "bg-indigo-600" : ""
              }`}
            >
              Story Generator
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
