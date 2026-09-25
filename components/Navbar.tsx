"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const navLinks = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { todaysPlan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-3 sm:px-6 lg:px-8 h-16 gap-2">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="FitLog logo" width={28} height={28} />
          <span className="hidden sm:inline text-gray-900 font-bold tracking-wide text-lg">
            FITLOG
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs sm:text-sm font-semibold pb-1 transition-colors ${
                  isActive
                    ? "text-black border-b-2 border-[#ccff00]"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] text-black text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 whitespace-nowrap"
          >
            Plan {todaysPlan.length}
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-gray-300 text-gray-700 text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 whitespace-nowrap"
          >
            Saved {saved.length}
          </Link>
        </div>
      </nav>
    </header>
  );
}