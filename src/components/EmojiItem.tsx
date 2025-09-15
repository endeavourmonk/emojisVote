import { useState } from "react";

interface Emoji {
  id: number;
  name: string;
  emoji: string;
  votes: number;
}

interface EmojiItemProps {
  emoji: Emoji;
  onVoteSuccess: (id: number, newVoteCount: number) => void;
  onVoteError: (error: string) => void;
}

export default function EmojiItem({
  emoji,
  onVoteSuccess,
  onVoteError,
}: EmojiItemProps) {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async () => {
    if (isVoting) return;

    try {
      setIsVoting(true);

      const response = await fetch(
        `http://localhost:3000/api/emojis/${emoji.id}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const updatedEmoji = result.updatedEmoji[0];

      console.log("updatedEmoji = ", updatedEmoji);
      // Notify parent component of successful vote
      onVoteSuccess(emoji.id, updatedEmoji.votes);
    } catch (err) {
      console.error("Failed to vote:", err);
      onVoteError("Failed to vote. Please try again.");
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <li className="mb-2 flex items-center">
      {emoji.emoji} {emoji.name} - Votes: {emoji.votes}
      <button
        onClick={handleVote}
        disabled={isVoting}
        className={`ml-4 px-2 py-1 text-white rounded transition-colors ${
          isVoting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isVoting ? "Voting..." : "Vote"}
      </button>
    </li>
  );
}
