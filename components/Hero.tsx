import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
      <div className="bg-[#0d0f14] border border-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 py-10 md:py-14 gap-8">
        <div className="max-w-xl">
          <p className="text-[#ccff00] text-xs sm:text-sm font-bold tracking-[0.2em] mb-4">
            WORKOUT LIBRARY
          </p>
          <h1
            className="text-white uppercase text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4"
            style={{ fontFamily: "var(--font-oswald)", fontWeight: 700 }}
          >
            Train With Intent. Log Every Set.
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mb-8">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a href="#library" className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold text-sm px-6 py-3 rounded-md hover:brightness-95 transition">
            BROWSE WORKOUTS
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="shrink-0">
          <Image
            src="/banner.png"
            alt="Fitness equipment illustration"
            width={280}
            height={280}
            className="w-40 sm:w-56 md:w-64 h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}