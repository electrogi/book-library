export default function Pagination({ page, total, limit, onPageChange }: any) {
  const totalPages = Math.ceil(total / limit);
  return (
    <div className="flex justify-center space-x-2 mt-6">
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="px-3 py-1 border rounded">Prev</button>
      <span className="px-3 py-1">{page} / {totalPages || 1}</span>
      <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} className="px-3 py-1 border rounded">Next</button>
    </div>
  );
}