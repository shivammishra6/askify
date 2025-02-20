import { create } from "zustand";

export const useQuestionStore = create((set) => ({
  questions: [],
  setQuestions: (questions) => set({ questions }),
  
  fetchQuestions: async () => {
    const res = await fetch("/api/questions");
    const data = await res.json();
    set({ questions: data.data });
  },

  updateQuestion: async (pid, updatedQuestion) => {
    const res = await fetch(`/api/questions/likes/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuestion),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      questions: state.questions.map((question) =>
        question._id === pid ? data.data : question
      ),
    }));

    return { success: true, message: data.message };
  },
}));
