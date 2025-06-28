// src/components/BlogPostForm.jsx

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import axios from 'axios';
import {
  TextField,
  Typography,
  Button,
  Container,
  MenuItem,
  Box,
  Select,
  InputLabel,
  FormControl,
  Chip,
} from '@mui/material';
import Header from '../../homePage/headerPage/Header';
import styled from 'styled-components';

const StyledContainer = styled.div`
  .MuiTextField-root,
  .MuiButton-root {
    margin-bottom: 20px;
  }
`;

// 标签常量 ID
const TAG_ARTICLE = 26; // “文章”
const TAG_FUNNY   = 27; // “发癫”
const TAG_DAILY   = 28; // “日常”

const API = `${process.env.REACT_APP_API_BASE}/api/BlogController`;
const ENDPOINTS = {
  GET_ALL_TAGS: `${API}/getAllTags`,
  CREATE_TAGS:  `${API}/createTags`,
  CREATE_POST:  `${API}/create`,
};

export default function BlogPostForm() {
  const [title, setTitle]     = useState('');
  const [summary, setSummary] = useState('');
  const [input, setInput]     = useState('');
  const [responseMsg, setResponseMsg] = useState('');

  const [allTags, setAllTags]           = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTags, setNewTags]           = useState([]);
  const [newTagInput, setNewTagInput]   = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(ENDPOINTS.GET_ALL_TAGS);
        if (res.data.success) {
          setAllTags(res.data.data || []);
        }
      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    })();
  }, []);

  const handleNewTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const name = newTagInput.trim();
      if (!name) return;
      if (newTags.includes(name) || allTags.some(t => t.name === name)) {
        alert(`标签 "${name}" 已存在`);
      } else {
        setNewTags(prev => [...prev, name]);
      }
      setNewTagInput('');
    }
  };

  const handleDeleteNewTag = (name) => {
    setNewTags(prev => prev.filter(n => n !== name));
  };

  const handleSelectExistingTag = (e) => {
    setSelectedTags(e.target.value);
  };

  const handleDeleteExistingTag = (tagId) => {
    setSelectedTags(prev => prev.filter(id => id !== tagId));
  };

  const handleSubmit = async () => {
    if (!title || !summary || !input) {
      alert('Title, summary, and body text are required!');
      return;
    }

    try {
      // 批量创建新标签
      let newTagIds = [];
      if (newTags.length) {
        const tagRes = await axios.post(
          ENDPOINTS.CREATE_TAGS,
          newTags,
          { headers: { 'Content-Type': 'application/json' } }
        );
        if (tagRes.data.success) {
          newTagIds = tagRes.data.data.map(t => t.id);
          setAllTags(prev => [...prev, ...tagRes.data.data]);
        } else {
          setResponseMsg(`创建标签失败：${tagRes.data.message}`);
          return;
        }
      }

      // 合并所有标签 ID
      let finalTagIds = [...selectedTags, ...newTagIds];

      // 自动补齐：如果不包含 26、28、27 其中任何一个，则补入 27（发癫）
      const pinnedTagIds = [TAG_ARTICLE, TAG_DAILY, TAG_FUNNY];
      if (!finalTagIds.some(id => pinnedTagIds.includes(id))) {
        finalTagIds.push(TAG_FUNNY);
      }

      // 创建文章
      const postRes = await axios.post(
        ENDPOINTS.CREATE_POST,
        {
          title,
          summary,
          bodyText: input,
          posterId: 1,
          tagIds: finalTagIds,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const { success: ok, message: msg } = postRes.data;
      if (ok) {
        setResponseMsg('Post saved successfully!');
        setTitle(''); setSummary(''); setInput('');
        setSelectedTags([]); setNewTags([]);
        const r2 = await axios.get(ENDPOINTS.GET_ALL_TAGS);
        if (r2.data.success) setAllTags(r2.data.data);
      } else {
        setResponseMsg(`Failed to save post: ${msg}`);
      }
    } catch (err) {
      console.error('Error saving post:', err);
      setResponseMsg('Failed to save post.');
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <StyledContainer>
          <TextField
            label="Post Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <TextField
            label="Summary"
            variant="outlined"
            fullWidth
            value={summary}
            onChange={e => setSummary(e.target.value)}
          />
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            multiline
            minRows={10}
            maxRows={30}
            value={input}
            onChange={e => setInput(e.target.value)}
            sx={{
              '& textarea': { resize: 'vertical', overflow: 'auto', maxHeight: '60vh' },
            }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="tag-select-label">Tags</InputLabel>
            <Select
              labelId="tag-select-label"
              multiple
              value={selectedTags}
              onChange={handleSelectExistingTag}
              renderValue={(ids) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {ids.map(id => {
                    const tag = allTags.find(t => t.id === id);
                    return tag
                      ? <Chip key={id} label={tag.name} onDelete={() => handleDeleteExistingTag(id)} />
                      : null;
                  })}
                </Box>
              )}
              label="Tags"
            >
              {allTags.map(tag => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Add New Tag"
            variant="outlined"
            fullWidth
            value={newTagInput}
            onChange={e => setNewTagInput(e.target.value)}
            onKeyDown={handleNewTagKeyDown}
            placeholder="Press Enter to add new tag"
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {newTags.map(name => (
              <Chip key={name} label={name} onDelete={() => handleDeleteNewTag(name)} color="primary" />
            ))}
          </Box>

          <ReactMarkdown
            children={input}
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={materialDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <Typography component="code" sx={{ bgcolor: 'grey.900', color: 'primary.contrastText', p: 0.5 }}>
                    {children}
                  </Typography>
                );
              }
            }}
          />

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Post
          </Button>

          {responseMsg && (
            <Box mt={2}>
              <Typography>{responseMsg}</Typography>
            </Box>
          )}
        </StyledContainer>
      </Container>
    </>
  );
}
