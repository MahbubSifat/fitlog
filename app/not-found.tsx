import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-[#ccff00] text-sm font-bold tracking-[0.2em] mb-4">
        404
      </p>
      <h1
        className="uppercase text-3xl sm:text-4xl font-bold mb-4"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Page Not Found
      </h1>
      <p className="text-gray-500 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="inline-block bg-[#ccff00] text-black font-bold text-sm px-6 py-3 rounded-md"
      >
        Back to Home
      </Link>
    </div>
  );
}