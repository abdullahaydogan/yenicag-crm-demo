import { useQuery } from '@apollo/client/react';
import type { DocumentNode } from 'graphql';

import { Box, CircularProgress, Typography } from '@mui/material';

import PageHeader from '../PageHeader';

import CrudTable from './CrudTable';
import type { CrudAction, CrudColumn } from './crud.types';

type CrudPageProps<
  TItem extends Record<string, unknown>,
  TData extends Record<string, TItem[]>
> = {
  title: string;
  description?: string;
  actionText?: string;
  query: DocumentNode;
  dataKey: keyof TData;
  columns: CrudColumn<TItem>[];
  actions?: CrudAction<TItem>[];
  onActionClick?: () => void;
};

export default function CrudPage<
  TItem extends Record<string, unknown>,
  TData extends Record<string, TItem[]>
>({
  title,
  description,
  actionText,
  query,
  dataKey,
  columns,
  actions,
  onActionClick
}: CrudPageProps<TItem, TData>) {
  const { data, loading, error } = useQuery<TData>(query);

  const items = data?.[dataKey] ?? [];

  if (loading) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography color="error" sx={{ fontWeight: 800 }}>
          {title} yüklenirken hata oluştu.
        </Typography>

        <Typography color="text.secondary">{error.message}</Typography>
      </Box>
    );
  }

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        actionText={actionText}
        onActionClick={onActionClick}
      />

      <CrudTable<TItem> data={items} columns={columns} actions={actions} />
    </>
  );
}