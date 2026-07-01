export default function BookCard({ book, onEdit, onDelete }: any) {
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-2">
      <h2 className="font-bold text-lg">{book.title}</h2>
      <p className="text-gray-600">{book.author}</p>
      <p className="text-sm capitalize">{book.status}</p>
      {book.shelfLocation && <p className="text-sm">Shelf: {book.shelfLocation}</p>}
      <div className="flex space-x-3 pt-2">
        <button onClick={() => onEdit(book)} className="text-blue-600 text-sm">Edit</button>
        <button onClick={() => onDelete(book.id)} className="text-red-600 text-sm">Delete</button>
      </div>
    </div>
  );
}