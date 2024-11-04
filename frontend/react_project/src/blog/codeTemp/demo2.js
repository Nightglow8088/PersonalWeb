// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Typography, CardActions, Button, Container, Grid, Box } from '@mui/material';
// import Header from '../../homePage/headerPage/Header';
// import './Demo2Styles.css'; 


// const Demo2 = () => {
//   const [posts, setPosts] = useState([]);
//   const backgroundImageUrl = '/Background/fireflyOfficial.avif'; // 确保这是正确的图片路径

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/BlogController/showAllDetails');
//         if (response.data.success && response.data.data) {
//           setPosts(response.data.data);
//         } else {
//           console.error('Failed to fetch posts:', response.data.message);
//         }
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };
//     fetchPosts();
//   }, []);

//   return (
//     <>  
//         <Header />
//         <Box sx={{ width: '100%', minHeight: '100vh', backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
//             <Typography variant="h2" component="h1" sx={{ color: 'white', textAlign: 'center', paddingTop: '40vh' }}>
//                 Welcome to My Blog
//             </Typography>
//             <Container sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: '60vh' }}>
//                 <Grid container spacing={2} sx={{ width: '70%' }}>
//                 {posts.map((post) => (
//                     <Grid item xs={12} md={12} key={post.id}>
//                         <Card raised sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)' }}>
//                             <CardContent>
//                                 <Typography variant="h5" component="div" align="center">
//                                     {post.title}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary" align="center">
//                                     {post.bodyText}
//                                 </Typography>
//                             </CardContent>
//                             <CardActions>
//                                 <Button size="small">Learn More</Button>
//                             </CardActions>
//                         </Card>
//                     </Grid>
//                 ))}
//                 </Grid>
//                 <Box sx={{
//                     width: '25%',
//                     position: 'sticky',
//                     top: '100px', // 调整这个值以适应页面布局，保证组件在滚动时能够适当停靠
//                     }}>
//                     {/* 个人简介卡片 */}
//                     <Card sx={{ bgcolor: 'rgba(0, 0, 0, 0.5)', color: 'white', mb: 2, borderRadius: '16px' }}>
//                         <CardContent>
//                         <Typography variant="h6">Profile</Typography>
//                         <Typography>Some text about the author...</Typography>
//                         </CardContent>
//                     </Card>

//                     {/* 最近帖子卡片 */}
//                     <Card sx={{ bgcolor: 'rgba(0, 0, 0, 0.5)', color: 'white', mb: 2, borderRadius: '16px' }}>
//                         <CardContent>
//                         <Typography variant="h6">Recent Posts</Typography>
//                         {/* 这里可以添加最近的帖子或链接 */}
//                         <Typography>Post 1</Typography>
//                         <Typography>Post 2</Typography>
//                         </CardContent>
//                     </Card>

//                     {/* 其他可能的小组件 */}
//                     <Card sx={{ bgcolor: 'rgba(0, 0, 0, 0.5)', color: 'white', borderRadius: '16px' }}>
//                         <CardContent>
//                         <Typography variant="h6">Other Widget</Typography>
//                         <Typography>Additional info...</Typography>
//                         </CardContent>
//                     </Card>
//                 </Box>
//             </Container>
//         </Box>
//     </>
//   );
// };

// export default Demo2;
