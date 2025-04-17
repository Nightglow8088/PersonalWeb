// // src/components/BlogPostForm.jsx

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Container,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Box,
//   Chip,
//   Button,
//   Typography
// } from '@mui/material';



//基本废弃了 这个就是当时post tag一直有问题的时候测试用的 现在已经移植过去了




// // 后端 API 基础路径
// const API = `${process.env.REACT_APP_DIGIT_OCEAN_API_URL}/BlogController`;

// // 所有接口常量
// const ENDPOINTS = {
//   // 文章
//   CREATE_POST:        `${API}/create`,
//   GET_POST:           (id) => `${API}/getById/${id}`,
//   GET_ALL_POSTS:      `${API}/getAll`,   // 如果后端尚未重命名，改为 `/getAll`
//   UPDATE_POST:        (id) => `${API}/update/${id}`,
//   DELETE_POST:        (id) => `${API}/delete/${id}`,

//   // 标签
//   GET_ALL_TAGS:       `${API}/getAllTags`,
//   CREATE_TAGS:        `${API}/createTags`,
//   REMOVE_TAGS:        `${API}/removeTags`,
// };

// const BlogPostForm2 = () => {
//   // 文章字段
//   const [title,        setTitle]        = useState('');
//   const [summary,      setSummary]      = useState('');
//   const [bodyText,     setBodyText]     = useState('');
//   // 标签管理
//   const [allTags,      setAllTags]      = useState([]); // [{id, name}, ...]
//   const [selectedTags, setSelectedTags] = useState([]); // [tagId, ...]
//   const [newTags,      setNewTags]      = useState([]); // [name, ...]
//   const [newTagInput,  setNewTagInput]  = useState('');
//   // 提交反馈
//   const [responseMsg,  setResponseMsg]  = useState('');

//   // 拉取所有标签
//   const fetchTags = async () => {
//     try {
//       const res = await axios.get(ENDPOINTS.GET_ALL_TAGS);
//       const { success, data, message } = res.data;
//       if (success) {
//         setAllTags(data || []);
//       } else {
//         console.warn('Failed to load tags:', message);
//       }
//     } catch (err) {
//       console.error('Error fetching tags:', err);
//     }
//   };

//   useEffect(() => {
//     fetchTags();
//   }, []);

//   // 选择已有标签（直接存 ID 数组）
//   const handleSelectExistingTag = (e) => {
//     setSelectedTags(e.target.value);
//   };

//   // 新标签输入回车添加
//   const handleNewTagKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       const name = newTagInput.trim();
//       if (!name) return;
//       if (newTags.includes(name) || allTags.some(t => t.name === name)) {
//         alert(`标签 "${name}" 已存在`);
//       } else {
//         setNewTags(prev => [...prev, name]);
//       }
//       setNewTagInput('');
//     }
//   };

//   // 删除新标签
//   const handleDeleteNewTag = (name) => {
//     setNewTags(prev => prev.filter(n => n !== name));
//   };

//   // 提交表单
//   const handleSubmit = async () => {
//     if (!title || !summary || !bodyText) {
//       alert('标题、摘要、正文都是必填项！');
//       return;
//     }
//     try {
//       // 1) 批量创建新标签，拿回它们的 id
//       let newTagIds = [];
//       if (newTags.length) {
//         const createRes = await axios.post(
//           ENDPOINTS.CREATE_TAGS,
//           newTags,
//           { headers: { 'Content-Type': 'application/json' } }
//         );
//         const { success, data, message } = createRes.data;
//         if (success) {
//           newTagIds = data.map(t => t.id);
//         } else {
//           setResponseMsg(`创建标签失败：${message}`);
//           return;
//         }
//       }

//       // 2) 合并所有标签 ID
//       const finalTagIds = [...selectedTags, ...newTagIds];

//       // 3) 创建文章
//       const postRes = await axios.post(
//         ENDPOINTS.CREATE_POST,
//         {
//           title,
//           summary,
//           bodyText,
//           posterId: 1,     // 根据业务改为实际用户 ID
//           tagIds: finalTagIds
//         },
//         { headers: { 'Content-Type': 'application/json' } }
//       );
//       const { success: postSuccess, data: postData, message: postMsg } = postRes.data;
//       if (postSuccess) {
//         setResponseMsg('发布成功！');
//         // 清空表单
//         setTitle(''); setSummary(''); setBodyText('');
//         setSelectedTags([]); setNewTags([]);
//         // 重新拉取标签（包括新加的）
//         fetchTags();
//       } else {
//         setResponseMsg(`发布失败：${postMsg}`);
//       }

//     } catch (err) {
//       console.error('Error saving post:', err);
//       setResponseMsg('发布出错，请检查控制台');
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
//       <Typography variant="h5" gutterBottom>
//         新建博客文章
//       </Typography>

//       <TextField
//         label="标题"
//         fullWidth
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//         sx={{ mb: 2 }}
//       />

//       <TextField
//         label="摘要"
//         fullWidth
//         value={summary}
//         onChange={e => setSummary(e.target.value)}
//         sx={{ mb: 2 }}
//       />

//       <TextField
//         label="正文"
//         fullWidth
//         multiline
//         rows={8}
//         value={bodyText}
//         onChange={e => setBodyText(e.target.value)}
//         sx={{ mb: 2 }}
//       />

//       {/* 已有标签多选 */}
//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <InputLabel id="tag-select-label">选择已有标签</InputLabel>
//         <Select
//           labelId="tag-select-label"
//           multiple
//           value={selectedTags}
//           onChange={handleSelectExistingTag}
//           renderValue={ids => (
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//               {ids.map(id => {
//                 const tag = allTags.find(t => t.id === id);
//                 return tag ? <Chip key={id} label={tag.name} /> : null;
//               })}
//             </Box>
//           )}
//           label="选择已有标签"
//         >
//           {allTags.map(tag => (
//             <MenuItem key={tag.id} value={tag.id}>
//               {tag.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {/* 新标签输入 */}
//       <TextField
//         label="新增标签（回车添加）"
//         fullWidth
//         value={newTagInput}
//         onChange={e => setNewTagInput(e.target.value)}
//         onKeyDown={handleNewTagKeyDown}
//         sx={{ mb: 1 }}
//       />
//       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3 }}>
//         {newTags.map(name => (
//           <Chip key={name} label={name} onDelete={() => handleDeleteNewTag(name)} />
//         ))}
//       </Box>

//       <Button variant="contained" fullWidth onClick={handleSubmit}>
//         提交文章
//       </Button>

//       {responseMsg && (
//         <Typography sx={{ mt: 2, color: 'primary.main' }}>
//           {responseMsg}
//         </Typography>
//       )}
//     </Container>
//   );
// };

// export default BlogPostForm2;
