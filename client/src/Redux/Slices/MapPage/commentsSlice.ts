// src/Redux/Slices/MapPage/commentsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchComments, createComment, updateComment, deleteComment } from '../../Thunks/MapPage/commentsThunks';
import { RootState } from '../../index';

interface Comment {
  id: number;
  userId: number;
  itemType: string;
  itemId: number;
  content: string;
  rating?: number;
  author: {
    id: number;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение комментариев
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Создание комментария
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      })
      // Обновление комментария
      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(comment => comment.id === action.payload.id);
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      // Удаление комментария
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(comment => comment.id !== action.payload);
      });
  },
});

export const { clearComments } = commentsSlice.actions;

export const selectAllComments = (state: RootState) => state.comments.comments;
export const selectCommentsLoading = (state: RootState) => state.comments.loading;
export const selectCommentsError = (state: RootState) => state.comments.error;

export default commentsSlice.reducer;