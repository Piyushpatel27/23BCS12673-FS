import { useState } from 'react'
import './App.css'

function Welcome({ name }) {
  return <h2 className="welcome-text">Welcome, {name ? name : "Guest"}</h2>;
}

function App() {
  return (
    <div className="full-bg">
      <h1 className="title">End Semester Practical</h1>

      <Welcome name="Piyush" />
      <Welcome />
    </div>
  );
}

export default App;
