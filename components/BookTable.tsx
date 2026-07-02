"use client";
import { Edit2, Trash2, MapPin, Calendar, BookOpen } from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn?: string | null;
  publishedYear?: number | null;
  publisher?: string | null;
  genre?: string | null;
  language?: string | null;
  pageCount?: number | null;
  shelfLocation?: string | null;
  status?: string | null;
  notes?: string | null;
  coverUrl?: string | null;
}

interface BookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export default function BookTable({ books, onEdit, onDelete }: BookTableProps) {
  const getStatusBadge = (status?: string | null) => {
    switch (status?.toLowerCase()) {
      case "reading":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "read":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  return (
    <div className="bg-[#121214] border border-neutral-800/80 rounded-xl overflow-hidden shadow-xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-neutral-900 bg-[#161619] text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            <th className="py-4 px-6 font-medium">Folio Title & Author</th>
            <th className="py-4 px-6 font-medium hidden md:table-cell">Subject/Genre</th>
            <th className="py-4 px-6 font-medium">Status</th>
            <th className="py-4 px-6 font-medium hidden sm:table-cell">Shelf Allocation</th>
            <th className="py-4 px-6 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-900/60">
          {books.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-12 text-center text-sm font-light text-zinc-500 font-serif italic">
                No archived publications found matching these parameters.
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <tr 
                key={book.id} 
                className="group hover:bg-[#161619]/40 transition-colors duration-200"
              >
                {/* Title & Author */}
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    {/* Small virtual placeholder thumbnail */}
                    <div className="w-8 h-11 bg-neutral-900 border border-neutral-800/50 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {book.coverUrl ? (
                        <img src={book.coverUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-serif text-[10px] text-zinc-600">📖</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-serif text-sm text-zinc-200 group-hover:text-zinc-100 transition-colors truncate">
                        {book.title}
                      </p>
                      <p className="text-xs text-zinc-400 font-light truncate mt-0.5">
                        {book.author}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Genre */}
                <td className="py-4 px-6 hidden md:table-cell">
                  <span className="text-xs font-light text-zinc-400 font-mono tracking-wide">
                    {book.genre || "—"}
                  </span>
                </td>

                {/* Status */}
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-widest rounded-full border ${getStatusBadge(book.status)}`}>
                    {book.status || "unread"}
                  </span>
                </td>

                {/* Shelf Location */}
                <td className="py-4 px-6 hidden sm:table-cell">
                  <div className="flex items-center space-x-1.5 text-zinc-400 font-mono text-xs">
                    <MapPin size={11} className="text-zinc-600" />
                    <span className="truncate max-w-[150px]">{book.shelfLocation || "Unallocated"}</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end space-x-3">
                    <button
                      onClick={() => onEdit(book)}
                      className="p-1.5 hover:bg-neutral-800 text-zinc-500 hover:text-zinc-200 rounded-lg transition-colors cursor-pointer"
                      title="Edit Entry"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => onDelete(book.id)}
                      className="p-1.5 hover:bg-red-950/20 text-zinc-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                      title="Delete Entry"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}