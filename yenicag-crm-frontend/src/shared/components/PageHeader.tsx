import { Box, Button, Stack, Typography } from '@mui/material';
import { AddRounded } from '@mui/icons-material';

type PageHeaderProps = {
  title: string;
  description?: string;
  actionText?: string;
  onActionClick?: () => void;
};

export default function PageHeader({
  title,
  description,
  actionText,
  onActionClick,
}: PageHeaderProps) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      sx={{
        mb: 3,
        alignItems: { xs: 'stretch', sm: 'center' },
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="h4">{title}</Typography>

        {description && (
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        )}
      </Box>

      {actionText && (
        <Button
          variant="contained"
          startIcon={<AddRounded />}
          onClick={onActionClick}
        >
          {actionText}
        </Button>
      )}
    </Stack>
  );
}