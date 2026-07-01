export default function SearchBar({ search, setSearch, statusFilter, setStatusFilter, sort, setSort, order, setOrder }: any) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 border rounded-lg px-4 py-2"
      />
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border rounded-lg px-3 py-2">
        <option value="">All statuses</option>
        <option value="unread">Unread</option>
        <option value="reading">Reading</option>
        <option value="read">Read</option>
      </select>
      <select value={sort} onChange={(e) => setSort(e.target.value)} className="border rounded-lg px-3 py-2">
        <option value="created_at">Date added</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>
      <button
        onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
        className="border rounded-lg px-3 py-2"
      >
        {order === "asc" ? "↑" : "↓"}
      </button>
    </div>
  );
}