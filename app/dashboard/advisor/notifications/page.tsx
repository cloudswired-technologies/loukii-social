"use client";

import { useState } from "react";
import { Bell, Star, MessageSquare, UserPlus, Trash2, Check, CheckCheck } from "lucide-react";

export default function AdvisorNotificationsPage() {
  const [filter, setFilter] = useState("all");

  // Mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "review",
      icon: Star,
      title: "New Review",
      message: "Sarah Ahmad left you a 5-star review",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "message",
      icon: MessageSquare,
      title: "New Message",
      message: "Ahmad Razak sent you a message",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "follower",
      icon: UserPlus,
      title: "New Follower",
      message: "Nurul Huda started following you",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "review",
      icon: Star,
      title: "Review Reply",
      message: "Someone replied to your review response",
      time: "5 hours ago",
      read: true,
    },
    {
      id: 5,
      type: "message",
      icon: MessageSquare,
      title: "New Message",
      message: "Farah Iman sent you a message",
      time: "1 day ago",
      read: true,
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread") return !n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h1>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[#16A34A] hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all as read
            </button>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            filter === "all"
              ? "bg-[#16A34A] text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            filter === "unread"
              ? "bg-[#16A34A] text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No notifications to show</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`bg-white dark:bg-gray-900 rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                  notification.read
                    ? "border-gray-200 dark:border-gray-800"
                    : "border-[#16A34A] bg-green-50 dark:bg-green-900/10"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notification.read
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "bg-[#16A34A]"
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      notification.read
                        ? "text-gray-600 dark:text-gray-400"
                        : "text-white"
                    }`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {notification.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
