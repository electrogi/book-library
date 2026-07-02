"use client";
import { useState } from "react";
import { createBook, updateBook } from "@/actions/books";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Layers, MapPin, Tag, Globe, Calendar, Hash } from "lucide-react";

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

interface BookFormProps {
  book?: Book | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function BookForm({ book, onClose, onSaved }: BookFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: book?.title || "",
    author: book?.author || "",
    isbn: book?.isbn || "",
    publishedYear: book?.publishedYear || "",
    publisher: book?.publisher || "",
    genre: book?.genre || "",
    language: book?.language || "English",
    pageCount: book?.pageCount || "",
    shelfLocation: book?.shelfLocation || "",
    status: book?.status || "unread",
    notes: book?.notes || "",
    coverUrl: book?.coverUrl || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      ...form,
      publishedYear: form.publishedYear ? Number(form.publishedYear) : undefined,
      pageCount: form.pageCount ? Number(form.pageCount) : undefined,
    };
    
    let res;
    if (book) {
      res = await updateBook(book.id, data);
    } else {
      res = await createBook(data);
    }
    
    setLoading(false);
    if (res?.error) {
      alert(res.error);
    } else {
      onSaved();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#09090b]/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#121214] border border-neutral-800 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden relative"
      >
        {/* Sleek Top Banner Accent */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800" />

        {/* Form Header */}
        <div className="p-6 border-b border-neutral-900 flex justify-between items-center bg-[#151518]">
          <div>
            <h2 className="text-xl font-serif text-zinc-100">
              {book ? "Edit Library Record" : "Add New Folio"}
            </h2>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
              {book ? `REGISTRY ID: #${book.id}` : "REGISTER NEW CATALOG ENTRY"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-800 text-zinc-500 hover:text-zinc-200 rounded-lg transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Section 1: Crucial Identity */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest border-b border-neutral-900 pb-2">
              Identity & Authorship
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                  Folio Title *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. The Odyssey"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-[#161619] text-zinc-100 placeholder-zinc-700 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-800 transition-colors font-light"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                  Author / Creator *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Homer"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full bg-[#161619] text-zinc-100 placeholder-zinc-700 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-800 transition-colors font-light"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Metadata Grid */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest border-b border-neutral-900 pb-2">
              Publication Metadata
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                  ISBN Identifier
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"><Hash size={13} /></span>
                  <input
                    type="text"
                    placeholder="978-..."
                    value={form.isbn}
                    onChange={(e) => setForm({ ...form, isbn: e.target.value })}
                    className="w-full bg-[#161619] text-zinc-100 placeholder-zinc-700 border border-neutral-800 rounded-lg pl-9 pr-3.5 py-2 text-sm focus:outline-none focus:border-zinc-500 transition-colors font-light"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                  Publication Year
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"><Calendar size={13} /></span>
                  <input
                    type="number"
                    placeholder="e.g. 1984"
                    value={form.publishedYear}
                    onChange={(e) => setForm({ ...form, publishedYear: e.target.value })}
                    className="w-full bg-[#161619] text-zinc-100 placeholder-zinc-700 border border-neutral-800 rounded-lg pl-9 pr-3.5 py-2 text-sm focus:outline-none focus:border-zinc-500 transition-colors font-light"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                  Publisher / Imprint
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"><Layers size={13} /></span>
                  <input
                    type="text"
                    placeholder="e.g. Penguin Books"
                    value={form.publisher}
                    onChange={(e) => setForm({ ...form, publisher: e.target.value })}
                    className="w-full bg-[#161619] text-zinc-100 placeholder-zinc-700 border border-neutral-800 rounded-lg pl-9 pr-3.5 py-2 text-sm focus:outline-none focus:border-zinc-500 transition-colors font-light"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                  Genre / Subject
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"><Tag size={13} /></span>
                  <input
                    type="text"
                    placeholder="e.g. Philosophy"
                    value={form.genre}
                    onChange={(e) => setForm({ ...form, genre: e.target.value })}
                    className="w-full bg-[#161619] text-zinc-100 placeholder-zinc-700 border border-neutral-800 rounded-lg pl-9 pr-3.5 py-2 text-sm focus:outline-none focus:border-zinc-500 transition-colors font-light"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                  Language
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"><Globe size={13} /></span>
                  <input
                    type="text"
                    placeholder="English"
                    value={form.language}
                    onChange={(e) => setForm({ ...form, language: e.target.value })}
                    className="w-full bg-[#161619] text-zinc-100 placeholder-zinc-700 border border-neutral-800 rounded-lg pl-9 pr-3.5 py-2 text-sm focus:outline-none focus:border-zinc-500 transition-colors font-light"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                  Page Count
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"><BookOpen size={13} /></span>
                  <input
                    type="number"
                    placeholder="e.g. 350"
                    value={form.pageCount}
                    onChange={(e) => setForm({ ...form, pageCount: e.target.value })}
                    className="w-full bg-[#161619] text-zinc-100 placeholder-zinc-700 border border-neutral-800 rounded-lg pl-9 pr-3.5 py-2 text-sm focus:outline-none focus:border-zinc-500 transition-colors font-light"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Physical Staging */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest border-b border-neutral-900 pb-2">
              Spine Configuration & Staging
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                  Shelf Location
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"><MapPin size={13} /></span>
                  <input
                    type="text"
                    placeholder="e.g. North Room, Case B"
                    value={form.shelfLocation}
                    onChange={(e) => setForm({ ...form, shelfLocation: e.target.value })}
                    className="w-full bg-[#161619] text-zinc-100 placeholder-zinc-700 border border-neutral-800 rounded-lg pl-9 pr-3.5 py-2 text-sm focus:outline-none focus:border-zinc-500 transition-colors font-light"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                  Folio Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full bg-[#161619] text-zinc-300 border border-neutral-800 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-zinc-500 transition-colors cursor-pointer"
                >
                  <option value="unread">Unread</option>
                  <option value="reading">Reading</option>
                  <option value="read">Read</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                Cover Image URL
              </label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={form.coverUrl}
                onChange={(e) => setForm({ ...form, coverUrl: e.target.value })}
                className="w-full bg-[#161619] text-zinc-100 placeholder-zinc-700 border border-neutral-800 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-zinc-500 transition-colors font-light"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                Archival Notes & Notes
              </label>
              <textarea
                placeholder="Condition remarks, critical notes, acquisition details..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                className="w-full bg-[#161619] text-zinc-100 placeholder-zinc-700 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-zinc-500 transition-colors font-light resize-none"
              />
            </div>
          </div>
        </form>

        {/* Form Footer */}
        <div className="p-6 border-t border-neutral-900 bg-[#151518] flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-neutral-800 hover:border-zinc-600 bg-transparent hover:bg-neutral-900 text-zinc-400 hover:text-zinc-200 rounded-lg text-xs font-mono tracking-widest uppercase transition-all cursor-pointer"
          >
            Abort
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold rounded-lg text-xs font-mono tracking-widest uppercase transition-all cursor-pointer shadow-lg disabled:opacity-50"
          >
            {loading ? "Registering..." : book ? "Commit Changes" : "Commit Record"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}