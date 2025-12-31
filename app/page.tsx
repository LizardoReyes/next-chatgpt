import Link from "next/link";

export const metadata = {
  title: "Home - Story Generator",
  description: "Welcome to the Story Generator application.",
};

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 dark:bg-zinc-900">
      <main className="w-full max-w-3xl rounded-2xl bg-white p-10 shadow-lg dark:bg-zinc-950">
        <div className="space-y-8">
          {/* Header */}
          <header>
            <h1 className="mb-2 text-center text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Story Generator
            </h1>
            <p className="text-zinc-600 text-center dark:text-zinc-400 mt-4">
              Create unique stories using ChatGPT assistance
            </p>
          </header>
          <Link
            className="mt-2 rounded-lg bg-indigo-600 px-6 py-2 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-center w-full block"
            href="/bot"
          >
            Go to Story Generator
          </Link>
        </div>
      </main>
    </div>
  );
}
