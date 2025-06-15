// src/components/NotificationProvider.jsx
import React, { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import clsx from "clsx";

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("useNotification must be used inside NotificationProvider");
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const notify = (message, type = "info") => {
        const id = Math.random().toString(36).substring(2);
        const newNotification = { id, message, type };
        setNotifications((prev) => [...prev, newNotification]);

        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 4000);
    };

    const remove = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            <div className="fixed top-4 right-4 z-50 space-y-2">
                <AnimatePresence>
                    {notifications.map(({ id, message, type }) => (
                        <motion.div
                            key={id}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={clsx(
                                "min-w-[260px] p-4 rounded-xl shadow-lg text-white flex justify-between items-center gap-4",
                                {
                                    "bg-green-500": type === "success",
                                    "bg-red-500": type === "error",
                                    "bg-blue-500": type === "info",
                                    "bg-yellow-500": type === "warning",
                                }
                            )}
                        >
                            <span>{message}</span>
                            <button onClick={() => remove(id)}>
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </NotificationContext.Provider>
    );
};