import React from "react";

function BookForm({ formData, handleChange, handleSubmit, editingBookId }) {
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "15px" }}>
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        required
      />
      <button type="submit">{editingBookId ? "Update" : "Add"} Book</button>
    </form>
  );
}

export default BookForm;