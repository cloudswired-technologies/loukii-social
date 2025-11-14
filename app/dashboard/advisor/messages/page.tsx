"use client";

import { useState } from "react";
import { Search, Send, MoreVertical, Archive, Trash2 } from "lucide-react";

export default function AdvisorMessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock conversations
  const conversations = [
    {
      id: 1,
      name: "Sarah Ahmad",
      avatar: "SA",
      lastMessage: "Thank you for the consultation!",
      time: "2m ago",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Ahmad Razak",
      avatar: "AR",
      lastMessage: "Can we schedule a meeting?",
      time: "1h ago",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Nurul Huda",
      avatar: "NH",
      lastMessage: "I have a question about my policy",
      time: "3h ago",
      unread: 1,
      online: true,
    },
  ];

  // Mock messages for selected chat
  const messages = [
    {
      id: 1,
      sender: "client",
      text: "Hello! I'm interested in learning more about your services.",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "me",
      text: "Hi Sarah! Thank you for reaching out. I'd be happy to help you. What specific services are you interested in?",
      time: "10:32 AM",
    },
    {
      id: 3,
      sender: "client",
      text: "I'm looking for family takaful protection. Can you guide me through the options?",
      time: "10:35 AM",
    },
    {
      id: 4,
      sender: "me",
      text: "Absolutely! I specialize in family takaful. Let me share some information with you.",
      time: "10:36 AM",
    },
    {
      id: 5,
      sender: "client",
      text: "Thank you for the consultation!",
      time: "11:45 AM",
    },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950 overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 border-r border-gray-200 dark:border-gray-800 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-sm"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 ${
                  selectedChat === conv.id ? "bg-gray-50 dark:bg-gray-800" : ""
                }`}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-[#16A34A] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">{conv.avatar}</span>
                  </div>
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {conv.name}
                    </h3>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 bg-[#16A34A] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{conv.unread}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-[#16A34A] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{selectedConversation?.avatar}</span>
                </div>
                {selectedConversation?.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {selectedConversation?.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {selectedConversation?.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md px-4 py-2 rounded-lg ${
                    message.sender === "me"
                      ? "bg-[#16A34A] text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "me"
                        ? "text-white/70"
                        : "text-gray-500"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#16A34A] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-2 bg-[#16A34A] hover:bg-[#15803d] text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
