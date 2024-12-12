import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { createComment } from '../../../Redux/Thunks/MapPage/commentsThunks';
import CommentsList from './CommentsList';
import { AppDispatch } from '../../../Redux/index';

interface CommentDialogProps {
  open: boolean;
  onClose: () => void;
  itemType: string;
  itemId: number;
}

const CommentDialog: React.FC<CommentDialogProps> = ({ open, onClose, itemType, itemId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (comment.trim()) {
      await dispatch(createComment({
        itemType,
        itemId,
        content: comment,
      }));
      setComment('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Комментарии</DialogTitle>
      <DialogContent>
        <CommentsList itemType={itemType} itemId={itemId} />
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Напишите комментарий..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Отправить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentDialog;