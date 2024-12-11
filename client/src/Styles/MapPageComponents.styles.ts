//MapPageComponents.styles.ts

import { SxProps } from '@mui/material';

export const commonBoxStyles: SxProps = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(10px)',
  borderRadius: '12px',
  padding: '20px',
  overflow: 'hidden'
};

export const mapBoxStyles: SxProps = {
  ...commonBoxStyles,
  padding: 0
};

export const favoritesListStyles: SxProps = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backdropFilter: 'blur(1px)',
  zIndex: 1000
};