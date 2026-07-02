"use client";
import { motion } from "framer-motion";
import { Edit2, Trash2, MapPin, BookOpen, Bookmark } from "lucide-react";

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

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  // Helper to determine status badge style
  const getStatusStyle = (status?: string | null) => {
    switch (status?.toLowerCase()) {
      case "reading":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "read":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  // Safe checks for metadata
  const hasCover = !!book.coverUrl && (book.coverUrl.startsWith("http") || book.coverUrl.startsWith("/"));

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group bg-[#121214] border border-neutral-800/80 hover:border-zinc-700/50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl flex flex-col transition-all"
    >
      {/* Cover Image or Procedural Cover Canvas */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#161619] border-b border-neutral-900 flex flex-col justify-between">
        {hasCover ? (
          <>
            {/* Background Blur Cover for Depth */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-2xl opacity-20 scale-105 pointer-events-none"
              style={{ backgroundImage: `url(${book.coverUrl})` }}
            />
            {/* Actual Book Cover */}
            <img
              src={book.coverUrl!}
              alt={book.title}
              className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </>
        ) : (
          /* Procedural Publishing Cover */
          <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-br from-[#1c1c1f] via-[#121214] to-[#18181b] relative z-10 overflow-hidden select-none">
            {/* Grid Pattern overlay for tactile paper feel */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_14px]" />
            {/* Spine Highlight */}
            <div className="absolute left-0 top-0 w-1.5 h-full bg-zinc-800/50" />

            <div className="space-y-3 relative z-10">
              <span className="font-mono text-[9px] tracking-widest text-zinc-600 uppercase block">
                {book.genre || "LITERARY ART"}
              </span>
              <h3 className="text-xl font-serif text-zinc-100 font-light leading-snug tracking-tight line-clamp-3">
                {book.title}
              </h3>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="w-8 h-[1px] bg-zinc-700" />
              <div className="space-y-1">
                <p className="text-xs font-serif text-zinc-400 italic font-light line-clamp-1">
                  by {book.author}
                </p>
                {book.publishedYear && (
                  <p className="text-[10px] font-mono text-zinc-600">
                    EDITION {book.publishedYear}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Overlay on Hover */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center space-x-3">
          <button
            onClick={() => onEdit(book)}
            className="p-2.5 bg-neutral-900 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-950 border border-neutral-800 rounded-lg transition-all cursor-pointer shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-[50ms]"
            title="Edit Record"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="p-2.5 bg-neutral-900 hover:bg-red-950 hover:text-red-300 text-zinc-400 border border-neutral-800 hover:border-red-900/50 rounded-lg transition-all cursor-pointer shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-[100ms]"
            title="Delete Record"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Small Corner Badge indicating Status (Static) */}
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest rounded-full border ${getStatusStyle(book.status)} shadow-lg backdrop-blur-sm`}>
            {book.status || "unread"}
          </span>
        </div>
      </div>

      {/* Book Metadata & Title Block below the cover */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <h4 className="font-serif text-base text-zinc-200 line-clamp-1 tracking-tight group-hover:text-zinc-100 transition-colors">
            {book.title}
          </h4>
          <p className="text-xs font-light text-zinc-400 line-clamp-1 italic">
            {book.author}
          </p>
        </div>

        {/* Footer info: Spine Location & Pages count */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-900/50 text-[10px] font-mono text-zinc-500">
          <div className="flex items-center space-x-1">
            <MapPin size={10} className="text-zinc-600" />
            <span className="truncate max-w-[120px]" title={book.shelfLocation || "Unassigned"}>
              {book.shelfLocation || "Shelf N/A"}
            </span>
          </div>

          {book.pageCount && (
            <div className="flex items-center space-x-1">
              <BookOpen size={10} className="text-zinc-600" />
              <span>{book.pageCount} pp</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}