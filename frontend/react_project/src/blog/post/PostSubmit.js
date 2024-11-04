import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import axios from 'axios';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-java';
import 'prismjs/themes/prism-okaidia.css';
import { TextField, Typography, Button, Container, Box } from '@mui/material';
import Header from '../../homePage/headerPage/Header';
import styled from 'styled-components';

const StyledContainer = styled.div`
  .MuiTextField-root, .MuiButton-root {
    margin-bottom: 20px;  // Adds space below each text field and button
  }
`;

const BlogPostForm = () => {
  const [input, setInput] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    if (!title || !input || !summary) {
      alert('Title, summary, and body text are required!');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_DIGIT_OCEAN_API_URL}/BlogController/savePost`, {
        title,
        summary,
        bodyText: input,
        posterId: '1'
      });

      if (response.data.success) {
        setResponse('Post saved successfully: ' + response.data.message);
      } else {
        setResponse('Failed to save post: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      setResponse('Failed to save post.');
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
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Summary"
            variant="outlined"
            fullWidth
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <TextField
            label="Content"
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <ReactMarkdown
            children={input}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter style={materialDark} language={match[1]} PreTag="div" {...props}>
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <Typography component="code" sx={{ bgcolor: 'grey.900', color: 'primary.contrastText', p: 0.5 }}>
                    {children}
                  </Typography>
                );
              },
            }}
          />
          {/* <ReactMarkdown>{input}</ReactMarkdown> */}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Post
          </Button>
          {response && <Box mt={2}><Typography>{response}</Typography></Box>}
        </StyledContainer>
      </Container>
    </>
  );
};

export default BlogPostForm;


// 这个是一个java代码
//  ```java 
//     public class Test(){ 
//       public Integer num=0; 
//     } 
// ```
//  好了没了 constructor不写了

// 这个是一个js代码
//  ```js
//   const BlogPostForm = () => {
//     const [input, setInput] = useState('');
//     const [title, setTitle] = useState('');
//   } 
// ```
//  结尾测试