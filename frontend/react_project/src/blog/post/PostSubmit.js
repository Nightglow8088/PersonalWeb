// src/components/BlogPostForm.jsx

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm     from 'remark-gfm';
import remarkBreaks from 'remark-breaks'; 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import axios from 'axios';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-java';
import 'prismjs/themes/prism-okaidia.css';
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

// 后端 API 常量  api修改
const API = `${process.env.REACT_APP_API_BASE}/api/BlogController`;
const ENDPOINTS = {
  GET_ALL_TAGS: `${API}/getAllTags`,
  CREATE_TAGS:  `${API}/createTags`,
  CREATE_POST:  `${API}/create`,
  // … 其他如 update/delete 如需可加
};

const BlogPostForm = () => {
  // 博客信息
  const [input, setInput]       = useState('');
  const [title, setTitle]       = useState('');
  const [summary, setSummary]   = useState('');
  const [responseMsg, setResponseMsg] = useState('');

  // 标签部分
  const [allTags, setAllTags]         = useState([]);   // [{id,name},…]
  const [selectedTags, setSelectedTags] = useState([]); // [id,…]
  const [newTags, setNewTags]         = useState([]);   // [name,…]
  const [newTagInput, setNewTagInput] = useState('');

  // 拉取所有标签
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(ENDPOINTS.GET_ALL_TAGS);
        const { success, data, message } = res.data;
        if (success) {
          setAllTags(data || []);
        } else {
          console.warn('Failed to fetch tags:', message);
        }
      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    })();
  }, []);

  // 选择已有标签
  const handleSelectExistingTag = (e) => {
    const ids = e.target.value;
    console.log('🔍 已选标签 IDs:', ids);
    setSelectedTags(ids);
  };

  // 删除已有标签（可选）
  const handleDeleteExistingTag = (tagId) => {
    setSelectedTags(prev => prev.filter(id => id !== tagId));
  };

  // 新标签回车添加
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

  // 提交表单
  const handleSubmit = async () => {
    if (!title || !summary || !input) {
      alert('Title, summary, and body text are required!');
      return;
    }

    try {
      // 1. 批量创建 newTags
      let newTagIds = [];
      if (newTags.length) {
        const tagRes = await axios.post(
          ENDPOINTS.CREATE_TAGS,
          newTags,
          { headers: { 'Content-Type': 'application/json' } }
        );
        const { success, data, message } = tagRes.data;
        if (success) {
          newTagIds = data.map(t => t.id);
        } else {
          setResponseMsg(`创建标签失败：${message}`);
          return;
        }
      }

      // 2. 合并所有标签 ID
      const finalTagIds = [...selectedTags, ...newTagIds];
      console.log('🔍 最终提交的 tagIds:', finalTagIds);

      // 3. 调用创建文章接口
      const postRes = await axios.post(
        ENDPOINTS.CREATE_POST,
        {
          title,
          summary,
          bodyText: input,
          posterId: 1,
          tagIds: finalTagIds
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const { success: ok, data: dto, message: msg } = postRes.data;
      if (ok) {
        setResponseMsg('Post saved successfully!');
        // 清空表单
        setTitle(''); setSummary(''); setInput('');
        setSelectedTags([]); setNewTags([]);
        // 重新拉标签
        const refresh = await axios.get(ENDPOINTS.GET_ALL_TAGS);
        if (refresh.data.success) setAllTags(refresh.data.data);
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
            minRows={10}        // 最小 10 行
            maxRows={30}        // 自动扩展到最多 30 行
            value={input}
            onChange={e => setInput(e.target.value)}
            sx={{
              // 让 textarea 可以被用户上下拖拽
              '& textarea': {
                resize: 'vertical',
                overflow: 'auto',
                maxHeight: '60vh', // 最大高度 60% 视窗，内容再多就滚动
              },
            }}
          />


          {/* 已有标签多选 */}
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
                <MenuItem key={tag.id} value={tag.id}>{tag.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* 新标签输入框 */}
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

          {/* Markdown 预览 */}
          <ReactMarkdown
            children={input}
            remarkPlugins={[remarkGfm, remarkBreaks]}   // ← 支持 GFM + 单回车换行
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

          {/* 提交按钮 */}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Post
          </Button>

          {/* 提交结果 */}
          {responseMsg && (
            <Box mt={2}>
              <Typography>{responseMsg}</Typography>
            </Box>
          )}
        </StyledContainer>
      </Container>
    </>
  );
};

export default BlogPostForm;