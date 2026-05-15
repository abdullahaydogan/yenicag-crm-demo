import { Paper, Typography } from '@mui/material';

export default function DashboardPage() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        border: '1px solid #e5e7eb',
      }}
    >
      <Typography variant="h4">
        Yeni Çağ CRM
      </Typography>

      <Typography color="text.secondary">
        Yönetim paneline hoş geldiniz.
      </Typography>
    </Paper>
  );
}