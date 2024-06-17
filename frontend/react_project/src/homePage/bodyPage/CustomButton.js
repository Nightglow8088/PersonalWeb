import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#f8f8f8',
  color: '#000',
  padding: '10px 20px',
  textTransform: 'none',
  borderRadius: '5px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
  fontFamily: 'inherit',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '10px',
  background: 'linear-gradient(to right, #f5f5dc 0%, rgba(245, 245, 220, 0) 100%)', // 添加线性渐变
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
  '& img': {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
  },
}));

const CustomButton = ({ href, text, icon }) => {
  return (
    <StyledButton href={href}>
      {icon && <img src={icon} alt="icon" />}
      {text}
    </StyledButton>
  );
};

export default CustomButton;
