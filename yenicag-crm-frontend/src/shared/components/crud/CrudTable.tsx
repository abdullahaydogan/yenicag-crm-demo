import { useMemo } from 'react';

import { Box, Button, Paper, Stack } from '@mui/material';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';

import { formatCrudValue } from './formatters';
import type { CrudAction, CrudColumn } from './crud.types';

type CrudTableProps<T extends Record<string, unknown>> = {
  data: T[];
  columns: CrudColumn<T>[];
  actions?: CrudAction<T>[];
};

export default function CrudTable<T extends Record<string, unknown>>({
  data,
  columns,
  actions = [],
}: CrudTableProps<T>) {
  const tableColumns = useMemo<MRT_ColumnDef<T>[]>(
    () =>
      columns.map((column) => ({
        accessorKey: String(column.key),
        header: column.header,
        size: column.width ?? column.minWidth ?? 150,
        minSize: column.minWidth ?? 70,
        maxSize: column.width ?? 420,
        grow: column.width ? false : true,

        Cell: ({ row, cell }) => {
          if (column.render) {
            return column.render(row.original);
          }

          return formatCrudValue(cell.getValue(), column.type);
        },
      })),
    [columns],
  );

  const table = useMaterialReactTable({
    columns: tableColumns,
    data,

    layoutMode: 'grid',
    enableColumnResizing: true,
    enableColumnFilters: false,
    enableSorting: true,
    enablePagination: true,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableGlobalFilter: true,
    enableHiding: false,

    enableRowActions: actions.length > 0,
    positionActionsColumn: 'last',
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: '',
        size: 230,
        minSize: 230,
        maxSize: 260,
        grow: false,
      },
    },
    renderRowActions: ({ row }) => (
      <Stack
        direction="row"
        spacing={1}
        sx={{
          width: '100%',
          minWidth: 220,
          justifyContent: 'flex-start',
          flexWrap: 'nowrap',
        }}
      >
        {actions.map((action) => (
          <Button
            key={action.label}
            size="small"
            variant={action.variant ?? 'text'}
            color={action.color ?? 'primary'}
            startIcon={action.icon}
            disableElevation
            onClick={() => action.onClick(row.original)}
            sx={{
              minWidth: action.label.length > 6 ? 100 : 78,
              height: 30,
              fontSize: 12,
              fontWeight: 800,
              whiteSpace: 'nowrap',
              borderRadius: 2,
            }}
          >
            {action.label}
          </Button>
        ))}
      </Stack>
    ),

    initialState: {
      density: 'compact',
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
      showGlobalFilter: false,
    },

    muiTablePaperProps: {
      component: Paper,
      elevation: 0,
      sx: {
        width: '100%',
        maxWidth: '100%',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        background: '#ffffff',
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
      },
    },

    muiTopToolbarProps: {
      sx: {
        minHeight: 52,
        px: 2,
        background: '#ffffff',
        borderBottom: '1px solid #eef2f7',
      },
    },

    muiBottomToolbarProps: {
      sx: {
        minHeight: 52,
        px: 2,
        background: '#ffffff',
        borderTop: '1px solid #eef2f7',
      },
    },

    muiTableHeadCellProps: {
      sx: {
        background: '#f8fafc',
        color: '#334155',
        fontSize: 13,
        fontWeight: 900,
        borderBottom: '1px solid #e5e7eb',
        py: 1.4,

        '& .Mui-TableHeadCell-Content': {
          justifyContent: 'flex-start',
        },

        '& .Mui-TableHeadCell-Content-Labels': {
          gap: 0.5,
        },
      },
    },

    muiTableBodyRowProps: {
      sx: {
        transition: 'background 0.15s ease',

        '&:hover': {
          backgroundColor: '#f8fafc',
        },
      },
    },

    muiTableBodyCellProps: {
      sx: {
        color: '#0f172a',
        fontSize: 14,
        borderBottom: '1px solid #eef2f7',
        py: 1.4,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },

    muiTableContainerProps: {
      sx: {
        width: '100%',
        maxWidth: '100%',
        overflowX: 'auto',
      },
    },
  });

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
      }}
    >
      <MaterialReactTable table={table} />
    </Box>
  );
}