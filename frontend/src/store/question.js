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

  createQuestion: async (newQuestion) => {
    if (
      !newQuestion.username ||
      !newQuestion.question ||
      newQuestion.likes === undefined ||
      newQuestion.dislikes === undefined ||
      !newQuestion.userId
    ) {
      return { success: false, message: "please fill all the fields" };
    }

    const res = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    });

    const data = await res.json();
    set((state) => ({ questions: [...state.questions, data.data] }));
    return { success: true, message: "question created successfully" };
  },

  fetchUserQuestions: async (qid) => {
    const res = await fetch(`/api/questions/${qid}`);
    const data = await res.json();
    set({ questions: data.data });
  },

  deleteQuestion: async (qid) => {
    const res = await fetch(`/api/questions/${qid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      questions: state.questions.filter((question) => question._id !== qid),
    }));
    return { success: true, message: data.message };
  },
}));

export const useCommentStore = create((set) => ({
  comments: [],
  setComments: (comments) => set({ comments }),

  createComment: async (newComment) => {
    if (!newComment.qid || !newComment.username || !newComment.comment) {
      return { success: false, message: "please fill all the fields" };
    }

    const res = await fetch("/api/questions/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });

    const data = await res.json();
    set((state) => ({ comments: [...state.comments, data.data] }));
    return { success: true, message: "question created successfully" };
  },

  fetchComments: async (qid) => {
    const res = await fetch(`/api/questions/comments/${qid}`);
    const data = await res.json();
    set({ comments: data.data });
  },
}));
