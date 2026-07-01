"use client";
import { useState, useEffect, useCallback } from "react";
import { getBooks, deleteBook } from "@/actions/books";
import BookCard from "@/components/BookCard";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import BookForm from "@/components/BookForm";

export default function DashboardPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);

  const fetchBooks = useCallback(async () => {
    const data = await getBooks({ page, limit: 20, search, status: statusFilter, sort, order });
    setBooks(data.books);
    setTotal(data.total);
  }, [page, search, statusFilter, sort, order]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleDelete = async (id: number) => {
    await deleteBook(id);
    fetchBooks();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Library</h1>
        <button
          onClick={() => { setEditingBook(null); setShowForm(true); }}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          + Add Book
        </button>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
      />

      {/* Responsive list: cards on mobile, table on tablet+ */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Status</th>
              <th className="p-3">Shelf</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3 capitalize">{book.status}</td>
                <td className="p-3">{book.shelfLocation}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => { setEditingBook(book); setShowForm(true); }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onEdit={() => { setEditingBook(book); setShowForm(true); }} onDelete={handleDelete} />
        ))}
      </div>

      <Pagination page={page} total={total} limit={20} onPageChange={setPage} />

      {showForm && (
        <BookForm
          book={editingBook}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); fetchBooks(); }}
        />
      )}
    </div>
  );
}