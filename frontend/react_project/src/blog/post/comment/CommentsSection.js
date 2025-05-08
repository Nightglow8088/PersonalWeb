// src/blog/post/comment/CommentsSection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';

export default function CommentsSection({ postId }) {
  const { token } = useAuth();
  const [comments, setComments] = useState([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const auth = useAuth();
  useEffect(() => {
    console.log('🔐 useAuth:', auth);
  }, [auth]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_BASE}/api/comments/getComments`,{ params: { postId } })
      .then(res => {
        if (res.data.success) setComments(res.data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [postId]);

  const handleSubmit = () => {
    if (!draft.trim()) return;
    setSubmitting(true);
    axios
      .post(
        `${process.env.REACT_APP_API_BASE}/api/comments/addComments`,
        { postId, content: draft, parentId: null },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(res => {
        if (res.data.success) {
          setComments(prev => [...prev, res.data.data]);
          setDraft('');
        }
      })
      .catch(console.error)
      .finally(() => setSubmitting(false));
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">评论区</Typography>

      {loading ? (
        <CircularProgress size={24} sx={{ mt: 2 }} />
      ) : comments.length === 0 ? (
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>
          暂无评论，快来抢沙发！
        </Typography>
      ) : (
        comments.map(c => (
          <Paper
            key={c.id}
            sx={{
              display: 'flex',
              gap: 2,
              p: 2,
              mt: 1,
              bgcolor: 'rgba(255,255,255,0.8)',
            }}
          >
            <Avatar>{c.commenterName?.[0]}</Avatar>
            <Box>
              <Typography variant="subtitle2">
                {c.commenterName} •{' '}
                {new Date(c.createdAt).toLocaleString()}
              </Typography>
              <Typography>{c.content}</Typography>
            </Box>
          </Paper>
        ))
      )}

      {token ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, gap: 1 }}>
          <TextField
            multiline
            rows={3}
            placeholder="写下你的评论…"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            disabled={submitting}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting || !draft.trim()}
          >
            {submitting ? '提交中…' : '发布评论'}
          </Button>
        </Box>
      ) : (
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>
          请先登录后再发表评论。
        </Typography>
      )}
    </Box>
  );
}
