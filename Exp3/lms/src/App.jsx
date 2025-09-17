import React, { useState, useEffect } from "react";
import BookForm from "./components/BookForm.jsx";
import BookList from "./components/BookList.jsx";
import SearchBar from "./components/Search.jsx";
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: "", author: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBookId, setEditingBookId] = useState(null);

  // Fetch books from JSON Server
  useEffect(() => {
    fetch("http://localhost:3001/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update book
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBookId) {
      // Update existing book
      fetch(`http://localhost:3001/books/${editingBookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((updatedBook) => {
          setBooks(
            books.map((book) =>
              book.id === editingBookId ? updatedBook : book
            )
          );
          setEditingBookId(null);
          setFormData({ title: "", author: "" });
        });
    } else {
      // Add new book
      fetch("http://localhost:3001/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((newBook) => {
          setBooks([...books, newBook]);
          setFormData({ title: "", author: "" });
        });
    }
  };

  // Edit book
  const handleEdit = (book) => {
    setEditingBookId(book.id);
    setFormData({ title: book.title, author: book.author });
  };

  // Delete book
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/books/${id}`, {
      method: "DELETE",
    }).then(() => {
      setBooks(books.filter((book) => book.id !== id));
    });
  };

  // Filter by search
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 Library Management</h2>
      <BookForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editingBookId={editingBookId}
      />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BookList
        books={filteredBooks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;