"use client";

type ResultProps = {
  story: string;
  isLoading: boolean;
};

const Result = ({ story, isLoading }: ResultProps) => {
  return (
    <section className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
      <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
        Generated Story
      </h2>
      <div className="rounded-lg bg-zinc-50 p-4 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <p>{isLoading ? "Loading..." : story}</p>
      </div>
    </section>
  );
};

export default Result;
