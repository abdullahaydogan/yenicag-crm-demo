import type { ReactNode } from 'react';

import {
  Box,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import GenericModal from './GenericModal';

export type DetailField = {
  label: string;
  value: ReactNode;
};

export type DetailSection = {
  title?: string;
  fields?: DetailField[];
  content?: ReactNode;
};

type GenericDetailModalProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  sections: DetailSection[];
  chips?: {
    label: string;
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
    variant?: 'filled' | 'outlined';
  }[];
  onClose: () => void;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export default function GenericDetailModal({
  open,
  title,
  subtitle,
  sections,
  chips = [],
  onClose,
  maxWidth = 'md',
}: GenericDetailModalProps) {
  return (
    <GenericModal
      open={open}
      title={title}
      subtitle={subtitle}
      onClose={onClose}
      maxWidth={maxWidth}
    >
      <Stack spacing={3}>
        {chips.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {chips.map((chip) => (
              <Chip
                key={chip.label}
                size="small"
                label={chip.label}
                color={chip.color ?? 'default'}
                variant={chip.variant ?? 'filled'}
              />
            ))}
          </Stack>
        )}

        {sections.map((section, index) => (
          <Box key={index}>
            {index > 0 && <Divider sx={{ mb: 3 }} />}

            {section.title && (
              <Typography sx={{ fontWeight: 900, mb: 2 }}>
                {section.title}
              </Typography>
            )}

            {section.fields && section.fields.length > 0 && (
              <Grid container spacing={2}>
                {section.fields.map((field) => (
                  <Grid key={field.label} size={{ xs: 12, md: 6 }}>
                    <Typography variant="caption" color="text.secondary">
                      {field.label}
                    </Typography>

                    <Typography sx={{ fontWeight: 700 }}>
                      {field.value ?? '-'}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            )}

            {section.content}
          </Box>
        ))}
      </Stack>
    </GenericModal>
  );
}