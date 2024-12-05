import { SxProps } from '@mui/material';

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

export const mapBoxStyles: SxProps = {
  ...commonBoxStyles,
  padding: 0
};