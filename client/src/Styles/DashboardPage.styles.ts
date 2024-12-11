// src/Styles/DashboardPage.styles.ts
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
    filter: 'brightness(0.4)',
    zIndex: -1,
  },
};

export const dashboardGridStyles: SxProps = {
  display: 'grid',
  gridTemplateColumns: '40% 30% 28%',
  gap: '20px',
  padding: '24px',
  height: 'calc(100vh - 70px)',
  marginTop: '70px',
  position: 'relative',
  zIndex: 1,
};

export const leftColumnStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};

export const mapInfoStyles: SxProps = {
  flex: '0 0 auto',
  height: '30%',
  padding: '20px',
  backdropFilter: 'blur(10px)'
};

export const mapContainerStyles: SxProps = {
  flex: '1 1 auto',
  overflow: 'hidden',
  backdropFilter: 'blur(10px)'
};

export const middleColumnStyles: SxProps = {
  overflow: 'auto',
  backdropFilter: 'blur(10px)'
};

export const rightColumnStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};

export const backpackStyles: SxProps = {
  flex: '1',
  padding: '20px',
  backdropFilter: 'blur(10px)'
};

export const bottomRowStyles: SxProps = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
  height: '200px'
};

export const weatherCalendarStyles: SxProps = {
  padding: '20px',
  backdropFilter: 'blur(10px)'
};