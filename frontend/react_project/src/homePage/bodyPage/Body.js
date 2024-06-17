import React from 'react'
import Box from '@mui/material/Box';
import CustomButton from './CustomButton';

import Typography from '@mui/material/Typography';
import background from '../../img/homePage/homeBackground.png'; // 确保路径正确


// import './Body.css'

export default function Body() {
  const iconUrl = "https://img.icons8.com/?size=100&id=69543&format=png&color=000000"

  const sections = [
    {
      title: "Home",
      description: "Home Page",
      image: "https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg", // 替换为实际的图片路径
    },
    {
      title: "About Me",
      description: "Introduction of Myself",
      image: "https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg", // 替换为实际的图片路径
    },
    {
      title: "Blog",
      description: "My Life Recorder",
      image: "https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg", // 替换为实际的图片路径
    },
    {
      title: "Github",
      description: "Source Code",
      image: "https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg", // 替换为实际的图片路径
    },
  ];
  
  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'flex-end', // 向右对齐
        alignItems: 'flex-start', // 向上对齐
        color: 'black',
        textAlign: 'left',
        position: 'relative',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          padding: '20px',
          borderRadius: '10px',
          marginTop: '50px',
          marginRight: '300px'
        }}
      >
        <Typography className="homeBlogTitle" variant="h3" gutterBottom>
          Personal Blog
        </Typography>
        <Typography variant="body1" paragraph>
          Here is a brief introduction <br/>or welcome message for the personal blog.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}> {/* 添加 alignItems: 'flex-start' */}
          <CustomButton href="#" text="Home" icon={iconUrl} />
          <CustomButton href="#" text="Blog" icon={iconUrl} />
          <CustomButton href="#" text="About Me" icon={iconUrl} />
          <CustomButton href="#" text="GitHub" icon={iconUrl} />
        </Box>

      </Box>

      <Box
        sx={{
          width: '80%',
          maxWidth: '800px', // 设置最大宽度

          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '10px',
          borderRadius: '10px 10px 0 0',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-start', // 保持内容顶部对齐
          alignItems: 'center',
          textAlign: 'left',
          position: 'absolute', // 添加 position:absolute
          bottom: 0, // 添加 bottom:0 使其位于底部
          left: '50%', // 使其居中
          transform: 'translateX(-50%)', // 使其居中
        }}
      >
        {sections.map((section, index) => (
          <Box key={index} sx={{ width: '20%', textAlign: 'center' }}>
            <img src={section.image} alt={section.title} style={{ width: '100%', borderRadius: '5px' }} />
            <Typography variant="h6" sx={{ fontFamily: 'Lobster, cursive', marginTop: '10px' }}>
              {section.title}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '12px', color: '#333' }}>
              {section.description}
            </Typography>
          </Box>
        ))}
      </Box>
      
    </Box>
  )
}
