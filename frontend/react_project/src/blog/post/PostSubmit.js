// src/components/BlogPostForm.jsx

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm     from 'remark-gfm';
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

// 后端 API 常量： 
const API = `${process.env.REACT_APP_API_BASE}/api/BlogController`;
const ENDPOINTS = {
  GET_ALL_TAGS: `${API}/getAllTags`,     // GET 拿所有 {id, name} 数组
  CREATE_TAGS:  `${API}/createTags`,     // POST 一个 ["tagName1","tagName2", …]，返回 [{id,name}, …]
  CREATE_POST:  `${API}/create`          // 最终发这里，body 里要有 tags: ["name1","name2",…]
};

const BlogPostForm = () => {
  // —— 文章主体字段 —— 
  const [input, setInput]             = useState('');
  const [title, setTitle]             = useState('');
  const [summary, setSummary]         = useState('');
  const [responseMsg, setResponseMsg] = useState('');

  // —— 标签相关状态 —— 
  const [allTags, setAllTags]           = useState([]); // 已有标签列表，形如 [ {id:1,name:"前端"}, {id:2,name:"后端"}, … ]
  const [selectedTags, setSelectedTags] = useState([]); // 用户在下拉里选中的 “已有标签 ID 列表”
  const [newTags, setNewTags]           = useState([]); // 用户回车输入新标签时收集到的 “新增标签名称列表”
  const [newTagInput, setNewTagInput]   = useState('');

  // —— 1. 页面加载时，先拉一次所有标签 —— 
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(ENDPOINTS.GET_ALL_TAGS);
        const { success, data, message } = res.data;
        if (success) {
          // data 应该是 [{id,name}, …]
          setAllTags(data || []);
        } else {
          console.warn('Warning: 获取标签失败：', message);
        }
      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    })();
  }, []);

  // —— 2. 已有标签多选回调 —— 
  const handleSelectExistingTag = (e) => {
    // e.target.value 是一个 ID 数组，比如 [3, 5]
    setSelectedTags(e.target.value);
  };
  const handleDeleteExistingTag = (tagId) => {
    setSelectedTags(prev => prev.filter(id => id !== tagId));
  };

  // —— 3. 输入新标签回车添加 —— 
  const handleNewTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const name = newTagInput.trim();
      if (!name) return;
      // 如果“新增标签”里已经有，或者 allTags 里已有同名，就提示
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

  // —— 4. 提交整个表单 —— 
  const handleSubmit = async () => {
    // 简单校验
    if (!title || !summary || !input) {
      alert('Title、summary 和 bodyText 都不能为空');
      return;
    }

    try {
      // —— 4.1 如果有 newTags，就先批量调用 CREATE_TAGS 接口，创建它们，并拿回 [{id,name}, …]。
      let createdTagEntities = [];
      if (newTags.length) {
        const tagRes = await axios.post(
          ENDPOINTS.CREATE_TAGS,
          newTags,   // 请求体 ["新标签A", "新标签B", …]
          { headers: { 'Content-Type': 'application/json' } }
        );
        const { success, data, message } = tagRes.data;
        if (success) {
          // data = [{id:12,name:"新标签A"},{id:13,name:"新标签B"}, …]
          createdTagEntities = data;
        } else {
          setResponseMsg(`创建新标签失败：${message}`);
          return;
        }
      }

      // —— 4.2 把用户“选中的已有标签 ID” → 映射成“已有标签名称”列表 
      //     例如 selectedTags = [2,5]，allTags 里可能有 {id:2,name:"Spring"},{id:5,name:"React"} → existingTagNames = ["Spring","React"]
      const existingTagNames = selectedTags
        .map(id => {
          const tag = allTags.find(t => t.id === id);
          return tag ? tag.name : null;
        })
        .filter(Boolean);

      // —— 4.3 把刚刚后端新建好的标签，也收集它们的 name: 
      const newlyCreatedNames = createdTagEntities.map(t => t.name);

      // —— 4.4 合并 “已有标签名称” + “新增标签名称”，并去重 
      const finalTagNames = Array.from(new Set([
        ...existingTagNames,
        ...newlyCreatedNames
      ]));
      console.log('最终提交给后端的标签名称列表：', finalTagNames);

      // —— 4.5 调用 CREATE_POST，body 里带上 title, summary, bodyText, posterId, tags: finalTagNames 
      const postRes = await axios.post(
        ENDPOINTS.CREATE_POST,
        {
          title,
          summary,
          bodyText: input,
          posterId: 1,
          tags: finalTagNames   // 关键：这里是一个字符串数组 ["Java","Spring",…]
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { success: ok, data: dto, message: msg } = postRes.data;
      if (ok) {
        setResponseMsg('Post saved successfully!');
        // 清空所有状态，然后刷新“allTags”
        setTitle(''); setSummary(''); setInput('');
        setSelectedTags([]); setNewTags([]);
        const refresh = await axios.get(ENDPOINTS.GET_ALL_TAGS);
        if (refresh.data.success) {
          setAllTags(refresh.data.data);
        }
      } else {
        setResponseMsg(`保存失败：${msg}`);
      }
    } catch (err) {
      console.error('Error saving post:', err);
      setResponseMsg('保存失败，请检查控制台输出');
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <StyledContainer>
          {/* 标题、摘要、正文输入 */}
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
              '& textarea': {
                resize: 'vertical',
                overflow: 'auto',
                maxHeight: '60vh',
              },
            }}
          />

          {/* 已有标签 多选下拉 */}
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

          {/* 新标签 输入框，回车添加 */}
          <TextField
            label="Add New Tag"
            variant="outlined"
            fullWidth
            value={newTagInput}
            onChange={e => setNewTagInput(e.target.value)}
            onKeyDown={handleNewTagKeyDown}
            placeholder="按 Enter 添加新标签"
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

          {/* 提交按钮 */}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Post
          </Button>

          {/* 如果有服务器返回信息，显示在下方 */}
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
