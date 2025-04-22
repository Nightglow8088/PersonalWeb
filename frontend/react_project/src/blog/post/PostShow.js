import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-java'; // 支持 Java
import 'prismjs/themes/prism-okaidia.css'; // 使用 PrismJS 的 okaidia 主题
import styled from 'styled-components';

const StyledContainer = styled.div`
  .post {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  pre {
    background: #282c34;
    color: #abb2bf;
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto;
  }
  code {
    font-family: 'Fira Code', 'Monaco', monospace;
    font-size: 0.9em;
  }
`;

const API_BASE = process.env.REACT_APP_API_BASE || '';  // 本地开发时 http://localhost:8080，线上 "" 

const PostShow = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        //api修改
        // 1) 拼出完整 URL：本地开发会是 http://localhost:8080/api/BlogController/showAllDetails
        //    线上 API_BASE 为空，URL 就是 /api/BlogController/showAllDetails，由 nginx 反代
        const url = `${API_BASE}/api/BlogController/showAllDetails`;

        const response = await axios.get(url, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true, // 如果后端需要 JWT Cookie 或者 session
        });

        if (response.data.success) {
          setPosts(response.data.data);
        } else {
          console.error('Failed to fetch posts:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <StyledContainer>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <ReactMarkdown
            children={post.bodyText}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <pre>
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
      ))}
    </StyledContainer>
  );
};

export default PostShow;
