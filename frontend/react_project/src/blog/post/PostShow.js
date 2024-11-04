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

const PostShow = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/BlogController/showAllDetails');
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
