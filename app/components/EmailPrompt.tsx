"use client";

import { useState } from "react";

export default function EmailPrompt({
  onEmailSubmit,
}: {
  onEmailSubmit: (email: string) => void;
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onEmailSubmit(email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 bg-gray-100 p-6 rounded-xl w-full max-w-sm mx-auto mt-10"
    >
      <h2 className="text-lg font-semibold text-center">
        Enter your email to save analytics
      </h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="p-2 border rounded-lg"
        required
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
      >
        Continue
      </button>
    </form>
  );
}
