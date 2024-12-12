import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchComments, deleteComment } from '../../../Redux/Thunks/MapPage/commentsThunks';
import { selectAllComments } from '../../../Redux/Slices/MapPage/commentsSlice';
import { AppDispatch } from '../../../Redux/index';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface CommentsListProps {
  itemType: string;
  itemId: number;
}

const CommentsList: React.FC<CommentsListProps> = ({ itemType, itemId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector(selectAllComments);
  const currentUserId = useSelector((state: any) => state.auth.user?.id);

  useEffect(() => {
    dispatch(fetchComments({ itemType, itemId }));
  }, [dispatch, itemType, itemId]);

  const handleDelete = (commentId: number) => {
    dispatch(deleteComment(commentId));
  };

  return (
    <Box sx={{ mb: 2 }}>
      {comments.map((comment) => (
        <Paper key={comment.id} sx={{ p: 2, mb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" color="textSecondary">
              {comment.author.username} • {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: ru })}
            </Typography>
            {currentUserId === comment.author.id && (
              <IconButton size="small" onClick={() => handleDelete(comment.id)}>
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {comment.content}
          </Typography>
        </Paper>
      ))}
      {comments.length === 0 && (
        <Typography variant="body2" color="textSecondary" align="center">
          Пока нет комментариев
        </Typography>
      )}
    </Box>
  );
};

export default CommentsList;