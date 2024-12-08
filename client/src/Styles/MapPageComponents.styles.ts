//MapPageComponents.styles.ts

import { SxProps } from '@mui/material';

export const commonBoxStyles: SxProps = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid rgba(139, 69, 19, 0.4)',
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(43, 24, 16, 0.4)',
  borderRadius: '12px',
  padding: '20px',
  overflow: 'hidden'
};

export const mapBoxStyles: SxProps = {
  ...commonBoxStyles,
  padding: 0
};