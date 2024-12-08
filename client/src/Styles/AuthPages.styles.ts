import { SxProps } from '@mui/material';
//Верстка отцентровка без стиля и цветов
export const authPageContainerStyles: SxProps = {
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
    zIndex: -1
  }
};