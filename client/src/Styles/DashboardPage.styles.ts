// src/styles/DashboardPage.styles.ts
import { SxProps } from '@mui/material';

export const dashboardContainerStyles: SxProps = {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("/images/nature-background-DashboardPage.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.8)',
    zIndex: -1
  }
};

export const dashboardGridStyles: SxProps = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '24px',
  padding: '24px',
  height: '100%',
  position: 'relative',
  zIndex: 1
};

export const commonBoxStyles: SxProps = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid rgba(124, 152, 78, 0.4)',
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(15, 31, 12, 0.2)',
  borderRadius: '12px',
  padding: '20px',
  overflow: 'hidden'
};

export const cardsGridStyles: SxProps = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridAutoRows: '1fr',
  gap: '16px',
  height: '100%'
};

export const dashboardCardStyles: SxProps = {
  ...commonBoxStyles,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  padding: '24px',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
  }
};