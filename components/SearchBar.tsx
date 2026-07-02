"use client";
import { Search, Filter, ArrowUpDown, SlidersHorizontal } from "lucide-react";

interface SearchBarProps {
  search: string;
  setSearch: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  sort: string;
  setSort: (val: string) => void;
  order: "asc" | "desc";
  setOrder: (val: "asc" | "desc") => void;
}

export default function SearchBar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sort,
  setSort,
  order,
  setOrder,
}: SearchBarProps) {
  return (
    <div className="bg-[#121214] border border-neutral-800/80 rounded-xl p-4 md:p-6 space-y-4 shadow-xl relative overflow-hidden">
      {/* Visual Subtitle Border Accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-700/30 to-transparent" />

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Field */}
        <div className="flex-1 relative group">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors pointer-events-none">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search by title, author, or publisher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#161619] text-zinc-100 placeholder-zinc-600 border border-neutral-800/80 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-800 transition-all font-light"
          />
        </div>

        {/* Filter Controls Stack */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          {/* Status Filter */}
          <div className="flex-1 sm:flex-initial relative min-w-[130px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
              <Filter size={13} />
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-[#161619] text-zinc-300 border border-neutral-800/80 rounded-lg pl-8 pr-8 py-2.5 text-xs font-mono uppercase tracking-wider focus:outline-none focus:border-zinc-500 transition-colors cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="unread">Unread</option>
              <option value="reading">Reading</option>
              <option value="read">Read</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600 text-[10px]">▼</div>
          </div>

          {/* Sort By Field */}
          <div className="flex-1 sm:flex-initial relative min-w-[140px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
              <SlidersHorizontal size={13} />
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full appearance-none bg-[#161619] text-zinc-300 border border-neutral-800/80 rounded-lg pl-8 pr-8 py-2.5 text-xs font-mono uppercase tracking-wider focus:outline-none focus:border-zinc-500 transition-colors cursor-pointer"
            >
              <option value="created_at">Date Added</option>
              <option value="title">Alphabetical: Title</option>
              <option value="author">Alphabetical: Author</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600 text-[10px]">▼</div>
          </div>

          {/* Toggle Sort Order */}
          <button
            onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
            className="p-2.5 bg-[#161619] hover:bg-[#1e1e22] text-zinc-400 hover:text-zinc-200 border border-neutral-800/80 rounded-lg transition-all flex items-center justify-center cursor-pointer group"
            title={order === "asc" ? "Ascending" : "Descending"}
          >
            <ArrowUpDown size={15} className={`transition-transform duration-300 ${order === "desc" ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}