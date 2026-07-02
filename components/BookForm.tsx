"use client";
import { createBook, updateBook } from "@/actions/books";
import { useState } from "react";

export default function BookForm({ book, onClose, onSaved }: any) {
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
    
    if (res?.error) {
      alert(res.error);
    } else {
      onSaved();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold">{book ? "Edit Book" : "Add Book"}</h2>
        <input required placeholder="Title *" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input" />
        <input required placeholder="Author *" value={form.author} onChange={e => setForm({...form, author: e.target.value})} className="input" />
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="ISBN" value={form.isbn} onChange={e => setForm({...form, isbn: e.target.value})} className="input" />
          <input placeholder="Year" type="number" value={form.publishedYear} onChange={e => setForm({...form, publishedYear: e.target.value})} className="input" />
          <input placeholder="Publisher" value={form.publisher} onChange={e => setForm({...form, publisher: e.target.value})} className="input" />
          <input placeholder="Genre" value={form.genre} onChange={e => setForm({...form, genre: e.target.value})} className="input" />
          <input placeholder="Language" value={form.language} onChange={e => setForm({...form, language: e.target.value})} className="input" />
          <input placeholder="Pages" type="number" value={form.pageCount} onChange={e => setForm({...form, pageCount: e.target.value})} className="input" />
        </div>
        <input placeholder="Shelf location" value={form.shelfLocation} onChange={e => setForm({...form, shelfLocation: e.target.value})} className="input" />
        <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="input">
          <option value="unread">Unread</option>
          <option value="reading">Reading</option>
          <option value="read">Read</option>
        </select>
        <textarea placeholder="Notes" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="input" rows={3} />
        <input placeholder="Cover image URL" value={form.coverUrl} onChange={e => setForm({...form, coverUrl: e.target.value})} className="input" />

        <div className="flex justify-end space-x-3 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg">Save</button>
        </div>
      </form>
    </div>
  );
}