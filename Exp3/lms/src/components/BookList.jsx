import React from "react";

function BookList({ books, handleEdit, handleDelete }) {
  return (
    <ul>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        books.map((book) => (
          <li key={book.id} style={{ marginBottom: "10px" }}>
            <strong>{book.title}</strong> by {book.author}
            <button
              onClick={() => handleEdit(book)}
              style={{ marginLeft: "10px" }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(book.id)}
              style={{ marginLeft: "5px" }}
            >
              Delete
            </button>
          </li>
        ))
      )}
    </ul>
  );
}

export default BookList;