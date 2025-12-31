"use client";

import { useState } from "react";
import Form from "../components/Form";
import Result from "../components/Result";

export default function BotPage() {
  const [genre, setGenre] = useState("");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("Your generated story will appear here.");
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    const data = await fetch(
      "/api?search=" + encodeURIComponent(`${title} en tono ${genre}`)
    );
    console.log(
      "/api?search=" + encodeURIComponent(`${title} en tono ${genre}`)
    );
    return data.json();
  };

  const createStory = async () => {
    console.log(`${title} en tono ${genre}`);
    setIsLoading(true);
    getData()
      .then((res) => {
        setStory(res.data);
      })
      .catch((err) => {
        console.error("Error fetching story:", err);
        setStory("An error occurred while generating the story.");
      })
      .finally(() => setIsLoading(false));
    setGenre("");
    setTitle("");
  };

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

          <Form
            genre={genre}
            setGenre={setGenre}
            title={title}
            setTitle={setTitle}
            createStory={createStory}
            isLoading={isLoading}
          />
          <Result story={story} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
