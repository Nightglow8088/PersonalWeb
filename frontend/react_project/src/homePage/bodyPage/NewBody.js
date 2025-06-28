// src/components/NewBody.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './NewBody.css'; // 假设保留你的样式文件

const API_BASE = process.env.REACT_APP_API_BASE || '';

export default function NewBody() {
  const [posts, setPosts] = useState([]);
  const [filterTag, setFilterTag] = useState('文章');
  const [allTags, setAllTags] = useState([]);
  const navigate = useNavigate();
  const backgroundImageUrl = '/Background/fireflyOfficial.avif';

  const pinnedTags = ['文章', '日常', '发癫'];

  // 拉取所有文章并提取标签
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/BlogController/showAllDetails`)
      .then(res => {
        if (res.data.success) {
          // 【新增】按 createdAt 倒序排序（最新在前）
          const sorted = res.data.data
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setPosts(sorted);

          // 提取所有唯一标签名称
          const tagNameSet = new Set();
          res.data.data.forEach(post => {
            if (Array.isArray(post.tags)) {
              post.tags.forEach(tagObj => {
                if (tagObj?.name) tagNameSet.add(tagObj.name);
              });
            }
          });
          setAllTags(Array.from(tagNameSet));
        }
      })
      .catch(console.error);
  }, []);

  // 剩余标签 = allTags 去掉 pinnedTags
  const otherTags = allTags
    .filter(name => !pinnedTags.includes(name))
    .sort((a, b) => a.localeCompare(b)); // 按字母排序，可以按需修改

  // 根据 filterTag 过滤出要展示的文章
  const filteredPosts = posts.filter(post =>
    Array.isArray(post.tags) &&
    post.tags.some(tagObj => tagObj.name === filterTag)
  );

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Hero 区 */}
      <Box
        sx={{
          height: '100vh',
          position: 'relative',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{ color: 'white', textAlign: 'center', pt: '40vh' }}
        >
          Welcome to My Blog
        </Typography>
        <Box
          className="scroll-hint-arrow"
          sx={{
            position: 'absolute',
            bottom: 100,
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }}
        >
          <KeyboardArrowDownIcon sx={{ fontSize: 60, color: 'white' }} />
        </Box>
      </Box>

      {/* Blog 区 */}
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: { xs: 2, md: 4 },
          py: 4,
        }}
      >
        {/* 左侧：文章列表（被 filterTag 过滤后） */}
        <Grid container spacing={2} sx={{ width: '70%' }}>
          {filteredPosts.map(post => (
            <Grid item xs={12} key={post.id}>
              <Card raised sx={{ bgcolor: 'rgba(255,255,255,0.8)' }}>
                <CardContent>
                  <Typography variant="h5" align="center">
                    {post.title}
                  </Typography>




                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ fontSize: '22px', mb: 1 }}
                  >
                    {post.summary}
                  </Typography>

                  {/* 【新增】展示创建时间 */}
                  {post.createdAt && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      align="center"
                      sx={{ mb: 1 }}
                    >
                      创建于：{new Date(post.createdAt).toLocaleString()}
                    </Typography>
                  )}

                  {post.tags?.length > 0 && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                        justifyContent: 'center',
                        mb: 1,
                      }}
                    >
                      {post.tags.map(tag => (
                        <Chip
                          key={tag.id}
                          label={tag.name}
                          size="small"
                          sx={{
                            bgcolor: 'primary.light',
                            color: 'primary.contrastText',
                          }}
                        />
                      ))}
                    </Box>
                  )}
                  
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button
                    size="small"
                    onClick={() => navigate(`/blogPostDetail/${post.id}`)}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}

          {/* 如果没有任何文章匹配当前 filterTag，显示一个带背景的提示卡片 */}
          {filteredPosts.length === 0 && (
            <Grid item xs={12}>
              <Card raised sx={{ bgcolor: 'rgba(255,255,255,0.8)' }}>
                <CardContent>
                  <Typography variant="h6" align="center" color="text.secondary">
                    暂无标签为 “{filterTag}” 的文章
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>

        {/* 右侧：粘性侧栏 */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              position: 'sticky',
              top: 16,
              minWidth: { md: 300 },
              width: '100%',
            }}
          >
            {/* 小组件 A：把“标签筛选”放到这里 */}
            <Card sx={{ mb: 2, p: 2, bgcolor: 'rgba(0,0,0,0.5)', color: 'white' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Filtered by tag
              </Typography>

              {/* 置顶三个标签，用白底作为默认、蓝底作为高亮 */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                {pinnedTags.map(name => (
                  <Chip
                    key={name}
                    label={name}
                    clickable
                    onClick={() => setFilterTag(name)}
                    // 选中时主题色，未选中时白底黑字
                    color={filterTag === name ? 'primary' : 'default'}
                    sx={{
                      backgroundColor: filterTag === name ? undefined : '#fff',
                      color: filterTag === name ? undefined : '#000',
                      fontWeight: filterTag === name ? 'bold' : 'normal',
                    }}
                  />
                ))}
              </Box>

              {/* 其他标签，同样：选中时用主题色，未选中时白底黑字 */}
              {otherTags.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {otherTags.map(name => (
                    <Chip
                      key={name}
                      label={name}
                      clickable
                      onClick={() => setFilterTag(name)}
                      color={filterTag === name ? 'primary' : 'default'}
                      sx={{
                        backgroundColor: filterTag === name ? undefined : '#fff',
                        color: filterTag === name ? undefined : '#000',
                      }}
                    />
                  ))}
                </Box>
              )}
            </Card>

            {/* 你原来的“最近帖子”示例 */}
            <Card sx={{ mb: 2, p: 2, bgcolor: 'rgba(0,0,0,0.5)', color: 'white' }}>
              <Typography variant="h6">最近帖子</Typography>
              <Typography>Post 1</Typography>
              <Typography>Post 2</Typography>
            </Card>

            {/* 你原来的“杂七杂八”示例 */}
            <Card sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.5)', color: 'white' }}>
              <Typography variant="h6">杂七杂八</Typography>
              <Typography>一些其他内容</Typography>
            </Card>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
