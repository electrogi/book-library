"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({ page, total, limit, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(total / limit);
  const safeTotalPages = totalPages || 1;

  return (
    <div className="flex items-center justify-between border-t border-neutral-900/60 pt-6 mt-8">
      {/* Detail Counter */}
      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider hidden sm:block">
        Showing Page {page} of {safeTotalPages} <span className="text-zinc-700">|</span> Total Records: {total}
      </div>

      {/* Navigation Cluster */}
      <div className="flex items-center space-x-2 ml-auto">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex items-center space-x-1.5 px-3 py-2 bg-[#121214] hover:bg-[#161619] disabled:opacity-30 border border-neutral-800 disabled:hover:bg-[#121214] text-zinc-400 hover:text-zinc-200 disabled:text-zinc-600 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronLeft size={13} />
          <span>Prev</span>
        </button>

        <span className="px-4 py-2 bg-[#161619] border border-neutral-800 text-zinc-300 rounded-lg text-xs font-mono font-medium">
          {page} <span className="text-zinc-600">/</span> {safeTotalPages}
        </span>

        <button
          disabled={page >= safeTotalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex items-center space-x-1.5 px-3 py-2 bg-[#121214] hover:bg-[#161619] disabled:opacity-30 border border-neutral-800 disabled:hover:bg-[#121214] text-zinc-400 hover:text-[#f3f3ee] disabled:text-zinc-600 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}