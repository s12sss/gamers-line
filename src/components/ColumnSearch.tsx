"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState, FormEvent } from "react";

export default function ColumnSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }
    // タグは保持しても外してもよいが、一旦検索を優先してタグを消す場合は params.delete("tag"); 
    // 今回は掛け合わせ検索を許容するため残す
    router.push(`/column?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="キーワードで検索..."
        className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-[0.85rem] text-white placeholder-white/40 focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all"
      />
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
      <button type="submit" className="hidden">検索</button>
    </form>
  );
}
