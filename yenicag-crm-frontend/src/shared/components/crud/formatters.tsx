import { Chip } from '@mui/material';

import type { CrudColumnType } from './crud.types';

export function formatCrudValue(value: unknown, type: CrudColumnType = 'text') {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  switch (type) {
    case 'currency':
      return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
      }).format(Number(value));

    case 'date':
      return new Date(String(value)).toLocaleDateString('tr-TR');

    case 'datetime':
      return new Date(String(value)).toLocaleString('tr-TR');

    case 'boolean':
      return (
        <Chip
          size="small"
          label={value ? 'Aktif' : 'Pasif'}
          color={value ? 'success' : 'default'}
        />
      );

    case 'status':
      return (
        <Chip
          size="small"
          label={String(value)}
          color={String(value).toLowerCase() === 'aktif' ? 'success' : 'default'}
        />
      );

    case 'number':
      return Number(value).toLocaleString('tr-TR');

    default:
      return String(value);
  }
}