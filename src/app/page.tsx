"use client";
import { useState, useEffect } from "react";
import EmojiItem from "../components/EmojiItem";

interface Emoji {
  id: number;
  name: string;
  emoji: string;
  votes: number;
}

async function fetchEmojis(): Promise<Emoji[]> {
  // console.log("fetchEmojis called ---");
  const response = await fetch("http://localhost:3000/api/emojis");
  const result = await response.json();
  if (result.status === "ok") {
    return result.data;
  }
  return [];
}

function EmojiList({
  emojis,
  onVoteSuccess,
  onVoteError,
}: {
  emojis: Emoji[];
  onVoteSuccess: (id: number, newVoteCount: number) => void;
  onVoteError: (error: string) => void;
}) {
  return (
    <ul className="list-disc pl-6">
      {emojis.map((emoji) => (
        <EmojiItem
          key={emoji.id}
          emoji={emoji}
          onVoteSuccess={onVoteSuccess}
          onVoteError={onVoteError}
        />
      ))}
    </ul>
  );
}

export default function Home() {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch emojis
  useEffect(() => {
    const loadEmojis = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedEmojis = await fetchEmojis();
        setEmojis(fetchedEmojis);
      } catch (err) {
        console.error("Failed to fetch emojis:", err);
        setError("Failed to load emojis. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadEmojis();
  }, []);

  // Handle successful vote
  const handleVoteSuccess = (id: number, newVoteCount: number) => {
    // console.log("handleVoteSuccess called ---");
    setEmojis((prev) =>
      prev.map((e) => (e.id === id ? { ...e, votes: newVoteCount } : e))
    );
    if (error) setError(null);
  };

  // Handle vote error
  const handleVoteError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">Loading emojis...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center text-red-500">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Emoji List</h1>
      {emojis.length === 0 ? (
        <p>No emojis found.</p>
      ) : (
        <EmojiList
          emojis={emojis}
          onVoteSuccess={handleVoteSuccess}
          onVoteError={handleVoteError}
        />
      )}
    </div>
  );
}
