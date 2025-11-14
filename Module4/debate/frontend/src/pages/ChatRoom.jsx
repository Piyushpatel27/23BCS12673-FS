import React, { useState, useRef, useEffect } from "react";
import { SignedIn, SignedOut, SignIn, useUser } from "@clerk/clerk-react";
import { Volume2, Send, Mic } from "lucide-react";

export default function ChatRoom() {
  const { user } = useUser();
  const [topic, setTopic] = useState("");
  const [stance, setStance] = useState("for");
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: currentMessage,
      type: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/gemini/argument", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          stance,
          history: [
            ...messages.map(
              (m) => `${m.type === "user" ? "User" : "AI"}: ${m.text}`
            ),
            `User: ${currentMessage}`,
          ],
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        const text = await response.text();
        data = { reply: text };
      }

      // ✅ Fix: safely extract string reply
      const aiResponse =
        typeof data === "string"
          ? data
          : data?.reply ||
            data?.response ||
            data?.text ||
            "⚠️ AI did not return a valid response.";

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: aiResponse,
          type: "ai",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      console.error("Error communicating with backend:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "⚠️ Failed to get AI response.",
          type: "error",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceCommand = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => setIsRecording(false), 2000);
    }
  };

  const handleListen = (text) => {
    if (speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setSpeaking(false);
      setSpeaking(true);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-3xl">💬</span>
                <h1 className="text-4xl font-bold text-gray-800">
                  Debate Arena
                </h1>
              </div>
              <p className="text-gray-600">
                Express your views, sharpen your arguments
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Signed in as {user?.firstName}
              </p>
            </div>

            {/* Debate Setup */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Debate Setup
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Debate Topic
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter the topic you want to debate..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Stance
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setStance("for")}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                      stance === "for"
                        ? "bg-green-300 text-black shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    👍 For
                  </button>
                  <button
                    onClick={() => setStance("against")}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                      stance === "against"
                        ? "bg-red-300 text-black shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    👎 Against
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Box */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-96 overflow-y-auto p-6 bg-gray-50 text-black">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <div className="text-6xl mb-3">💭</div>
                      <p>No messages yet. Start the debate!</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-4 flex ${
                          message.type === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div className="max-w-xs lg:max-w-md flex items-center gap-2">
                          <div
                            className={`rounded-2xl px-4 py-3 shadow-md ${
                              message.type === "user"
                                ? "bg-indigo-100 text-black rounded-tr-sm"
                                : message.type === "error"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-200 text-gray-800 rounded-tl-sm"
                            }`}
                          >
                            {message.text}
                          </div>

                          {/* 🎧 Enhanced Listen Button */}
                          {message.type === "ai" && (
                            <button
                              onClick={() => handleListen(message.text)}
                              className={`p-2 rounded-full border border-indigo-400 shadow-md transition transform hover:scale-110 hover:shadow-lg ${
                                speaking
                                  ? "bg-indigo-600 text-white animate-pulse"
                                  : "bg-white text-indigo-600 hover:bg-indigo-100"
                              }`}
                              title={
                                speaking
                                  ? "Stop Listening"
                                  : "Listen to argument"
                              }
                            >
                              <Volume2 size={18} />
                            </button>
                          )}
                        </div>
                        <p
                          className={`text-xs mt-1 ${
                            message.type === "user"
                              ? "text-right text-gray-500"
                              : "text-left text-gray-500"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start mb-4">
                        <div className="bg-gray-200 text-gray-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md flex items-center gap-2">
                          <span>🤖 AI is typing</span>
                          <div className="flex gap-1">
                            <span className="animate-bounce">.</span>
                            <span className="animate-bounce delay-100">.</span>
                            <span className="animate-bounce delay-200">.</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4 bg-white">
                <div className="flex gap-3 items-end">
                  <textarea
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your argument..."
                    rows="2"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg resize-none text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                  <button
                    onClick={handleVoiceCommand}
                    className={`p-3 rounded-lg transition shadow-md ${
                      isRecording
                        ? "bg-red-500 text-white animate-pulse"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    title="Voice command"
                  >
                    <Mic size={20} />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim()}
                    className={`p-3 rounded-lg transition shadow-md flex items-center justify-center ${
                      currentMessage.trim()
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                    title="Send message"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">
            You must be signed in to access the debate arena
          </h2>
          <SignIn path="/sign-in" routing="path" />
        </div>
      </SignedOut>
    </>
  );
}
