import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Notification {
  id: string;
  message: string;
  createdAt: string;
}

export function useAdminNotifications(token: string | null) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!token) return;

    const socket: Socket = io("http://localhost:3001", {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socket.on("connect", () => {
      console.log("✅ Connected to notification server");
    });

    // 👉 Receive backlog on connect
    socket.on("notification-backlog", (data: Notification[]) => {
      setNotifications(data);
    });

    // 👉 Receive new notification
    socket.on("new-user-signup", (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from notification server");
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  return notifications;
}
