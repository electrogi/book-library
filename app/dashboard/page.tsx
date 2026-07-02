"use client";
import { useState, useEffect, useCallback } from "react";
import { getBooks, deleteBook } from "@/actions/books";
import { logout } from "@/actions/auth";
import BookCard from "@/components/BookCard";
import BookTable from "@/components/BookTable";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import BookForm from "@/components/BookForm";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  LogOut, 
  BookOpen, 
  Grid, 
  List, 
  Library, 
  Bookmark, 
  Database,
  ArrowRight
} from "lucide-react";

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

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [loggingOut, setLoggingOut] = useState(false);

  const fetchBooks = useCallback(async () => {
    const data = await getBooks({ page, limit: 12, search, status: statusFilter, sort, order });
    if (data.error) {
      console.error(data.error);
    } else {
      setBooks(data.books || []);
      setTotal(data.total || 0);
    }
  }, [page, search, statusFilter, sort, order]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleDelete = async (id: number) => {
    if (confirm("Are you certain you want to permanently purge this library entry?")) {
      const res = await deleteBook(id);
      if (res?.error) {
        alert(res.error);
      } else {
        fetchBooks();
      }
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
  };

  // Derive simple statistics from the currently visible set of books
  const currentlyReadingCount = books.filter(b => b.status?.toLowerCase() === "reading").length;
  const readCount = books.filter(b => b.status?.toLowerCase() === "read").length;
  const uniqueGenresCount = Array.from(new Set(books.map(b => b.genre).filter(Boolean))).length;

  return (
    <div className="min-h-screen bg-[#09090b] text-[#F5F5F0] relative overflow-hidden font-sans pb-16">
      {/* Background Ambience */}
      <div className="absolute top-[-30%] right-[-10%] w-[70%] h-[70%] rounded-full bg-neutral-900/15 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-neutral-950 blur-[130px] pointer-events-none" />

      {/* Elegant Fixed Outer Border Frame */}
      <div className="hidden xl:block fixed inset-4 border border-neutral-900/40 pointer-events-none z-40 rounded-2xl" />

      <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 space-y-8 relative z-10">
        {/* Navigation / Header Shell */}
        <header className="flex justify-between items-center border-b border-neutral-900 pb-6">
          <div className="flex items-center space-x-3.5">
            <div className="w-9 h-9 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center text-zinc-400">
              <Library size={18} />
            </div>
            <div>
              <h1 className="text-xl font-serif text-zinc-100 tracking-tight leading-none">
                The Folio Registry
              </h1>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mt-1.5">
                Archival Catalog & Curator Portal
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setEditingBook(null);
                setShowForm(true);
              }}
              className="flex items-center space-x-1.5 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-medium rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <Plus size={14} />
              <span className="hidden sm:inline">Add Folio</span>
            </button>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="p-2 border border-neutral-800 hover:border-red-900/40 hover:bg-red-950/10 text-zinc-500 hover:text-red-400 rounded-lg transition-all cursor-pointer"
              title="Sign Out of Gateway"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* Statistical Dossier Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stat Card 1 */}
          <div className="bg-[#121214]/60 border border-neutral-900/80 p-5 rounded-xl shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-zinc-800" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
              Global Registry
            </span>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="text-3xl font-serif font-light text-zinc-100">{total}</span>
              <span className="text-xs font-mono text-zinc-500 uppercase">Items</span>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-[#121214]/60 border border-neutral-900/80 p-5 rounded-xl shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500/50" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
              Currently Open
            </span>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="text-3xl font-serif font-light text-amber-400">{currentlyReadingCount}</span>
              <span className="text-xs font-mono text-zinc-500 uppercase">Reading</span>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-[#121214]/60 border border-neutral-900/80 p-5 rounded-xl shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500/50" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
              Curated Index
            </span>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="text-3xl font-serif font-light text-emerald-400">{readCount}</span>
              <span className="text-xs font-mono text-zinc-500 uppercase">Completed</span>
            </div>
          </div>

          {/* Stat Card 4 */}
          <div className="bg-[#121214]/60 border border-neutral-900/80 p-5 rounded-xl shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-zinc-700" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
              Genres cataloged
            </span>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="text-3xl font-serif font-light text-zinc-300">{uniqueGenresCount}</span>
              <span className="text-xs font-mono text-zinc-500 uppercase">Subjects</span>
            </div>
          </div>
        </section>

        {/* Filters and Control Area */}
        <div className="space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
              Filter Registry Database
            </span>

            {/* Layout Toggle switches */}
            <div className="flex items-center space-x-1.5 bg-[#121214] border border-neutral-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  viewMode === "grid" 
                    ? "bg-[#1d1d21] text-zinc-100" 
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
                title="Catalog Grid View"
              >
                <Grid size={15} />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  viewMode === "table" 
                    ? "bg-[#1d1d21] text-zinc-100" 
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
                title="Index Table View"
              >
                <List size={15} />
              </button>
            </div>
          </div>

          <SearchBar
            search={search}
            setSearch={(val) => { setSearch(val); setPage(1); }}
            statusFilter={statusFilter}
            setStatusFilter={(val) => { setStatusFilter(val); setPage(1); }}
            sort={sort}
            setSort={(val) => { setSort(val); setPage(1); }}
            order={order}
            setOrder={(val) => { setOrder(val); setPage(1); }}
          />
        </div>

        {/* Main Content Area (Dynamic Grid / Table) */}
        <main>
          {viewMode === "grid" ? (
            /* Catalog Grid */
            books.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 border border-dashed border-neutral-800 rounded-2xl flex flex-col items-center justify-center space-y-4"
              >
                <Database size={36} className="text-zinc-700" />
                <p className="font-serif italic text-sm text-zinc-500">
                  No catalog items matching your filter requirements.
                </p>
                <button
                  onClick={() => { setSearch(""); setStatusFilter(""); }}
                  className="px-4 py-2 border border-neutral-800 hover:border-zinc-500 text-xs font-mono tracking-widest uppercase rounded-lg transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {books.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onEdit={(b) => { setEditingBook(b); setShowForm(true); }}
                      onDelete={handleDelete}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )
          ) : (
            /* Editorial Table list */
            <BookTable
              books={books}
              onEdit={(b) => { setEditingBook(b); setShowForm(true); }}
              onDelete={handleDelete}
            />
          )}
        </main>

        {/* Pagination navigators */}
        <Pagination page={page} total={total} limit={12} onPageChange={setPage} />

        {/* Modal Drawer Overlay */}
        <AnimatePresence>
          {showForm && (
            <BookForm
              book={editingBook}
              onClose={() => setShowForm(false)}
              onSaved={() => { setShowForm(false); fetchBooks(); }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}