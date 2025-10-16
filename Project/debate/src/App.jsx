import React from "react";
import './App.css';
const steps = [
  {
    id: 1,
    icon: "💬",
    title: "Choose Your Debate Topic",
    desc: "Select from AI-generated or user-defined debate topics to start your session.",
  },
  {
    id: 2,
    icon: "🤖",
    title: "Engage with AI Opponent",
    desc: "Argue your side while the Gemini AI presents counterpoints in real time.",
  },
  {
    id: 3,
    icon: "📊",
    title: "Receive Feedback & Report",
    desc: "Get detailed feedback on logic, vocabulary, and delivery after your debate.",
  },
];

export default function App() {
  return (
    <div className="snap-y snap-mandatory min-h-screen overflow-y-scroll scroll-smooth">
      {/* Header */}
      <section className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 text-center snap-start">
        <h1 className="text-5xl font-bold mb-4">Welcome to Argumate</h1>
        <p className="text-lg text-gray-600 max-w-xl">
          Practice debating with AI to enhance your critical thinking and communication skills.
        </p>
      </section>

      {/* Steps */}
      {steps.map((step) => (
        <section
          key={step.id}
          className="w-full h-screen flex flex-col items-center justify-center text-center bg-white snap-start"
        >
          <div className="text-6xl mb-6">{step.icon}</div>
          <h2 className="text-3xl font-semibold mb-2">{step.title}</h2>
          <p className="max-w-md text-gray-600">{step.desc}</p>
        </section>
      ))}

      {/* Contact */}
      <section className="w-full h-screen flex flex-col items-center justify-center bg-blue-600 text-white snap-start">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p>Email: support@argumate.ai</p>
        <p className="mt-2">Follow us on social: @ArgumateOfficial</p>
      </section>
    </div>
  );
}
