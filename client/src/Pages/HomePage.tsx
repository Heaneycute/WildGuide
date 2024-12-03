import { Container, Typography, Paper, Box } from '@mui/material';

export default function HomePage({ user }: { user: User }) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          WildGuide
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="body1">
            Добро пожаловать в WildGuide - ваш помощник для охоты и активного отдыха
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}