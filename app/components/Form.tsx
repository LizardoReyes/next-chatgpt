"use client";

const genres = [
  { value: "divertido", label: "Divertido" },
  { value: "para dormir", label: "Para Dormir" },
  { value: "emocionante", label: "Emocionante" },
  { value: "romance", label: "Romance" },
  { value: "horror", label: "Horror" },
];

type FormProps = {
  genre: string;
  setGenre: (genre: string) => void;
  title: string;
  setTitle: (title: string) => void;
  createStory: () => void;
  isLoading: boolean;
};

const Form = ({
  genre,
  setGenre,
  title,
  setTitle,
  createStory,
  isLoading,
}: FormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!genre || !title) {
      alert("Please select a genre and enter a title.");
      return;
    }

    createStory();
  };

  return (
    <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <select
          className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          name="genre"
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          disabled={isLoading}
          required
        >
          <option value="" disabled>
            --- Select a genre ---
          </option>
          {genres.map((genreOption) => (
            <option
              key={genreOption.value}
              value={genreOption.value}
              selected={genreOption.value === genre}
            >
              {genreOption.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the story title"
          disabled={isLoading}
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 rounded-lg bg-indigo-600 px-6 py-2 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {isLoading ? "Generating..." : "Generate Story"}
        </button>
      </form>
    </section>
  );
};

export default Form;
