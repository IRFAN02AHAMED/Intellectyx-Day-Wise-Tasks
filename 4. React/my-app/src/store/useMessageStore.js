import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMessageStore = create(
  persist(
    (set) => ({
      // =====================
      // STATE
      // =====================
      messages: [],

      // =====================
      // ACTIONS
      // =====================

      addMessage: (name, text) =>
        set((state) => {
          const newMessage = {
            id: Date.now(),
            name,
            text,
            likes: 0,
            replies: [],
          };

          return {
            messages: [newMessage, ...state.messages],
          };
        }),

      likeMessage: (id) =>
        set((state) => ({
          messages: state.messages.map((message) =>
            message.id === id
              ? {
                  ...message,
                  likes: message.likes + 1,
                }
              : message
          ),
        })),

      addReply: (messageId, name, text) =>
        set((state) => ({
          messages: state.messages.map((message) =>
            message.id === messageId
              ? {
                  ...message,
                  replies: [
                    ...message.replies,
                    { name, text },
                  ],
                }
              : message
          ),
        })),
    }),
    {
      name: "messages-storage", //  localStorage key
    }
  )
);

export default useMessageStore;