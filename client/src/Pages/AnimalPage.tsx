import React from 'react'
import { Container, Typography, Box, Paper } from '@mui/material';
import { authPageContainerStyles } from '../Styles/AuthPages.styles';

export default function Animal() {
  return (
    <Container maxWidth={false} disableGutters sx={{
      ...authPageContainerStyles,
      minHeight: '100vh',
      backgroundColor: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div>Страница с отображением животных</div>
    </Container>
  )
}
